import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from 'axios'

// 警告：硬编码 API 地址，修改时需同步更新 vite.config.ts 中的代理配置
const baseURL = 'https://api.logshare.cn'

export class ApiClient {
  private client: AxiosInstance

  constructor() {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Accept': 'application/json'
      },
      withCredentials: false
    })

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API 请求错误:', {
          status: error.response?.status,
          message: error.message,
          data: error.response?.data,
          config: {
            method: error.config?.method,
            url: error.config?.url
          }
        })
        return Promise.reject(error)
      }
    )
  }

  async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config)
  }

  async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    const postConfig: AxiosRequestConfig = {
      ...config,
      headers: {
        'Content-Type': 'application/json',
        ...(config?.headers || {})
      }
    }
    return this.client.post<T>(url, data, postConfig)
  }

  async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, {
      ...config,
      headers: {
        'Accept': 'application/json'
      }
    })
  }

  async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config)
  }
}

export const apiClient = new ApiClient()

export const getApiUrl = (endpoint: string): string => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.substring(1) : endpoint
  return `${baseURL}/${cleanEndpoint}`
}

export default apiClient

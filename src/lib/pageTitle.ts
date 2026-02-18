/**
 * 页面标题管理工具
 */

// 定义页面标题模板
export const pageTitleTemplates = {
  home: '首页 - LogShare.CN',
  log: (title?: string, id?: string) => `${title || id || '日志'} - LogShare.CN`,
  apiDocs: 'API文档 - LogShare.CN',
  imprint: '法律声明 - LogShare.CN',
  privacy: '隐私政策 - LogShare.CN',
  notFound: '页面未找到 - LogShare.CN'
};

/**
 * 设置页面标题
 * @param template 模板名称或自定义标题
 * @param params 模板参数
 */
export const setPageTitle = (template: keyof typeof pageTitleTemplates | string, params?: { [key: string]: string }) => {
  let title = '';
  
  if (typeof template === 'string' && template in pageTitleTemplates) {
    const templateFn = pageTitleTemplates[template as keyof typeof pageTitleTemplates];
    if (typeof templateFn === 'function') {
      title = templateFn(params?.title, params?.id);
    } else {
      title = templateFn;
    }
  } else if (typeof template === 'string') {
    title = template;
  } else {
    title = 'LogShare.CN';
  }
  
  document.title = title;
};

/**
 * 获取当前页面标题模板
 */
export const getCurrentPageTemplate = (routeName: string | undefined) => {
  switch (routeName) {
    case 'home':
      return 'home';
    case 'log':
      return 'log';
    case 'api-docs':
      return 'apiDocs';
    case 'imprint':
      return 'imprint';
    case 'privacy':
      return 'privacy';
    default:
      return 'notFound';
  }
};
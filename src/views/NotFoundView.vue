<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { FileQuestion, Home, ArrowLeft } from 'lucide-vue-next'
import { setPageTitle } from '@/lib/pageTitle'
import { onMounted } from 'vue'

onMounted(() => {
  setPageTitle('404')
})
</script>

<template>
  <div class="min-h-screen flex flex-col items-center justify-center px-4 relative overflow-hidden">
    <!-- 背景装饰 -->
    <div class="fixed inset-0 -z-10 bg-gradient-to-br from-background via-background to-primary/5">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
    </div>

    <div class="text-center space-y-8 max-w-2xl">
      <!-- 404 图标 -->
      <div class="relative">
        <div class="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
        <div class="relative bg-card border border-primary/20 rounded-2xl p-8 inline-block shadow-2xl">
          <FileQuestion class="h-24 w-24 text-primary" />
        </div>
      </div>

      <!-- 标题和描述 -->
      <div class="space-y-4">
        <h1 class="text-8xl font-black text-primary">404</h1>
        <h2 class="text-3xl font-bold text-foreground">页面未找到</h2>
        <p class="text-lg text-muted-foreground max-w-md mx-auto">
          抱歉，您访问的页面不存在或已被移除。请检查 URL 是否正确，或返回首页。
        </p>
      </div>

      <!-- 操作按钮 -->
      <div class="flex flex-col sm:flex-row gap-4 justify-center pt-4">
        <RouterLink
          to="/"
          class="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl"
        >
          <Home class="h-5 w-5" />
          返回首页
        </RouterLink>
        <button
          @click="$router.back()"
          class="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-xl font-medium hover:bg-secondary/80 transition-colors border border-border"
        >
          <ArrowLeft class="h-5 w-5" />
          返回上一页
        </button>
      </div>

      <!-- 提示信息 -->
      <div class="pt-8 border-t border-border">
        <p class="text-sm text-muted-foreground">
          如果您认为这是一个错误，请联系网站管理员。
        </p>
      </div>
    </div>
  </div>
</template>

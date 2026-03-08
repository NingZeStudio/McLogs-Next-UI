<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X, MessageCircle, Heart } from 'lucide-vue-next'
import { t } from '@/lib/i18n'

const isOpen = ref(false)
const hasBeenShown = ref(false)

// 检查是否已经显示过公告
onMounted(() => {
  const shown = localStorage.getItem('announcement_shown')
  if (shown !== 'true') {
    // 延迟显示，让用户先看到页面
    setTimeout(() => {
      isOpen.value = true
      hasBeenShown.value = true
      localStorage.setItem('announcement_shown', 'true')
    }, 500)
  }
})

const closeDialog = () => {
  isOpen.value = false
}

// 强制重新显示公告（用于调试）
const forceShowAnnouncement = () => {
  localStorage.removeItem('announcement_shown')
  isOpen.value = true
  hasBeenShown.value = true
}

// 暴露给父组件的方法
defineExpose({
  forceShowAnnouncement
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" @click.self="closeDialog">
        <Transition
          enter-active-class="transition ease-out duration-300 delay-100"
          enter-from-class="opacity-0 scale-95 translate-y-4"
          enter-to-class="opacity-100 scale-100 translate-y-0"
          leave-active-class="transition ease-in duration-200"
          leave-from-class="opacity-100 scale-100 translate-y-0"
          leave-to-class="opacity-0 scale-95 -translate-y-4"
        >
          <div class="bg-card border text-card-foreground rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
            <!-- 关闭按钮 -->
            <button
              @click="closeDialog"
              class="absolute right-4 top-4 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors z-10"
              :aria-label="t('close')"
            >
              <X class="h-5 w-5" />
            </button>

            <!-- 内容区域 -->
            <div class="p-6">
              <!-- 标题 -->
              <div class="text-center mb-6">
                <h2 class="text-2xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  {{ t('announcement_title') }}
                </h2>
              </div>

              <!-- 公告列表 -->
              <div class="space-y-4">
                <!-- QQ 群公告 -->
                <div class="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 rounded-xl p-4">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-blue-500/20 rounded-lg shrink-0">
                      <MessageCircle class="h-5 w-5 text-blue-500" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg mb-2 text-blue-400">
                        {{ t('announcement_qq_group_title') }}
                      </h3>
                      <p class="text-sm text-muted-foreground mb-3">
                        {{ t('announcement_qq_group_desc') }}
                      </p>
                      <a
                        href="https://qm.qq.com/q/XoXSt8askA"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                      >
                        <MessageCircle class="h-4 w-4" />
                        {{ t('announcement_join_qq_group') }}
                      </a>
                    </div>
                  </div>
                </div>

                <!-- 赞助公告 -->
                <div class="bg-gradient-to-br from-red-500/10 to-orange-600/5 border border-red-500/20 rounded-xl p-4">
                  <div class="flex items-start gap-3">
                    <div class="p-2 bg-red-500/20 rounded-lg shrink-0">
                      <Heart class="h-5 w-5 text-red-500" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-semibold text-lg mb-2 text-red-400">
                        {{ t('announcement_sponsor_title') }}
                      </h3>
                      <p class="text-sm text-muted-foreground mb-3">
                        {{ t('announcement_sponsor_desc') }}
                      </p>
                      <RouterLink
                        to="/sponsor"
                        class="inline-flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                      >
                        <Heart class="h-4 w-4" />
                        {{ t('announcement_sponsor_action') }}
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 底部提示 -->
              <div class="mt-6 pt-4 border-t border-border/50">
                <p class="text-center text-xs text-muted-foreground">
                  {{ t('announcement_footer') }}
                </p>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* 自定义滚动条样式 */
div[class*="overflow-y-auto"] {
  scrollbar-width: thin;
  scrollbar-color: hsl(var(--muted-foreground) / 0.3) transparent;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar {
  width: 6px;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar-track {
  background: transparent;
}

div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground) / 0.3);
  border-radius: 3px;
}

.dark div[class*="overflow-y-auto"]::-webkit-scrollbar-thumb {
  background-color: hsl(var(--muted-foreground) / 0.5);
}
</style>

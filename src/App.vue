<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView, RouterLink, useRoute } from 'vue-router'
import { Palette, X } from 'lucide-vue-next'
import LanguageSwitcher from '@/components/LanguageSwitcher.vue'
import ThemeSettings from '@/components/ThemeSettings.vue'
import PwaUpdateToast from '@/components/PwaUpdateToast.vue'
import PwaInstallPrompt from '@/components/PwaInstallPrompt.vue'
import AnnouncementDialog from '@/components/AnnouncementDialog.vue'
import { setPageTitle, getCurrentPageTemplate } from '@/lib/pageTitle'

const showEasterEgg = ref(false)
const isThemeSettingsOpen = ref(false)

const easterEggImages = [
  'https://cdn.zeinklab.com/myfile/images/974d9feef5429ded.jpeg',
  'https://cdn.zeinklab.com/myfile/images/0b9453f27d4823ef.jpg',
  'https://cdn.zeinklab.com/myfile/images/8295488fa57aef04.jpeg'
]

const openThemeSettings = () => {
  isThemeSettingsOpen.value = true
}

const closeEasterEgg = () => {
  showEasterEgg.value = false
}

onMounted(() => {
  const route = useRoute();
  const template = getCurrentPageTemplate(route.name?.toString());
  setPageTitle(template);
})
</script>

<style scoped>
.theme-settings-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  color: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-settings-button:hover {
  background-color: rgba(0, 0, 0, 0.1);
}

.dark .theme-settings-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}
</style>

<template>
  <div class="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased transition-colors duration-500">
    <header class="border-b bg-card/80 sticky top-0 z-40 w-full backdrop-blur-xl shadow-sm">
      <div class="container mx-auto px-4 h-16 flex items-center justify-between">
        <RouterLink to="/" class="flex items-center gap-2 font-bold text-xl">
          <span class="text-primary">LogShare.CN</span><sup class="text-xs text-muted-foreground">v1.2.0</sup>
        </RouterLink>
        <nav class="flex items-center gap-2">
          <RouterLink to="/api-docs" class="text-sm font-bold bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors">API 文档</RouterLink>
          <LanguageSwitcher />
          <button @click="openThemeSettings" class="theme-settings-button" aria-label="主题设置">
            <Palette class="h-5 w-5" />
          </button>
        </nav>
      </div>
    </header>

    <main class="flex-1">
      <RouterView v-slot="{ Component }">
        <Transition name="fade" mode="out-in">
          <component :is="Component" />
        </Transition>
      </RouterView>
    </main>

    <footer class="border-t py-4 bg-muted/20">
      <div class="container mx-auto px-4 flex flex-col items-center gap-3 text-xs text-muted-foreground">
        <div class="flex flex-wrap items-center justify-center gap-3">
          <span>&copy; 2026 LogShare.CN</span>
          <span class="hidden sm:inline">|</span>
          <a
            href="https://qm.qq.com/q/XoXSt8askA"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-primary transition-colors"
          >
            加入群聊【梦泽闲聊小窝】
          </a>
        </div>
        <div class="flex items-center gap-3">
          <RouterLink to="/imprint" class="hover:underline transition-colors">法律声明</RouterLink>
          <RouterLink to="/privacy" class="hover:underline transition-colors">隐私政策</RouterLink>
        </div>
      </div>
    </footer>

    <div v-if="showEasterEgg" class="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" @click.self="closeEasterEgg">
      <div class="bg-card border text-card-foreground rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in duration-300">
        <button @click="closeEasterEgg" class="absolute right-4 top-4 p-2 rounded-full bg-secondary/80 hover:bg-secondary transition-colors z-10">
          <X class="h-6 w-6" />
        </button>
        <div class="p-6 grid gap-6">
          <h2 class="text-2xl font-bold text-center">私货</h2>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div v-for="(img, index) in easterEggImages" :key="index" class="aspect-[3/4] rounded-lg overflow-hidden border bg-muted">
              <img :src="img" class="w-full h-full object-cover hover:scale-105 transition-transform duration-500" alt="Secret Reward" />
            </div>
          </div>
          <p class="text-center text-muted-foreground text-sm">这些是给最细心的探索者的特别奖励~</p>
        </div>
      </div>
    </div>

    <ThemeSettings v-model:open="isThemeSettingsOpen" />

    <PwaUpdateToast />

    <PwaInstallPrompt />

    <AnnouncementDialog />
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

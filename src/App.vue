<script setup lang="ts">
  import { ref, watch } from 'vue';
  import { RouterView } from 'vue-router';
  
  // TYPES
  import type { PublicSettingsColorsType, PublicSettingsMenusType } from './types/action/settings/settingsSite.type';
  
  // COMPONENTS
  import GlobalLoading from '@/components/GlobalLoading.vue';
  import { Toaster } from 'vue-sonner';
  import TopMenu from '@/components/menu/TopMenu.vue';

  // COMPOSABLE
  import useSettingsSite from '@/composables/action/settings/useSettingsSite';

  const { runSettingsSite, extractConfig, getSettingColorValue, settingsSite, settingsSiteIsLoaded } = useSettingsSite();

  // Monta as configurações do site
  runSettingsSite();

  const configsColors = ref<PublicSettingsColorsType[]>([]);
  const configsMenus  = ref<PublicSettingsMenusType[]>([]);

  watch(settingsSite, (newVal, oldVal) => {
    if (oldVal !== newVal) {
      configsColors.value = extractConfig('color');
      configsMenus.value = extractConfig('menu');
    }
  });
</script>

<template>
  <!-- Componente de Loading Global --> 
  <GlobalLoading /> 
    
  <!-- Toast Notificações -->
  <Toaster
    position="top-right"
    :theme="'light'"
    :richColors="true"
  />

  <!-- Menu superior -->
  <TopMenu 
    v-if="settingsSiteIsLoaded" 
    :menus="configsMenus ?? null" 
    :background="getSettingColorValue(configsColors || [], 'color-primary')"
    :color="getSettingColorValue(configsColors || [], 'color-text-secondary')"
    :backgroundSecondary="getSettingColorValue(configsColors || [], 'color-secondary')"
    :colorSecondary="getSettingColorValue(configsColors || [], 'color-text-secondary')"
  />

  <div id="app">
    <RouterView />
  </div>
</template>

<style scoped>
#app {
  min-height: 100vh;
}
</style>

<style>
/* Toast sempre por cima de tudo */
[data-sonner-toaster] {
  z-index: 99999 !important;
}

/* Garantir que as cores apareçam */
[data-sonner-toast][data-type="success"] {
  background: #10b981 !important;
  border-color: #059669 !important;
  color: white !important;
}

[data-sonner-toast][data-type="error"] {
  background: #ef4444 !important;
  border-color: #dc2626 !important;
  color: white !important;
}

[data-sonner-toast][data-type="warning"] {
  background: #f59e0b !important;
  border-color: #d97706 !important;
  color: white !important;
}

[data-sonner-toast][data-type="info"] {
  background: #3b82f6 !important;
  border-color: #2563eb !important;
  color: white !important;
}

[data-sonner-toast] {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05) !important;
}
</style>


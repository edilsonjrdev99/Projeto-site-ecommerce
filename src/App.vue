<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { Toaster } from 'vue-sonner';

  // COMPONENTS
  import GlobalLoading from '@/components/GlobalLoading.vue';
  import TopMenu from '@/components/menu/TopMenu.vue';

  // COMPOSABLE
  import useSettingsSite from '@/composables/action/settings/useSettingsSite';

  const { runSettingsHomePage } = useSettingsSite();

  // Monta as configurações do site
  runSettingsHomePage();
</script>

<template>
  <!-- Componente de Loading Global --> 
  <GlobalLoading /> 
    
  <!-- Toast Notifications -->
  <Toaster
    position="top-right"
    :theme="'light'"
    :richColors="true"
  />

  <!-- Menu superior -->
  <TopMenu />

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


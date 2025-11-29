<script setup lang="ts">
  // COMPOSABLE
  import useGlobalLoading from '@/composables/useGlobalLoading';

  const { isLoading, loadingMessage } = useGlobalLoading();
</script>

<template>
   <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="isLoading"
        class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      >

        <div class="flex flex-col items-center gap-4">
           <!-- Spinner -->
          <div class="h-16 w-16 animate-spin rounded-full border-4 border-white/30 border-t-white"></div>
           <!-- Mensagem (opcional - remova se não quiser) -->
          <p v-if="loadingMessage" class="text-lg font-semibold text-white drop-shadow-lg">
             {{ loadingMessage }}
          </p>
        </div>
      </div>
      </Transition>
    </Teleport>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>


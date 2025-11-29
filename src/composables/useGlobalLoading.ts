import { ref } from 'vue';

// Estado global do loading (compartilhado entre todos os componentes)
const isLoading = ref(false);
const loadingMessage = ref('Carregando...');
const loadingCount = ref(0);

export default function useGlobalLoading() {
  const show = (message = 'Carregando...') => {
    loadingCount.value++;
    loadingMessage.value = message;
    isLoading.value = true;
  }

  const hide = () => {
    loadingCount.value--;
    if (loadingCount.value <= 0) {
      loadingCount.value = 0;
      isLoading.value = false;
    }
  }

  const setMessage = (message: string) => {
    loadingMessage.value = message;
  }

  return {
    isLoading,
    loadingMessage,
    show,
    hide,
    setMessage,
  }
}

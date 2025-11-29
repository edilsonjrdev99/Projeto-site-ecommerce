import { httpClient, HttpError } from '@/lib/http-client';

// COMPONENTS
import useToast from '@/composables/useToast';
import useGlobalLoading from '@/composables/useGlobalLoading';

export default function useSettingsColorApi() {
  const toast = useToast();
  const { show: showLoading, hide: hideLoading } = useGlobalLoading();

  /**
   * Responsável por retornar as configurações de cores da loja
   * @param onSuccess Response de Configurações de cores
   * @param onError Erro do response
   */
  const getAllSettingsColors = (
    onSuccess: (data: unknown) => void,
    onError?: (error: HttpError) => void
  ) => {
    showLoading();

    httpClient.getWithCallback('/api/public/settings', {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        toast.error('Erro ao carregar configurações de cores', error.message)
        onError?.(error);
      },
      onFinally: () => {
        hideLoading();
      },
    });
  }

  return {
    getAllSettingsColors,
  }
}

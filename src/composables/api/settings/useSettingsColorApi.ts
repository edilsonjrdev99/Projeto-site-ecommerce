import { httpClient, HttpError } from '@/lib/http-client';

// COMPONENTS
import useToast from '@/composables/useToast';
import useGlobalLoading from '@/composables/useGlobalLoading';
import type { GetAllSettingsColorsResponse } from '@/types/api/settingsColorApi.type';

/**
 * Composable de api que armazena as funções de request das configurações de cores pública do site
 * @returns object - funções de request da rota de public/settings/color
 */
export default function useSettingsColorApi() {
  const toast = useToast();
  const { show: showLoading, hide: hideLoading } = useGlobalLoading();

  /**
   * Responsável por retornar as configurações de cores da loja
   * @param onSuccess Response de Configurações de cores
   * @param onError Erro do response
   */
  const getAllSettingsColors = (
    onSuccess: (data: GetAllSettingsColorsResponse[]) => void,
    onError?: (error: HttpError) => void
  ) => {
    showLoading();

    httpClient.getWithCallback<GetAllSettingsColorsResponse[]>('/api/public/settings/color', {
      onSuccess: data => {
        onSuccess(data);
      },
      onError: error => {
        toast.error('Erro ao carregar configurações de cores', error.message);
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

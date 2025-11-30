import { httpClient, HttpError } from '@/lib/http-client';

// TYPES
import type { GetAllSettingsMenuResponseType } from '@/types/api/settingsMenuApi.type';

// COMPONENTS
import useGlobalLoading from '@/composables/useGlobalLoading';
import useToast from '@/composables/useToast';

/**
 * Composable de api responsável por armazenar as funções de request de configurações públicas de menu
 * @returns object - funções que fazem request para a rota de public/settings/menu
 */
export default function useSettingsMenuApi() {
  const toast = useToast();
  const { show: showLoading, hide: hideLoading } = useGlobalLoading();

  /**
   * Função que faz a request de get para todas as configurações públicas de menu
   * @param onSuccess GetAllSettingsMenuResponseType[] - response
   * @param onError error - erro da request
   */
  const getAllSettingsMenu = (
    onSuccess: (data: GetAllSettingsMenuResponseType[]) => void,
    onError: (error: HttpError) => void,
  ) => {
    showLoading();
    
    httpClient.getWithCallback<GetAllSettingsMenuResponseType[]>('/api/public/settings/menu', {
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
    getAllSettingsMenu
  }
}
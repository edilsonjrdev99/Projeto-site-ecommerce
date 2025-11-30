import { ref } from "vue";

// TYPES
import type { GetAllSettingsColorsResponseType } from "@/types/api/settingsColorApi.type";
import type { GetAllSettingsMenuResponseType } from "@/types/api/settingsMenuApi.type";
import type { PublicSettingType, PublicSettingsColorsType, PublicSettingsMenusType } from "@/types/action/settings/settingsSite.type";

// COMPOSABLES
import useSettingsColorApi from "@/composables/api/settings/useSettingsColorApi";
import useSettingsMenuApi from "@/composables/api/settings/useSettingsMenuApi";

// COMPONENTS
import useToast from "@/composables/useToast";
import useGlobalLoading from "@/composables/useGlobalLoading";

/**
 * Composable responsável por retornar as configurações do site
 * @returns object - itens de configurações do site
 */
export default function useSettingsSite() {
  // Backend
  const { getAllSettingsColors } = useSettingsColorApi();
  const { getAllSettingsMenu } = useSettingsMenuApi();

  // Utils
  const toast = useToast();
  const { show: showLoading, hide: hideLoading } = useGlobalLoading();

  // Variáveis
  let responseSettingsColors: GetAllSettingsColorsResponseType[] = [];
  let responseSettingsMenus: GetAllSettingsMenuResponseType[] = [];
  const settingsSite = ref<PublicSettingType[]>([]);
  const settingsSiteIsLoaded = ref<boolean>(false);

  /**
   * Função responsável por chamar as requests das configurações do site
   */
  function runSettingsSite() {
    showLoading();

    getAllSettingsColors(
      (responseAllSettingsColors) => {
        responseSettingsColors = responseAllSettingsColors;
        buildSettingsSite();
      },
      (errorAllSettingsColors) => {
        toast.error('Erro ao carregar configurações de cores', errorAllSettingsColors.message);
      }
    ),
    getAllSettingsMenu(
      (responseAllSettingsMenus) => {
        responseSettingsMenus = responseAllSettingsMenus;
        buildSettingsSite();
        hideLoading();
      },
      (errorAllSettingsMenus) => {
        toast.error('Erro ao carregar configurações de cores', errorAllSettingsMenus.message);
        hideLoading();
      }
    );
  }

  /**
   * Função responsável por montar o array das configurações do site
   */
  function buildSettingsSite() {
    settingsSiteIsLoaded.value = responseSettingsColors.length > 0 && responseSettingsMenus.length > 0;
    if(settingsSiteIsLoaded.value) {
      settingsSite.value = [
        { config: 'color', values: [...responseSettingsColors]},
        { config: 'menu', values: [...responseSettingsMenus]}
      ];
    }
  }

  /**
   * Função resoponsável por retornar somente os valores de uma config específica
   * @param config string - Nome do tipo de config
   * @returns array com os valores da config
   */
  function extractConfig(config: string): PublicSettingsColorsType[]|PublicSettingsMenusType[] {
    if(!settingsSite.value.length) return [];

    const configExtracted = settingsSite.value.find((item: PublicSettingType) => item.config === config);

    return configExtracted?.values ?? [];
  }

  /**
   * Função responsável por receber o array de values da config color de settingsSite e retornar o value com base na key
   * @param settingsColorValues PublicSettingsColorsType[] - array de configurações de cor do site
   * @param key string - key do array de values do objeto de config: color
   * @returns string - string do valor da cor ou string vazia quando não existir
   */
  function getSettingColorValue(settingsColorValues: PublicSettingsColorsType[], key: string): string {
    if (!settingsColorValues.length) return '';

    return settingsColorValues.find(item => item.key == key)?.value || '';
  }

  return {
    settingsSite,
    runSettingsSite,  
    extractConfig,
    getSettingColorValue,
    settingsSiteIsLoaded
  }
}
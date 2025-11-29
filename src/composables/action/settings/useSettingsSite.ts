import { ref } from "vue";

// TYPES
import type { GetAllSettingsColorsResponse } from "@/types/api/settingsColorApi.type";
import type { GetAllSettingsMenuResponse } from "@/types/api/settingsMenuApi.type";

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
  let responseSettingsColors: GetAllSettingsColorsResponse[] = [];
  let responseSettingsMenus: GetAllSettingsMenuResponse[] = [];
  const settingsHomePage = ref<any[]>([]);

  /**
   * Função responsável por chamar as requests das configurações do site
   */
  function runSettingsHomePage() {
    showLoading();

    getAllSettingsColors(
      (responseAllSettingsColors) => {
        responseSettingsColors = responseAllSettingsColors;
        buildSettingsHomePage();
      },
      (errorAllSettingsColors) => {
        toast.error('Erro ao carregar configurações de cores', errorAllSettingsColors.message);
      }
    ),
    getAllSettingsMenu(
      (responseAllSettingsMenus) => {
        responseSettingsMenus = responseAllSettingsMenus;
        buildSettingsHomePage();
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
  function buildSettingsHomePage() {
    if(responseSettingsColors.length > 0 && responseSettingsMenus.length > 0) {
      settingsHomePage.value = [
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
  function extractConfig(config: string) {
    if(!settingsHomePage.value.length) return null;

    const configExtracted = settingsHomePage.value.find(item => item.config === config);

    return configExtracted.values;
  }

  return {
    settingsHomePage,
    runSettingsHomePage,
    extractConfig
  }
}
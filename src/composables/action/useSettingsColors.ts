import { ref } from 'vue';

// COMPOSABLE
import useSettingsColorApi from '@/composables/api/useSettingsColorApi';

export default function useSettingsColors() {
  const { getAllSettingsColors } = useSettingsColorApi();

  const settingsColors = ref<any>([]);

  getAllSettingsColors(
    (response) => {
      console.log(response)
      settingsColors.value = response;
    },
    (error) => {
      console.log(error)
    }
  );

  return {
    settingsColors
  }
}

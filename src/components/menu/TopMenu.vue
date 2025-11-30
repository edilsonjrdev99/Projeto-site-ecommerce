<script setup lang="ts">
  // TYPES
  import type { PublicSettingsMenusType } from '@/types/action/settings/settingsSite.type';

  const props = defineProps<{
    menus: PublicSettingsMenusType[]|null,
    background: string,
    color: string;
    backgroundSecondary?: string;
    colorSecondary?: string;
  }>();

  const liAllCategoriesStyle = {
    background: props.backgroundSecondary ?? 'transparent',
    color: props.colorSecondary ?? 'transparent'
  }
</script>

<template>
  <nav class="top-menu-content" :style="[{'background': background}]">
    <div>
      <input 
        class="mt-[20px] p-[10px] w-[350px] rounded-[10px] focus:outline-none focus:ring-0" 
        type="text" 
        placeholder="Digite a busca"
      >
    </div>

    <div class="top-menu-content-items">
      <ul>
        <li :style="liAllCategoriesStyle">Todas as categorias</li>
        <li v-for="menu in menus" :style="[{'color': color}]">
          <router-link :to="menu.link">
            {{ menu.name }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style lang="css" scoped>
.top-menu-content {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.top-menu-content-items {
  display: flex;
  justify-content: center;
  align-items: end;

  width: 100%;
  height: 70px;
  z-index: 10;
}

.top-menu-content-items ul {
  display: flex;
  gap: 20px;
}

.top-menu-content-items li {
  padding: 5px;
}
</style>
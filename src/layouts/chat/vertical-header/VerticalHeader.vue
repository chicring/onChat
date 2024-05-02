<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/store/customizer';
import { useSessionStore} from "@/store/session.ts";

const customizer = useCustomizerStore();
const sessionStore = useSessionStore();

const darkMode = ref(false)
function toggleTheme () {
  customizer.Theme = darkMode.value ? 'PurpleTheme' : 'PurpleThemeDark'
  darkMode.value = !darkMode.value
}

</script>

<template>
  <v-app-bar elevation="0" height="60">
    <!-- 侧边栏缩放按钮   -->
    <v-btn
        class="hidden-xs text-secondary"
        color="lightsecondary"
        icon="true"
        rounded="lg"
        variant="flat"
        size="small"
        @click="customizer.SET_MINI_SIDEBAR(!customizer.mini_sidebar)"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>
    <!-- 侧边栏显示按钮   -->
    <v-btn
        class="hidden-sm-and-up text-secondary ms-3"
        color="lightsecondary"
        icon="true"
        rounded="lg"
        variant="flat"
        size="small"
        @click="customizer.SET_SIDEBAR_DRAWER"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <v-app-bar-title>
      <strong>{{sessionStore.currentTopic}}</strong>
    </v-app-bar-title>
    <v-spacer />

    <v-switch
        v-model="darkMode"
        false-icon="mdi-weather-sunny"
        true-icon="mdi-weather-night"
        @click="toggleTheme"
        hide-details
        inset
        density="compact"
    >
    </v-switch>
  </v-app-bar>
</template>

<style scoped>

</style>
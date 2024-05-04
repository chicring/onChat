<script setup lang="ts">
import { ref } from 'vue';
import { useCustomizerStore } from '@/store/customizer';
import {getEmailAvatar} from "@/util/EmailAvatar.ts";
import ProfileDD from "@/layouts/admin/vertical-header/ProfileDD.vue";
import {useAuthStore} from "@/store/auth.ts";

const authStore = useAuthStore();
const customizer = useCustomizerStore();

const darkMode = ref(false)
function toggleTheme () {
  customizer.Theme = darkMode.value ? 'PurpleTheme' : 'PurpleThemeDark'
  darkMode.value = !darkMode.value
}

</script>

<template>
  <v-app-bar elevation="0" height="60">
    <v-btn
        class="hidden-xs text-secondary"
        color="lightsecondary"
        icon="true"
        rounded="lg"
        variant="flat"
        size="small"
        @click="customizer.ADMIN_mini_sidebar = !customizer.ADMIN_mini_sidebar"
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
        @click="customizer.ADMIN_Sidebar_drawer = !customizer.ADMIN_Sidebar_drawer"
    >
      <Menu2Icon size="20" stroke-width="1.5" />
    </v-btn>

    <v-spacer/>

    <v-menu :close-on-content-click="false">
      <template v-slot:activator="{ props }">
        <v-btn class="profileBtn text-primary" color="lightprimary" variant="flat" rounded="pill" v-bind="props">
          <v-avatar size="30" class="mr-2" :image="getEmailAvatar(authStore.user.info.email)">
          </v-avatar>
          <SettingsIcon stroke-width="1.5" />
        </v-btn>
      </template>
      <v-sheet rounded="md" elevation="4">
        <ProfileDD />
      </v-sheet>
    </v-menu>
  </v-app-bar>
</template>

<style scoped>

</style>
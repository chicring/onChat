<script setup lang="ts">

import {useCustomizerStore} from "@/store/customizer.ts";
import sidebarItems from './sidebarItem';
import NavItem from "@/layouts/admin/vertical-sidebar/NavItem/NavItem.vue";
import ExtraBox from "@/layouts/admin/vertical-sidebar/extrabox/ExtraBox.vue";

const customizer = useCustomizerStore();
</script>

<template>
  <v-navigation-drawer
      app
      left
      elevation="0"
      rail-width="75"
      floating
      mobile-breakpoint="sm"
      v-model="customizer.ADMIN_Sidebar_drawer"
      :rail="customizer.ADMIN_mini_sidebar"
      expand-on-hover
  >
    <template #prepend>
      <div class="pa-4">
        <v-img src="/src/assets/logo.svg" alt="Logo"
               width="95"
        ></v-img>
      </div>
    </template>


    <v-list
        class="pa-4 scrollnavbar"
    >
      <template v-for="(item,i) in sidebarItems">
            <NavItem :item="item"></NavItem>
      </template>
    </v-list>

    <template #append>
      <div class="pa-4">
        <ExtraBox></ExtraBox>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
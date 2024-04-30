<script setup lang="ts">

import VerticalSidebar from "@/layouts/chat/vertical-sidebar/VerticalSidebar.vue";
import VerticalHeader from "@/layouts/chat/vertical-header/VerticalHeader.vue";

</script>

<template>
  <v-app
    theme="PurpleTheme"
    class=""
  >
    <VerticalSidebar></VerticalSidebar>

    <VerticalHeader></VerticalHeader>
    <v-main>
      <v-container fluid class="page-wrapper">
        <div>
          <RouterView></RouterView>

        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>

</style>
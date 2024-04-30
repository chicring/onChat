<script setup lang="ts">

import ExtraBox from "@/layouts/chat/vertical-sidebar/extrabox/ExtraBox.vue";
</script>

<template>
  <v-navigation-drawer
    app
    elevation="0"
    rail-width="75"
    floating
  >
    <template #prepend>
      <div class="pa-4">
        <v-img src="/src/assets/logo.svg" alt="Logo"
               max-width="95"
        ></v-img>

        <v-btn
            block
            color="primary"
            prepend-icon="mdi-plus"
            variant="tonal"
            rounded="lg"
            size="large"
            class="mt-7"
        >
          <strong>新对话</strong>
        </v-btn>
      </div>

    </template>

    <v-list
        nav
        density="comfortable"
        transition="slide-y-transition"
    >
      <v-list-item
          color="primary"
          rounded="lg"
      >
        <v-list-item-title>
          <strong>
            sdasd
          </strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          dsd
        </v-list-item-subtitle>

      </v-list-item>
    </v-list>

    <template #append>
<!--      <div class="pa-4">-->
<!--        <ExtraBox></ExtraBox>-->
<!--      </div>-->
    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
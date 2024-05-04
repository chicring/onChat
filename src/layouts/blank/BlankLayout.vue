<template>
  <v-app>
    <div class="bg-lightprimary h-100">
      <RouterView />
    </div>
  </v-app>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>
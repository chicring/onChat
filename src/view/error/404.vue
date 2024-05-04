<script setup lang="ts">
import {router} from '@/router'


function onClickAction() {
  router.back()
}
</script>

<template>
  <v-empty-state
      image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
      title="页面不存在"
  >
    <template #actions>
      <v-btn flat @click="onClickAction" color="primary" rounded="md" text="返回"></v-btn>
    </template>
  </v-empty-state>
</template>

<style scoped>

</style>

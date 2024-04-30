<script setup lang="ts">

import {Message} from "@/store/session.ts";

const props = defineProps<{
  message: Message
}>();

</script>

<template>
  <v-col v-if="props.message.role !== 'user'" style="display: flex; justify-content: start" class="pa-0">
    <v-card flat rounded="xl" border="sm" class="ml-1">
      <template #text>
        {{props.message.content}}
      </template>
    </v-card>
  </v-col>

  <v-col v-else style="display: flex; justify-content: end" class="pa-0">
    <v-card flat color="background-1" rounded="xl" class="mr-1" border="sm">
      <template #text>
        {{props.message.content}}
      </template>
    </v-card>
  </v-col>
</template>

<style scoped>

</style>
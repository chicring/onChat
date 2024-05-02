<script setup lang="ts">

import {Message} from "@/store/session.ts";
import MarkdownText from "./Text.vue";
import {formatDate} from "../../../../util/formatDate.ts";

const props = defineProps<{
  message: Message
}>();

</script>

<template>

  <div v-if="props.message.role !== 'user'" style="display: flex; justify-content: start" class="mb-1">
    <BrandOpenaiIcon v-if="props.message.role !== 'user'"></BrandOpenaiIcon>
    <span class="small-font align-self-end ml-1">{{formatDate(message.date)}}</span>
  </div>

  <div v-else style="display: flex; justify-content: end" class="mb-1">
    <span class="small-font align-self-end mr-1">{{formatDate(message.date)}}</span>
    <UserCircleIcon></UserCircleIcon>
  </div>

  <v-col :style="{ display: 'flex', 'justify-content': props.message.role === 'user' ? 'end' : 'start' }" class="pa-0 ma-0">
    <v-card elevation="0" rounded="md" class="ml-1" style="max-width: 93%">
      <template #text>
        <MarkdownText :text="props.message.content"></MarkdownText>
      </template>
    </v-card>
  </v-col>

</template>

<style lang="scss" scoped>
.small-font {
  font-size: 0.7em; /* Adjust this value as needed */
  opacity: 0.25; /* Add this line */
}
</style>
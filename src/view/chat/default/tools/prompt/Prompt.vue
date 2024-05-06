<script setup lang="ts">

import {usePromptStore} from "@/store/prompt.ts";

const promptStore = usePromptStore();
const { prompts } = promptStore

const emit = defineEmits(['selectPrompt']);
function selectPrompt(prompt : string){
  emit('selectPrompt', prompt)
}

</script>

<template>
    <v-sheet rounded="md" flat class="mt-2" color="gray100" border="inputBorder md">
      <perfect-scrollbar style="max-height: 45vh" >
        <v-list-item
            v-for="(item, index) in prompts"
            :key="index"
            :value="item.content"
            @click="selectPrompt(item.content)"
            rounded="md"
            class="mx-1 my-1"
            density="comfortable"
            border="inputBorder sm"
            lines="one"
        >
          <v-list-item-title><span class="text-subtitle-2 font-weight-bold">{{ item.title }}</span> </v-list-item-title>
          <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
        </v-list-item>
      </perfect-scrollbar>

    </v-sheet>

</template>

<style scoped>


</style>
<script setup lang="ts">

import {usePromptStore} from "@/store/prompt.ts";
import {successToast} from "@/util/ToastMessage.ts";
import {useDisplay} from "vuetify";

const { mobile } = useDisplay()

const promptStore = usePromptStore();
const { prompts } = promptStore

</script>

<template>
  <v-btn icon variant="text" class="opacity-70">
    <SlashIcon></SlashIcon>

    <v-menu activator="parent" location="top">
      <v-sheet rounded="md" :width="mobile ? '100vw': '75vw' " flat>
          <v-list>
            <v-list-item
                v-for="(item, index) in prompts"
                :key="index"
                :value="item.content"
                lines="one"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
              <v-list-item-subtitle>{{ item.content }}</v-list-item-subtitle>
            </v-list-item>
          </v-list>
      </v-sheet>
    </v-menu>
  </v-btn>
</template>

<style scoped>


</style>
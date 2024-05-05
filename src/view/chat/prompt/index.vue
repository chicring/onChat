<script setup lang="ts">

import {usePromptStore} from "@/store/prompt.ts";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import AddDialog from "@/view/chat/prompt/components/AddDialog.vue";
import ConfirmButton from "@/components/ConfirmButton.vue";

const promptStore = usePromptStore();
const {prompts} = storeToRefs(promptStore);

const headers = [
  { title: '标题', value: 'title', align: 'start', minWidth: '150px'},
  { title: '描述', value: 'content', align: 'start', minWidth: '200px' , maxWidth: '500px'},
  { title: '操作', value: 'actions', align: 'center' },
]

const search = ref('')


function deletePrompt(id : number){
  promptStore.removePrompt(id);
}
</script>

<template>
  <v-tabs>
    <v-tab>本地</v-tab>
    <v-tab>在线</v-tab>
  </v-tabs>

  <v-sheet class="mt-8" rounded="md">

    <v-row>
      <v-col cols="12" md="4">
        <v-text-field color="primary"
                      bg-color="containerBg"
                      label="Prompt"
                      v-model="search"
                      variant="outlined"
                      class="pa-2"
                      density="comfortable"
                      fixed-header
        >
          <template #prepend-inner>
            <SearchIcon class="opacity-50"></SearchIcon>
          </template>
        </v-text-field>
      </v-col>

      <v-col cols="12" md="8">
        <div class="d-flex justify-end ga-2 mr-2">
          <AddDialog></AddDialog>
          <v-btn color="primary" rounded="md" flat>导入</v-btn>
          <v-btn color="primary" rounded="md" flat>清空</v-btn>
        </div>
      </v-col>

    </v-row>
    <v-data-table
        :headers="headers"
        :items="prompts"
        :search="search"
        hover
    >
      <template #item.actions="{ item }">
        <v-btn color="primary" rounded="md" flat icon="true" variant="text">
          <EditIcon></EditIcon>
        </v-btn>

        <ConfirmButton color="primary" rounded="md" flat icon="true" variant="text" @confirm="deletePrompt(item.id)">
          <TrashIcon></TrashIcon>
        </ConfirmButton>
      </template>

      <template #item.title="{value}">
        <strong>{{value}}</strong>
      </template>

      <template #item.content="{value}">
        <v-list-item lines="two" class="px-0 mx-0">
          <v-list-item-subtitle class="px-0 mx-0">{{ value }}</v-list-item-subtitle>
        </v-list-item>
      </template>
    </v-data-table>
  </v-sheet>
</template>

<style scoped>

</style>
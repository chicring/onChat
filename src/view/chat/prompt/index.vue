<script setup lang="ts">

import {usePromptStore} from "@/store/prompt.ts";
import {storeToRefs} from "pinia";
import {ref} from "vue";
import AddDialog from "@/view/chat/prompt/components/AddDialog.vue";
import ConfirmButton from "@/components/ConfirmButton.vue";
import EditeDialog from "@/view/chat/prompt/components/EditeDialog.vue";
import {successToast} from "@/util/ToastMessage.ts";
import ImportDialog from "@/view/chat/prompt/components/ImportDialog.vue";

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

async function delectAllPrompt(){
  promptStore.deleteAllPrompt()
      .then(() => {
        successToast("删除成功")
      })
}

</script>

<template>
  <v-tabs>
    <v-tab>本地</v-tab>
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

          <ImportDialog></ImportDialog>

          <ConfirmButton color="primary" rounded="md" flat @confirm="delectAllPrompt" title="清空操作">
            清空
          </ConfirmButton>
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

        <EditeDialog :prompt="item"></EditeDialog>

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
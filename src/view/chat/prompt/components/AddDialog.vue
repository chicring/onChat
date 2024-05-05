<script setup lang="ts">

import {ref,} from "vue";
import {usePromptStore} from "@/store/prompt.ts";
import {successToast} from "@/util/ToastMessage.ts";

const promptStore = usePromptStore();

const dialog = ref(false)

const data = ref({
  title: '',
  content: '',
})



function addPrompt(){
  if (!data.value.title.trim() || !data.value.content.trim()) return;

  promptStore.addPrompt({
    title: data.value.title,
    content: data.value.content,
  });
  successToast('添加成功', data.value.title);

  data.value = {
    title: '',
    content: '',
  }
  dialog.value = false;
}
</script>

<template>

  <v-btn
      @click="dialog = true"
      color="primary"
      rounded="md"
      flat
  >
    <PlusIcon></PlusIcon>
    添加
  </v-btn>

    <v-dialog
        v-model="dialog"
        max-width="600"
    >
      <v-card>
        <v-card-title>添加</v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-text-field v-model="data.title" color="primary" bg-color="containerBg"  variant="outlined" label="标题" >

          </v-text-field>
          <v-textarea v-model="data.content" color="primary" bg-color="containerBg"  variant="outlined" label="描述" >

          </v-textarea>
        </v-card-text>
        <v-card-actions>
          <v-btn color="error" @click="dialog = false">取消</v-btn>
          <v-btn rounded="md" color="primary" variant="flat" @click="addPrompt">添加</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</template>

<style scoped>

</style>
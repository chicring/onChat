<script setup lang="ts">

import {ref} from "vue";
import {infoToast, successToast} from "@/util/ToastMessage.ts";
import {usePromptStore,Prompt} from "@/store/prompt.ts";

const promptStore = usePromptStore();

const dialog = ref(false)

const result = ref([])
const url = ref('')
const progress = ref(0)

function submit(){
  if (!url.value.trim()) return
  infoToast("开始导入，请不要退出")

  progress.value = 0
  fetchJson(url.value).then(
      () => {
        let total = result.value.length
        let index = 1

        result.value.forEach((item: any) => {
          promptStore.addPrompt({
            title: item.act,
            content: item.prompt
          }).then(
              () => {
                index++
                progress.value = (index / total) * 100
              }
          )
        })
        successToast("导入成功")
        dialog.value = false
        progress.value = 0
        url.value = ''
      }
  )
}


async function fetchJson(url: string){
  return fetch(url)
      .then(response => response.json())
      .then(data => {
        result.value = data
      })
}

</script>

<template>
  <v-btn
      @click="dialog = true"
      color="primary"
      variant="flat"
      rounded="md"
  >
    导入
  </v-btn>

  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <v-card>
      <v-card-title>在线导入</v-card-title>
      <v-divider></v-divider>
      <v-alert
          border="start"
          close-label="Close Alert"
          color="primary"
          title="导入提示"
          variant="tonal"
          class="ma-4"
          rounded="md"
      >
        请确保json文件链接正确，否则导入失败
        例如： https://qn.huat.xyz/prompts/prompts-zh.json
      </v-alert>
      <v-card-text>
        <v-text-field color="primary" bg-color="containerBg"  variant="outlined" label="json文件链接" v-model="url">

          <template #append-inner v-if="url">
            <v-btn
                color="primary"
                @click="submit"
                variant="flat"
                rounded="md"
            >
              导入
            </v-btn>
          </template>
        </v-text-field>

        <div v-if="progress != 0">
          <v-progress-linear
              v-model="progress"
              color="primary"
              height="20"
          >
            <strong>{{ Math.ceil(progress) }}%</strong>
          </v-progress-linear>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
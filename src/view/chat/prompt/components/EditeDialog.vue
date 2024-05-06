<script setup lang="ts">
import {Ref, ref,} from "vue";
import {usePromptStore,Prompt} from "@/store/prompt.ts";
import {infoToast, successToast} from "@/util/ToastMessage.ts";

const props = defineProps<{
  prompt: Prompt
}>()

const promptStore = usePromptStore();

const dialog = ref(false)

const data : Ref<Prompt> = ref({
  id: props.prompt.id,
  title: props.prompt.title,
  content: props.prompt.content,
  contentLength: props.prompt.content.length,
})

function submit(){
  if (data.value.title.trim() === '' || data.value.content.trim() === '') {
    infoToast('标题和内容不能为空')
    return
  }else {
    data.value.contentLength = data.value.content.length
    promptStore.updatePrompt(data.value)
        .then(() => {
          dialog.value = false
          successToast('修改成功', data.value.title)
        })
  }
}

</script>

<template>
  <v-btn
      @click="dialog = true"
      color="primary"
      icon
      variant="text"
  >
    <EditIcon></EditIcon>
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
        <v-textarea v-model="data.content" color="primary" bg-color="containerBg"  variant="outlined" label="描述" counter >

        </v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-btn color="error" @click="dialog = false">取消</v-btn>
        <v-btn rounded="md" color="primary" variant="flat" @click="submit">添加</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
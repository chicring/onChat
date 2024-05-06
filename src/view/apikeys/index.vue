<script setup lang="ts">
import {deleteApiKey, getApiKey} from "@/api/methods/apikey";
import {onMounted, ref} from "vue";
import headers from "@/view/apikeys/headers.ts";
import {formatDate} from "@/util/formatDate.ts";
import {errorToast, successToast} from "@/util/ToastMessage.ts";
import ConfirmButton from "@/components/ConfirmButton.vue";
import AddKeyDialog from "@/view/apikeys/AddKeyDialog.vue";
import copyText from "@/util/Clipboard.ts";

const userKeys = ref([])

function copyTextToClipboard(text: string) {

  copyText(text).then(() => {
    successToast('复制成功');
  }).catch((error) => {
    console.error('复制失败:', error);
    errorToast('复制失败', text);
  });
}

function deleteItem(id : number) {
  deleteApiKey(id).then(() => {
    successToast('删除成功');
    userKeys.value = userKeys.value.filter((item) => item.id !== id);
  })
}

async function fetchKeys() {
  getApiKey().then((res) => {
    userKeys.value = res;
  })
}
onMounted(async () => {
  await fetchKeys();
});

</script>

<template>

  <v-card rounded="xl" flat>
    <v-card-title>Apikeys</v-card-title>
    <v-card-subtitle>使用API keys进行服务鉴权和使用记录</v-card-subtitle>
    <v-card-actions class="justify-end">
      <AddKeyDialog @created="fetchKeys"></AddKeyDialog>
    </v-card-actions>
  </v-card>


  <v-data-table :items="userKeys"
                class="mt-4 rounded-xl"
                :headers="headers"
                item-key="id"
                :mobile="false"
  >
    <template #item.apiKey="{ item }">
      <span>********</span>
      <v-btn icon="mdi-clipboard-text-multiple-outline"
             variant="text" color="primary"
             @click="copyTextToClipboard(item.apiKey)"
             size="small"
      >
      </v-btn>
    </template>

    <template #item.enabled="{ item }">
      <v-switch v-model="item.enabled" color="primary"
                hide-details
                inset
                density="comfortable"
                base-color="borderLight"
                center-affix
                flat
      >
        <template #track-true>
          <CheckIcon class="mt-1" size="18"></CheckIcon>
        </template>
        <template #track-false>
          <MinusIcon class="mt-1" size="18"></MinusIcon>
        </template>
      </v-switch>
    </template>

    <template #item.createdAt="{ item }">
      <span>{{ formatDate(item.createdAt) }}</span>
    </template>


    <template #item.expiresAt="{ item }">
      <span>{{ formatDate(item.expiresAt) }}</span>
    </template>

    <template #item.actions="{ item }">
      <ConfirmButton icon variant="text" @confirm="deleteItem(item.id)" title="删除提示" content="确认删除这个key？">
        <template #default>
          <TrashIcon></TrashIcon>
        </template>
      </ConfirmButton>
    </template>

    <template v-slot:no-data>
      <span>没有数据</span>
    </template>
  </v-data-table>
</template>

<style scoped>

</style>
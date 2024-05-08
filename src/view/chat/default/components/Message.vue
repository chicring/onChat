<script setup lang="ts">

import {Message} from "@/store/session.ts";
import MarkdownText from "./Text.vue";
import {formatDate} from "../../../../util/formatDate.ts";
import copyText from "@/util/Clipboard.ts";
import {errorToast, successToast} from "@/util/ToastMessage.ts";

const props = defineProps<{
  message: Message
}>();

function copyTextToClipboard() {

  copyText(props.message.content).then(() => {
    successToast('复制成功');
  }).catch((error) => {
    errorToast('复制失败');
  });
}

</script>

<template>

  <div v-if="props.message.role !== 'user'">
    <div style="display: flex; justify-content: start" class="mb-1">
      <BrandOpenaiIcon v-if="props.message.role !== 'user'"></BrandOpenaiIcon>
      <span class="small-font align-self-end ml-1">{{formatDate(message.date)}}</span>
    </div>

    <v-col style="display: flex; justify-content: start" class="pa-0 ma-0">
      <v-card elevation="0" rounded="md" class="ml-1" style="max-width: 93%">
        <template #text>
          <MarkdownText :text="props.message.content"></MarkdownText>
        </template>
      </v-card>

      <div class="d-flex flex-column justify-end ml-1 mb-1">

        <v-btn size="14" variant="text" icon class="mb-2">
          <ArrowBackUpIcon size="14"></ArrowBackUpIcon>
          <v-tooltip
              activator="parent"
              location="top"
          >重试</v-tooltip>
        </v-btn>

        <v-btn size="14" icon="true" variant="text">
          <DotsVerticalIcon size="14"></DotsVerticalIcon>
          <v-menu
              activator="parent"
              open-on-hover
              open-on-click
          >
            <v-card flat>
              <v-btn variant="text" @click="copyTextToClipboard" class="opacity-100">
                <CopyIcon size="20"></CopyIcon>
                复制
              </v-btn>
            </v-card>
          </v-menu>
        </v-btn>
      </div>
    </v-col>

  </div>

  <div v-else>
    <div style="display: flex; justify-content: end" class="mb-1">
      <span class="small-font align-self-end mr-1">{{formatDate(message.date)}}</span>
      <UserCircleIcon></UserCircleIcon>
    </div>

    <v-col style=" display: flex; justify-content: end" class="pa-0 ma-0">

      <div class="align-self-end  mb-1">
        <v-btn  size="14" icon="true" variant="text">
          <DotsVerticalIcon size="14"></DotsVerticalIcon>
          <v-menu
              activator="parent"
              open-on-hover
              open-on-click
          >
            <v-card flat>
              <v-btn  variant="text" @click="copyTextToClipboard" class="opacity-100">
                <CopyIcon size="20"></CopyIcon>
                复制
              </v-btn>
            </v-card>
          </v-menu>
        </v-btn>
      </div>

      <v-card elevation="0" rounded="md" class="ml-1" style="max-width: 93%">
        <template #text>
          <MarkdownText :text="props.message.content"></MarkdownText>
        </template>
      </v-card>
    </v-col>

  </div>


</template>

<style lang="scss" scoped>
.small-font {
  font-size: 0.7em; /* Adjust this value as needed */
  opacity: 0.25; /* Add this line */
}
.v-card-text {
  padding: 12px;
}

.v-btn {
    opacity: 30%;
    &:hover{
      opacity: 100%;
    }
}
</style>
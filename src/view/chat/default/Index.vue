<script setup lang="ts">
import Messages from "@/view/chat/default/components/Message.vue";
import {Message, Session, useSessionStore} from "@/store/session.ts";
import {onMounted, Ref, ref, watch,} from "vue";
import type { PerfectScrollbarExpose } from 'vue3-perfect-scrollbar';
import MarkdownText from "@/view/chat/default/components/Text.vue";
import ConfigDialog from "@/view/chat/default/tools/config/ConfigDialog.vue";
import ConfirmButton from "@/components/ConfirmButton.vue";
import Prompt from "@/view/chat/default/tools/prompt/Prompt.vue";
import Welcome from "@/view/chat/default/components/welcome.vue";

interface Props {
  sessionId?: string;
}

const props = defineProps<Props>()

const sessionStore = useSessionStore();

const currentSession: Ref<Session | undefined > = ref()

const input = ref({
  content: "",
  tool: []
})

const sendMessage = async () => {
  if (input.value.content.trim() === "") {
    return;
  }
  const message : Message = {
    role: "user",
    content: input.value.content,
    date: Math.floor(Date.now() / 1000),
  }
  currentSession.value.messages.push(message);
  input.value.content = "";
  await sessionStore.doChat(props.sessionId, currentSession.value.messages, currentSession.value.config);
  moveToBottom();
}

const scrollbarApi = ref<PerfectScrollbarExpose | null>(null);
const moveToBottom = () => {
  const list = document.getElementById("myList");
  if (list) {
    setTimeout(() => {
      scrollbarApi.value?.ps?.update();
      list.scrollTo({
        top: list.scrollHeight,
        behavior: "auto"
      });
    }, 200);
  }
};

const showArrow = ref(false);

function beginUp() {
  showArrow.value = true;
}
function rearchBottom() {
  showArrow.value = false;
}

//清楚所有聊天数据
function clearAllMessages() {
  currentSession.value.messages = [];
  scrollbarApi.value?.ps?.update();
}

//添加提示
const showPrompt = ref(false);
function addPrompt(prompt: string) {
  input.value.content = ''
  input.value.content += prompt;
  showPrompt.value = false;
}

function checkPrompt() {
  showPrompt.value = input.value.content === '/';
}

//开启联网功能
function openWeb() {
  if (currentSession.value?.config.model.startsWith('web-')) {
    currentSession.value.config.model = currentSession.value.config.model.replace('web-', '');
  } else {
    currentSession.value.config.model = 'web-' + currentSession.value.config.model;
  }
}

watch(() => sessionStore.lastRely?.content, () => {
  moveToBottom();
})

watch(() => props.sessionId, async (newVal) => {
  if (newVal) {
    await sessionStore.findSessionById(newVal)
        .then((newValue) =>{
          currentSession.value = newValue;
          moveToBottom();
          sessionStore.currentTopic = newValue.topic;
        });
  }
})

onMounted( async () => {
  if (props.sessionId) {
    await sessionStore.findSessionById(props.sessionId)
        .then((newValue) =>{
          currentSession.value = newValue;
          setTimeout(moveToBottom, 0);
          sessionStore.currentTopic = newValue.topic;
        });
  }
})
</script>

<template>
  <div class="chat-container">
    <perfect-scrollbar @ps-scroll-up="beginUp" @ps-y-reach-end="rearchBottom" ref="scrollbarApi" id="myList" class="scrollable-messages" v-if="currentSession?.messages.length">
      <v-list class="transparent-background">
        <v-list-item v-for="message in currentSession.messages" :key="message.id" class="px-1 mx-1" >
          <Messages :message="message"></Messages>
        </v-list-item>

        <v-list-item v-if="sessionStore.isRelying" class="px-1 mx-1">
          <div class="mb-1">
            <BrandOpenaiIcon></BrandOpenaiIcon>
          </div>
          <v-col style="display: flex; justify-content: start" class="pa-0">
            <v-card elevation="0" rounded="md" class="ml-1" style="max-width: 93%">
              <template #text>
                <MarkdownText  :text="sessionStore.lastRely?.content" :loading="sessionStore.isRelying"></MarkdownText>
              </template>
            </v-card>
          </v-col>
        </v-list-item>
      </v-list>
    </perfect-scrollbar>

    <welcome v-if="!currentSession?.messages.length"></welcome>

  <div class="chat-input">
    <v-divider class="border-opacity-50"></v-divider>
    <v-btn class="floating-button" color="primary" v-if="showArrow" @click.stop="moveToBottom" variant="flat" icon="true"> <ChevronsDownIcon/></v-btn>

    <Prompt v-if="showPrompt" @select-prompt="addPrompt($event)"></Prompt>


    <div class="d-flex align-center ga-1" v-if="currentSession">
      <ConfirmButton class="opacity-70" icon variant="text" rounded="md" size="small"  @confirm="clearAllMessages">
        <TrashIcon/>
        <v-tooltip
            activator="parent"
            location="top"
        >清除聊天历史</v-tooltip>
      </ConfirmButton>
      <ConfigDialog :session-id="props.sessionId" :key="props.sessionId"></ConfigDialog>

      <v-btn icon variant="text" class="opacity-70" @click.stop="openWeb">
        <WorldOffIcon v-if="currentSession?.config.model.startsWith('web-')"></WorldOffIcon>
        <WorldIcon v-else></WorldIcon>
        <v-tooltip
            activator="parent"
            location="top"
        >联网功能</v-tooltip>
      </v-btn>

      <v-btn  icon variant="text" class="opacity-70"  @click="showPrompt = !showPrompt">
        <SlashIcon></SlashIcon>
      </v-btn>
    </div>

    <v-textarea
          class="chat-input"
          rounded="md"
          color="primary"
          bg-color="gray100"
          variant="outlined"
          auto-grow
          rows="1"
          max-rows="10"
          hide-details
          v-model="input.content"
          density="comfortable"
          placeholder="enter发送 shift+enter换行 /查看提示"
          @keydown.enter.exact.prevent="sendMessage"
          @keydown.enter.shift.exact.prevent="input.content += '\n'"
          @input="checkPrompt"
      >
        <template #append v-if="input.content">
          <div class="align-self-end">
            <v-btn
                icon="true"
                color="primary"
                variant="text"
                @click.stop="sendMessage"
            >
              <SendIcon></SendIcon>
            </v-btn>
          </div>
        </template>
    </v-textarea>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.transparent-background {
  background-color: transparent;
}
.chat-container {
  display: flex;
  flex-direction: column;
  height: calc(100dvh - 100px); /* 根据你的页面头部高度调整 */
}

.scrollable-messages {
  flex-grow: 1;
  overflow-y: auto;
}
.chat-input {
  margin-top: auto;
}

.floating-button {
  position: fixed;
  bottom: 130px; /* Adjust this value as needed */
  left: 50%; /* Adjust this value as needed */
  transform: translateX(-50%); /* This is to center the button horizontally */
}

</style>
<script setup lang="ts">
import ExtraBox from "@/layouts/chat/vertical-sidebar/extrabox/ExtraBox.vue";
import {useSessionStore} from "@/store/session.ts";
import {useCustomizerStore} from "@/store/customizer.ts";
import {storeToRefs} from "pinia";
import {formatDate} from "@/util/formatDate.ts";
import ConfirmButton from "@/components/ConfirmButton.vue";
import {infoToast, warningToast} from "@/util/ToastMessage.ts";
import {router} from "@/router";

const sessionStore = useSessionStore();

const customizer = useCustomizerStore();

const {sessions} = storeToRefs(sessionStore);

async function createSession() {
  const lastSession = sessions.value[sessions.value.length - 1];
  if (lastSession != undefined) {
    if (lastSession.messages.length <= 1) {
      infoToast("已经是最新的会话")

      return;
    }
  }
  await sessionStore.createSession().then( id =>{
    router.push({path: '/c/' + id});
  }).catch((err : any) => {
    warningToast(err.message)
  });
}

function deleteSession(id: string) {
  console.log(id);
  sessionStore.deleteSessionById(id);
}

</script>

<template>
  <v-navigation-drawer
    app
    left
    elevation="0"
    rail-width="130"
    floating
    mobile-breakpoint="sm"
    v-model="customizer.Sidebar_drawer"
    :rail="customizer.mini_sidebar"
    expand-on-hover
  >
    <template #prepend>
      <div class="pa-4">
        <v-img src="/logo.svg" alt="Logo"
               width="95"
        ></v-img>

        <v-btn
            block
            color="primary"
            prepend-icon="mdi-plus"
            variant="tonal"
            rounded="lg"
            size="large"
            class="mt-7"
            @click="createSession"
        >
          <strong>新对话</strong>
        </v-btn>
      </div>

    </template>

    <v-list
        nav
        density="comfortable"
        transition="slide-y-transition"
    >
      <v-list-item
          color="primary"
          rounded="lg"
          v-for="item in sessions.slice().reverse()"
          :key="item.id"
          :to=" '/c/' + item.id"
      >
        <v-list-item-title>
          <strong>
            {{item.topic}}
          </strong>
        </v-list-item-title>
        <v-list-item-subtitle>
          {{formatDate(item.lastUpdate)}}
        </v-list-item-subtitle>

        <template #append>
          <v-btn icon="true" variant="text" @click.stop.prevent size="small">
            <DotsIcon></DotsIcon>
            <v-menu
                activator="parent"
            >
              <v-card rounded="lg">
                <ConfirmButton
                  @confirm="deleteSession(item.id)"
                  flat
                  title="删除提示"
                  content="确定要删除这项内容吗？"
                  @click.stop.prevent
                >
                  <template #prepend>
                    <TrashIcon></TrashIcon>
                  </template>
                  <strong class="text-red-lighten-2 align-center">删除</strong>
                </ConfirmButton>
              </v-card>
            </v-menu>
          </v-btn>
        </template>
      </v-list-item>
    </v-list>

    <template #append>
      <div class="pa-4">
        <ExtraBox></ExtraBox>
      </div>

    </template>
  </v-navigation-drawer>
</template>

<style scoped>

</style>
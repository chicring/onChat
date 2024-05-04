<script setup lang="ts">

import {useAuthStore} from "@/store/auth.ts";

const authStore = useAuthStore();

</script>

<template>
  <div class="pa-4">

    <div class="bg-lightwarning rounded-md pa-5 my-3 circle sm-circle lg-circle" style="width: 300px">
      <h4>Chat With Your GPT</h4>
      <h6 class="text-subtitle-2 text-medium-emphasis mr-11 pr-11 mb-3 mt-2">
        开始与您的GPT聊天吧
      </h6>
      <v-btn color="warning" variant="flat" to="/" rounded="md">
        聊天
      </v-btn>
    </div>

    <v-divider></v-divider>

    <v-list class="mt-3">
      <v-list-item color="secondary" rounded="md" to="/admin/settings">
        <template v-slot:prepend>
          <SettingsIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2" > 用户设置</v-list-item-title>
      </v-list-item>

<!--      <v-list-item color="secondary" rounded="md">-->
<!--        <template v-slot:prepend>-->
<!--          <UserIcon size="20" class="mr-2" />-->
<!--        </template>-->

<!--        <v-list-item-title class="text-subtitle-2"> </v-list-item-title>-->

<!--        <template v-slot:append>-->
<!--          <v-chip color="warning" class="text-white" text="02" variant="flat" size="small" />-->
<!--        </template>-->
<!--      </v-list-item>-->

      <v-list-item @click="authStore.logout()" color="secondary" rounded="md">
        <template v-slot:prepend>
          <LogoutIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2" @click="authStore.logout()"> 登出</v-list-item-title>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>

</style>
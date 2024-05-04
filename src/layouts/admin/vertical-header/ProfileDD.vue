<script setup lang="ts">

import {useAuthStore} from "@/store/auth.ts";

const authStore = useAuthStore();

</script>

<template>
  <div>
    <v-list class="mt-3">
      <v-list-item color="secondary" rounded="md">
        <template v-slot:prepend>
          <SettingsIcon size="20" class="mr-2" />
        </template>

        <v-list-item-title class="text-subtitle-2"> 用户设置</v-list-item-title>
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
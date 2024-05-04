<script setup lang="ts">

import {useAuthStore} from "@/store/auth.ts";
import {getEmailAvatar} from "@/util/EmailAvatar.ts";
import {ref} from "vue";

const authStore = useAuthStore();

const tab = ref('option-1')
</script>

<template>
  <v-card elevation="0" >
    <v-card-title><span class="text-h6 font-weight-bold">个人设置</span></v-card-title>
    <v-divider  class="opacity-75"></v-divider>
    <v-card-text style="min-height: 350px">
      <v-row>

        <v-col cols="12" sm="4">

          <v-tabs
                v-model="tab"
                color="primary"
                direction="vertical"
          >
            <v-tab text="用户信息" value="option-1" rounded="md">
              <template #prepend>
                <UserIcon></UserIcon>
              </template>
            </v-tab>
            <v-tab prepend-icon="mdi-lock" text="监控设置" value="option-2"  rounded="md"></v-tab>
            <v-tab prepend-icon="mdi-access-point" text="Option 3" value="option-3"  rounded="md"></v-tab>
          </v-tabs>
        </v-col>
        <v-col cols="12" sm="8">
          <div class="d-flex justify-space-between align-end">
            <v-avatar size="60" :image="getEmailAvatar(authStore.user.info.email)"></v-avatar>

            <span class="text-subtitle-2 opacity-50">注册时间：{{authStore.user.info.registerDate}}</span>
          </div>

          <v-row class="mt-4" dense>
            <v-col cols="12" sm="6">
              <v-text-field v-model="authStore.user.info.username" color="primary" label="用户名" variant="outlined">

              </v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field v-model="authStore.user.info.email" color="primary" label="邮箱" variant="outlined">

              </v-text-field>
            </v-col>

            <v-col>
              <v-btn rounded="md" color="primary" variant="flat">提交</v-btn>
            </v-col>
          </v-row>


        </v-col>
      </v-row>
    </v-card-text>
    <v-divider  class="opacity-75"></v-divider>

    <v-card-actions class="justify-end">
      <v-btn class="mb-4 mr-4" color="primary" variant="flat" rounded="md">继续</v-btn>
    </v-card-actions>
  </v-card>
</template>

<style lang="scss" scoped>

.v-card-text {
  padding: 24px !important;
}
</style>
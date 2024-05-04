<script setup lang="ts">

import { ref, onMounted } from 'vue';
import {getCountOfUsersByRole} from "@/api/methods/overview";


const data = ref();

onMounted(async () => {
  data.value = await getCountOfUsersByRole()
});

</script>

<template>
  <v-card elevation="0" class="bg-secondary overflow-hidden bubble-shape bubble-secondary-shape" min-height="180">
    <v-card-text>
    <v-row no-gutters>
      <v-col cols="9">
        <div class="d-flex align-start mb-6">
          <v-btn color="darksecondary" icon rounded="md" variant="flat">
            <UsersIcon stroke-width="1.5" width="25" />
          </v-btn>
        </div>
        <h4 class="text-h4 font-weight-medium">
          {{ data?.USER + data?.ADMIN }}
        </h4>

        <span class="text-subtitle-1 opacity-70 font-weight-medium text-white">用户总数</span>
      </v-col>

      <v-col cols="3" style="z-index: 999" align-self="end">
        <div>
          <v-chip class="mb-2" size="small">
            <template #prepend>
              <UserHeartIcon size="16" class="mr-2"></UserHeartIcon>
            </template>
            <span>用户： {{ data?.USER}}</span>

          </v-chip>
        </div>

        <div>
          <v-chip size="small">
            <template #prepend>
              <UserCogIcon size="16" class="mr-2"></UserCogIcon>
            </template>
            <span>管理： {{ data?.ADMIN}}</span>
          </v-chip>
        </div>
      </v-col>
    </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
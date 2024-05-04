<script setup lang="ts">

import TotalRequest from "@/view/dashboards/components/TotalRequest.vue";
import TotalToken from "@/view/dashboards/components/TotalToken.vue";
import TotalUser from "@/view/dashboards/components/TotalUser.vue";
import TotalModelUsage from "@/view/dashboards/components/TotalModelUsage.vue";
</script>

<template>
  <v-row>
    <v-col cols="12" md="4">
      <TotalRequest></TotalRequest>
    </v-col>
    <v-col cols="12" md="4">
      <TotalToken></TotalToken>
    </v-col>
    <v-col cols="12" md="4">
      <TotalUser></TotalUser>
    </v-col>
    <v-col cols="12" lg="8">
      <TotalModelUsage></TotalModelUsage>
    </v-col>
  </v-row>
</template>

<style scoped>

</style>
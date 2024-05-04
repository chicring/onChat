<script setup lang="ts">

</script>

<template>
  <v-card flat rounded="xl" class="mb-4">
    <v-card-title>
      <h3>渠道</h3>
    </v-card-title>

    <v-card-subtitle>
      优先级：<br>
      1. 优先级越大，越优先使用
      2. 相同优先级下：创建时间越早，越优先使用 <br>
      代理：<br>
      1. 必须在启动应用的时候设置代理才能启用
    </v-card-subtitle>

    <v-card-actions class="justify-end">
      <AddchannelDialog @created="refresh()"></AddchannelDialog>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
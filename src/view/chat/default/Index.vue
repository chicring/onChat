<script setup lang="ts">

import Message from "@/view/chat/default/components/Message.vue";

const messages = [
  {
    id: "1",
    date: "2021-09-01",
    role: "user",
    content: "Hello",
    token: "123456",
  },
  {
    id: "1",
    date: "2021-09-01",
    role: "user",
    content: "Hello",
    token: "123456",
  },
  {
    id: "1",
    date: "2021-09-01",
    role: "user",
    content: "Hello",
    token: "123456",
  }
]
</script>

<template>
  <div class="d-flex flex-column" style="height: calc(100vh - 105px);">
    <v-list>
      <v-list-item v-for="message in messages" :key="message.id">
        <Message :message="message"></Message>
      </v-list-item>
    </v-list>
  </div>
</template>

<style scoped>

</style>
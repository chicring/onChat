<script setup lang="ts">
import {onMounted, ref} from "vue";
import {findAllChannel} from "../../api/methods/channel";
import { ChannelConfig } from "./components/channelItem.ts";
import ChannelItem from "@/view/channel/components/ChannelItem.vue";

const channels = ref([] as ChannelConfig[])
onMounted(async () => {
  channels.value = await findAllChannel();
})
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

<!--    <v-card-actions class="justify-end">-->
<!--      <AddchannelDialog @created="refresh()"></AddchannelDialog>-->
<!--    </v-card-actions>-->
  </v-card>


  <v-card>
    <v-card-text>
      <template v-for="item in channels">
        <ChannelItem :channel="item" />
      </template>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
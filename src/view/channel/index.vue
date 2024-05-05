<script setup lang="ts">
import {computed, onMounted, ref} from "vue";
import {findAllChannel} from "@/api/methods/channel.ts";
import { ChannelConfig } from "./components/channelItem.ts";
import ChannelItem from "@/view/channel/components/ChannelItem.vue";
import {Channel_name} from "@/view/channel/Channel.ts";
import AddchannelDialog from "@/view/channel/components/AddchannelDialog.vue";

const channels = ref([] as ChannelConfig[])


const channelsGroupedByType = computed(() => {
  const groups: Record<string, ChannelConfig[]> = {};
  channels.value.forEach((channel) => {
    const { type } = channel;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(channel);
  });
  return groups;
});
const getIconAndNameByType = (type :string) => {
  const channel = Channel_name.find(channel => channel.type === type);
  return channel ? [channel.iconComponents, channel.name] : [null, ''];
};


const refresh = async () => {
  await findAllChannel().then((res) => {
    channels.value = res;
  });
}

const deleteItem = (channelId : number) => {
  channels.value = channels.value.filter((item) => item.id !== channelId);
}

onMounted(async () => {
  await findAllChannel().then((res) => {
    channels.value = res;
  });
});
</script>

<template>
  <v-card flat rounded="xl" class="mb-4">
    <v-card-title>
      <h3>渠道</h3>
    </v-card-title>

    <v-card-text>
      <v-card-subtitle>
        优先级：<br>
        1. 优先级越大，越优先使用
        2. 相同优先级下：创建时间越早，越优先使用 <br>
        代理：<br>
        1. 必须在启动应用的时候设置代理才能启用
      </v-card-subtitle>
    </v-card-text>


    <v-card-actions class="justify-end">
      <AddchannelDialog @created="refresh()"></AddchannelDialog>
    </v-card-actions>
  </v-card>


  <v-expansion-panels variant="inset" class="pa-3" flat>

        <v-expansion-panel
            v-for="(group, type) in channelsGroupedByType"
            :key="type"
            rounded="md"
        >
          <v-expansion-panel-title>
            <div class="d-flex align-center">
              <component :is="getIconAndNameByType(type)[0]"  />
              <strong class="ml-1">
                {{ getIconAndNameByType(type)[1] }}
              </strong>
            </div>
          </v-expansion-panel-title>
          <v-expansion-panel-text>
            <v-list>
              <v-list-item
                  v-for="item in group"
                  :key="item.id"
              >
                <ChannelItem :channel="item" @deleted="deleteItem($event)" />
              </v-list-item>
            </v-list>
          </v-expansion-panel-text>
        </v-expansion-panel>
  </v-expansion-panels>

</template>

<style scoped>
/* 你的样式代码 */
</style>
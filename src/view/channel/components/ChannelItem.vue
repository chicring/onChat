<script setup lang="ts">
import items from "@/view/channel/components/channelItem.ts";
import Models from "@/view/channel/models.ts";
import { ChannelConfig } from "channelItem.ts";
import {onMounted, ref} from "vue";

const props = defineProps<{
  channel: ChannelConfig;
  // updateItem: (channelId: number) => void;
  // deleteItem: (channelId: number) => void;
}>();

onMounted(() => {
  props.channel.models =  Object.keys(props.channel.models).map(key => {
    return { title: key, value: props.channel.models[key] };
  });
})
</script>

<template>
  <v-card class="ma-2">
    <v-card-title>{{props.channel.name}}</v-card-title>
    <v-divider></v-divider>
    <v-card-text>
      <v-row no-gutters>
        <template v-for="(item, index) in items" :key="index">
          <v-col cols="12" sm="4">
            <v-list-subheader class="text-medium-emphasis">
              <strong>{{ item.label }}</strong>
            </v-list-subheader>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-text-field v-if="item.type === 'text'" v-model="channel.baseUrl" color="primary" bg-color="containerBg" variant="outlined">

            </v-text-field>
            <v-text-field v-else-if="item.type === 'password'" v-model="channel.apiKey" color="primary" bg-color="containerBg" variant="outlined">

            </v-text-field>
            <v-text-field v-else-if="item.type === 'number'" v-model="channel.priority" color="primary" bg-color="containerBg" variant="outlined" type="number">

            </v-text-field>
            <v-select v-else-if="item.type === 'select'" :items="Models" v-model="channel.models" variant="outlined" multiple clearable>
                <template #item="data">
                  <v-list-subheader v-if="data.props.header">
                    {{ data.props.header }}
                  </v-list-subheader>
                  <v-divider v-else-if="data.props.divider" />
                  <v-list-item v-else v-bind="data.props">
                  </v-list-item>
                </template>
                <template v-slot:selection="{ item }">
                  <v-chip rounded="lg">
                    <span>{{ item.title }}</span>
                  </v-chip>
                </template>
            </v-select>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
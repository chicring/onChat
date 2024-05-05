<script setup lang="ts">
import {items ,ChannelConfig} from "@/view/channel/components/channelItem.ts";
import Models from "@/view/channel/models.ts";
import {onMounted, Ref, ref} from "vue";
import {formatDate} from "@/util/formatDate.ts";
import ConfirmButton from "@/components/ConfirmButton.vue";
import {deleteChannel, updateChannel} from "@/api/methods/channel.ts";
import {successToast} from "@/util/ToastMessage.ts";

const props = defineProps<{
  channel: ChannelConfig;
  // updateItem: (channelId: number) => void;
  // deleteItem: (channelId: number) => void;
}>();

const channel : Ref<ChannelConfig> = ref(props.channel);
const selectModels = ref([] as string[])
const modelText = ref('')

const emit = defineEmits(['deleted']);


function addModel(){
  if (!modelText.value.trim()) return;
  selectModels.value.push(modelText.value);
  modelText.value = '';
}

async function updateItem(){

  await updateChannel({
    id: channel.value.id,
    name: channel.value.name,
    type: channel.value.type,
    models: selectModels.value.join(","),
    baseUrl: channel.value.baseUrl,
    apiKey: channel.value.apiKey,
    priority: channel.value.priority,
    enableProxy: channel.value.enableProxy,
    createdAt: channel.value.createdAt
  }).then(() => {
    successToast('提交成功')
  })
}

async function deleteItem(){
  await deleteChannel(channel.value.id).then(() => {
    successToast('删除成功')
    emit('deleted', channel.value.id);
  })
}


onMounted(() => {
  selectModels.value = channel.value.models.split(",")
})
</script>

<template>
  <v-card flat>
    <v-toolbar rounded="md" color="lightprimary">
      <v-toolbar-title>
        {{ channel.name }}
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>
    <v-card-text>
      <v-row dense>
        <template v-for="(item, index) in items" :key="index">
          <v-col cols="12" sm="4">
            <v-list-subheader class="text-medium-emphasis">
              <strong>{{ item.label }}</strong>
            </v-list-subheader>
            <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col cols="12" sm="6">
            <v-text-field v-if="item.type === 'text'" v-model="channel[item.model]" color="primary" bg-color="containerBg" variant="outlined">

            </v-text-field>
            <v-text-field v-else-if="item.type === 'password'" v-model="channel[item.model]" color="primary" bg-color="containerBg" variant="outlined">

            </v-text-field>
            <v-text-field v-else-if="item.type === 'number'" v-model="channel[item.model]" color="primary" bg-color="containerBg" variant="outlined" type="number">

            </v-text-field>

            <div v-else-if="item.type === 'switch'" class="justify-end d-flex">
              <v-switch
                  v-model="channel[item.model]"
                  inset
                  hide-details
                  color="primary"
                  base-color="borderLight"
                  density="comfortable"
              >
                <template #track-true>
                  <CheckIcon class="mt-1" size="18"></CheckIcon>
                </template>
                <template #track-false>
                  <MinusIcon class="mt-1" size="18"></MinusIcon>
                </template>
              </v-switch>
            </div>

            <v-select v-else-if="item.type === 'select'"
                      :items="Models"
                      v-model="selectModels"
                      variant="outlined"
                      multiple
                      color="primary"
                      bg-color="containerBg"
                      chips
                      closable-chips
                      clearable
                      item-value="value"
                      hide-details
            >
<!--              <template #item="data">-->
<!--                <v-list-subheader v-if="data.props.header">-->
<!--                  {{ data.props.header }}-->
<!--                </v-list-subheader>-->
<!--                <v-divider v-else-if="data.props.divider" />-->
<!--                <v-list-item v-else v-bind="data.props">-->
<!--                </v-list-item>-->
<!--              </template>-->

              <template #prepend-item>
                <v-text-field
                    class="pa-2"
                    variant="outlined"
                    label="添加模型"
                    color="primary"
                    hide-details
                    bg-color="containerBg"
                    v-model="modelText"
                >
                  <template #append>
                    <v-btn color="primary" icon="true" variant="text" @click="addModel">
                      <TablePlusIcon></TablePlusIcon>
                    </v-btn>
                  </template>
                </v-text-field>
                <v-divider></v-divider>
              </template>
            </v-select>
          </v-col>
        </template>
      </v-row>
    </v-card-text>
    <v-card-actions class="justify-space-between px-4">
      <div class="opacity-50">
        创建时间：
        <span>{{formatDate(channel.createdAt)}}</span>

      </div>

      <div>
        <ConfirmButton color="error" title="删除提示" content="确定要删除该渠道吗？" @confirm="deleteItem">删除</ConfirmButton>

        <v-btn text="提交" color="primary" variant="flat" rounded="md" @click="updateItem"></v-btn>
      </div>
    </v-card-actions>
  </v-card>
</template>

<style scoped>

</style>
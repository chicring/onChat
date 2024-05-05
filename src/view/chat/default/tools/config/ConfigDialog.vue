<script setup lang="ts">
import {onMounted, Ref, ref, shallowRef} from 'vue'
import {Session, useSessionStore} from "@/store/session.ts";
import ConfirmButton from "@/components/ConfirmButton.vue";
import {useSettingStore} from "@/store/setting.ts";
import {storeToRefs} from "pinia";

const sessionStore = useSessionStore();
const currentSession: Ref<Session | undefined > = ref()

const settingStore = useSettingStore();
const {setting} = storeToRefs(settingStore);

interface Props {
  sessionId?: string;
}
const props = defineProps<Props>()
const dialog = shallowRef(false)

const modelText = ref('')

function addModel(){
  if (!modelText.value.trim()) return;
  setting.value.models.push(modelText.value);
  modelText.value = '';
}

function deletemodel(text){
  console.log(text)
  setting.value.models = setting.value.models.filter((model) => model !== text);
}

onMounted( async () => {
  if (props.sessionId) {
    await sessionStore.findSessionById(props.sessionId)
        .then((newValue) =>{
          currentSession.value = newValue;
        });
  }
})

const configItems = ref([
  {
    label: '随机性 Temperature',
    subtitle: '0-1之间的值',
    placeholder: '0.6',
    model: 'temperature',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    type: 'slider'
  },
  {
    label: '核采样 top_p',
    subtitle: '0-1之间的值，0.5是一个不错的默认值，部分模型不能设置为1',
    placeholder: '0.5',
    model: 'top_p',
    min: 0,
    max: 1,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '最大回复长度',
    subtitle: '最大回复长度',
    placeholder: '最大回复长度',
    model: 'max_tokens',
    labelCols: '10',
    inputCols: '2',
    icon: '',
    type: 'text'
  },
  {
    label: '话题新鲜度 presence_penalty',
    subtitle: '值越高，模型越倾向于生成新的话题',
    placeholder: '0.6',
    model: 'presence_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '频率惩罚度 frequency_penalty',
    subtitle: '值越高，模型越倾向于避免重复',
    placeholder: '1.0',
    model: 'frequency_penalty',
    min: -2,
    max: 2,
    step: 0.1,
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'
  },
  {
    label: '附带历史信息 max_history',
    subtitle: '附带历史信息数量',
    placeholder: '4',
    min: 1,
    max: 10,
    step: 1,
    model: 'max_history',
    labelCols: '8',
    inputCols: '4',
    icon: '',
    type: 'slider'

  }
])
</script>

<template>
  <v-dialog
      v-model="dialog"
      max-width="600"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
          v-bind="activatorProps"
          size="small"
          icon
          variant="text"
          class="opacity-70"
      >
        <Settings2Icon></Settings2Icon>
      </v-btn>
    </template>

    <v-card rounded="md">
      <v-card-title>当前会话设置</v-card-title>
      <v-card-text>
        <v-row no-gutters justify="space-between">
          <v-col>
            <v-list-subheader class="text-medium-emphasis">
              <strong>模型(Model)</strong>
            </v-list-subheader>
            <v-list-item-subtitle>选择使用的默认模型</v-list-item-subtitle>
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-select variant="outlined" :items="setting.models" density="comfortable" v-model="currentSession.config.model">

              <template #item="data">
                <v-list-item v-bind="data.props" nav >
                  <template #append>
                    <v-btn flat
                           icon="true"
                           size="small"
                           variant="text"
                           @click.stop.prevent="deleteModel(data.props.title)"
                    >
                      <TrashIcon></TrashIcon>
                    </v-btn>
                  </template>
                </v-list-item>
              </template>

              <template #append-item>
                <v-text-field
                    class="pa-2"
                    variant="outlined"
                    label="添加模型"
                    color="primary"
                    hide-details
                    v-model="modelText"
                >

                  <template #append>
                    <v-btn color="primary" icon="true" variant="text" @click="addModel">
                      <TablePlusIcon></TablePlusIcon>
                    </v-btn>
                  </template>
                </v-text-field>
              </template>
            </v-select>
          </v-col>
        </v-row>
        <v-row no-gutters>
          <template v-for="(item, index) in configItems" :key="index">
            <v-col :cols="item.labelCols">
              <v-list-subheader class="text-medium-emphasis">
                <strong>{{ item.label }}</strong>
              </v-list-subheader>
              <v-list-item-subtitle>{{ item.subtitle }}</v-list-item-subtitle>
            </v-col>

            <v-col :cols="item.inputCols">
              <v-text-field
                  v-if="item.type === 'text'"
                  :placeholder="item.placeholder"
                  v-model="currentSession.config[item.model]"
                  rounded="lg"
                  variant="outlined"
                  density="comfortable"
                  type="number"
                  :append-inner-icon="item.icon"
                  :type="item.type"
                  @click:append-inner="toggleVisibility(index)"
              >
              </v-text-field>
              <v-slider
                  v-else
                  v-model="setting.config[item.model]"
                  :max="item.max"
                  :min="item.min"
                  :step="item.step"
                  thumb-label
                  hide-details
              >
                <template v-slot:append>
                  <v-text-field
                      v-model="setting.config[item.model]"
                      density="compact"
                      style="width: 70px"
                      type="number"
                      hide-details
                      single-line
                      rounded="lg"
                      variant="outlined"
                  ></v-text-field>
                </template>
              </v-slider>
            </v-col>

          </template>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style scoped>

</style>
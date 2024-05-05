<script setup lang="ts">

import {ref} from "vue";
import {Channel_name} from '../Channel.ts'
import Models from "@/view/channel/models.ts";
import {addChannel} from "@/api/methods/channel";
import {successToast} from "@/util/ToastMessage.ts";

const channels = ref(Channel_name)

const newChannel = ref({
  name: '',
  type: 'openai',
  baseUrl: '',
  models: '',
  apiKey: '',
  priority: 0,
  enableProxy: false
})

const selectedModels = ref([])
const emit = defineEmits(['created']);

function submit() {
  newChannel.value.models = selectedModels.value.join(",");

  addChannel(newChannel.value).then(() => {
    emit('created')
    successToast('添加成功')
  }).finally(
    () => {
      selectedModels.value = [];
    }
  )
}
</script>

<template>
  <div class="text-center">

    <v-btn-group
      color="primary"
      density="comfortable"
      rounded="pill"
      divided
    >
      <v-btn
        class="pe-2"
        prepend-icon="mdi-account-multiple-outline"
        variant="flat"
      >
        <div class="text-none font-weight-regular">
          添加渠道
        </div>

        <v-dialog activator="parent" max-width="600">
          <template v-slot:default="{ isActive }">
            <v-card rounded="lg">
              <v-card-title class="d-flex justify-space-between align-center">
                <div class="text-h5 text-medium-emphasis ps-2">
                  添加渠道
                </div>

                <v-btn
                  icon="mdi-close"
                  variant="text"
                  @click="isActive.value = false"
                ></v-btn>

              </v-card-title>

              <v-divider class="mb-4"></v-divider>

              <v-card-text>
                <v-select
                  v-model="newChannel.type"
                  clearable
                  label="渠道类型"
                  color="primary"
                  :items="channels"
                  item-title="name"
                  item-value="type"
                  variant="outlined"
                  hide-details
                  rounded="lg"
                  class="mb-4"
                >

                  <template #item="data">

                    <v-list-item v-bind="data.props">
                      <template v-slot:title>
                        <strong v-bind="data.props">{{data.item.title}}</strong>
                      </template>

                      <template v-slot:append>
                        <component  :is="data.item.raw.iconComponents"></component>
                      </template>
                    </v-list-item>
                  </template>

<!--                  <template #item="data">-->
<!--                    <v-list-item v-bind="data.props">-->
<!--                      -->
<!--                    </v-list-item>-->
<!--                  </template>-->
                </v-select>

                <v-text-field
                  label="渠道名称"
                  hide-details
                  variant="outlined"
                  color="primary"
                  rounded="lg"
                  class="mb-4"
                  v-model="newChannel.name"
                >
                </v-text-field>

                <v-text-field
                  label="渠道站点地址"
                  hide-details
                  variant="outlined"
                  rounded="lg"
                  color="primary"
                  class="mb-4"
                  v-model="newChannel.baseUrl"
                >
                </v-text-field>


                <v-select
                          v-model="selectedModels"
                          :items="Models"
                          clearable
                          chips
                          label="添加模型"
                          variant="outlined"
                          hide-details
                          color="primary"
                          class="mb-4"
                          multiple
                >
<!--                  <template #item="data">-->
<!--                    <v-list-subheader v-if="data.props.header">-->
<!--                      {{ data.props.header }}-->
<!--                    </v-list-subheader>-->
<!--                    <v-divider v-else-if="data.props.divider" />-->
<!--                    <v-list-item v-else v-bind="data.props">-->
<!--&lt;!&ndash;                      <v-list-item-subtitle>&ndash;&gt;-->
<!--&lt;!&ndash;                        {{ data.item.title }}&ndash;&gt;-->
<!--&lt;!&ndash;                      </v-list-item-subtitle>&ndash;&gt;-->
<!--                    </v-list-item>-->
<!--                  </template>-->
                </v-select>

                <v-text-field
                  label="密钥"
                  hide-details
                  color="primary"
                  rounded="lg"
                  class="mb-4"
                  variant="outlined"
                  v-model="newChannel.apiKey"
                >
                </v-text-field>
                <v-text-field
                  label="优先级"
                  hide-details
                  color="primary"
                  rounded="lg"
                  variant="outlined"
                  v-model="newChannel.priority"
                >
                </v-text-field>

                <v-checkbox label="启用代理" color="primary" v-model="newChannel.enableProxy"></v-checkbox>


              </v-card-text>

              <v-divider class="mt-2"></v-divider>

              <v-card-actions class="my-2 d-flex justify-end">
                <v-btn
                  class="text-none"
                  rounded="xl"
                  text="取消"
                  @click="isActive.value = false"
                ></v-btn>

                <v-btn
                  class="text-none"
                  color="primary"
                  rounded="xl"
                  text="提交"
                  variant="flat"
                  @click="submit();isActive.value = false"
                ></v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-dialog>
      </v-btn>

<!--      <v-btn-->
<!--        size="small"-->
<!--        icon-->
<!--      >-->
<!--        <v-icon icon="mdi-menu-down"></v-icon>-->

<!--        <v-menu-->
<!--          activator="parent"-->
<!--          location="bottom end"-->
<!--          transition="fade-transition"-->
<!--        >-->
<!--          <v-list-->
<!--            density="compact"-->
<!--            min-width="250"-->
<!--            rounded="lg"-->
<!--            slim-->
<!--          >-->
<!--            <v-list-item-->
<!--              prepend-icon="mdi-link"-->
<!--              title="Copy link"-->
<!--              link-->
<!--            ></v-list-item>-->

<!--            <v-divider class="my-2"></v-divider>-->

<!--            <v-list-item min-height="24">-->
<!--              <template v-slot:subtitle>-->
<!--                <div class="text-caption">-->
<!--                  Shared with John + 1 more-->
<!--                </div>-->
<!--              </template>-->
<!--            </v-list-item>-->
<!--          </v-list>-->
<!--        </v-menu>-->
<!--      </v-btn>-->
    </v-btn-group>
  </div>
</template>

<style scoped>

</style>

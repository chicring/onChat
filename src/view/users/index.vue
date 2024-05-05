<script setup lang="ts">

import {ref} from "vue";
import {deleteChannelPermission, getChannelPermission} from "../../api/methods/permission";
import AddPermission from "./AddPermission.vue";
import headers from "@/view/users/headers.ts";
import {successToast} from "@/util/ToastMessage.ts";
import ConfirmButton from "@/components/ConfirmButton.vue";



const loading = ref(false)
const data = ref({
  total: 0,
  pageSize: 10,
  currentPage: 1,
  list: []
})

const search = ref({
  page: 1,
  size: 10,
  search: null,
})

async function getLogs() {
  data.value = await getChannelPermission( search.value )
}

async function loadItems({ page, itemsPerPage }) {
  search.value.page = page
  search.value.size = itemsPerPage
  await getLogs()
}

function deleteItem(id : number){
  deleteChannelPermission(id)
      .then(() => {
        successToast('删除成功')
        getLogs()
      })
  console.log(id)
}

</script>

<template>
    <v-card rounded="xl" flat>
      <v-card-title><h3>用户权限</h3></v-card-title>
      <v-card-subtitle>管理用户可使用的渠道</v-card-subtitle>
      <v-card-actions class="justify-end">
      </v-card-actions>
    </v-card>

    <v-row class="mt-4">
      <v-col cols="4">
        <v-text-field
            v-model="search.search"
            density="compact"
            label="Search"
            prepend-inner-icon="mdi-magnify"
            variant="solo"
            rounded="md"
            flat
            hide-details
            single-line
        >
        </v-text-field>
      </v-col>

      <v-spacer></v-spacer>

      <v-col cols="1">
        <AddPermission></AddPermission>
      </v-col>
    </v-row>

    <v-data-table-server
        color="primary"
        hover
        v-model:items-per-page="data.pageSize"
        :headers="headers"
        :items="data.list"
        :loading="loading"
        :items-per-page-options= "[5, 10, 15, 20]"
        :items-length="data.total"
        :search="search.search"
        class="mt-4 rounded-xl"
        items-per-page-text="每页:"
        @update:options="loadItems"
    >
      <template #item.channelType="{ value }">
        <v-chip rounded="lg" size="small" color="primary"  class="font-weight-medium" >
          {{ value }}
        </v-chip>
      </template>

      <template #item.action="{ item }">
        <ConfirmButton @confirm="deleteItem(item.id)" flat icon>
          <TrashIcon></TrashIcon>
        </ConfirmButton >
      </template>
    </v-data-table-server>
</template>

<style scoped>

</style>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import {getUsageToken} from "@/api/methods/overview";

const Usage = ref([])
const UsageYesterday = ref([])

let start = Math.floor(new Date().setHours(0, 0, 0, 0) / 1000)
let end = Math.floor(Date.now() / 1000)

let change = ref({
  value: '',
  color: '#2fc584'
})

onMounted(async () => {
  Usage.value = await getUsageToken(start, end)
  UsageYesterday.value = await getUsageToken(start - 86400, start)

  if (UsageYesterday.value?.total_tokens !== 0) {
    let percentageChange = ((Usage.value?.total_tokens - UsageYesterday.value?.total_tokens) / UsageYesterday.value.total_tokens) * 100
    change.value.value = percentageChange.toFixed(2) + '%'
    change.value.color = percentageChange < 0 ? '#2fc584' : '#da5656'
  } else {
    change.value.value = '0%'
  }
})
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape-sm bubble-primary mb-5" min-height="80">
    <v-card-text class="pa-2">
      <div class="d-flex align-center ga-4">
        <v-btn color="darkprimary" icon rounded="md" variant="flat">
          <CalendarBoltIcon stroke-width="1.5" width="25" />
        </v-btn>
        <div>
          <h6 class="text-h6 font-weight-medium">
            {{Usage?.total_tokens}}

            <v-chip
                :color="change.color"
                :prepend-icon="`mdi-arrow-${change.value.startsWith('-') ? 'down' : 'up'}`"
                size="small"
                label
                variant="tonal"
                rounded="md"
            >
              <template v-slot:prepend>
                <v-icon size="10"></v-icon>
              </template>

              <span class="text-caption">{{ change.value }}</span>
            </v-chip>

          </h6>
          <span class="text-subtitle-2 opacity-70 text-white">今日token</span>
        </div>
      </div>
    </v-card-text>
  </v-card>

  <v-card elevation="0" class="bubble-shape-sm overflow-hidden bubble-warning" height="80">
    <v-card-text class="pa-2">
      <div class="d-flex align-center ga-4">
        <v-btn color="lightwarning" icon rounded="md" variant="flat">
          <BrandDaysCounterIcon stroke-width="1.5" width="25" class="text-warning" />
        </v-btn>
        <div>
          <h6 class="text-h6 font-weight-medium">{{UsageYesterday?.total_tokens}}</h6>
          <span class="text-subtitle-2 text-disabled font-weight-medium">昨日Token</span>
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>

<style scoped>

</style>
<script setup lang="ts">
import {ref, computed, onMounted} from 'vue';

import {getRequestCount} from "@/api/methods/overview.ts";


const minValue = ref(0);
const maxValue = ref(100);
const dates = ref([]);
const options = computed(() => {
  return {
    chart: {
      type: 'line',
      height: 140,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      sparkline: {
        enabled: true
      },
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#fff'],
    fill: {
      type: 'solid',
      opacity: 1
    },
    stroke: {
      curve: 'smooth',
      width: 3
    },
    yaxis: {
      min: minValue.value,
      max: maxValue.value,
      show: false
    },
    tooltip: {
      theme: 'dark',
      fixed: {
        enabled: false
      },
      x: {
        formatter: function (val, { series, seriesIndex, dataPointIndex, w }) {
          return dates.value[dataPointIndex]
        }
      },
      y: {
        formatter: function (val) {
          return val + ` 次`;
        },
        title: {
          formatter: function (seriesName) {
            return '';
          }
        }
      },
      marker: {
        show: false
      }
    }
  }
})

const series = ref([
  {
    name: 'series',
    data: []
  }
])

function fetchData() {
  getRequestCount().then(res => {
    const data = res.list;
    dates.value = data.map((item : any) => item.date);
    series.value[0].data = data.map((item : any) => item.count);
    // const minDate = dates[0];
    // const maxDate = dates[dates.length - 1];

    minValue.value = Math.min(...series.value[0].data);
    maxValue.value = Math.max(...series.value[0].data);

  })
}

onMounted(() => {
  fetchData()
})
</script>

<template>
  <v-card elevation="0" class="bg-primary overflow-hidden bubble-shape bubble-primary-shape" min-height="180">
    <v-card-text>
      <v-row no-gutters>
        <v-col cols="4" align-self="end">
          <h2 class="text-h4 font-weight-bold font-weight-medium">
            {{series[0].data[series[0].data.length - 1]}}
          </h2>
          <p class="text-white opacity-80 text-subtitle-1 ">今日请求量</p>
          <span ></span>
        </v-col>
        <v-col cols="8" style="z-index: 999" align-self="end">
          <apexchart  type="line" :options="options" :series="series"> </apexchart>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>
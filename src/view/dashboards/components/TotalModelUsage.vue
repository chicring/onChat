<script setup lang="ts">

import {computed, onMounted, ref} from "vue";
import {getModelUsageStats} from "@/api/methods/overview";

interface UsageData {
  [key: string]: number;
}

interface DataItem {
  usages: UsageData;
  date: string;
}

const rawData = ref<DataItem[]>([]);
const select = ref({state: '近七天'});

const chartData = ref({
  series: [] as { name: string; data: number[] }[],
  xaxisCategories: [] as string[],
});

const processData = () => {
  const seriesMap: { [key: string]: number[] } = {};
  const categories: string[] = [];

  // 初始化categories数组
  rawData.value.forEach((item) => {
    categories.push(item.date);
  });

  // 初始化seriesMap，为每个可能的键创建一个与categories长度相同的数组，初始值为0
  rawData.value.forEach((item) => {
    Object.keys(item.usages).forEach((key) => {
      if (!seriesMap[key]) {
        seriesMap[key] = Array(categories.length).fill(0);
      }
    });
  });

  // 填充seriesMap的数据
  rawData.value.forEach((item, index) => {
    Object.entries(item.usages).forEach(([key, value]) => {
      seriesMap[key][index] = value;
    });
  });

  chartData.value.series = Object.entries(seriesMap).map(([name, data]) => ({
    name,
    data,
  }));
  chartData.value.xaxisCategories = categories;
};

const chartOptions1 = computed(() => {
  return {
    chart: {
      type: 'bar',
      height: 480,
      fontFamily: `inherit`,
      foreColor: '#a1aab2',
      stacked: true
    },
    colors: ['#1e88e5', '#eef2f6','#5e35b1', '#ede7f6','#ede7f6','#b9f6ca','#f9d8d8','#fff8e1','#90caf9'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: 'bottom',
            offsetX: -10,
            offsetY: 0
          }
        }
      }
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '50%'
      }
    },
    xaxis: {
      type: 'category',
      categories: chartData.value.xaxisCategories,
    },
    legend: {
      show: true,
      fontFamily: `'Roboto', sans-serif`,
      position: 'bottom',
      offsetX: 20,
      labels: {
        useSeriesColors: false
      },
      markers: {
        width: 16,
        height: 16,
        radius: 5
      },
      itemMargin: {
        horizontal: 15,
        vertical: 8
      }
    },
    fill: {
      type: 'solid'
    },
    dataLabels: {
      enabled: false
    },
    grid: {
      show: true
    },
    tooltip: {
      theme: 'dark'
    }
  };
});

onMounted(async () => {
  await getModelUsageStats()
      .then((resp) => {
        rawData.value = resp.list;
        processData();
      });
})

</script>

<template>
  <v-card elevation="0">
    <v-card variant="outlined">
      <v-card-text>
        <v-row no-gutters>
          <v-col cols="12" sm="9">
            <span class="text-subtitle-2 opacity-50 font-weight-bold">模型使用情况</span>
          </v-col>
          <v-col cols="12" sm="3">
            <v-select
                color="primary"
                variant="outlined"
                density="compact"
                hide-details
                v-model="select"
                :items="['近七天', '近一个月', '近三个月']"
                item-title="state"
                return-object
            ></v-select>
          </v-col>
        </v-row>
        <div class="mt-4">
          <apexchart type="bar" height="480" :options="chartOptions1" :series="chartData.series"> </apexchart>
        </div>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<style scoped>

</style>
<template>
  <CChart
    type="line"
    :data="data"
    :options="options"
    @get-dataset-at-event="aa"
    @get-element-at-event="aa"
    @get-elements-at-event="aa"
  />
</template>

<script>
import { CChart } from '@coreui/vue-chartjs'
import { getStyle, hexToRgba } from '@coreui/utils/src'

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export default {
  name: 'MainChartExample',
  components: {
    CChart,
  },
  setup() {
    const data = {
      labels: ['5', '10', '15', '20', '25', '30', '35'],
      datasets: [
        {
          label: 'Faults over time (DUMMY DATA)',
          backgroundColor: hexToRgba(getStyle('--cui-info'), 10),
          borderColor: getStyle('--cui-info'),
          pointHoverBackgroundColor: getStyle('--cui-info'),
          borderWidth: 2,
          data: [
            0,
            0,
            1,
            3,
            3,
            3,
            3,
          ],
          fill: true,
        },
      ],
    }

    const options = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
      },
      scales: {
        x: {
          grid: {
            drawOnChartArea: false,
          },
        },
        y: {
          ticks: {
            beginAtZero: true,
            maxTicksLimit: 5,
            stepSize: Math.ceil(10 / 2),
            max: 10,
          },
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    }

    return {
      data,
      options,
    }
  },
  methods: {
    aa(value, value2) {
      console.log(value)
      console.log(value2)
    },
  },
}
</script>

<template>
  <div>
    <canvas ref="chartCanvas" height="150vh"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  LineController,
  BarController,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend
);

export default {
  data() {
    this.myChart = null;
    return {
      testData: [],
      testOptions: [],
      crashed: false,
    };
  },
  props: {
    liveMultiplierD: {
      type: String,
      required: true,
    },
    liveMultiplierSwitchB: {
      type: Boolean,
      required: true,
    },
    xValues: {
      type: Array,
      required: true,
    },
    yValues: {
      type: Array,
      required: true,
    },
    gamePhaseTimeElapsedT: {
      type: Number,
      required: true,
    },
  },
  mounted() {
    this.renderChart();
    // this.addData();
  },
  methods: {
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext("2d");

      const chartData = {
        // labels: this.liveMultiplierSwitchB ? [...this.xValues] : [],
        labels: [],
        datasets: [
          {
            // data: this.liveMultiplierSwitchB ? [...this.yValues] : [],
            data: [],
            backgroundColor: "rgba(75,192,192,0.2)",
            borderColor: "rgba(75,192,192,1)",
            color: "rgba(255, 255, 255,1)",
            pointRadius: 0,
            borderDash: [35, 5],
            lineTension: 0.1,
          },
        ],
      };

      const chartOptions = {
        events: [],
        maintainAspectRatio: false,
        elements: {
          line: {
            tension: 0.1,
          },
        },
        scales: {
          y: {
            type: "linear",
            title: {
              display: false,
              text: "value",
            },
            min: 1,
            // max: this.liveMultiplierD > 2 ? this.liveMultiplierD : 2,
            ticks: {
              color: "rgba(255, 255, 255, 1)",

              maxTicksLimit: 5,
              callback: function (value) {
                if (value % 0.5 == 0) return parseFloat(value).toFixed(2);
              },
            },
            grid: {
              display: false,
              color: "white",
            },
            gridLines: {
              display: false,
              color: "white",
            },
          },
          x: {
            type: "linear",
            title: {
              display: false,
              text: "value",
            },
            gridLines: {
              display: false,
              color: "white",
            },
            // min:2,
            // min :this.gamePhaseTimeElapsedT > 2 ? this.gamePhaseTimeElapsedT : 2,
            // max:
            // this.gamePhaseTimeElapsedT > 2 ? this.gamePhaseTimeElapsedT : 2,
            ticks: {
              color: "rgba(255, 255, 255,1)",

              maxTicksLimit: 5,
              callback: function (value) {
                if (this.gamePhaseTimeElapsedT < 10) {
                  if (value % 1 == 0) return value;
                } else {
                  if (value % 10 == 0) return value;
                }
              },
            },
            grid: {
              // display: true,
              color: "white",
              display: false, // Remove horizontal grid lines
              drawBorder: true,
            },
          },
        },
        plugins: {
          legend: { display: false },
        },
        animation: {
          x: {
            type: "number",
            easing: "linear",
            duration: 0,
            from: 5,
            delay: 0,
          },
          y: {
            type: "number",
            easing: "linear",
            duration: 0,
            from: 5,
            delay: 0,
          },
          loop: true,
        },
      };
      this.myChart = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: chartOptions,
      });
      setInterval(() => {
        this.myChart.data.labels = [...this.xValues];
        this.myChart.data.datasets[0].data = [...this.yValues];
        this.myChart.update();
      }, 100);
    },
    addData() {
      setInterval(() => {
        this.myChart.data.labels = [...this.xValues];
        this.myChart.data.datasets[0].data = [...this.yValues];
        this.myChart.update();
      }, 5);
    },
  },
  watch: {
    // chartData: {
    //   immediate: true,
    //   deep: true,
    //   handler() {
    //     this.testData = { ...this.chartData };
    //     this.renderChart();
    //   },
    // },
    // chartOptions: {
    //   immediate: true,
    //   deep: true,
    //   handler() {
    //     this.testOptions = { ...this.chartOptions };
    //     this.renderChart();
    //   },
    // },
  },
};
</script>

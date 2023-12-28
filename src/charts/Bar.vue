<template>
  <div ref="chartContainer">
    <canvas ref="chartCanvas" id="myCanvas"></canvas>
  </div>
</template>

<script>
import { defineComponent } from "vue";

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

export default defineComponent({
  name: "BarChart",
  props: {
    nhifdata: {
      type: Number,
      required: true,
    },
    displayData: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    ctx: null,
  }),
  computed: {
    testData() {
      return this.displayData;
    },
  },

  methods: {
    renderGraph() {
      // const ctx = document.getElementById('myCanvas').getContext("2d");
      const ctx = this.ctx || document.getElementById('myCanvas').getContext('2d');
      if (ctx) {
        // canvas.innerHTML = "";

        // const canvas = document.createElement("canvas");
        // canvas.id = "myCanvas";
        // canvas.appendChild(canvas);

        // const ctx = canvas
        console.log(ctx);

        const chartData = {
          labels: [
            "Label 1",
            "Label 2",
            "Label 3",
            "Label 4",
            "Label 5",
            "test",
          ],
          datasets: this.testData,
        };

        const chartOptions = {
          maintainAspectRatio: false,
          legend: {
            display: false,
          },
          responsive: true,
          tooltips: {
            backgroundColor: "#f5f5f5",
            titleFontColor: "#333",
            bodyFontColor: "#666",
            bodySpacing: 4,
            xPadding: 12,
            mode: "nearest",
            intersect: 0,
            position: "nearest",
          },
          scales: {
            yAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.0)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 20,
                  fontColor: "#2380f7",
                },
              },
            ],
            xAxes: [
              {
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: "rgba(29,140,248,0.1)",
                  zeroLineColor: "transparent",
                },
                ticks: {
                  padding: 20,
                  fontColor: "#2380f7",
                },
              },
            ],
          },
        };

        if (this.$data._chart) {
          this.$data._chart.destroy();
        }

        this.$data._chart = new Chart(ctx, {
          type: "bar",
          data: chartData,
          options: chartOptions,
        });
      } else {
        alert("Could not find the container element.");
      }
    },
  },

  mounted() {
    this.renderGraph();
  },

  watch: {
    nhifdata(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.renderGraph();
        // console.log("noma");

        // alert("noma");
      }
    },
  },

});
</script>

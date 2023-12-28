<template>
  <div>
    <v-card
      :class="
        screenSize === 'Large' ? 'mx-auto graph-card' : ' small-graph-card'
      "
      variant="outlined"
    >
      <div>
        <div class="betting-text">
          <h4 class="green-text" v-if="isCounterRunning">
            <span
              :class="
                screenSize === 'Large' ? 'multi-text ' : 'small-multi-text'
              "
              >{{ counter }} x</span
            >
            <!-- <div><v-img src="../../../../launch2.gif" /></div> -->
          </h4>

          <h4 class="text-red" v-if="!isCounterRunning && crashPoint !== 0">
            <span class="multi-text">{{ crashPoint }} x</span>
          </h4>
          <h4 v-if="!isCounterRunning && crashPoint === 0">
            <span class="multi-text mt-6"> {{ defcounter }}.00 x</span>
            <!-- <div><v-img src="../../../../launch2.gif" /></div> -->
          </h4>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import AuthService from "../../auth/views/authService";
import io from "socket.io-client";

export default {
  name: "testPage",

  props: {
    playingSend: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    this.myChart = null;
    return {
      screenSize: "",
      isRunning: false,
      timer: null,
      liveMultiplierSwitch: true,
      crashPoint: 0,
      counter: 0,
      defcounter: 1.0,
      intervalId: null,
      isCounterRunning: false,
    };
  },

  components: {
    // SomeChart,
  },
  computed: {},
  isLoggedIn() {
    return AuthService.check();
  },
  mounted() {
    const socket = io("http://205.209.102.142:3000", {
      transports: ["websocket"],
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
    });

    // if (AuthService.check()) {
    //   const ID = JSON.parse(AuthService.user).user_id;
    //   socket.on(`${ID}_limbo_bet`, (data) => {
    //     console.log(data);
    //     this.crashPoint = data.crash_point;
    //   });
    // }

    socket.on("limbo_top_bets", (data) => {
      this.TopWinningBets = data.topBets;
    });

    this.checkScreenSize();
    window.addEventListener("resize", this.checkScreenSize);
  },
  methods: {
    checkScreenSize() {
      const isSmallScreen = window.matchMedia("(max-width: 767px)").matches;
      this.screenSize = isSmallScreen ? "Small" : "Large";
    },
    updateCounter() {
      this.counter = Math.floor(Math.random() * 20);
    },
    startCounter() {
      if (!this.isCounterRunning) {
        // alert('noma');
        this.isCounterRunning = true;
        this.intervalId = setInterval(this.updateCounter, 1);
        
        // setTimeout(this.stopCounter, 5000);
      }
    },
    stopCounter() {
      clearInterval(this.intervalId);
      this.isCounterRunning = false;
    },
    resetCounter() {
      this.counter = 0;
    },
  },

  watch: {
    playingSend: {
      handler: function () {
        this.playingSend ? this.startCounter() : this.crashPoint !== 0  ? this.stopCounter()    : ''
        // if (this.playingSend) {
        //   this.startCounter();
        // }
      },
    },
  },
};
</script>

<style>
@import url("../style.css");
</style>

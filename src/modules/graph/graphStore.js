import call from "@/service/http";
import constants from "./graphConstants";

const graphModule = {
  namespaced: true,
  state: {
    bets: [],
    allChats: [],
    topBets: [],
    myBets: [],

    alert: {
      status: "",
      message: "",
    },
  },
  mutations: {
    SET_ALERT: (state, payload) => {
      state.alert = payload || {
        status: "",
        message: "",
      };
    },

    MUTATE: (state, payload) => {
      state[payload.state] = payload.value;
    },
  },
  getters: {
    graphGetters: (state) => (val) => state[val],
  },
  actions: {
    sendBet: ({ commit }, data) => {
      call("post", constants.SEND_BET, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            // EventBus.$emit("bet-sent-successfully");
            commit("SET_ALERT", {
              status: "error",
              message: res.data.status_desc,
            });
          } else {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.status_desc,
            });
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    cashOutEarly: ({ commit }) => {
      call("get", constants.AUTO_CASH)
        .then((res) => {
          console.log(res.data);
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    sendMessage: ({ commit }, data) => {
      call("post", constants.SEND_MESSAGE, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            // EventBus.$emit("bet-sent-successfully");
          } else {
            // EventBus.$emit("error");
            // EventBus.$emit("closeDialog");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    getAllChats: ({ commit }) => {
      call("get", constants.GET_CHATS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "allChats", value: res.data.records });
            // EventBus.$emit("bet-sent-successfully");
          } else {
            // EventBus.$emit("error");
            // EventBus.$emit("closeDialog");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    getAllBets: ({ commit }) => {
      call("get", constants.GET_ALL_BETS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "bets", value: res.data.data });
            // EventBus.$emit("bet-sent-successfully");
          } else {
            // EventBus.$emit("error");
            // EventBus.$emit("closeDialog");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    getTopBets: ({ commit }) => {
      call("get", constants.TOP_BETS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "topBets", value: res.data.data });
            // EventBus.$emit("bet-sent-successfully");
          } else {
            // EventBus.$emit("error");
            // EventBus.$emit("closeDialog");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    getMyBets: ({ commit }, data) => {
      call("post", constants.MY_BETS, data)
        // console.log(data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "myBets", value: res.data.data });
          } else {
            // EventBus.$emit("error");
            // EventBus.$emit("closeDialog");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
  },
};

export default graphModule;

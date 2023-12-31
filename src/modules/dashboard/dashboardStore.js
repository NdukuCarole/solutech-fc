import call from "@/service/http";
import constants from "./dashboardConstants";
// import { EventBus } from "@/utils/eventBus";

const dashboardModule = {
  namespaced: true,
  state: {
    allUsers: [],

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
    dashboardGetters: (state) => (val) => state[val],
  },
  actions: {
    getAllUsers: ({ commit }) => {
      call("get", constants.GET_USERS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "allUsers", value: res.data.data });
          } else {
            // EventBus.$emit("error");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    registerUser: ({ commit, dispatch }, data) => {
      call("post", constants.REGISTER, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllUsers");
            commit("SET_ALERT", {
              status: "success",
              message: res.data.status_desc,
            });
          } else {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.status_desc,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    editUser: ({ commit, dispatch }, data) => {
      call("put", `/users/${data.id}`, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllUsers");

            commit("SET_ALERT", {
              status: "success",
              message: res.data.status_desc,
            });
          } else {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.status_desc,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    deleteUser: ({ commit, dispatch }, data) => {
      call("delete", `/delete-users/${data.id}`, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllUsers");

            commit("SET_ALERT", {
              status: "success",
              message: res.data.status_desc,
            });
          } else {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.status_desc,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};

export default dashboardModule;

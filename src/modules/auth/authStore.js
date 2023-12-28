import call from "@/service/http";
import AuthConstants from "./authConstants";
import AuthService from "../auth/views/authService";


const authModule = {
  namespaced: true,
  state: {
    userD: {},
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
    // alert: (state) => state.alert,
    authGetters: (state) => (val) => state[val],
  },
  actions: {
    login: ({ commit }, data) => {
      call("post", AuthConstants.login, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            // console.log(res.data)
            AuthService.login(res.data.access_token, res.data.user);
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

export default authModule;

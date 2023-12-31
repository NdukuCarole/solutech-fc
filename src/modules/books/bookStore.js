import call from "@/service/http";
import constants from "./bookConstants";
import { EventBus } from "@/utils/eventBus";

const bookModule = {
  namespaced: true,
  state: {
    allBooks: [],
    allLoans: [],
    allUsers:[],

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
    bookGetters: (state) => (val) => state[val],
  },
  actions: {
    getAllBooks: ({ commit }) => {
      call("get", constants.GET_BOOKS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "allBooks", value: res.data.data });
          } else {
            // EventBus.$emit("error");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
    addBook: ({ commit, dispatch }, data) => {
      call("post", constants.ADD_BOOK, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllBooks");
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
    editBook: ({ commit, dispatch }, data) => {
      // console.log(payload)
      call("put", `/books-id/${data.field2}`, data.field1)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllBooks");
            commit("SET_ALERT", {
              status: "success",
              message: res.data.message,
            });
          } else {
            commit("SET_ALERT", {
              status: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    
    borrowBook: ({ commit, dispatch }, data) => {
      call("post", constants.BORROW_BOOK, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllBooks");
            EventBus.$emit(
              "openDialog",
              "Something Went Wrong. Please Try again Later"
            );
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
    getAllLoans: ({ commit }) => {
      call("get", constants.GET_LOANS)
        .then((res) => {
          if (res.data.status_code === 1000) {
            commit("MUTATE", { state: "allLoans", value: res.data.data });
          } else {
            // EventBus.$emit("error");
          }
        })
        .catch(() => {
          commit("SET_LOADING", false, { root: true });
          // EventBus.$emit("error");
        });
    },
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
    approveLoan: ({ commit, dispatch }, data) => {
      call("post", constants.APPROVE_LOAN, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllLoans");
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
    declineLoan: ({ commit, dispatch }, data) => {
      call("post", constants.DECLINE_LOAN, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllLoans");
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
    returnBook: ({ commit, dispatch }, data) => {
      call("post", constants.RETURN_BOOK, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllLoans");
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
    extendLoan: ({ commit, dispatch }, data) => {
      call("post", constants.EXTEND_LOAN, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllLoans");
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
    recieveBook: ({ commit, dispatch }, data) => {
      call("post", constants.RECIEVE_BOOK, data)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllLoans");
            commit("SET_ALERT", {
              status: "success",
              message: res.data.message,
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
    deleteBook: ({ commit, dispatch }, data) => {
      call("delete", `/delete-book/${data}`)
        .then((res) => {
          if (res.data.status_code === 1000) {
            dispatch("getAllBooks");

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

export default bookModule;

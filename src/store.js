// store.js (main store)
import { createStore } from "vuex";
import authModule from "./modules/auth/authStore";
import graphModule from "./modules/graph/graphStore";
import dashboardModule from "./modules/dashboard/dashboardStore";
import bookModule from "./modules/books/bookStore";

const store = createStore({
  state: {
    loading: false,
  },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
  },

  getters: {
    loading: (state) => state.loading,
  },
  modules: {
    auth: authModule,
    graph: graphModule,
    dashboard: dashboardModule,
    book: bookModule,
    // Other modules can be added here
  },
});

export default store;

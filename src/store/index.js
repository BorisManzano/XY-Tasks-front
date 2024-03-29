import { createStore } from "vuex";

export default createStore({
  state: {
    user: { name: "", email: "", role: "" },
  },
  getters: {},
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {},
  modules: {},
});

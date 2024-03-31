import { createStore } from "vuex";

export default createStore({
  state: {
    user: { name: "", email: "", role: "", id: "" },
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

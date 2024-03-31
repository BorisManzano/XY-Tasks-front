<template>
  <div
    class="flex bg-gradient-to-t from-[#fa798f] to-[#f43f60] items-center justify-center w-full h-screen"
  >
    <div class="w-full max-w-sm">
      <form
        @submit.prevent="changePassword"
        class="bg-[#f64868] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 class="text-center mb-4 font-bold">CAMBIAR CONTRASEÑA</h1>

        <div class="mb-4">
          <label
            class="block text-white text-sm font-semibold mb-2"
            for="username"
          >
            Contraseña
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-[#f43f60] leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label
            class="block text-white text-sm font-semibold mb-2"
            for="password"
          >
            Repetir contraseña
          </label>
          <input
            v-model="repeatPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-[#f43f60] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>
        <div class="flex items-center justify-center">
          <button
            class="bg-[#ff224b] hover:bg-pink-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Enviar
          </button>
        </div>
      </form>
    </div>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "UpdatePasswordView",
  data() {
    return {
      password: "",
      repeatPassword: "",
    };
  },
  methods: {
    async changePassword() {
      if (this.password === this.repeatPassword) {
        try {
          const response = await axios.put(
            `${process.env.VUE_APP_API_BASE_URL}updatePassword`,
            {
              password: this.password,
              token: this.$route.query.token,
              email: this.$route.query.email,
            }
          );
        } catch (error) {
          console.error("Error al cambiar la contraseña:", error);
        }
      }
    },
  },
};
</script>

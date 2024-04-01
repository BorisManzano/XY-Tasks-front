<template>
  <div
    class="flex bg-gradient-to-t from-[#fa798f] to-[#f43f60] min-h-screen items-center justify-center w-full h-screen"
  >
    <div class="w-full max-w-sm">
      <form
        @submit.prevent="login"
        class="bg-[#f64868] shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h1 class="text-center text-white mb-4 font-bold">INICIO DE SESIÓN</h1>
        <div class="mb-4">
          <label
            class="block text-white text-sm font-semibold mb-2"
            for="username"
          >
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-[#f43f60] leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="email@ejemplo.com"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label
            class="block text-white text-sm font-semibold mb-2"
            for="password"
          >
            Contraseña
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-[#f43f60] mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <router-link
            to="/recoverPassword"
            class="flex items-center text-center justify-center lg:inline-block lg:mt-0 text-white hover:text-gray-700 text-xs"
            >Haz click aqui si aun no tienes contraseña</router-link
          >
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-[#ff224b] hover:bg-pink-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
          <router-link
            class="inline-block align-baseline font-bold text-sm text-white hover:text-gray-700"
            to="/recoverPassword"
          >
            ¿Olvidaste tu contraseña?
          </router-link>
        </div>
      </form>
    </div>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";
import { mapMutations, mapState } from "vuex";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  methods: {
    ...mapMutations(["setUser"]),

    showToast(res, boolean) {
      if (boolean) {
        return this.$swal.fire({
          title: res,
          position: "top",
        });
      } else {
        return this.$swal.fire({ text: res, position: "top", icon: "error" });
      }
    },

    async login() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}login`,
          {
            email: this.email,
            password: this.password,
          }
        );

        if (response.data.token) {
          $cookies.set("Authorization", response.data.token);
          this.setUser((this.user = response.data.user));

          this.$router.push("/home");
        } else {
          this.showToast("Error al iniciar sesión", false);
        }
      } catch {
        this.showToast("Error al iniciar sesión", false);
      }
    },
  },
};
</script>

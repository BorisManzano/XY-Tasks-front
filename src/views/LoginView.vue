<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="w-full max-w-sm">
      <form
        @submit.prevent="login"
        class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Email
          </label>
          <input
            v-model="email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="email@ejemplo.com"
          />
        </div>
        <div class="flex flex-col mb-6">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="password"
          >
            Contraseña
          </label>
          <input
            v-model="password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
          />
          <router-link
            to="/welcome"
            class="flex items-center text-center justify-center lg:inline-block lg:mt-0 text-gray-400 hover:text-gray-200 text-xs"
            >Haz click aqui si aun no tienes contraseña</router-link
          >
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Iniciar sesión
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Olvidaste tu contraseña?
          </a>
        </div>
      </form>
    </div>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "LoginView",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post("http://localhost:8000/api/login", {
          email: this.email,
          password: this.password,
        });

        if (response.data.token) {
          $cookies.set("Authorization", response.data.token);
        } else {
          console.error(
            "Error: No se recibió un token de sesión en la respuesta"
          );
        }
      } catch (error) {
        console.error("Error al iniciar sesión:", error);
      }
    },
  },
};
</script>

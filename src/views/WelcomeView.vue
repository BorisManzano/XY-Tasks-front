<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="w-full max-w-sm">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="flex justify-center font-bold mb-4">¡Ingrese su Email!</h1>
        <p class="flex justify-center text-center font-normal mb-4">
          Se le enviara un enlace para su nueva contraseña.
        </p>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-semibold mb-2"
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
        <div class="flex items-center justify-between">
          <button
            @click="enviarEmail"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Enviar
          </button>
          <router-link
            class="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-gray-600"
            to="/login"
          >
            Volver al login
          </router-link>
        </div>
      </form>
    </div>
  </div>
  <router-view />
</template>

<script>
import axios from "axios";

export default {
  name: "Welcome",
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async enviarEmail() {
      console.log(this.email);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/recoverPassword",
          {
            email: this.email,
          }
        );
        console.log("Correo electrónico enviado:", response.data);
      } catch (error) {
        console.error("Error al enviar el correo electrónico:", error);
      }
    },
  },
};
</script>

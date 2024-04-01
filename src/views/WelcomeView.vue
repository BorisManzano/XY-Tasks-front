<template>
  <div
    class="flex bg-gradient-to-t from-[#fa798f] to-[#f43f60] items-center justify-center w-full h-screen"
  >
    <div class="w-full max-w-sm">
      <form
        class="bg-[#f64868] text-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <h1 class="flex justify-center font-bold mb-4">¡Ingrese su Email!</h1>
        <p class="flex justify-center text-center font-normal mb-4">
          Se le enviara un enlace para su nueva contraseña.
        </p>
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
        <div class="flex items-center justify-between">
          <button
            @click="enviarEmail"
            class="bg-[#ff224b] hover:bg-pink-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Enviar
          </button>
          <router-link
            class="inline-block align-baseline font-bold text-sm text-white hover:text-gray-300"
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

    async enviarEmail() {
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}recoverPassword`,
          {
            email: this.email,
          }
        );
        this.showToast("Correo electrónico enviado.", true);
      } catch (error) {
        this.showToast("Error al enviar el correo electrónico", false);
      }
    },
  },
};
</script>

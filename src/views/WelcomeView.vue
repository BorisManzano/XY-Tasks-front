<template>
  <div class="flex items-center justify-center w-full h-screen">
    <div class="w-full max-w-sm">
      <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 class="flex justify-center font-bold mb-4">
          ¡Reciba su email de configuración!
        </h1>
        <div class="mb-4">
          <label
            class="block text-gray-700 text-sm font-bold mb-2"
            for="username"
          >
            Email
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="email"
            placeholder="email@ejemplo.com"
          />
        </div>
        <div class="flex items-center justify-between">
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Iniciar sesión
          </button>
          <a
            class="inline-block align-baseline font-bold text-sm text-gray-400 hover:text-gray-600"
            href="#"
          >
            volver al login
          </a>
        </div>
      </form>
    </div>
  </div>
  <router-view />
</template>

<script>
export default {
  name: "Welcome",
  data() {
    return {
      email: "",
    };
  },
  methods: {},
};
</script>

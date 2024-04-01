<template>
  <div
    v-if="user.role === 'super_admin'"
    class="block max-w-sm pb-4 h-full bg-[#f64868] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Registra un nuevo empleado
      </p>
    </div>
    <div class="flex flex-col gap-4 max-w-sm px-4 rounded-lg">
      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Nombre del empleado </label>
        <input
          type="text"
          v-model="name"
          placeholder="Lionel Messi"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        />
      </div>

      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Ingresa el email </label>
        <input
          type="text"
          v-model="email"
          placeholder="email@ejemplo.com"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        />
      </div>

      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Selecciona el rol</label>
        <select
          v-model="role"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        >
          <option value="super_admin">Administrador</option>
          <option value="employee">Empleado</option>
        </select>
      </div>
      <div class="flex items-center justify-center">
        <button
          @click="newEmployee()"
          class="text-white text-center w-32 h-8 bg-[#ff224b] focus:ring-4 focus:outline-none focus:ring-[#f4a0af] font-medium rounded-lg text-sm inline-flex items-center justify-center"
          type="button"
        >
          Crear
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "NewEmployeeForm",
  data() {
    return {
      name: "",
      email: "",
      role: "",
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {},
  methods: {
    showToast(res, boolean) {
      if (boolean) {
        return this.$swal.fire({
          title: res,
          icon: "success",
          position: "top",
        });
      } else {
        return this.$swal.fire({ text: res, position: "top" });
      }
    },

    async newEmployee() {
      const token = $cookies.get("Authorization");
      try {
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}register`,
          {
            name: this.name,
            email: this.email,
            role: this.role,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.name = "";
        this.email = "";
        this.role = "";
      } catch {
        this.showToast("Error al crear el usuario", false);
      }
    },
  },
};
</script>

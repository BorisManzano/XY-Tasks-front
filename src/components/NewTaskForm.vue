<template>
  <div
    v-if="user.role === 'super_admin'"
    class="block max-w-sm pb-4 h-full bg-[#f64868] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Crear tarea
      </p>
    </div>
    <div class="flex flex-col gap-4 max-w-sm px-4 rounded-lg">
      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Ingresa la tarea </label>
        <input
          type="text"
          v-model="task"
          placeholder="Tarea"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        />
      </div>

      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Ingresa los detalles</label>
        <input
          type="text"
          v-model="details"
          placeholder="Detalles"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        />
      </div>

      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Selecciona un empleado</label>
        <select
          v-model="selectedUser"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-[#f43f60] text-[#f43f60]"
        >
          <option v-for="user in users" :value="user.id" :key="user.id">
            {{ user.name }}
          </option>
        </select>
      </div>
      <div class="flex items-center justify-center">
        <button
          @click="createTask()"
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
  name: "NewTaskForm",
  data() {
    return {
      task: "",
      details: "",
      selectedUser: null,
      users: [],
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.allEmployes();
  },
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

    async allEmployes() {
      const token = $cookies.get("Authorization");
      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}allEmployees`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.users = response.data;
      } catch {
        this.showToast("Error al obtener los empleados", false);
      }
    },

    async createTask() {
      const token = $cookies.get("Authorization");
      const taskData = {
        user_id: this.selectedUser,
        task: this.task,
        details: this.details,
      };
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}newTask`,
          taskData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.task = "";
        this.details = "";
        this.selectedUser = null;
      } catch (error) {
        this.showToast("Error al crear la tarea", false);
      }
    },
  },
};
</script>

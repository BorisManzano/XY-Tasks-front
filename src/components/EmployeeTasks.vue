<template>
  <div
    v-if="user.role === 'employee'"
    class="block max-w-sm h-full bg-[#fa798f] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Mis Tareas
      </p>
    </div>
    <div class="block max-w-sm px-4 rounded-lg">
      <div class="flex flex-col" v-if="employeeData.length >= 1">
        <div v-for="(task, index) in employeeData" :key="task.id">
          <div class="flex flex-col max-w-sm">
            <div class="hover:shadow-lg min-h-36 p-2 my-4 rounded-lg">
              <p class="font-semibold">{{ task.task }}</p>
              <li class="font-extralight">{{ task.details }}</li>
              <div class="flex flex-col justify-end items-end my-6">
                <div class="relative right-0">
                  <button
                    @click="toggleDropdown(task.id)"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="z-20 text-white bg-[#f43f60] hover:bg-[#ff5d7a] focus:outline-none font-medium rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {{ task.status }}
                    <svg
                      class="w-2.5 h-2.5 ms-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m1 1 4 4 4-4"
                      />
                    </svg>
                  </button>
                  <div
                    v-if="activeDropdown === task.id"
                    class="relative text-[#f43f60] right-0 w-32 bg-white rounded-lg shadow-md z-10"
                  >
                    <ul class="flex flex-col text-center">
                      <li
                        class="hover:bg-[#f43f60] hover:text-white rounded-lg"
                      >
                        <a>Pendiente</a>
                      </li>
                      <li
                        class="hover:bg-[#f43f60] hover:text-white rounded-lg"
                      >
                        <a href="#">Completado</a>
                      </li>
                      <li
                        class="hover:bg-[#f43f60] hover:text-white rounded-lg"
                      >
                        <a href="#">Bloqueado</a>
                      </li>
                      <li
                        class="hover:bg-[#f43f60] hover:text-white rounded-lg"
                      >
                        <a href="#">En proceso</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr v-if="index !== employeeData.length - 1" />
          </div>
        </div>
      </div>
      <p
        v-else
        class="block max-w-sm p-1 mb-2 bg-white border border-gray-200 rounded-lg shadow"
      >
        No hay tareas disponibles para este empleado.
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";

export default {
  name: "EmployeeTasks",
  data() {
    return {
      employeeData: [],
      activeDropdown: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.fetchEmployeeData();
  },
  methods: {
    toggleDropdown(taskId) {
      if (this.activeDropdown === taskId) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = taskId;
      }
    },

    async fetchEmployeeData() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          "http://localhost:8000/api/employeeTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.employeeData = response.data.data[0].tasks.map((task) => ({
          id: task.id,
          task: task.task,
          details: task.details,
          status: task.status,
        }));
      } catch (error) {
        console.error("Error al obtener las tareas de los empleados:", error);
      }
    },
  },
};
</script>

<template>
  <EmployeeTasks v-if="user.role === 'employee'" />
  <div
    class="block h-full bg-[#f43f60] w-2/5 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Tareas Totales
      </p>
    </div>
    <div class="flex flex-col gap-8 w-full p-4 rounded-lg">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="flex flex-col"
      >
        <div class="block w-full p-4 rounded-lg shadow-xl bg-[#f64868]">
          <p class="font-bold text-center mb-4">{{ employee.name }}</p>
          <div v-for="(task, index) in employee.tasks" :key="task.id">
            <div
              class="relative flex flex-col justify-between min-h-36 p-4 my-4 rounded-lg bg-[#f64868]"
            >
              <div>
                <p class="font-semibold">{{ task.task }}</p>
                <li class="font-extralight">{{ task.details }}</li>
              </div>
              <div class="flex flex-col justify-end items-end my-6">
                <div class="absolute bottom-4 left-4">
                  <button
                    @click="openModal(task.id)"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="relative z-20 text-[#f43f60] bg-[#ffffff] hover:bg-[#ececec] focus:outline-none font-medium shadow-lg rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    Comentarios
                  </button>
                </div>
                <div class="absolute bottom-4 right-4">
                  <button
                    disabled
                    @click="toggleDropdown(task.id)"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="relative z-20 text-white cursor-not-allowed bg-[#ff224b] font-medium shadow-lg rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {{ task.status }}
                  </button>
                  <div
                    v-if="activeDropdown === task.id"
                    class="absolute text-[#f43f60] right-0 w-32 bg-white rounded-lg shadow-md z-10"
                  >
                    <ul class="flex flex-col text-start font-medium text-sm">
                      <li
                        @click="selectStatus(task, 'Pendiente')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a>Pendiente</a>
                      </li>
                      <li
                        @click="selectStatus(task, 'Completado')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">Completado</a>
                      </li>
                      <li
                        @click="selectStatus(task, 'Bloqueado')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">Bloqueado</a>
                      </li>
                      <li
                        @click="selectStatus(task, 'En proceso')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">En proceso</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <hr
              v-if="index !== employee.tasks.length - 1"
              class="border-[#fa6f88]"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  <NewTaskForm v-if="user.role === 'super_admin'" />
</template>

<script>
import axios from "axios";
import { mapState } from "vuex";
import NewTaskForm from "./NewTaskForm.vue";
import EmployeeTasks from "./EmployeeTasks.vue";

export default {
  name: "AllTasks",
  data() {
    return {
      employees: [],
      activeDropdown: null,
    };
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.fetchEmployeesTasks();
  },
  components: {
    NewTaskForm,
    EmployeeTasks,
  },
  methods: {
    toggleDropdown(taskId) {
      if (this.activeDropdown === taskId) {
        this.activeDropdown = null;
      } else {
        this.activeDropdown = taskId;
      }
    },

    async fetchEmployeesTasks() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          "http://localhost:8000/api/allEmployeesTasks",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.employees = response.data.data.map((employee) => ({
          id: employee.id,
          name: employee.name,
          tasks: employee.tasks.map((task) => ({
            id: task.id,
            task: task.task,
            details: task.details,
            status: task.status,
          })),
        }));
      } catch (error) {
        console.error("Error al obtener las tareas de los empleados:", error);
      }
    },
  },
};
</script>

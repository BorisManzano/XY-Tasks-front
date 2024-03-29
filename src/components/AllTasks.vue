<template>
  <EmployeeTasks v-if="user.role === 'employee'" />

  <div
    class="block max-w-sm pb-4 h-full bg-[#fa798f] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        v-if="user.role === 'employee'"
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Tareas Totales
      </p>
      <p
        v-else
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Tareas
      </p>
    </div>
    <div class="flex flex-col gap-8 max-w-sm px-4 rounded-lg">
      <div
        v-for="employee in employees"
        :key="employee.id"
        class="flex flex-col"
      >
        <div class="block max-w-sm p-4 rounded-l shadow-xl">
          <p class="font-bold text-center mb-4">{{ employee.name }}</p>
          <div v-for="(task, index) in employee.tasks" :key="task.id">
            <div class="block max-w-sm p-2 my-4">
              <p class="font-semibold">{{ task.task }}</p>
              <li class="font-extralight">{{ task.details }}</li>
              <div class="flex justify-between my-3">
                <p></p>
                <button
                  disabled
                  class="text-white text-center w-32 h-8 cursor-not-allowed bg-[#f43f60] focus:ring-4 focus:outline-none focus:ring-[#f4a0af] font-medium rounded-lg text-sm inline-flex items-center justify-center"
                  type="button"
                >
                  {{ task.status }}
                </button>
              </div>
            </div>
            <hr v-if="index !== employee.tasks.length - 1" />
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

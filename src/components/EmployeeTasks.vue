<template>
  <div
    class="block h-full bg-[#f43f60] w-2/5 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Mis Tareas
      </p>
    </div>
    <div class="block w-full px-4 rounded-lg">
      <div class="flex flex-col" v-if="employeeData.length >= 1">
        <div v-for="task in employeeData" :key="task.id">
          {{ console.log(task) }}
          <div class="flex flex-col w-full">
            <div
              class="relative flex flex-col justify-between shadow-lg min-h-36 p-4 my-4 rounded-lg bg-[#f64868]"
            >
              <div>
                <p class="font-semibold text-start">{{ task.task }}</p>
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
                    @click="toggleDropdown(task.id)"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="relative z-20 text-white bg-[#ff224b] hover:bg-[#ff5d7a] focus:outline-none font-medium shadow-lg rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
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
            <transition name="modal">
              <div
                @click="openModal(task.id)"
                v-if="activeModal === task.id"
                class="fixed inset-0 bg-[#00000098] backdrop-blur-sm z-40 flex items-center justify-center"
              >
                <div class="w-1/3 bg-white rounded-xl">
                  <div
                    class="flex justify-center items-center bg-[#f43f60] h-16 rounded-lg"
                  >
                    <h3 class="font-bold text-white text-xl">
                      Comentarios de {{ task.task }}
                    </h3>
                  </div>
                  <p>boricua {{ task.comments }}</p>
                  {{ console.log(task.comments) }}
                  <div
                    v-if="task.comments !== null"
                    class="p-4 flex flex-col items-start gap-4"
                  >
                    <div
                      v-for="comment in task.comments"
                      class="border-2 inline-block border-[#f43f60] rounded-lg p-2"
                    >
                      <p class="text-[#f43f60] font-semibold">{{ comment }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </transition>
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
      activeModal: null,
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
    openModal(taskId) {
      if (this.activeModal === taskId) {
        this.activeModal = null;
      } else {
        this.activeModal = taskId;
      }
    },
    selectStatus(task, status) {
      task.status = status;
      this.toggleDropdown(task.id);
      // axios
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
          comments: task.comments,
        }));
        // console.log(this.employeeData[0].comments);
      } catch (error) {
        console.error("Error al obtener las tareas de los empleados:", error);
      }
    },
  },
};
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s;
}
.modal-leave-to {
  opacity: 0;
}
.modal-enter {
  opacity: 1;
}
</style>

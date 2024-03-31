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
                    :disabled="isDisabled"
                    @click="toggleDropdown(task.id)"
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    class="relative z-20 text-white bg-[#ff224b] font-medium shadow-lg rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
                    type="button"
                  >
                    {{ task.status }}
                    <svg
                      v-if="user.role === 'super_admin'"
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
                        @click="selectStatus(task, task.id, 'Pendiente')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a>Pendiente</a>
                      </li>
                      <li
                        @click="selectStatus(task, task.id, 'Completado')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">Completado</a>
                      </li>
                      <li
                        @click="selectStatus(task, task.id, 'Bloqueado')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">Bloqueado</a>
                      </li>
                      <li
                        @click="selectStatus(task, task.id, 'En proceso')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">En proceso</a>
                      </li>
                    </ul>
                  </div>
                  <transition name="modal">
                    <div
                      v-if="activeModal === task.id"
                      class="fixed inset-0 bg-[#00000098] backdrop-blur-sm z-40 flex items-center justify-center"
                    >
                      <div class="w-1/3 bg-white rounded-xl">
                        <div
                          class="flex justify-center items-center relative bg-[#f43f60] h-16 rounded-lg"
                        >
                          <h3 class="font-bold text-white text-xl">
                            Comentarios de {{ task.task }}
                          </h3>
                          <button
                            @click="openModal(task.id)"
                            class="absolute right-4 top-100"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              stroke-width="2"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                        <div
                          v-if="task.comments !== null"
                          class="p-4 flex flex-col items-start gap-4"
                        >
                          <div
                            v-for="comment in task.comments"
                            class="border-2 inline-block border-[#f43f60] rounded-lg p-2"
                          >
                            <p class="text-[#f43f60] font-semibold">
                              {{ comment }}
                            </p>
                          </div>
                        </div>
                        <hr class="border-[#f43f60]" />
                        <div class="h-12 relative">
                          <input
                            placeholder="Escribir comentario"
                            v-model="newComment"
                            id="newComment"
                            type="text"
                            class="border-none focus:outline-none text-[#f43f60] p-2 rounded-lg w-full h-full"
                          />
                          <button
                            @click="createComment(newComment, task.id)"
                            class="absolute top-4 right-2 fill-[#f43f60] text-[#f43f60] outline-[#f43f60]"
                          >
                            <svg
                              class="w-5 h-5"
                              stroke="currentColor"
                              stroke-width="1.5"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                                stroke-linejoin="round"
                                stroke-linecap="round"
                              ></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  </transition>
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
      activeModal: null,
      newComment: "",
    };
  },
  computed: {
    ...mapState(["user"]),
    isDisabled() {
      if (this.user.role !== "super_admin") return true;
    },
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
    openModal(taskId) {
      if (this.activeModal === taskId) {
        this.activeModal = null;
      } else {
        this.activeModal = taskId;
      }
    },
    async selectStatus(task, id, status) {
      task.status = status;
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.put(
          `${process.env.VUE_APP_API_BASE_URL}changeStatus`,
          {
            id: id,
            status: status,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.toggleDropdown(id);
      } catch (error) {
        console.error("Error al actualizar el estado de la tarea:", error);
      }
    },
    async fetchEmployeesTasks() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}allEmployeesTasks`,
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
    async createComment(comment, id, files) {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}newComment`,
          {
            comment: comment,
            task_id: id,
            files: files,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.newComment = "";
      } catch (error) {
        console.error("Error al crear el comentario", error);
      }
    },
  },
};
</script>

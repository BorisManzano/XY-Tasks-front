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
                        @click="selectStatus(task, task.id, 'Pendiente')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a>Pendiente</a>
                      </li>
                      <li
                        @click="selectStatus(task, task.id, 'En proceso')"
                        class="hover:bg-[#ff224b] pl-2 py-1 cursor-pointer hover:text-white rounded-md"
                      >
                        <a href="#">En proceso</a>
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
                    </ul>
                  </div>
                </div>
              </div>
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
                  <div style="max-height: 35rem; overflow-y: scroll">
                    <div
                      v-if="taskComments !== null"
                      class="p-4 flex flex-col items-start gap-4"
                    >
                      <div
                        v-for="comment in taskComments"
                        :key="comment.id"
                        class="flex flex-row text-[#f43f60] gap-0.5"
                      >
                        <div
                          class="flex flex-col border-[#f43f60] border-2 rounded-lg p-2"
                        >
                          <div
                            v-if="
                              comment.attachment &&
                              comment.attachment.length > 0
                            "
                          >
                            <div
                              v-if="
                                comment.attachment &&
                                comment.attachment.length > 0
                              "
                              class="flex flex-col"
                            >
                              <div
                                v-for="attachment in comment.attachment"
                                :key="attachment.id"
                              >
                                <a
                                  v-if="isPDF(attachment.filename)"
                                  :href="attachment.url"
                                  target="_blank"
                                >
                                  <button
                                    class="text-[#f43f60] underline font-bold"
                                  >
                                    Ver PDF
                                  </button>
                                </a>
                                <div
                                  v-else
                                  :href="attachment.url"
                                  target="_blank"
                                >
                                  <img
                                    :src="attachment.url"
                                    alt="Attachment"
                                    class="max-w-60 max-h-60 ml-2"
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          <p class="text-[#f43f60] font-semibold">
                            {{ comment.comment }}
                          </p>
                        </div>
                        <button
                          v-if="
                            user.role === 'super_admin' ||
                            user.id === comment.user_id ||
                            user.id === employee.id
                          "
                          @click="deleteComment(comment.id, task.id)"
                        >
                          <img
                            src="../assets/trash.svg"
                            alt="trash"
                            width="20"
                            height="20"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                  <hr class="border-[#f43f60]" />
                  <form
                    @submit.prevent="createComment(task.id)"
                    enctype="multipart/form-data"
                    class="h-12 relative"
                  >
                    <input
                      placeholder="Escribir comentario"
                      v-model="newComment.comment"
                      id="newComment"
                      type="text"
                      class="border-none focus:outline-none text-[#f43f60] p-2 pr-20 rounded-lg w-full h-full"
                    />
                    <label
                      for="fileInput"
                      class="absolute right-14 fill-[#f43f60] text-[#f43f60] outline-[#f43f60] flex items-center justify-center cursor-pointer"
                      style="top: 15px"
                    >
                      <img
                        src="../assets/attach.svg"
                        alt="attach"
                        width="20"
                        height="20"
                      />
                    </label>
                    <input
                      id="fileInput"
                      type="file"
                      style="display: none"
                      @change="handleFileUpload($event)"
                    />

                    <button
                      class="absolute right-2 fill-[#f43f60] text-[#f43f60] border rounded-lg p-2 border-[#f43f60] outline-[#f43f60]"
                      style="top: 6px"
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
                  </form>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>
      <p v-else class="text-center p-4">
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
      taskComments: [],
      newComment: {
        comment: "",
        files: null,
        task_id: null,
      },
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
    showToast(res, boolean) {
      if (boolean) {
        return this.$swal.fire({
          text: res,
          position: "top",
        });
      } else {
        return this.$swal.fire({ text: res, position: "top", icon: "error" });
      }
    },

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
        this.allComments(taskId);
        this.activeModal = taskId;
      }
    },

    isPDF(filename) {
      return filename.toLowerCase().endsWith(".pdf");
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
        this.showToast("Error al actualizar el estado de la tarea", false);
      }
    },

    async allComments(id) {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}allComments/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const comments = await Promise.all(
          response.data.map(async (comment) => {
            if (comment.has_attachment) {
              const attachmentResponse = await axios.get(
                `${process.env.VUE_APP_API_BASE_URL}comments/${comment.id}/attachments`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              const attachments = await Promise.all(
                attachmentResponse.data.attachments.map(async (attachment) => {
                  try {
                    const attachmentDownloadResponse = await axios.get(
                      `${process.env.VUE_APP_API_BASE_URL}attachments/download/${attachment.id}`,
                      {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                        responseType: "blob",
                      }
                    );

                    const blob = new Blob([attachmentDownloadResponse.data], {
                      type: "application/pdf",
                    });
                    const url = window.URL.createObjectURL(blob);

                    return {
                      id: attachment.id,
                      filename: attachment.filename,
                      url: url,
                    };
                  } catch {
                    this.showToast("Error al descargar", false);
                    return null;
                  }
                })
              );

              return {
                id: comment.id,
                comment: comment.comment,
                task_id: comment.task_id,
                user_id: comment.user_id,
                attachment: attachments.filter(
                  (attachment) => attachment !== null
                ),
              };
            } else {
              return {
                id: comment.id,
                comment: comment.comment,
                task_id: comment.task_id,
                user_id: comment.user_id,
              };
            }
          })
        );

        this.taskComments = comments;
      } catch (error) {
        this.showToast("Error al obtener los comentarios", false);
      }
    },

    async createComment(taskId) {
      this.newComment.task_id = taskId;
      try {
        const token = $cookies.get("Authorization");
        const formData = new FormData();
        formData.append("comment", this.newComment.comment);
        formData.append("task_id", taskId);
        if (this.newComment.files !== null) {
          formData.append("files[]", this.newComment.files);
        }

        const response = await axios.post(
          `${process.env.VUE_APP_API_BASE_URL}newComment`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
        this.allComments(taskId);
        this.newComment.comment = "";
        this.newComment.files = null;
      } catch (error) {
        this.showToast("Error al crear el comentario", false);
      }
    },

    async deleteComment(id, task_id) {
      const token = $cookies.get("Authorization");
      try {
        const response = await axios.delete(
          `${process.env.VUE_APP_API_BASE_URL}deleteComment/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.allComments(task_id);
      } catch (error) {
        this.showToast("Error al eliminar el comentario", false);
      }
    },

    async fetchEmployeeData() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}employeeTasks`,
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
      } catch (error) {
        console.error("Error al obtener las tareas de los empleados:", error);
      }
    },
    handleFileUpload(event) {
      this.newComment.files = event.target.files[0];
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

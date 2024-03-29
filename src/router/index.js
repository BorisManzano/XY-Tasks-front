import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Welcome from "../views/WelcomeView.vue";
import UpdatePassword from "../views/UpdatePasswordView.vue";
import NewEmployeeForm from "@/components/NewEmployeeForm.vue";
import Reports from "@/components/Reports.vue";
import AllTasks from "@/components/AllTasks.vue";

const routes = [
  {
    path: "/home",
    name: "home",
    component: HomeView,
    children: [
      {
        path: "",
        redirect: { name: "tasks" },
      },
      {
        path: "reports",
        name: "reports",
        component: Reports,
      },
      {
        path: "employees",
        name: "employees",
        component: NewEmployeeForm,
      },
      {
        path: "tasks",
        name: "tasks",
        component: AllTasks,
      },
    ],
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/welcome",
    name: "Welcome",
    component: Welcome,
  },
  {
    path: "/updatePassword",
    name: "Update Password",
    component: UpdatePassword,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

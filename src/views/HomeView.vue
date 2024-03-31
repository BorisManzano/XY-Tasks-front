<template>
  <div class="bg-gradient-to-t from-[#fa798f] to-[#f43f60] min-h-screen">
    <Sidebar />

    <div class="flex flex-row justify-around p-4 sm:ml-64">
      <RouterView />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

import Sidebar from "../components/Sidebar";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.meUser();
  },
  components: {
    Sidebar,
  },
  methods: {
    ...mapMutations(["setUser"]),

    async meUser() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}me`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        this.setUser((this.user = response.data.user));
        this.$router.push({ name: "tasks" });
      } catch {
        this.$router.push("/login");
      }
    },
  },
};
</script>

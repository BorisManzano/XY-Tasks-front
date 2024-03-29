<template>
  <router-view />
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  components: {},
  mounted() {
    this.meUser();
  },
  methods: {
    ...mapMutations(["setUser"]),

    async meUser() {
      try {
        const token = $cookies.get("Authorization");
        const response = await axios.get("http://localhost:8000/api/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        this.setUser((this.user = response.data.user));
        this.$router.push({ name: "tasks" });
      } catch {
        this.$router.push("/login");
      }
    },
  },
};
</script>

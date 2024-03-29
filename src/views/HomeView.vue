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
import { mapState } from "vuex";

import Sidebar from "../components/Sidebar";

export default {
  name: "HomeView",
  data() {
    return {};
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {},
  components: {
    Sidebar,
  },
  methods: {},
};
</script>

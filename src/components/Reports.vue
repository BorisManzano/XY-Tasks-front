<template>
  <div
    class="block max-w-sm h-full bg-[#f64868] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Generar PDF
      </p>
    </div>
    <div class="p-3">
      <p class="text-center text-sm">
        Aquí puedes generar un pdf de las tareas que se completaron en un rango
        específico de tiempo
      </p>
    </div>
    <div class="flex flex-col gap-4 max-w-sm px-4 rounded-lg">
      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Ingresa el rango de fechas </label>
        <VueDatePicker
          v-model="date"
          :enable-time-picker="false"
          placeholder="Seleccione la fecha"
          range
        ></VueDatePicker>
      </div>
      <div class="flex items-center justify-center bottom-4 pb-4">
        <button
          @click="generatePDF()"
          class="relative z-20 text-[#f43f60] bg-[#ffffff] hover:bg-[#ececec] focus:outline-none font-medium shadow-lg rounded-lg text-sm w-32 h-8 text-center inline-flex items-center justify-center"
          type="button"
        >
          Visualizar PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  },
  methods: {
    async generatePDF() {
      if (!this.date || this.date.length !== 2) {
        console.error("Debe seleccionar un rango de fechas válido");
        return;
      }

      const startDate = this.date[0].toISOString().split("T")[0];
      const endDate = this.date[1].toISOString().split("T")[0];
      const token = $cookies.get("Authorization");

      try {
        const response = await axios.get(
          `${process.env.VUE_APP_API_BASE_URL}reports/generate?start_date=${startDate}&end_date=${endDate}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            responseType: "blob",
          }
        );

        const blob = new Blob([response.data], { type: "application/pdf" });
        const url = window.URL.createObjectURL(blob);

        window.open(url);
      } catch (error) {
        console.error("Error al obtener el PDF", error);
      }
    },
  },
};
</script>

<style>
.dp__theme_light {
  --dp-text-color: #f43f60;
  --dp-hover-color: #ff7d95;
  --dp-hover-text-color: #fff;
  --dp-primary-color: #f43f60;
}
</style>

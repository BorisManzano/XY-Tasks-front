<template>
  <div
    class="block max-w-sm h-full bg-[#fa798f] w-1/3 mt-20 rounded-lg shadow-2xl text-white"
  >
    <div class="bg-white rounded-lg h-14 shadow-sm">
      <p
        class="flex items-center justify-center h-full font-bold text-xl text-[#f43f60]"
      >
        Generar pdf
      </p>
    </div>
    <div class="flex flex-col gap-4 max-w-sm px-4 rounded-lg">
      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold">Ingresa la fecha de inicio </label>
        <VueDatePicker
          v-model="date"
          :enable-time-picker="false"
          placeholder="Seleccione la fecha"
        ></VueDatePicker>
      </div>
    </div>

    <div class="flex flex-col gap-4 max-w-sm px-4 rounded-lg">
      <div class="flex flex-col mt-1 gap-1">
        <label class="font-bold"
          >Ingresa la fecha de finalización :enable-time-picker="false"
          placeholder="Seleccione la fecha"
        </label>
        <VueDatePicker v-model="date"></VueDatePicker>
      </div>
    </div>
  </div>
</template>

<script>
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

export default {
  components: { VueDatePicker },
  data() {
    return {
      date: null,
    };
  },
};
</script>

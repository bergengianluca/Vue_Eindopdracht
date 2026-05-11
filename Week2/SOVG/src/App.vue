<script setup>
import { ref } from 'vue'

const cijfer = ref(8,9);
</script>

<template>
  <p v-if="cijfer <= 3.5">Slecht</p>
  <p v-else-if="cijfer <= 5.5">Onvoldoende</p>
  <p v-else-if="cijfer <= 7.5">Voldoende</p>
  <p v-else>Goed</p>
</template>

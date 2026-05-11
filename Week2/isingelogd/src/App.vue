<script setup>
import { ref } from 'vue'

const ingelogd = ref(true);
</script>

<template>
  <p v-if="ingelogd == false">Eerst inloggen aub</p>
  <p v-else>ingelogd</p>
</template>

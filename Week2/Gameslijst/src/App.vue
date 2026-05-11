<script setup>
import { ref } from 'vue'

const ingelogd = ref(true);

const games = [ "GTA", "Battlefield", "FIFA", "Minecraft"];
</script>

<template>
  <template v-for="game in games" :key="game">
    <li>{{ game }}</li>
  </template>
</template>

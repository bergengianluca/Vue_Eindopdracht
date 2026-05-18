<script setup>
import { ref } from 'vue'

const ingelogd = ref(true);
const newGame = ref('');

const games = [ "GTA", "Battlefield", "FIFA", "Minecraft"];

  function voegGameToe() {
    games.push(newGame.value)
    newGame.value = ""
  }
</script>

<template>
  <template v-for="game in games" :key="game">
    <li>{{ game }}</li>
  </template>

  <input type="text" v-model="newGame" placeholder="Voeg een game in">
  <button @click="voegGameToe">Toevoegen</button>
</template>

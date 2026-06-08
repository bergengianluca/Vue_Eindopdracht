<script setup>
import { ref, onMounted } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import PokemonImageList from '@/components/PokemonImageList.vue'
import PokemonStatus from '@/components/PokemonStatus.vue'

const pokemons = ref([])
const loading = ref(false)
const error = ref('')

const url = 'https://pokeapi.co/api/v2/pokemon'

async function fetchPokemons() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    pokemons.value = data.results
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPokemons()
})
</script>

<template>
  <AppTopBar />

  <h1>Pokemon overzicht</h1>

  <PokemonStatus :loading="loading" :error="error" />
  <PokemonImageList v-if="!loading && !error" :pokemons="pokemons" />
</template>

<style scoped>
@import url('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:global(body) {
  margin: 0;
}

h1 {
  margin-left: 24px;
}
</style>

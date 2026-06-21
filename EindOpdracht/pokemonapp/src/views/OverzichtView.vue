<script setup>
import { computed, ref, onMounted } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import PokemonImageList from '@/components/PokemonImageList.vue'
import PokemonPagination from '@/components/PokemonPagination.vue'
import PokemonSearch from '@/components/PokemonSearch.vue'
import PokemonStatus from '@/components/PokemonStatus.vue'

const pokemons = ref([])
const loading = ref(false)
const error = ref('')
const searchText = ref('')
const showSearch = ref(false)
const currentPage = ref(1)
const pokemonsPerPage = 20

const url = 'https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0'

const filteredPokemons = computed(() => {
  return pokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

const totalPages = computed(() => {
  return Math.ceil(filteredPokemons.value.length / pokemonsPerPage)
})

const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * pokemonsPerPage
  const end = start + pokemonsPerPage

  return filteredPokemons.value.slice(start, end)
})

function changeSearchText(newSearchText) {
  searchText.value = newSearchText
  currentPage.value = 1
}

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function previousPage() {
  currentPage.value--
}

function nextPage() {
  currentPage.value++
}

async function fetchPokemons() {
  loading.value = true
  error.value = ''

  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    const allPokemonResponse = await fetch(`${url}?limit=${data.count}`)

    if (!allPokemonResponse.ok) {
      throw new Error('Network response was not ok')
    }

    const allPokemonData = await allPokemonResponse.json()
    pokemons.value = allPokemonData.results
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
  <AppTopBar :show-search="showSearch" @toggle-search="toggleSearch" />

  <h1>Pokemon overzicht</h1>

  <PokemonStatus :loading="loading" :error="error" />
  <PokemonSearch
    v-if="!loading && !error && showSearch"
    :search-text="searchText"
    @search="changeSearchText"
  />
  <PokemonImageList v-if="!loading && !error" :pokemons="paginatedPokemons" />
  <PokemonPagination
    v-if="!loading && !error"
    :current-page="currentPage"
    :total-pages="totalPages"
    @previous-page="previousPage"
    @next-page="nextPage"
  />
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

<script setup>
import { computed, onMounted, ref } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import PokemonDetailSheet from '@/components/PokemonDetailSheet.vue'
import PokemonImageList from '@/components/PokemonImageList.vue'
import PokemonPagination from '@/components/PokemonPagination.vue'
import PokemonSearch from '@/components/PokemonSearch.vue'
import PokemonStatus from '@/components/PokemonStatus.vue'

const pokemons = ref([])
const favoritePokemons = ref([])
const loading = ref(false)
const error = ref('')
const searchText = ref('')
const showSearch = ref(false)
const currentPage = ref(1)
const pokemonsPerPage = 20

const showDetailSheet = ref(false)
const selectedPokemon = ref(null)
const detailLoading = ref(false)
const detailError = ref('')

const filteredPokemons = computed(() => {
  return pokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

const totalPages = computed(() => {
  // Math.ceil rondt naar boven af, zodat ook een onvolledige laatste pagina meetelt.
  return Math.ceil(filteredPokemons.value.length / pokemonsPerPage)
})

const paginatedPokemons = computed(() => {
  const start = (currentPage.value - 1) * pokemonsPerPage
  // slice pakt alleen de 20 Pokemon die op de huidige pagina horen.
  return filteredPokemons.value.slice(start, start + pokemonsPerPage)
})

function changeSearchText(newSearchText) {
  searchText.value = newSearchText
  currentPage.value = 1
}

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function saveFavorites() {
  // localStorage kan alleen tekst opslaan. JSON.stringify maakt van de array tekst.
  localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons.value))
}

function toggleFavorite(pokemon) {
  const favorite = favoritePokemons.value.find((item) => item.name === pokemon.name)

  if (favorite) {
    favoritePokemons.value = favoritePokemons.value.filter((item) => item.name !== pokemon.name)
  } else {
    favoritePokemons.value.push(pokemon)
  }

  saveFavorites()
}

async function selectPokemon(pokemon) {
  showDetailSheet.value = true
  selectedPokemon.value = null
  detailLoading.value = true
  detailError.value = ''

  // await wacht op het antwoord van de API. try/catch vangt een fout op.
  try {
    const response = await fetch(pokemon.url)
    if (!response.ok) throw new Error('Details konden niet geladen worden.')
    selectedPokemon.value = await response.json()
  } catch (err) {
    detailError.value = err.message
  } finally {
    // finally wordt altijd uitgevoerd, ook wanneer de fetch mislukt.
    detailLoading.value = false
  }
}

function closeDetailSheet() {
  showDetailSheet.value = false
}

async function fetchPokemons() {
  loading.value = true
  error.value = ''

  // Deze ene call haalt de volledige lijst op. Details worden pas bij een klik opgehaald.
  try {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0')
    if (!response.ok) throw new Error('Pokemon konden niet geladen worden.')
    const data = await response.json()
    pokemons.value = data.results
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  // JSON.parse zet de opgeslagen tekst weer terug naar een array.
  favoritePokemons.value = JSON.parse(localStorage.getItem('favoritePokemons')) || []
  fetchPokemons()
})
</script>

<template>
  <AppTopBar :show-search="showSearch" @toggle-search="toggleSearch" />

  <main>
    <h1>Pokemon overzicht</h1>

    <PokemonStatus :loading="loading" :error="error" />
    <PokemonSearch
      v-if="!loading && !error && showSearch"
      :search-text="searchText"
      @search="changeSearchText"
    />
    <PokemonImageList
      v-if="!loading && !error"
      :pokemons="paginatedPokemons"
      :favorite-pokemons="favoritePokemons"
      empty-text="Geen pokemon gevonden."
      @toggle-favorite="toggleFavorite"
      @select-pokemon="selectPokemon"
    />
    <PokemonPagination
      :current-page="currentPage"
      :total-pages="totalPages"
      @previous-page="currentPage--"
      @next-page="currentPage++"
    />
  </main>

  <PokemonDetailSheet
    v-if="showDetailSheet"
    :pokemon="selectedPokemon"
    :loading="detailLoading"
    :error="detailError"
    @close="closeDetailSheet"
  />
</template>

<style scoped>
@import url('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

:global(body) {
  margin: 0;
  font-family: Roboto, Arial, sans-serif;
}

h1 {
  margin: 24px;
}
</style>

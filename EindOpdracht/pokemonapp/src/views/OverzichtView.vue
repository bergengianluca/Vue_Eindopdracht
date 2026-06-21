<script setup>
import { computed, ref, onMounted } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import PokemonImageList from '@/components/PokemonImageList.vue'
import PokemonSearch from '@/components/PokemonSearch.vue'
import PokemonStatus from '@/components/PokemonStatus.vue'

const pokemons = ref([])
const favoritePokemons = ref([])
const loading = ref(false)
const error = ref('')
const searchText = ref('')
const showSearch = ref(false)
const currentView = ref('all')

const url = 'https://pokeapi.co/api/v2/pokemon'

const visiblePokemons = computed(() => {
  if (currentView.value === 'favorites') {
    return favoritePokemons.value
  }

  return pokemons.value
})

const filteredPokemons = computed(() => {
  return visiblePokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

const title = computed(() => {
  if (currentView.value === 'favorites') {
    return 'Favoriete pokemon'
  }

  return 'Pokemon overzicht'
})

const emptyText = computed(() => {
  if (currentView.value === 'favorites') {
    return 'Je hebt nog geen favoriete pokemon.'
  }

  return 'Geen pokemon gevonden.'
})

function changeSearchText(newSearchText) {
  searchText.value = newSearchText
}

function changeView(newView) {
  currentView.value = newView
  searchText.value = ''
}

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function toggleFavorite(pokemon) {
  const favorite = favoritePokemons.value.find((favoritePokemon) => {
    return favoritePokemon.name === pokemon.name
  })

  if (favorite) {
    favoritePokemons.value = favoritePokemons.value.filter((favoritePokemon) => {
      return favoritePokemon.name !== pokemon.name
    })
  } else {
    favoritePokemons.value.push(pokemon)
  }
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
    const allPokemonResponse = await fetch(`${url}?limit=${data.count}&offset=0`)

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
  <AppTopBar
    :show-search="showSearch"
    :current-view="currentView"
    @toggle-search="toggleSearch"
    @change-view="changeView"
  />

  <h1>{{ title }}</h1>

  <PokemonStatus :loading="loading" :error="error" />
  <PokemonSearch
    v-if="!loading && !error && showSearch"
    :search-text="searchText"
    @search="changeSearchText"
  />
  <PokemonImageList
    v-if="!loading && !error"
    :pokemons="filteredPokemons"
    :favorite-pokemons="favoritePokemons"
    :empty-text="emptyText"
    @toggle-favorite="toggleFavorite"
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

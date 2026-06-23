<script setup>
import { computed, onMounted, ref } from 'vue'
import AppTopBar from '@/components/AppTopBar.vue'
import PokemonDetailSheet from '@/components/PokemonDetailSheet.vue'
import PokemonImageList from '@/components/PokemonImageList.vue'
import PokemonSearch from '@/components/PokemonSearch.vue'

const favoritePokemons = ref([])
const searchText = ref('')
const showSearch = ref(false)
const showDetailSheet = ref(false)
const selectedPokemon = ref(null)
const detailLoading = ref(false)
const detailError = ref('')

// hier filter je de favorieten op basis van de zoektekst. Als de zoektekst leeg is, worden alle favorieten getoond.
const filteredPokemons = computed(() => {
  return favoritePokemons.value.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchText.value.toLowerCase())
  })
})

function toggleSearch() {
  showSearch.value = !showSearch.value
}

function toggleFavorite(pokemon) {
  // item haalt de huidige pokemon op uit de favorietenlijst. Als deze er is, wordt hij verwijderd. Als hij er niet is, wordt hij toegevoegd.
  favoritePokemons.value = favoritePokemons.value.filter((item) => item.name !== pokemon.name)
  // localStorage kan alleen tekst bewaren, daarom wordt de array omgezet naar JSON-tekst.
  localStorage.setItem('favoritePokemons', JSON.stringify(favoritePokemons.value))
}

async function selectPokemon(pokemon) {
  showDetailSheet.value = true
  selectedPokemon.value = null
  detailLoading.value = true
  detailError.value = ''

  // await wacht op de detailgegevens. try/catch toont een fout als de call mislukt.
  try {
    const response = await fetch(pokemon.url)
    if (!response.ok) throw new Error('Details konden niet geladen worden.')
    selectedPokemon.value = await response.json()
  } catch (err) {
    detailError.value = err.message
  } finally {
    // finally stopt de laadstatus altijd, ook als er een fout ontstaat.
    detailLoading.value = false
  }
}

// onmounted is een component die staat echt in beeld, dan wordt de code uitgevoerd. In dit geval wordt de favorietenlijst opgehaald uit localStorage.
onMounted(() => {
  // JSON.parse zet de opgeslagen tekst weer terug naar een array.
  favoritePokemons.value = JSON.parse(localStorage.getItem('favoritePokemons')) || []
})
</script>

<template>
  <AppTopBar :show-search="showSearch" @toggle-search="toggleSearch" />

  <main>
    <h1>Favoriete pokemon</h1>

    <PokemonSearch
      v-if="showSearch"
      :search-text="searchText"
      @search="searchText = $event"
    />
    <PokemonImageList
      :pokemons="filteredPokemons"
      :favorite-pokemons="favoritePokemons"
      empty-text="Je hebt nog geen favoriete pokemon."
      @toggle-favorite="toggleFavorite"
      @select-pokemon="selectPokemon"
    />
  </main>

  <PokemonDetailSheet
    v-if="showDetailSheet"
    :pokemon="selectedPokemon"
    :loading="detailLoading"
    :error="detailError"
    @close="showDetailSheet = false"
  />
</template>

<style scoped>
@import url('https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css');
@import url('https://fonts.googleapis.com/icon?family=Material+Icons');

h1 {
  margin: 24px;
}
</style>

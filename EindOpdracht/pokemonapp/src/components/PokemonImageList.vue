<script setup>
import PokemonCard from './PokemonCard.vue'

const props = defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
  favoritePokemons: {
    type: Array,
    default: () => [],
  },
  // als geen pokemons gevonden worden is dit de property die de tekst bevat die getoond moet worden.
  emptyText: {
    type: String,
    default: 'Geen pokemon gevonden.',
  },
})

// event voor het toggelen van favorieten en het selecteren van een pokemon voor de detailsheet
const emit = defineEmits(['toggle-favorite', 'select-pokemon'])

function isFavorite(pokemon) {
  // some geeft true terug zodra dezelfde Pokemon in de favorieten staat.
  // some controleert minstens 1 element in de array en geeft true terug als dat element voldoet aan de voorwaarde in de callback-functie.
  return props.favoritePokemons.some((favoritePokemon) => {
    return favoritePokemon.name === pokemon.name
  })
}
</script>

<template>
  <div class="masonry-image-list">
    <p v-if="pokemons.length === 0">{{ emptyText }}</p>

    <ul v-else class="mdc-image-list mdc-image-list--masonry">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
        :is-favorite="isFavorite(pokemon)"
        @toggle-favorite="emit('toggle-favorite', pokemon)"
        @select-pokemon="emit('select-pokemon', pokemon)"
      />
    </ul>
  </div>
</template>

<style scoped>
.masonry-image-list {
  padding: 24px;
}

p {
  margin: 0;
}

.mdc-image-list {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
}

@media (max-width: 900px) {
  .mdc-image-list {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .mdc-image-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}
</style>

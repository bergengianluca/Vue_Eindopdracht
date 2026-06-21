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
  emptyText: {
    type: String,
    default: 'Geen pokemon gevonden.',
  },
})

const emit = defineEmits(['toggle-favorite', 'select-pokemon'])

function isFavorite(pokemon) {
  // some geeft true terug zodra dezelfde Pokemon in de favorieten staat.
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

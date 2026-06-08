<script setup>
import PokemonCard from './PokemonCard.vue'

defineProps({
  pokemons: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <div class="masonry-image-list">
    <ul class="mdc-image-list mdc-image-list--masonry">
      <PokemonCard
        v-for="pokemon in pokemons"
        :key="pokemon.name"
        :pokemon="pokemon"
      />
    </ul>
  </div>
</template>

<style scoped>
.masonry-image-list {
  padding: 24px;
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

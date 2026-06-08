<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
})

function getPokemonId() {
  return props.pokemon.url.split('/').filter(Boolean).pop()
}

function getPokemonImage() {
  const id = getPokemonId()
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<template>
  <li class="mdc-image-list__item pokemon-card" :title="formatPokemonName(pokemon.name)">
    <img
      class="mdc-image-list__image"
      :src="getPokemonImage()"
      :alt="formatPokemonName(pokemon.name)"
    >
    <div class="mdc-image-list__supporting">
      <span class="mdc-image-list__label">
        {{ formatPokemonName(pokemon.name) }}
      </span>
    </div>
  </li>
</template>

<style scoped>
.mdc-image-list__item {
  display: flex;
  flex-direction: column;
  min-width: 0;
  margin: 0;
}

.pokemon-card {
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.mdc-image-list__image {
  background-color: #ffffff;
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
  padding: 16px;
  box-sizing: border-box;
}

.mdc-image-list__supporting {
  background-color: #212121;
  min-height: 48px;
  display: flex;
  align-items: center;
  padding: 0 12px;
  box-sizing: border-box;
}

.mdc-image-list__label {
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
  text-transform: capitalize;
}
</style>

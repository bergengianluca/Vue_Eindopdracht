<script setup>
const props = defineProps({
  pokemon: {
    type: Object,
    required: true,
  },
  isFavorite: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-favorite', 'select-pokemon'])

function getPokemonId() {
  // De API-url eindigt op bijvoorbeeld /25/. Dit haalt alleen het nummer 25 eruit.
  return props.pokemon.url.split('/').filter(Boolean).pop()
}

function getPokemonImage() {
  const id = getPokemonId()
  // Met het gevonden id wordt de juiste afbeelding-URL gemaakt.
  return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`
}

function formatPokemonName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<template>
  <li
    class="mdc-image-list__item pokemon-card"
    :title="formatPokemonName(pokemon.name)"
    @click="emit('select-pokemon', pokemon)"
  >
    <img
      class="mdc-image-list__image"
      :src="getPokemonImage()"
      :alt="formatPokemonName(pokemon.name)"
    >
    <div class="mdc-image-list__supporting">
      <span class="mdc-image-list__label">
        {{ formatPokemonName(pokemon.name) }}
      </span>
      <!-- .stop zorgt dat de klik op het hartje niet ook de kaart opent. -->
      <button
        class="material-icons favorite-button"
        :class="{ favorite: isFavorite }"
        :aria-label="isFavorite ? 'Verwijder favoriet' : 'Maak favoriet'"
        @click.stop="emit('toggle-favorite', pokemon)"
      >
        {{ isFavorite ? 'favorite' : 'favorite_border' }}
      </button>
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
  cursor: pointer;
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
  justify-content: space-between;
  gap: 8px;
  padding: 0 12px;
  box-sizing: border-box;
}

.mdc-image-list__label {
  color: #ffffff;
  font-size: 16px;
  line-height: 1.2;
  text-transform: capitalize;
}

.favorite-button {
  border: 0;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  padding: 8px;
}

.favorite {
  color: #ffca28;
}
</style>

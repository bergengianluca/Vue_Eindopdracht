<script setup>
defineProps({
  pokemon: {
    type: Object,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
})

const emit = defineEmits(['close'])

function formatName(name) {
  return name.charAt(0).toUpperCase() + name.slice(1)
}
</script>

<template>
  <!-- .stop voorkomt dat een klik in de sheet ook de achtergrond aanklikt. -->
  <div class="sheet-background" @click="emit('close')">
    <section class="sheet" @click.stop>
      <button class="material-icons close-button" @click="emit('close')">close</button>

      <p v-if="loading">Details laden...</p>
      <p v-else-if="error">{{ error }}</p>

      <div v-else-if="pokemon">
        <h2>{{ formatName(pokemon.name) }}</h2>
        <img
          class="pokemon-image"
          :src="pokemon.sprites.other['official-artwork'].front_default"
          :alt="formatName(pokemon.name)"
        >

        <p>Hoogte: {{ pokemon.height }}</p>
        <p>Gewicht: {{ pokemon.weight }}</p>

        <h3>Types</h3>
        <ul>
          <li v-for="type in pokemon.types" :key="type.type.name">
            {{ type.type.name }}
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<style scoped>
.sheet-background {
  position: fixed;
  inset: 0;
  z-index: 20;
  display: flex;
  align-items: flex-end;
  background-color: rgba(0, 0, 0, 0.35);
}

.sheet {
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  padding: 24px;
  border-radius: 16px 16px 0 0;
  background-color: #ffffff;
  box-sizing: border-box;
}

.close-button {
  float: right;
  border: 0;
  background-color: transparent;
  cursor: pointer;
}

.pokemon-image {
  display: block;
  width: 180px;
  max-width: 100%;
  margin: 0 auto;
}

h2,
h3 {
  margin-top: 0;
}
</style>

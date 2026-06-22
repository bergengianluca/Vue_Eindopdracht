<script setup>
// deze component is voor het tonen van de status van het laden van de pokemons, als er een fout is of er niet is krijg je deze pagina te zien in plaats van de pokemonlijst.
defineProps({
  error: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
})
</script>

<template>
  <p v-if="loading">Pokemon laden...</p>
  <p v-else-if="error">{{ error }}</p>
</template>

<style scoped>
p {
  margin-left: 24px;
}
</style>

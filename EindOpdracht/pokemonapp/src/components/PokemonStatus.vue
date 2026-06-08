<script setup>
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

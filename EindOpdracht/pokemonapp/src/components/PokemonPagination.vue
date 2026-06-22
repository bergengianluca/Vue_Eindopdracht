<script setup>
defineProps({
  // dit houd de huidige pagina bij die getoond wordt
  currentPage: {
    type: Number,
    required: true,
  },
  // dit houd het totale aantal pagina's bij
  totalPages: {
    type: Number,
    required: true,
  },
})

// event voor het navigeren naar de vorige en volgende pagina
const emit = defineEmits(['previous-page', 'next-page'])
</script>

<template>
  <div v-if="totalPages > 1" class="pagination">
    <button
      v-if="currentPage > 1"
      class="mdc-button mdc-button--outlined"
      @click="emit('previous-page')"
    >
      <span class="mdc-button__label">Vorige</span>
    </button>

    <p>Pagina {{ currentPage }} van {{ totalPages }}</p>

    <button
      v-if="currentPage < totalPages"
      class="mdc-button mdc-button--raised"
      @click="emit('next-page')"
    >
      <span class="mdc-button__label">Volgende</span>
    </button>
  </div>
</template>

<style scoped>
.pagination {
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 0 24px 24px;
}

p {
  margin: 0;
}
</style>

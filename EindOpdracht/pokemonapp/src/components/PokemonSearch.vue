<script setup>
defineProps({
  // prop voor de zoekbalk, deze houd de huidige zoektekst bij die in de zoekbalk staat.
  searchText: {
    type: String,
    required: true,
  },
})

// event voor het updaten van de zoektekst in de zoekbalk
const emit = defineEmits(['search'])

function updateSearch(event) {
  // deze functie word aangeroepen wanneer de gebruiker iets typt in de zoekbalk, en zendt het 'search' event uit met de nieuwe zoektekst als payload.
  // het wordt ook bij elke input-update aangeroepen, zodat het elke keer geupdate wordt
  emit('search', event.target.value)
}
</script>

<template>
  <div class="search-box">
    <label class="mdc-text-field mdc-text-field--outlined" :class="{ 'is-active': searchText }">
      <span class="mdc-notched-outline">
        <span class="mdc-notched-outline__leading"></span>
        <span class="mdc-notched-outline__notch">
          <span
            class="mdc-floating-label"
            :class="{ 'mdc-floating-label--float-above': searchText }"
          >
            Zoek pokemon
          </span>
        </span>
        <span class="mdc-notched-outline__trailing"></span>
      </span>
      <input
        class="mdc-text-field__input"
        type="text"
        aria-label="Zoek pokemon"
        :value="searchText"
        @input="updateSearch"
      >
    </label>
  </div>
</template>

<style scoped>
.search-box {
  margin: 0 24px 8px;
  max-width: 360px;
}

.mdc-text-field {
  width: 100%;
}

.is-active {
  background-color: #f7f2ff;
}
</style>

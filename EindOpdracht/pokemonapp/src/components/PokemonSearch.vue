<script setup>
defineProps({
  searchText: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['search'])

function updateSearch(event) {
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

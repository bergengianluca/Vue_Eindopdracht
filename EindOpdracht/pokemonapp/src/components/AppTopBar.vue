<script setup>
defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['toggle-search'])
</script>

<template>
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
          aria-label="Open navigation menu"
        >
          menu
        </button>
        <span class="mdc-top-app-bar__title" id="homebtn">Home</span>
      </section>
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
        <button
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          :class="{ 'search-active': showSearch }"
          aria-label="Search"
          @click="emit('toggle-search')"
        >
          search
        </button>
        <button
          class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
          aria-label="Options"
        >
          more_vert
        </button>
      </section>
    </div>
  </header>
</template>

<style scoped>
.mdc-top-app-bar {
  position: sticky;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: #6200ee;
}

.mdc-top-app-bar__row {
  height: 64px;
}

.mdc-top-app-bar__title {
  padding-left: 20px;
  font-size: 24px;
}

.mdc-icon-button {
  color: #ffffff;
}

.search-active {
  background-color: rgba(255, 255, 255, 0.2);
}
</style>

<script setup>
import { ref } from 'vue'

defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
  currentView: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['toggle-search', 'change-view'])
const showMenu = ref(false)

function toggleMenu() {
  showMenu.value = !showMenu.value
}

function changeView(newView) {
  emit('change-view', newView)
  showMenu.value = false
}
</script>

<template>
  <header class="mdc-top-app-bar">
    <div class="mdc-top-app-bar__row">
      <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
        <button
          class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
          aria-label="Open navigation menu"
          @click="toggleMenu"
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

    <nav v-if="showMenu" class="menu">
      <button
        class="menu-button"
        :class="{ active: currentView === 'all' }"
        @click="changeView('all')"
      >
        Alle pokemon
      </button>
      <button
        class="menu-button"
        :class="{ active: currentView === 'favorites' }"
        @click="changeView('favorites')"
      >
        Favorieten
      </button>
    </nav>
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

.menu {
  position: absolute;
  top: 64px;
  left: 0;
  width: 220px;
  background-color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
}

.menu-button {
  display: block;
  width: 100%;
  padding: 16px 24px;
  border: 0;
  background-color: #ffffff;
  color: #212121;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
}

.menu-button:hover,
.active {
  background-color: #f1e8ff;
}
</style>

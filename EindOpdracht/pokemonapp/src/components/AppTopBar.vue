<script setup>
import { ref } from 'vue'

// definieert een componentprop die aangeeft of de zoekknop actief is
defineProps({
  showSearch: {
    type: Boolean,
    default: false,
  },
})

// definieert een event dat wordt uitgezonden wanneer de zoekknop wordt ingedrukt
const emit = defineEmits(['toggle-search'])

// ref om te kijken of hamburgermenu open of dicht is
const showMenu = ref(false)

// functie om het hamburgermenu te openen en sluiten
function toggleMenu() {
  showMenu.value = !showMenu.value
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
        <span class="mdc-top-app-bar__title">Pokemon App</span>
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
      <RouterLink
        to="/"
        class="menu-button"
        @click="showMenu = false"
      >
        Alle pokemon
      </RouterLink>
      <RouterLink
        to="/favorieten"
        class="menu-button"
        @click="showMenu = false"
      >
        Favorieten
      </RouterLink>
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
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}

.menu-button:hover,
.router-link-exact-active {
  background-color: #f1e8ff;
}
</style>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'

const showInstallPrompt = ref(false)
const installEvent = ref(null)
let showTimer = null

function saveInstallEvent(event) {
  // De browserbanner wordt tegengehouden, zodat we onze eigen banner kunnen tonen.
  event.preventDefault()
  installEvent.value = event

  // De banner verschijnt drie seconden nadat installeren mogelijk is geworden.
  showTimer = setTimeout(() => {
    showInstallPrompt.value = true
  }, 3000)
}

async function installApp() {
  if (!installEvent.value) return

  // prompt opent het echte installatiescherm van de browser.
  installEvent.value.prompt()
  await installEvent.value.userChoice

  showInstallPrompt.value = false
  installEvent.value = null
}

function closeInstallPrompt() {
  showInstallPrompt.value = false
}

onMounted(() => {
  window.addEventListener('beforeinstallprompt', saveInstallEvent)
  window.addEventListener('appinstalled', closeInstallPrompt)
})

onBeforeUnmount(() => {
  clearTimeout(showTimer)
  window.removeEventListener('beforeinstallprompt', saveInstallEvent)
  window.removeEventListener('appinstalled', closeInstallPrompt)
})
</script>

<template>
  <aside v-if="showInstallPrompt" class="install-banner">
    <p>Wil je deze app op je apparaat installeren?</p>

    <button class="install-button" @click="installApp">
      Installeren
    </button>

    <button
      class="material-icons close-button"
      aria-label="Installatiemelding sluiten"
      @click="closeInstallPrompt"
    >
      close
    </button>
  </aside>
</template>

<style scoped>
.install-banner {
  position: fixed;
  right: 16px;
  bottom: 16px;
  left: 16px;
  z-index: 30;
  display: flex;
  align-items: center;
  gap: 16px;
  max-width: 520px;
  padding: 16px;
  border-radius: 4px;
  background-color: #323232;
  color: #ffffff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  box-sizing: border-box;
}

p {
  flex: 1;
  margin: 0;
  line-height: 1.4;
}

.install-button {
  min-height: 40px;
  padding: 0 16px;
  border: 0;
  border-radius: 4px;
  background-color: #03a9d9;
  color: #ffffff;
  font-weight: bold;
  text-transform: uppercase;
  cursor: pointer;
}

.close-button {
  width: 40px;
  height: 40px;
  padding: 0;
  border: 0;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
}

@media (min-width: 600px) {
  .install-banner {
    left: auto;
    width: 520px;
  }
}
</style>

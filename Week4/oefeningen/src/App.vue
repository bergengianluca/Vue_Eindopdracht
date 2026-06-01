<script setup>
import { ref } from 'vue'
import ProfielKaart from './components/ProfielKaart.vue'
import VriendKaart from './components/VriendKaart.vue'

const vrienden = ref([
  { id: 1, naam: 'Sven', leeftijd: 19, woonplaats: 'Doetinchem', isOnline: true },
  { id: 2, naam: 'Fatuma', leeftijd: 21, woonplaats: 'Zelhem', isOnline: true },
  { id: 3, naam: 'Daan', leeftijd: 18, woonplaats: 'Zeddam', isOnline: true },
  { id: 4, naam: 'Yara', leeftijd: 20, woonplaats: 'Wehl', isOnline: false }
])

const toggleStatus = (vriendId) => {
  const vriend = vrienden.value.find(v => v.id === vriendId)
  if (vriend) {
    vriend.isOnline = !vriend.isOnline
  }
}
</script>

<template>
  <div class="app">
    <section>
      <h2>Profielkaarten</h2>
      <div class="container">
        <ProfielKaart 
          naam="John Doe" 
          functie="Product Manager" 
          afdeling="Marketing"
        />
        <ProfielKaart 
          naam="Sarah Smith" 
          functie="Software Engineer" 
          afdeling="Development"
        />
        <ProfielKaart 
          naam="Mike Johnson" 
          functie="UX Designer" 
          afdeling="Design"
        />
      </div>
    </section>

    <section>
      <h2>Teamoverzicht</h2>
      <div class="container">
        <VriendKaart 
          v-for="vriend in vrienden" 
          :key="vriend.id"
          :id="vriend.id"
          :naam="vriend.naam"
          :leeftijd="vriend.leeftijd"
          :woonplaats="vriend.woonplaats"
          :isOnline="vriend.isOnline"
          @toggle-status="toggleStatus"
        />
      </div>
    </section>
  </div>
</template>

<style scoped>
.app {
  padding: 20px;
}

section {
  margin-bottom: 40px;
}

.app h2 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
}
</style>

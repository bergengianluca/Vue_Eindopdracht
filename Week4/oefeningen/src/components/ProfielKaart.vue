<script setup>
defineProps({
  naam: String,
  functie: String,
  afdeling: String
})
</script>

<template>
  <div class="profielkaart">
    <h1>{{ naam }}</h1>
    <p class="functie">{{ functie }}</p>
    <p class="afdeling">{{ afdeling }}</p>
  </div>
</template>

<style scoped>
.profielkaart {
  border: 2px solid #333;
  border-radius: 8px;
  padding: 20px;
  margin: 20px;
  background-color: #f9f9f9;
  max-width: 300px;
}

.profielkaart h1 {
  margin: 0 0 10px 0;
  font-size: 24px;
  color: #333;
}

.functie {
  margin: 5px 0;
  font-weight: bold;
  color: #555;
}

.afdeling {
  margin: 5px 0;
  color: #888;
  font-size: 14px;
}
</style>

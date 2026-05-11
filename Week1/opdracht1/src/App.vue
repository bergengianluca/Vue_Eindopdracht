<script setup>
import { ref } from 'vue'

const naam = ref('')
const film = ref('')
const prijs = ref(0);
const teller = ref(1)
const isReserveerd = ref(false) 
const tekst = ref('');

function omhoog() {
  if (teller.value <= 5)
      teller.value++
}

function omlaag() {
  if (teller.value >= 2)
      teller.value--
}

function reserveer() {
  prijs.value = teller.value * 12.50
  isReserveerd.value = true
    if (teller.value == 1) {
      tekst.value = naam.value + " reserveerd " + teller.value + " ticket voor " + film.value + " totaal: EUR " + prijs.value
    }
    if (teller.value >= 2) {
      tekst.value = naam.value + " reserveerde " + teller.value + " tickets voor " + film.value + " totaal: EUR " + prijs.value
    }
}

function reset() {
  isReserveerd.value = false
  naam.value = ""
  film.value = ""
  prijs.value = 0
  teller.value = 1
}


</script>

<template>
  <input type="text" v-model="naam">
  <input type="text" v-model="film"> <br>

  <button @click="omhoog()">+</button>
  <h1>{{ teller }}</h1>
  <button @click="omlaag()">-</button>

  <p>Prijs per ticket: EUR:12.50</p>

  <button @click="reserveer">reserveer</button>
  <button @click="reset">reset</button>
  <h1 v-show="isReserveerd">{{tekst }}</h1>
  <h1 v-show="!isReserveerd"></h1>
</template>

<style>

</style>
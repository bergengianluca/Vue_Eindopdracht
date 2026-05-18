<script setup>
import { ref } from 'vue'

const games = ref([
  { id: 1, naam: 'GTA V', genre: 'Action', prijs: 59.99, opVoorraad: true },
  { id: 2, naam: 'Battlefield 2042', genre: 'Shooter', prijs: 49.99, opVoorraad: true },
  { id: 3, naam: 'FIFA 24', genre: 'Sport', prijs: 69.99, opVoorraad: true },
  { id: 4, naam: 'Minecraft', genre: 'Sandbox', prijs: 29.99, opVoorraad: true },
  { id: 5, naam: 'Gran Turismo 7', genre: 'Racing', prijs: 79.99, opVoorraad: false },
  { id: 6, naam: 'The Last of Us Part II', genre: 'Adventure', prijs: 39.99, opVoorraad: true },
])

const winkelwagen = ref([])
const nieuweNaam = ref('')
const nieuweGenre = ref('')
const nieuwePrijs = ref('')
const nieuweVoorraad = ref(true)

let volgendeId = 7

function voegToeAanWinkelwagen(game) {
  winkelwagen.value.push(game)
}

function voegGameToe() {
  const prijs = Number.parseFloat(nieuwePrijs.value)

  if (!nieuweNaam.value.trim() || !nieuweGenre.value.trim() || Number.isNaN(prijs)) {
    return
  }

  games.value.push({
    id: volgendeId,
    naam: nieuweNaam.value.trim(),
    genre: nieuweGenre.value.trim(),
    prijs,
    opVoorraad: nieuweVoorraad.value,
  })

  volgendeId += 1
  nieuweNaam.value = ''
  nieuweGenre.value = ''
  nieuwePrijs.value = ''
  nieuweVoorraad.value = true
}
</script>

<template>
  <div>
    <p>Winkelwagen: {{ winkelwagen.length }}</p>
    <p v-if="winkelwagen.length === 0">De winkelwagen is leeg.</p>

    <p v-for="game in games" :key="game.id">
      {{ game.naam }} - {{ game.genre }} - €{{ game.prijs.toFixed(2) }}
      <button v-if="game.opVoorraad" type="button" @click="voegToeAanWinkelwagen(game)">bestel</button>
    </p>

    <p>
      <input v-model="nieuweNaam" type="text" placeholder="naam">
    </p>
    <p>
      <input v-model="nieuweGenre" type="text" placeholder="genre">
    </p>
    <p>
      <input v-model="nieuwePrijs" type="number" min="0" step="0.01" placeholder="prijs">
    </p>
    <p>
      <label>
        <input v-model="nieuweVoorraad" type="checkbox">
        op voorraad
      </label>
    </p>
    <p>
      <button type="button" @click="voegGameToe">toevoegen</button>
    </p>
  </div>
</template>

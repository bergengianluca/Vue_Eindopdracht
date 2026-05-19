<script setup>
import { computed, ref } from 'vue'

const temperatuur = ref('')

const achtergrondKleur = computed(() => {
	const temp = Number.parseFloat(temperatuur.value)

	if (Number.isNaN(temp)) {
		return 'wit'
	}

	if (temp < 5) {
		return 'donkerblauw'
	}

	if (temp < 15) {
		return 'blauw'
	}

	if (temp < 25) {
		return 'geel'
	}

	return 'oranje'
})
</script>

<template>
	<div class="pagina" :class="achtergrondKleur">
		<h1>Weerstation: Voer de temperatuur in</h1>

		<input v-model="temperatuur" type="number" placeholder="Voer temperatuur in" />
	</div>
</template>

<style scoped>
.pagina {
	min-height: 100vh;
	padding: 0.5rem;
	background-color: white;
}

body,
h1 {
	margin: 0;
}

.donkerblauw {
	background-color: #00008b;
}

.blauw {
	background-color: #4169e1;
}

.geel {
	background-color: #ffd700;
}

.oranje {
	background-color: #d97a22;
}
</style>

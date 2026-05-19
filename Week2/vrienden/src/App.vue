<script setup>
import { ref, computed } from 'vue'

const vrienden = ref([
	{ id: 1, naam: 'Sven', leeftijd: 19, woonplaats: 'Doetinchem', isOnline: true },
	{ id: 2, naam: 'Daan', leeftijd: 18, woonplaats: 'Zeddam', isOnline: true },
	{ id: 3, naam: 'Sophie', leeftijd: 24, woonplaats: 'Amsterdam', isOnline: false },
	{ id: 4, naam: 'Lars', leeftijd: 27, woonplaats: 'Rotterdam', isOnline: false }
])

const onlineVrienden = computed(() => vrienden.value.filter(v => v.isOnline))
</script>

<template>
	<div>
		<h1>Vriendenlijst</h1>
		<section>
			<p v-for="vriend in onlineVrienden" :key="vriend.id">
				{{ vriend.naam }} ({{ vriend.leeftijd }}) uit {{ vriend.woonplaats }}
			</p>
		</section>
	</div>
</template>

<script setup>
import { ref, computed } from 'vue'

const vrienden = ref([
	{ id: 1, naam: 'Sven', leeftijd: 19, woonplaats: 'Doetinchem', isOnline: true },
	{ id: 2, naam: 'Daan', leeftijd: 18, woonplaats: 'Zeddam', isOnline: true },
	{ id: 3, naam: 'Sophie', leeftijd: 24, woonplaats: 'Amsterdam', isOnline: true },
	{ id: 4, naam: 'Lars', leeftijd: 27, woonplaats: 'Rotterdam', isOnline: false },
	{ id: 5, naam: 'Noa', leeftijd: 22, woonplaats: 'Utrecht', isOnline: true },
	{ id: 6, naam: 'Milan', leeftijd: 30, woonplaats: 'Eindhoven', isOnline: false }
])

const onlineVrienden = computed(() => vrienden.value.filter(v => v.isOnline))
const onlineCount = computed(() => onlineVrienden.value.length)
const totalCount = computed(() => vrienden.value.length)
</script>

<template>
	<div>
		<h1>Vriendenlijst</h1>
		<p>Online vrienden: {{ onlineCount }} / Totaal: {{ totalCount }}</p>
		<section>
			<p v-for="vriend in onlineVrienden" :key="vriend.id">
				{{ vriend.naam }} ({{ vriend.leeftijd }}) uit {{ vriend.woonplaats }}
			</p>
		</section>
	</div>
</template>

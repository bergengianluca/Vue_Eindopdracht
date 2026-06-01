<script setup>
import vrienden from '@/data/vrienden';
</script>

<template>
    <div>
		<h1>Vriendenlijst</h1>
		<section>
      <li v-for="vriend in vrienden" :key="vriend.id">
        <RouterLink :to="`/detail/${vriend.id}`">
          {{ vriend.naam }}
        </RouterLink>
      </li>
		</section>
	</div>
</template>

<style scoped></style>
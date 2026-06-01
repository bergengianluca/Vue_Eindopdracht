<script setup>
import vrienden from '@/data/vrienden';
import { useRoute } from 'vue-router';

const route = useRoute()
const id = Number(route.params.id)
const vriend = vrienden.find(v => v.id === id)
</script>

<template>
  <h1>{{ vriend.naam}} {{ vriend.leeftijd }} {{ vriend.woonplaats }}</h1>
</template>

<style scoped></style>
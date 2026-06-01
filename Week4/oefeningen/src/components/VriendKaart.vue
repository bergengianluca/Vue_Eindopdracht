<script setup>
const { id } = defineProps({
  id: Number,
  naam: String,
  leeftijd: Number,
  woonplaats: String,
  isOnline: Boolean
})

const emit = defineEmits(['toggle-status'])

const handleClick = () => {
  emit('toggle-status', id)
}
</script>

<template>
  <div class="vriendkaart" :class="{ online: isOnline }" @click="handleClick">
    <div class="header">
      <h3>{{ naam }}</h3>
      <span v-if="isOnline" class="badge">Online</span>
    </div>
    <p><strong>Leeftijd:</strong> {{ leeftijd }} jaar</p>
    <p><strong>Woonplaats:</strong> {{ woonplaats }}</p>
  </div>
</template>

<style scoped>
.vriendkaart {
  border: 2px solid #ddd;
  border-radius: 8px;
  padding: 15px;
  margin: 10px;
  background-color: #f5f5f5;
  width: 250px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}

.vriendkaart:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.vriendkaart.online {
  border-color: #4caf50;
  background-color: #f1f8f4;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.vriendkaart h3 {
  margin: 0 0 10px 0;
  color: #333;
  flex: 1;
}

.badge {
  background-color: #c8e6c9;
  color: #2e7d32;
  padding: 4px 10px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
}

.vriendkaart p {
  margin: 8px 0;
  color: #666;
  font-size: 14px;
}

.status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 10px;
  font-weight: bold;
}

.indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #999;
}

.indicator.online {
  background-color: #4caf50;
}
</style>

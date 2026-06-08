<script setup>
import { ref, onMounted } from 'vue'

const users = ref([])
const loading = ref(true)
const error = ref(null)

const fetchUsers = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} - ${response.statusText}`)
    }
    users.value = await response.json()
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'An unknown error occurred'
    console.error('Error fetching users:', err)
  } finally {
    loading.value = false
  }
}

const retry = () => {
  fetchUsers()
}

onMounted(() => {
  fetchUsers()
})
</script>

<template>
  <div class="container">
    <h1>Users List</h1>
    
    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p class="loading-text">Loading users...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <div class="error-icon">⚠️</div>
      <h2>Something went wrong</h2>
      <p class="error-message">{{ error }}</p>
      <button @click="retry" class="retry-button">Try Again</button>
    </div>

    <!-- Users List -->
    <div v-else class="users-list">
      <div v-for="user in users" :key="user.id" class="user-card">
        <div class="user-header">
          <h2>{{ user.name }}</h2>
          <span class="user-id">#{{ user.id }}</span>
        </div>
        <div class="user-details">
          <p><strong>Username:</strong> <span class="highlight">@{{ user.username }}</span></p>
          <p><strong>Email:</strong> <a :href="`mailto:${user.email}`">{{ user.email }}</a></p>
          <p><strong>Phone:</strong> {{ user.phone }}</p>
          <p><strong>Website:</strong> <a :href="`https://${user.website}`" target="_blank">{{ user.website }}</a></p>
          <p><strong>Company:</strong> {{ user.company.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 40px;
  font-size: 2.5em;
}

/* Loading State */
.loading-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  gap: 20px;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 4px solid #e0e0e0;
  border-top: 4px solid #1976d2;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.loading-text {
  font-size: 18px;
  color: #666;
  margin: 0;
}

/* Error State */
.error-container {
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
  border: 2px solid #ef5350;
  border-radius: 12px;
  padding: 40px 20px;
  text-align: center;
  min-height: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;
}

.error-icon {
  font-size: 48px;
}

.error-container h2 {
  color: #c62828;
  margin: 10px 0;
  font-size: 24px;
}

.error-message {
  color: #d32f2f;
  font-size: 16px;
  margin: 10px 0;
  font-family: 'Courier New', monospace;
}

.retry-button {
  background: linear-gradient(135deg, #ef5350 0%, #e53935 100%);
  color: white;
  border: none;
  padding: 12px 30px;
  font-size: 16px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  margin-top: 10px;
}

.retry-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
}

.retry-button:active {
  transform: translateY(0);
}

/* Users List */
.users-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 24px;
}

.user-card {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.user-card:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  transform: translateY(-4px);
  border-color: #1976d2;
}

.user-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 12px;
}

.user-header h2 {
  margin: 0;
  color: #1976d2;
  font-size: 20px;
}

.user-id {
  background: #e3f2fd;
  color: #1976d2;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
}

.user-details p {
  margin: 12px 0;
  color: #555;
  font-size: 14px;
  line-height: 1.5;
}

.user-details strong {
  color: #2c3e50;
  font-weight: 600;
}

.highlight {
  color: #1976d2;
  font-weight: 500;
}

.user-details a {
  color: #1976d2;
  text-decoration: none;
  transition: color 0.2s ease;
}

.user-details a:hover {
  color: #1565c0;
  text-decoration: underline;
}
</style>

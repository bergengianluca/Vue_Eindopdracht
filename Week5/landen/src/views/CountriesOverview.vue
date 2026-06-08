<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const countries = ref([])
const loading = ref(true)
const error = ref(null)
const searchQuery = ref('')

const fetchCountries = async () => {
  loading.value = true
  error.value = null
  try {
    const response = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,cca3')
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }
    const data = await response.json()
    // Sort alphabetically by common name
    countries.value = data.sort((a, b) => 
      a.name.common.localeCompare(b.name.common)
    )
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch countries'
    console.error('Error fetching countries:', err)
  } finally {
    loading.value = false
  }
}

const filteredCountries = computed(() => {
  if (!searchQuery.value) return countries.value
  return countries.value.filter(country =>
    country.name.common.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})

const goToDetail = (cca3Code) => {
  router.push({
    name: 'CountryDetail',
    params: { code: cca3Code }
  })
}

const retry = () => {
  fetchCountries()
}

onMounted(() => {
  fetchCountries()
})
</script>

<template>
  <div class="container">
    <div class="header">
      <h1>🌍 Countries of the World</h1>
      <p class="subtitle">Explore information about countries from around the globe</p>
    </div>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading countries...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>❌ {{ error }}</p>
      <button @click="retry" class="retry-button">Try Again</button>
    </div>

    <!-- Countries List -->
    <div v-else>
      <!-- Search -->
      <div class="search-container">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="🔍 Search countries..."
          class="search-input"
        />
        <p class="result-count">{{ filteredCountries.length }} countries found</p>
      </div>

      <!-- Countries Grid -->
      <div class="countries-grid">
        <div
          v-for="country in filteredCountries"
          :key="country.cca3"
          @click="goToDetail(country.cca3)"
          class="country-card"
        >
          <div class="flag">
            <img v-if="country.flags?.svg" :src="country.flags.svg" :alt="country.name.common + ' flag'" class="flag-image" />
            <div v-else class="flag-placeholder">🚩</div>
          </div>
          <h3>{{ country.name.common }}</h3>
          <span class="code">{{ country.cca3 }}</span>
        </div>
      </div>

      <!-- No results -->
      <div v-if="filteredCountries.length === 0" class="no-results">
        <p>No countries found matching "{{ searchQuery }}"</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  text-align: center;
  margin-bottom: 40px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 40px 20px;
  border-radius: 12px;
  color: white;
}

.header h1 {
  margin: 0;
  font-size: 2.5em;
}

.subtitle {
  margin: 10px 0 0 0;
  font-size: 1.1em;
  opacity: 0.9;
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
  border-top: 4px solid #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Error State */
.error-container {
  background: #ffebee;
  border: 2px solid #ef5350;
  border-radius: 12px;
  padding: 30px;
  text-align: center;
  color: #c62828;
}

.retry-button {
  background: #ef5350;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 15px;
  transition: all 0.3s ease;
}

.retry-button:hover {
  background: #e53935;
  transform: translateY(-2px);
}

/* Search */
.search-container {
  margin-bottom: 30px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-input {
  padding: 12px 16px;
  font-size: 16px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
  max-width: 400px;
}

.search-input:focus {
  outline: none;
  border-color: #667eea;
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.result-count {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* Countries Grid */
.countries-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 20px;
  margin-bottom: 40px;
}

.country-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 16px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.country-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  border-color: #667eea;
}

.flag {
  font-size: 4em;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.flag img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
}

.country-card h3 {
  margin: 0;
  color: #333;
  font-size: 16px;
  word-break: break-word;
}

.code {
  font-size: 12px;
  color: #999;
  background: #f5f5f5;
  padding: 2px 6px;
  border-radius: 4px;
}

.no-results {
  text-align: center;
  padding: 40px;
  color: #999;
  font-size: 18px;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 1.8em;
  }

  .countries-grid {
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    gap: 15px;
  }

  .flag {
    font-size: 3em;
    height: 60px;
  }
}
</style>

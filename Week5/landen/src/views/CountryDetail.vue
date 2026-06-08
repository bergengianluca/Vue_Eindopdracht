<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const country = ref(null)
const loading = ref(true)
const error = ref(null)

const fetchCountryDetail = async () => {
  loading.value = true
  error.value = null
  try {
    const code = route.params.code
    const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`)
    if (!response.ok) {
      throw new Error(`Country not found (Code: ${code})`)
    }
    const data = await response.json()
    country.value = data[0]
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch country details'
    console.error('Error fetching country:', err)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.push({ name: 'CountriesOverview' })
}

const retry = () => {
  fetchCountryDetail()
}

onMounted(() => {
  fetchCountryDetail()
})

const getCurrencyString = () => {
  if (!country.value?.currencies) return 'N/A'
  return Object.entries(country.value.currencies)
    .map(([code, data]) => `${data.name} (${code})`)
    .join(', ')
}

const getLanguagesString = () => {
  if (!country.value?.languages) return 'N/A'
  return Object.values(country.value.languages).join(', ')
}

const formatNumber = (num) => {
  return num?.toLocaleString() || 'N/A'
}
</script>

<template>
  <div class="container">
    <!-- Back Button -->
    <button @click="goBack" class="back-button">← Back to Countries</button>

    <!-- Loading State -->
    <div v-if="loading" class="loading-container">
      <div class="spinner"></div>
      <p>Loading country details...</p>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="error-container">
      <p>❌ {{ error }}</p>
      <button @click="retry" class="retry-button">Try Again</button>
    </div>

    <!-- Country Details -->
    <div v-else-if="country" class="country-detail">
      <div class="detail-header">
        <div class="flag-container">
          <img v-if="country.flags?.svg" :src="country.flags.svg" :alt="country.name.common + ' flag'" class="flag-image" />
          <div v-else class="flag-placeholder">🚩</div>
        </div>
        <div class="header-content">
          <h1>{{ country.name.common }}</h1>
          <p class="official-name">{{ country.name.official }}</p>
          <p class="code">Country Code: {{ country.cca3 }} | {{ country.cca2 }}</p>
        </div>
      </div>

      <!-- National Symbol -->
      <div v-if="country.coatOfArms?.svg" class="coat-of-arms">
        <h2>National Coat of Arms</h2>
        <img :src="country.coatOfArms.svg" :alt="country.name.common + ' coat of arms'" />
      </div>

      <!-- Details Grid -->
      <div class="details-grid">
        <div class="detail-card">
          <h3>📍 Geographic Information</h3>
          <div class="detail-item">
            <label>Capital:</label>
            <span>{{ country.capital?.[0] || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <label>Region:</label>
            <span>{{ country.region }}</span>
          </div>
          <div class="detail-item">
            <label>Subregion:</label>
            <span>{{ country.subregion || 'N/A' }}</span>
          </div>
          <div class="detail-item">
            <label>Coordinates:</label>
            <span v-if="country.latlng">{{ country.latlng[0].toFixed(2) }}°, {{ country.latlng[1].toFixed(2) }}°</span>
            <span v-else>N/A</span>
          </div>
          <div class="detail-item">
            <label>Area:</label>
            <span>{{ formatNumber(country.area) }} km²</span>
          </div>
        </div>

        <div class="detail-card">
          <h3>👥 Population & Demographics</h3>
          <div class="detail-item">
            <label>Population:</label>
            <span>{{ formatNumber(country.population) }}</span>
          </div>
          <div class="detail-item">
            <label>Languages:</label>
            <span>{{ getLanguagesString() }}</span>
          </div>
          <div class="detail-item">
            <label>Timezones:</label>
            <span>{{ country.timezones?.join(', ') || 'N/A' }}</span>
          </div>
        </div>

        <div class="detail-card">
          <h3>💰 Economic Information</h3>
          <div class="detail-item">
            <label>Currency:</label>
            <span>{{ getCurrencyString() }}</span>
          </div>
        </div>

        <div class="detail-card">
          <h3>🌐 Borders & Access</h3>
          <div class="detail-item">
            <label>Landlocked:</label>
            <span>{{ country.landlocked ? 'Yes' : 'No' }}</span>
          </div>
          <div class="detail-item">
            <label>Borders:</label>
            <span>{{ country.borders?.join(', ') || 'None (Island)' }}</span>
          </div>
          <div class="detail-item">
            <label>UN Member:</label>
            <span>{{ country.unMember ? 'Yes' : 'No' }}</span>
          </div>
        </div>

        <div class="detail-card">
          <h3>🚗 Driving Information</h3>
          <div class="detail-item">
            <label>Driving Side:</label>
            <span>{{ country.car?.side === 'left' ? 'Left' : 'Right' }}</span>
          </div>
          <div class="detail-item">
            <label>Car Signs:</label>
            <span>{{ country.car?.signs?.[0] || 'N/A' }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  box-sizing: border-box;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.back-button {
  background: #667eea;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 16px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.back-button:hover {
  background: #5568d3;
  transform: translateX(-4px);
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

/* Detail Header */
.country-detail {
  animation: fadeIn 0.5s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.detail-header {
  display: flex;
  gap: 30px;
  align-items: flex-start;
  margin-bottom: 30px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 30px;
  border-radius: 12px;
  color: white;
}

.flag-container {
  flex-shrink: 0;
}

.flag-image {
  width: 200px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.flag-placeholder {
  width: 200px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 4em;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 8px;
}

.header-content h1 {
  margin: 0 0 10px 0;
  font-size: 2.5em;
}

.official-name {
  margin: 0 0 15px 0;
  font-size: 1.2em;
  opacity: 0.9;
}

.code {
  margin: 0;
  font-size: 0.9em;
  opacity: 0.8;
}

/* Coat of Arms */
.coat-of-arms {
  text-align: center;
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 12px;
}

.coat-of-arms h2 {
  margin: 0 0 15px 0;
  color: #333;
}

.coat-of-arms img {
  max-width: 250px;
  height: auto;
}

/* Details Grid */
.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
}

.detail-card {
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  transition: all 0.3s ease;
}

.detail-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  border-color: #667eea;
}

.detail-card h3 {
  margin: 0 0 15px 0;
  color: #667eea;
  font-size: 18px;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.detail-item:last-child {
  border-bottom: none;
}

.detail-item label {
  font-weight: 600;
  color: #333;
  flex-shrink: 0;
  margin-right: 10px;
}

.detail-item span {
  color: #666;
  text-align: right;
  word-break: break-word;
}

@media (max-width: 768px) {
  .detail-header {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .header-content h1 {
    font-size: 1.8em;
  }

  .flag-image {
    width: 150px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .detail-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .detail-item span {
    text-align: left;
    margin-top: 5px;
  }
}
</style>

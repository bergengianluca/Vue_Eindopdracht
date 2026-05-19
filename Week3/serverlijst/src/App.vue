<script setup>
import { ref } from 'vue'

const servers = ref([
  { id: 1, naam: 'Web server Doetinchem', status: 'online' },
  { id: 2, naam: 'Web server Arnhem', status: 'online' },
  { id: 3, naam: 'Web server Nijmegen', status: 'busy' },
  { id: 4, naam: 'SMTP server', status: 'offline' },
  { id: 5, naam: 'Mail server', status: 'busy' },
  { id: 6, naam: 'FTP server', status: 'online' }
])

// variabele voor de extra zin
const isActive = ref(true)
</script>

<template>
  <div>
    <h1>lijst met servers</h1>

    <!-- zin die groen wordt als isActive true is -->
    <p :class="{ active: isActive }">De serverlijst is actief</p>

    <section>
      <div
        v-for="server in servers"
        :key="server.id"
        class="server"
        :class="server.status"
      >
        {{ server.naam }} - {{ server.status }}
      </div>
    </section>
  </div>
</template>

<style scoped>
h1 {
  font-size: 32px;
}

.server {
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 3px;
}

.online {
  background: #0b6623; /* dark green */
  color: #fff;
}

.offline {
  background: #d62828; /* red */
  color: #fff;
}

.busy {
  background: #f4a300; /* orange */
  color: #000;
}

.active {
  color: green;
  font-weight: 600;
}
</style>

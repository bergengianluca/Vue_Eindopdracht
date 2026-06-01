<template>
  <div class="todo-container">
    <h1>Mijn To-Do Lijst</h1>
    
    <!-- Input voor nieuwe taak -->
    <div class="input-container">
      <input 
        v-model="newTask" 
        @keyup.enter="addTask"
        placeholder="Voeg een nieuwe taak toe..."
        type="text"
      />
      <button @click="addTask">Toevoegen</button>
    </div>

    <!-- Lege staat -->
    <div v-if="tasks.length === 0" class="empty-state">
      <p>Geen taken. Voeg er een toe!</p>
    </div>

    <!-- Taken lijst -->
    <div v-else class="tasks-list">
      <TaskItem 
        v-for="task in tasks" 
        :key="task.id"
        :task="task"
        @toggle="toggleTask(task.id)"
        @delete="deleteTask(task.id)"
      />
    </div>
  </div>
</template>

<script>
import TaskItem from './TaskItem.vue';

export default {
  components: {
    TaskItem
  },
  data() {
    return {
      newTask: '',
      nextId: 4,
      tasks: [
        { id: 1, name: 'Boodschappen doen', completed: false },
        { id: 2, name: 'Huiswerk maken', completed: false },
        { id: 3, name: 'Film kijken', completed: true }
      ]
    };
  },
  methods: {
    addTask() {
      // Controleer of de taak niet leeg is en niet voltooid
      if (this.newTask.trim() !== '') {
        this.tasks.push({
          id: this.nextId,
          name: this.newTask,
          completed: false
        });
        this.nextId++;
        this.newTask = '';
      }
    },
    toggleTask(id) {
      const task = this.tasks.find(t => t.id === id);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter(t => t.id !== id);
    }
  }
};
</script>

<style scoped>
.todo-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
}

.input-container {
  display: flex;
  gap: 10px;
  margin-bottom: 30px;
}

input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049;
}

.empty-state {
  text-align: center;
  color: #999;
  padding: 40px;
  font-size: 18px;
}

.tasks-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>

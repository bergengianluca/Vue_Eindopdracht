<template>
  <div :class="['task-item', { completed: task.completed }]">
    <div class="task-content">
      <input 
        type="checkbox" 
        :checked="task.completed"
        @click="$emit('toggle')"
        class="checkbox"
      />
      <span class="task-name">{{ task.name }}</span>
    </div>
    <button class="delete-btn" @click="$emit('delete')">✕</button>
  </div>
</template>

<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  emits: ['toggle', 'delete']
};
</script>

<style scoped>
.task-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.task-item:hover {
  background-color: #f0f0f0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.task-item.completed {
  background-color: #e8f5e9;
  border-color: #4CAF50;
}

.task-content {
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  cursor: pointer;
}

.checkbox {
  width: 18px;
  height: 18px;
  cursor: pointer;
}

.task-name {
  font-size: 16px;
  color: #333;
}

.task-item.completed .task-name {
  text-decoration: line-through;
  color: #999;
}

.delete-btn {
  padding: 5px 10px;
  background-color: #f44336;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

.delete-btn:hover {
  background-color: #da190b;
}
</style>

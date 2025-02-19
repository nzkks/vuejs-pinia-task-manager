<script setup>
import { computed, provide, ref } from 'vue';
import TASKSDATA from './tasks.js';
import Task from './components/Task.vue';
import Filter from './components/Filter.vue';
import Modal from './components/modal/Modal.vue';
import TaskForm from './components/TaskForm.vue';

const tasks = ref(TASKSDATA);
const filterBy = ref('');
const isModalOpen = ref(false);

provide('tasks', tasks);

const filteredTasks = computed(() => {
  switch (filterBy.value) {
    case 'todo':
      return tasks.value.filter(task => !task.completed);

    case 'done':
      return tasks.value.filter(task => task.completed);

    default:
      return tasks.value;
  }
});

function toggleCompleted(id) {
  for (let task of tasks.value) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  }
}

function setFilter(filter) {
  filterBy.value = filter;
}

function handleOpenAddTaskModal() {
  isModalOpen.value = true;
}

function closeModal() {
  isModalOpen.value = false;
}
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>Tasks Manager</h1>
      </div>
      <div class="header-side">
        <button class="btn primary" @click="handleOpenAddTaskModal">+ Add Task</button>
      </div>
    </div>

    <Filter :filterBy="filterBy" @set-filter="setFilter" />

    <div class="tasks">
      <Task v-for="task in filteredTasks" :key="task.id" :task="task" @toggle-completed="toggleCompleted" />
    </div>
  </main>

  <Teleport to="body">
    <Modal v-if="isModalOpen" @close-modal="closeModal">
      <template #header> Add Task </template>
      <TaskForm />
    </Modal>
  </Teleport>
</template>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .header-side {
    display: flex;
    align-items: center;

    h1 {
      text-transform: capitalize;
      font-size: 42px;
      font-weight: 700;
      line-height: 47px;
      letter-spacing: 0em;
      text-align: left;
    }

    .secondary {
      margin-left: 12px;
    }
  }
}

.tasks {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>

<script setup>
import { ref, watch } from 'vue';
import TASKSDATA from './tasks.js';
import Task from './components/Task.vue';
import Filter from './components/Filter.vue';

const tasks = ref(TASKSDATA);
const isTaskNameError = ref(false);
const isTaskDescriptionError = ref(false);
const filterBy = ref('');

const newTask = ref({
  name: '',
  description: '',
  completed: false,
});

function addTask() {
  if (newTask.value.name && newTask.value.description) {
    newTask.value.id = Math.max(...tasks.value.map(task => task.id)) + 1;
    tasks.value.push({ ...newTask.value });

    newTask.value = {
      name: '',
      description: '',
      completed: false,
    };
  } else {
    if (newTask.value.name === '') {
      isTaskNameError.value = true;
    }

    if (newTask.value.description === '') {
      isTaskDescriptionError.value = true;
    }
  }
}

function toggleCompleted(id) {
  for (let task of tasks.value) {
    if (task.id === id) {
      task.completed = !task.completed;
    }
  }
}

watch(
  () => newTask.value.name,
  newValue => {
    if (newValue) {
      isTaskNameError.value = false;
    }
  }
);

watch(
  () => newTask.value.description,
  newValue => {
    if (newValue) {
      isTaskDescriptionError.value = false;
    }
  }
);
</script>

<template>
  <main class="container">
    <div class="header">
      <div class="header-side">
        <h1>Tasks Manager</h1>
      </div>
    </div>

    <Filter :filterBy="filterBy" />

    <div class="tasks">
      <Task v-for="task in tasks" :key="task.id" :task="task" @toggle-completed="toggleCompleted" />
    </div>

    <div class="add-task">
      <h3>Add a new task</h3>
      <div :class="{ error: isTaskNameError }">
        <input type="text" name="title" placeholder="Enter a title..." v-model="newTask.name" />
        <div class="error-text"><div v-if="isTaskNameError">Name is required</div></div>
      </div>
      <div :class="{ error: isTaskDescriptionError }">
        <textarea name="description" rows="4" placeholder="Enter a description..." v-model="newTask.description" />
        <div class="error-text"><div v-if="isTaskDescriptionError">Description is required</div></div>
      </div>
      <button class="btn primary" @click="addTask">Add Task</button>
    </div>
  </main>
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

.add-task {
  margin-top: 60px;

  input,
  textarea {
    width: 360px;
    max-width: 100%;
    margin-top: 12px;
    padding: 5px;
    border: 1px solid #0000;
    border-radius: 4px;
  }

  button {
    width: 360px;
    margin-top: 12px;
  }

  .error {
    input,
    textarea {
      border: 1px solid red;
    }
  }

  .error-text {
    color: red;
    font-size: 12px;
    height: 24px;
  }
}
</style>

import { defineStore } from 'pinia';
import { computed, ref, watch } from 'vue';

import TASKSDATA from '../tasks.js';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(TASKSDATA);
  const filterBy = ref('');

  const isTaskNameError = ref(false);
  const isTaskDescriptionError = ref(false);

  function setFilter(filter) {
    filterBy.value = filter;
  }

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

  return {
    tasks,
    filterBy,
    setFilter,
    filteredTasks,
    toggleCompleted,
    newTask,
    addTask,
    isTaskNameError,
    isTaskDescriptionError,
  };
});

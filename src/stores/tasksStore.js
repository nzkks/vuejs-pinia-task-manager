import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import TASKSDATA from '../tasks.js';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(TASKSDATA);
  const filterBy = ref('');

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

  return { tasks, filterBy, setFilter, filteredTasks };
});

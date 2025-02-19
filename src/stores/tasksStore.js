import { defineStore } from 'pinia';
import { ref } from 'vue';

import TASKSDATA from '../tasks.js';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(TASKSDATA);
  const filterBy = ref('');

  function setFilter(filter) {
    filterBy.value = filter;
  }

  return { tasks, filterBy, setFilter };
});

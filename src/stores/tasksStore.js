import { defineStore } from 'pinia';
import { ref } from 'vue';

import TASKSDATA from '../tasks.js';

export const useTasksStore = defineStore('tasks', () => {
  const tasks = ref(TASKSDATA);

  return { tasks };
});

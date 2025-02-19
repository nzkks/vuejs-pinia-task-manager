<script setup>
import { useTasksStore } from '@/stores/tasksStore.js';

const store = useTasksStore();
</script>

<template>
  <div class="form add-task">
    <div :class="{ error: store.isTaskNameError }">
      <label for="title">Title</label>
      <input type="text" name="title" v-model="store.newTask.name" />
      <div class="error-text"><div v-if="store.isTaskNameError">Task title is required</div></div>
    </div>
    <div :class="{ error: store.isTaskDescriptionError }">
      <label for="description">Description</label>
      <textarea name="description" rows="4" v-model="store.newTask.description" />
      <div class="error-text"><div v-if="store.isTaskDescriptionError">Description is required</div></div>
    </div>
    <button class="btn primary" @click="store.addTask">Add Task</button>
  </div>
</template>
<style lang="scss" scoped>
.form {
  display: flex;
  flex-direction: column;
  max-width: 100%;

  label {
    font-weight: 500;
    text-align: left;
  }

  input,
  select,
  textarea {
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    border: 1px solid #3f3f3f;
    border-radius: 4px;
    padding: 8px 12px;

    &::placeholder {
      color: #a6a6a6;
    }
  }

  .btn {
    width: fit-content;
    padding-inline: 23px;
  }
}

.add-task {
  input,
  textarea {
    width: 100%;
    padding: 5px;
    border: 1px solid #3f3f3f;
    border-radius: 4px;
  }

  button {
    width: 100%;
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

<script setup>
import { useTasksStore } from '@/stores/tasksStore';

const store = useTasksStore();
</script>

<template>
  <div class="filters">
    <div>
      <p>Filter by state</p>
      <div class="badges">
        <div @click="store.setFilter('todo')" class="badge" :class="{ selected: store.filterBy === 'todo' }">To-Do</div>
        <div @click="store.setFilter('done')" class="badge" :class="{ selected: store.filterBy === 'done' }">Done</div>
        <span @click="store.setFilter('')" v-if="store.filterBy === 'todo' || store.filterBy === 'done'" class="clear">
          x clear
        </span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filters {
  display: flex;
  flex-direction: column;
  margin: 40px 0;

  p {
    font-size: 16px;
    font-weight: 400;
    line-height: 21px;
    letter-spacing: 0em;
    text-align: left;
  }

  .badges {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 14px 0;
    align-items: center;
  }

  .clear {
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    cursor: pointer;
  }

  .badge {
    padding: 8px 7px;
    background-color: var(--primary-color);
    color: var(--white-color);
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0em;
    text-align: left;
    border-radius: 8px;
    cursor: pointer;
    user-select: none;

    &.selected {
      background-color: #a90606;
      color: var(--white-color);
    }
  }
}
</style>

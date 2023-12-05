<template>
    <div>
      <button @click="addList">Nieuwe Boodschappenlijst</button>
      <div class="lists-container">
        <div v-for="(list, id) in lists" :key="id" class="list">
          <router-link :to="`/boodschappenlijst/${id}`">
            <button>Naar Boodschappenlijst {{ id }}</button>
          </router-link>
          <div v-for="(item, index) in list.items" :key="index">
            {{ item }}
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'HomePage',
    setup() {
      const lists = ref(JSON.parse(localStorage.getItem('lists') || '{}'));
  
      onMounted(() => {
        if (Object.keys(lists.value).length === 0) {
          localStorage.setItem('lists', JSON.stringify(lists.value));
        }
      });
  
      const addList = () => {
        const newList = {items: [] };
        lists.value[Object.keys(lists.value).length + 1] = newList;
        localStorage.setItem('lists', JSON.stringify(lists.value));
      };
  
      return { lists, addList };
    }
  }
  </script>
  
  <style scoped>
  .lists-container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .list {
    border: 1px solid #ccc;
    padding: 10px;
  }
  </style>
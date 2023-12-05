<template>
    <div>
      <button @click="addList">Nieuwe Boodschappenlijst</button>
      <div v-for="list in lists" :key="list.id">
        <router-link :to="`/boodschappenlijst/${list.id}`">
          <button>Naar Boodschappenlijst {{ list.id }}</button>
        </router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { ref, onMounted } from 'vue';
  
  export default {
    name: 'HomePage',
    setup() {
      const lists = ref(JSON.parse(localStorage.getItem('lists') || '[]'));
  
      onMounted(() => {
        if (lists.value.length === 0) {
          localStorage.setItem('lists', JSON.stringify(lists.value));
        }
      });
  
      const addList = () => {
        const newList = { id: lists.value.length + 1, items: [] };
        lists.value.push(newList);
        localStorage.setItem('lists', JSON.stringify(lists.value));
      };
  
      return { lists, addList };
    }
  }
  </script>
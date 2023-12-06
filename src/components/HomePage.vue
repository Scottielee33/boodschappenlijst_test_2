<template>
    <div>
      <button @click="addList">Nieuwe Boodschappenlijst</button>
      <div class="lists-container">
        <div v-for="(list, id) in lists" :key="id" class="list">
          <h2>Boodschappenlijst {{ id }}</h2>
          <div v-for="(_, index) in list.items" :key="index">
            {{ index }}
          </div>
          <div>
            <router-link :to="`/boodschappenlijst/${id}`">
              <button>Naar Boodschappenlijst</button>
            </router-link>
            <button @click="deleteList(id)">Delete Boodschappenlijst</button>
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
        const newList = {items: {} };
        const listName = window.prompt("Enter the name of the new Boodschappenlijstje:");
        if (listName) {
          if (lists.value.hasOwnProperty(listName)) {
            window.alert("A list with this name already exists.");
          } else {
            lists.value[listName] = newList;
            localStorage.setItem('lists', JSON.stringify(lists.value));
          }
        }
      };

      const deleteList = (id:any) => {
        delete lists.value[id];
        localStorage.setItem('lists', JSON.stringify(lists.value));
      };
  
      return { lists, addList, deleteList };
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
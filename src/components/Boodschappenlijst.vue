<template>
  <div class="boodschappenlijst">
    <div v-for="item in items" :key="item.name">
      <input type="checkbox" v-model="item.checked">
      <span :class="{ 'line-through': item.checked }">{{ item.name }}</span>
    </div>
    <input type="text" v-model="newItem">
    <button @click="addItem">Voeg toe</button>
    <button @click="sortItems">Sorteer</button>
    <button @click="deleteChecked">Verwijder geselecteerde</button>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';

export default {
  name: 'Boodschappenlijst',
  props: ['id'],
  setup(props) {
    const lists = ref(JSON.parse(localStorage.getItem('lists') || '[]'));
    const list = ref(lists.value.find(list => list.id === Number(props.id)));

    watch(items, () => {
      localStorage.setItem('items', JSON.stringify(items.value));
    }, { deep: true });

    const addItem = () => {
      const newItems = newItem.value.split(',');
      for (let name of newItems) {
        name = name.trim();
        if (name !== '') {
          items.value.push({ name, checked: false });
        }
      }
      newItem.value = '';
    };

    const sortItems = () => {
      items.value.sort((a, b) => a.name.localeCompare(b.name));
    };

    const deleteChecked = () => {
      items.value = items.value.filter(item => !item.checked);
    };

    return { items, newItem, addItem, sortItems, deleteChecked };
  }
}
</script>

<style>
.line-through {
  text-decoration: line-through;
}
</style>
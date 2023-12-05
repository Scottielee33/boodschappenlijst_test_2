<template>
  <div>
    <h1>Boodschappenlijst ID: {{ id }}</h1>
    <ul>
      <li v-for="item in items" :key="item">
        {{ item }}
      </li>
    </ul>
    <input v-model="newItem" type="text">
    <button @click="addItem(newItem)">Add item</button>
    <router-link to="/">
      <button>Terug naar Home</button>
    </router-link>
  </div>
</template>

<script lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'BoodschappenLijst',
  setup() {
    const route = useRoute()
    const id = computed(() => route.params.id)
    const items = ref([])
    const newItem = ref('')

    onMounted(() => {
      const lists = JSON.parse(localStorage.getItem('lists') || '{}')
      if (lists[id.value] && lists[id.value].items) {
        items.value = lists[id.value].items
      }
    })

    function addItem(item) {
      items.value.push(item)
      const lists = JSON.parse(localStorage.getItem('lists') || '{}')
      if (lists[id.value]) {
        lists[id.value].items = items.value
        localStorage.setItem('lists', JSON.stringify(lists))
      }
      newItem.value = ''
    }

    return {
      id,
      items,
      addItem,
      newItem
    }
  }
}
</script>
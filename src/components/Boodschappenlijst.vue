<template>
  <div>
    <h1>Boodschappenlijst ID: {{ id }}</h1>
    <ul style="list-style-type: none; padding: 0;">
      <li v-for="(_, key) in items" :key="key" style="border-bottom: 1px solid #000;">
        <input type="checkbox" v-model="items[key].checked">
        {{ key }}
      </li>
    </ul>
    <input v-model="newItem" type="text">
    <button @click="addItem(newItem)">Add item</button>
    <button @click="deleteSelected">Delete selected</button>
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
    const id = computed(() => String(route.params.id))
    const items = ref<{ [key: string]: any }>({}) // Define the type of items object
    const newItem = ref('')

    onMounted(() => {
      let lists = JSON.parse(localStorage.getItem('lists') || '{}')
      if (lists[id.value] && lists[id.value].items) {
        items.value = lists[id.value].items
      }
    })

    function addItem(item: string) {
      items.value[item] = {} // Add new item to items object
      const lists = JSON.parse(localStorage.getItem('lists') || '{}')
      if (lists[id.value]) {
        lists[id.value].items = items.value
        localStorage.setItem('lists', JSON.stringify(lists))
      }
      newItem.value = ''
    }

    function deleteSelected() {
      for (let key in items.value) {
        if (items.value[key].checked) {
          delete items.value[key]
        }
      }
      const lists = JSON.parse(localStorage.getItem('lists') || '{}')
      if (lists[id.value]) {
        lists[id.value].items = items.value
        localStorage.setItem('lists', JSON.stringify(lists))
      }
    }

    return {
      id,
      items,
      addItem,
      newItem,
      deleteSelected
    }
  }
}
</script>
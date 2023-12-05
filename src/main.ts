import { createApp } from 'vue'
import App from './App.vue'
import router from './router.ts' // assuming your router file is named `router.ts`

createApp(App).use(router).mount('#app')
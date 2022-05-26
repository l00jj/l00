import { createApp } from 'vue'
import index from './index.vue'
import 'vite/modulepreload-polyfill'

const app = createApp(index)
app.mount('#app')

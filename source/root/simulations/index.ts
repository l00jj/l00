import { createApp } from 'vue'
import index from './index.vue'
import 'vite/modulepreload-polyfill'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(index)
app.use(ElementPlus)
app.mount('#app')
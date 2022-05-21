import { createApp } from 'vue'
import index from './index.vue'

createApp(index).mount('#app');

window.location.href = import.meta.env.BASE_URL+ 'effects/';
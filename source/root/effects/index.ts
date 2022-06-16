import { createApp } from 'vue'
import index from './index.vue'
import 'vite/modulepreload-polyfill'

import list from '@src/stores/effectsList';
import ProjectsRouter from '@src/components/Projects/ProjectsRouter'

const app = createApp(index)

//
const projectsRouter = new ProjectsRouter(list, () => import('./IndexPage.vue'))
app.use(projectsRouter.router)
app.provide("projectsRouter", projectsRouter)

//
app.mount('#app');
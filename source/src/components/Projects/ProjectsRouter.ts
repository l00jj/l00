import ProjectInfo from '@src/stores/ProjectInfo'
import { Router, createRouter, createWebHashHistory, RouteRecordRaw, RouteComponent } from 'vue-router'
import { Alert404 } from "@src/components/Alert404/Alert404";

const createProjectToRoutes = (project: ProjectInfo) => {
    const name = project.id
    const path = `/${project.id}`
    const route: RouteRecordRaw = { name, path, component: project.vue }
    return route
}

export default class ProjectsRouter {

    indexPageRouteName = Symbol()
    _404PageRouteName = Symbol()
    projectPaths: string[] = []
    routes: RouteRecordRaw[] = []// 主要用于最后卸载注销
    router: Router

    //
    projects: ProjectInfo[]

    constructor(projects: ProjectInfo[], indexPageVue: Function) {
        //
        this.projects = projects

        // 首页导航
        const indexPageRoute: RouteRecordRaw = { name: this.indexPageRouteName, path: '/', component: indexPageVue as RouteComponent }
        this.routes.push(indexPageRoute)

        // 404导航
        const _404PageRoute: RouteRecordRaw = { name: this._404PageRouteName, path: '/:pathMatch(.+)+', component: indexPageVue as RouteComponent }
        this.routes.push(_404PageRoute)

        // 放入列表导航
        projects.forEach(project => {
            const route = createProjectToRoutes(project)
            project.href = route.path
            this.projectPaths.push(route.path)
            this.routes.push(route)
        })

        // 生成导航
        this.router = createRouter({
            history: createWebHashHistory(),
            routes: this.routes, // `routes: routes` 的缩写
            strict: true, // applies to all routes
        })

        // 监听404并弹窗
        this.router.beforeEach(async (to, from) => {
            if (to.name === this._404PageRouteName) Alert404.show()
            else Alert404.hide()
        })

    }

    clearRoutes() {

    }
}
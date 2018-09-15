import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const basic=()=>import('@/views/layout/basic')
const home=()=>import('@/views/home/index')


const routes = [
    {
        path: '/',
        component: basic,
        children: [
            {
                path:"",
                component:home
            },
        ]
    }
]

const router = new Router({
  routes
})

export default router

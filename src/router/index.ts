import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic=()=>import('@/views/layout/basic')
const LayoutUser=()=>import('@/views/layout/user')

const home=()=>import('@/views/home/index')
const login=()=>import('@/views/user/login')
const UserList=()=>import('@/views/user/index')
const UserForm=()=>import('@/views/user/form')


const routes = [
    {
        path: '/',
        component: LayoutBasic,
        children: [
            {
                path:"",
                component:home
            },
            {
                path:"users",
                component:UserList
            },
            {
                path:"user/add",
                component:UserForm
            },
            {
                path:"user/edit/:uid",
                component:UserForm
            }
        ]
    },
    {
        path: '/user',
        component: LayoutUser,
        children: [
            {
                path:"login",
                component:login
            },
        ]
    }
]

const router = new Router({
  routes
})

export default router

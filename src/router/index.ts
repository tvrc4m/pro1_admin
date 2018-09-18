import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic=()=>import('@/views/layout/basic')
const LayoutUser=()=>import('@/views/layout/user')

const home=()=>import('@/views/home/index')
const login=()=>import('@/views/user/login')
const UserList=()=>import('@/views/user/index')
const UserForm=()=>import('@/views/user/form')

const AuthorList=()=>import('@/views/author/index')
const AuthorForm=()=>import('@/views/author/form')


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
                component:UserForm,
                name:"userAdd"
            },
            {
                path:"user/edit/:uid",
                component:UserForm,
                name:"userEdit"
            },
            {
                path:"authors",
                component:AuthorList
            },
            {
                path:"author/add",
                component:AuthorForm,
                name:"authorAdd"
            },
            {
                path:"author/edit/:author_id",
                component:AuthorForm,
                name:"authorEdit"
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

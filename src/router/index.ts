import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const LayoutBasic=()=>import('@/views/layout/basic')
const LayoutUser=()=>import('@/views/layout/user')

const home=()=>import('@/views/home/index')
const login=()=>import('@/views/user/login')
// 用户
const UserList=()=>import('@/views/user/index')
const UserForm=()=>import('@/views/user/form')
// 作者
const AuthorList=()=>import('@/views/author/index')
const AuthorForm=()=>import('@/views/author/form')
// 邀请码
const CodeList=()=>import('@/views/code/index')
const CodeForm=()=>import('@/views/code/form')

// 内容
const ContentList=()=>import('@/views/content/index')
const ContentForm=()=>import('@/views/content/form')


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
            },
            {
                path:"code",
                component:CodeList
            },
            {
                path:"code/add",
                component:CodeForm,
                name:"codeAdd"
            },
            {
                path:"code/edit/:code_id",
                component:CodeForm,
                name:"codeEdit"
            },
            {
                path:"content",
                component:ContentList
            },
            {
                path:"content/add",
                component:ContentForm,
                name:"contentAdd"
            },
            {
                path:"content/edit/:content_id",
                component:ContentForm,
                name:"contentEdit"
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

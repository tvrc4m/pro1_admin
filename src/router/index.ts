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
const CodeFormMulti=()=>import('@/views/code/multi')

// 内容
const ContentList=()=>import('@/views/content/index')
const ContentForm=()=>import('@/views/content/form')
const ContentFormMulti=()=>import('@/views/content/multi')


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
                component:UserList,
                meta:{
                    group:"user"
                }
            },
            {
                path:"user/add",
                component:UserForm,
                name:"userAdd",
                meta:{
                    group:"user"
                }
            },
            {
                path:"user/edit/:uid",
                component:UserForm,
                name:"userEdit",
                meta:{
                    group:"user"
                }
            },
            {
                path:"authors",
                component:AuthorList,
                name:"authorList",
                meta:{
                    group:"author"
                }
            },
            {
                path:"author/add",
                component:AuthorForm,
                name:"authorAdd",
                meta:{
                    group:"author"
                }
            },
            {
                path:"author/edit/:author_id",
                component:AuthorForm,
                name:"authorEdit",
                meta:{
                    group:"author"
                }
            },
            {
                path:"code",
                component:CodeList,
                name:"codeList",
                meta:{
                    group:"code"
                }
            },
            {
                path:"code/add",
                component:CodeForm,
                name:"codeAdd",
                meta:{
                    group:"code"
                }
            },
            {
                path:"code/multi",
                component:CodeFormMulti,
                name:"multiAddCode",
                meta:{
                    group:"code"
                }
            },
            {
                path:"code/edit/:code_id",
                component:CodeForm,
                name:"codeEdit",
                meta:{
                    group:"code"
                }
            },
            {
                path:"content",
                component:ContentList,
                name:"contentList",
                meta:{
                    group:"content"
                }
            },
            {
                path:"content/add",
                component:ContentForm,
                name:"contentAdd",
                meta:{
                    group:"content"
                }
            },
            {
                path:"content/multi",
                component:ContentFormMulti,
                name:"contentMultiAdd",
                meta:{
                    group:"content"
                }
            },
            {
                path:"content/edit/:content_id",
                component:ContentForm,
                name:"contentEdit",
                meta:{
                    group:"content"
                }
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

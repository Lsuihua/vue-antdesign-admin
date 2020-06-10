import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Layout from '@/views/Layout'

export default new Router({
    mode: 'history',
    base:'/',
    routes:[
        {
            path:'/',
            component: Layout,
            redirect: '/homeConfig',
            children:[
                {
                    path: '/homeConfig',
                    component: () => import('@/views/system/homeConfig'),
                    name: 'home-config',
                    meta: {title: 'homeConfig', index: 1.1},
                },
                {
                    path: '/roleConfig',
                    component: () => import('@/views/system/roleConfig'),
                    name: 'role-config',
                    meta: {title: 'roleConfig', index: 1.2},
                },
                {
                    path: '/menuConfig',
                    component: () => import('@/views/system/menuConfig'),
                    name: 'menu-config',
                    meta: {title: 'menuConfig', index: 1.3},
                },
            ]
        },
        {
            path:'/',
            component: Layout,
            redirect: '/article',
            children:[
                {
                    path: '/article',
                    component: () => import('@/views/service/articles/index'),
                    name: 'article',
                    meta: {title: 'article', index: 2.1}
                },
                {
                    path: '/event',
                    component: () => import('@/views/service/events/index'),
                    name: 'events',
                    meta: {title: 'events', index: 2.2}
                },
                {
                    path: '/user',
                    component: () => import('@/views/service/users/index'),
                    name: 'user',
                    meta: {title: 'user', index: 2.3}
                },
                {
                    path: '/store',
                    component: () => import('@/views/service/stores/index'),
                    name: 'store',
                    meta: {title: 'store', index: 2.4}
                }
            ]
        },
        {
            path:'/',
            component: Layout,
            redirect: '/image',
            children:[
                {
                    path: '/image',
                    component: () => import('@/views/resources/imgs/index'),
                    name: 'image',
                    meta: {title: 'image', index: 3.1}
                },
                {
                    path: '/music',
                    component: () => import('@/views/resources/musics/index'),
                    name: 'music',
                    meta: {title: 'music', index: 3.2}
                },
                {
                    path: '/material',
                    component: () => import('@/views/resources/material/index'),
                    name: 'material',
                    meta: {title: 'material', index:3.3}
                }
            ]
        },
        {
            path: '/',
            component: Layout,
            redirect: '/403',
            children: [
                {
                    path:'/403',
                    component: () => import('@/views/errorPage/403'),
                    name:'403',
                    meta:{title:'403',index:403}
                },
                {
                    path:'/404',
                    component: () => import('@/views/errorPage/404'),
                    name:'404',
                    meta:{title:'404',index:404}
                },
                {
                    path:'/500',
                    component: () => import('@/views/errorPage/500'),
                    name:'500',
                    meta:{title:'500',index:500}
                }
            ]
        },
        {
            path:'/login',
            component: () => import('@/views/user/login'),
            name:'login',
            meta:{title:'login'}
        }
    ]
})
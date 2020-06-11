import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout'

import routerChildren from './children'

Vue.use(Router)

export default new Router({
    mode: 'history',
    base:'/',
    routes:[
        {
            path:'/login',
            component: () => import('@/views/user/login'),
            name:'login',
            meta:{title:'login'}
        },
        {
            path:'/register',
            component: () => import('@/views/user/register'),
            name:'register',
            meta:{title:'register'}
        },
        {
            path:'/',
            component: Layout,
            children: routerChildren
        }
    ]
})
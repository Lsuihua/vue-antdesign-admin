import Vue from 'vue'
import Router from 'vue-router'

import Layout from '@/views/Layout'

import routerChildren from './children'

import store from '@/store/index'

import cloudbase from "@cloudbase/js-sdk";

import { getToken } from "@/utils/auth";

// 云开发初始化
const app = cloudbase.init({
  env: "dev-serve-7g46wttx6ced4f15",
  region: "ap-guangzhou"
});
const db = app.database();

// 判断是否登录
const loginState = app.auth().hasLoginState();


Vue.use(Router)

const router = new Router({
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

router.beforeEach((to, from, next) => {
    console.log(to)
    if (to.path == '/login' || to.path == '/register') next()
    else{
        console.log("登录状态",loginState)
        if(loginState === null){
            // 未登陆 去登陆
            next({path:'/login'})
        }else{
            // 判断是否拉去菜单 信息
            getBaseData()
            async function getBaseData (){
                console.log(store)
                if(store.state.app.menu.length == 0){
                    // 获取菜单
                    await db.collection("configs").where(
                      {_id:'d5b22d996089096700018d785236abcb'}
                    ).get().then(res => {
                      if(res.data.length>0){
                        let _menu = res.data[0].menus
                        getToken('menu',JSON.stringify(_menu))
                        store.dispatch('SAVE_MENU',_menu)
                      }
                    });
                }
                if(store.state.user.userInfo === null){
                    //获取用户信息
                    const user = app.auth().currentUser;
                    getToken('userinfo',JSON.stringify(user))
                    store.dispatch('SAVE_USER_INFO',user)
                }   
                next()
            }
        }
    }
})

export default router
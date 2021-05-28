import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// 字体 全局样式
import '../static/font/iconfont.css'
import '../static/css/common.css'

import './components/global.js'

import cloudbase from "@cloudbase/js-sdk";
// 云开发初始化
const app = cloudbase.init({
  env: "dev-serve-7g46wttx6ced4f15",
  region: "ap-guangzhou"
});

Vue.prototype.$app = app

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')

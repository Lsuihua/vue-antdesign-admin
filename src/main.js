import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store/index'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import './mock'

// 字体 全局样式
import '../static/font/iconfont.css'
import '../static/css/common.css'

Vue.use(Antd)

Vue.config.productionTip = false

new Vue({
    router,
    store,
  render: h => h(App),
}).$mount('#app')

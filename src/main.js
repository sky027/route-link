// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store/index'
import router from './router'
// 路由守卫
import '@/utils/permission.js'
import { message } from '@/utils/message'

// UI组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$message = message
// 公共样式
import './style/index.scss'

// 公共组件
import './components/common/index'

//公共请求
import request from './api/api'
Vue.prototype.$request = request


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

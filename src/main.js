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

import './api/mock/index'

// v-chart统计图
import VCharts from 'v-charts'
Vue.use(VCharts);
import echarts from 'echarts';
Vue.prototype.$echarts = echarts;

// Swiper轮播
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'
Vue.prototype.$swiper = Swiper;

// 拼图验证码
import SlideVerify from '../node_modules/vue-monoplasty-slide-verify'
Vue.use(SlideVerify)

// 文件
import filesFn from "./utils/makeFile";
Vue.prototype.$files = filesFn

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

import Layout from '@/layout/Layout'

Vue.use(Router)
const systemRoute = [
  {
    path: '/',
    name: 'Layout',
    component: Layout,
    redirect: '/index',
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "Login" */ '@/views/system/login'),
  },
  {
    path: '/error/404',
    name: '404',
    component: () => import('@/views/system/page-404'),
  },
  {
    path: '/error/401',
    name: '401',
    component: () => import('@/views/system/page-401'),
  }
]


export const routeList = [
  {
    path: '',
    name: 'home',
    component: Layout,
    children:[
      {
        path: 'index',
        name: 'Index',
        component: () => import(/* webpackChunkName: "Index" */ '@/views/home/index'),
        meta:{
          title:'首页',
          label: 'index',
          icon: 'el-icon-s-home',
          breadcrumb: [
            { path: '/index', name: '首页', label: 'index', icon: 'el-icon-s-home' }
          ]
        },
      },
      {
        path:'tablePage',
        name:'TablePage',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'表格组件',
          label: 'tabTemp',
          icon: 'el-icon-s-grid',
          breadcrumb: [
            { path: '/tablePage', name: '表格组件', label: 'tabTemp', icon: 'el-icon-s-grid' }
          ]
        },
        children: [
          {
            path:'normalTable',
            name:'NormalTable',
            component:() => import(/* webpackChunkName: "NormalTable" */ '@/views/pages/tables/normalTable'),
            meta:{
              title:'普通列表',
              label: 'normalTab',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', label: 'tabTemp', icon: 'el-icon-s-grid' },
                { path: '/tablePage/normalTable', label: 'normalTab', name: '普通列表'}
              ]
            }
          },
          {
            path:'treeTable',
            name:'TreeTable',
            component:() => import(/* webpackChunkName: "TreeTable" */ '@/views/pages/tables/treeTable'),
            meta:{
              title:'树型列表',
              label: 'treeTab',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', label: 'tabTemp', icon: 'el-icon-s-grid' },
                { path: '/tablePage/treeTable', label: 'treeTab', name: '树型列表'}
              ]
            }
          },
          {
            path:'totalList',
            name:'TotalList',
            component:() => import(/* webpackChunkName: "TotalList" */ '@/views/pages/tables/totalList'),
            meta:{
              title:'合计列表',
              label: 'sumTab',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', label: 'tabTemp', icon: 'el-icon-s-grid' },
                { path: '/tablePage/totalList', label: 'sumTab', name: '合计列表'}
              ]
            }
          },
          {
            path:'mergeTable',
            name:'MergeTable',
            component:() => import(/* webpackChunkName: "MergeTable" */ '@/views/pages/tables/mergeTable'),
            meta:{
              title:'合并表格',
              label: 'mergeTab',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', label: 'tabTemp', icon: 'el-icon-s-grid' },
                { path: '/tablePage/mergeTable', label: 'mergeTab', name: '合并表格' }
              ]
            }
          }
        ]
      },
      {
        path:'otherTemp',
        name:'OtherTemp',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'其他类型组件',
          label: 'otherTemp',
          icon: 'el-icon-document',
          breadcrumb: [
            { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' }
          ]
        },
        children: [
          {
            path:'selectTemp',
            name:'SelectTemp',
            component:() => import(/* webpackChunkName: "SelectTemp" */ '@/views/pages/otherTemp/selectTemp'),
            meta:{
              title:'级联下拉、下拉框',
              label: 'selectTemp',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/selectTemp', label: 'selectTemp', name: '级联下拉、下拉框' }
              ]
            }
          },
          {
            path:'swiperTemp',
            name:'swiperTemp',
            component:() => import(/* webpackChunkName: "swiperTemp" */ '@/views/pages/otherTemp/swiperTemp'),
            meta:{
              title:'轮播组件',
              label: 'swiperTemp',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/swiperTemp', label: 'swiperTemp', name: '轮播组件' }
              ]
            }
          },
          {
            path:'vueAnimation',
            name:'vueAnimation',
            component:() => import(/* webpackChunkName: "vueAnimation" */ '@/views/pages/otherTemp/vueAnimation'),
            meta:{
              title:'VUE动画',
              label: 'vueAnimation',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/vueAnimation', label: 'vueAnimation', name: 'VUE动画' }
              ]
            }
          },
          {
            path:'mockData',
            name:'mockData',
            component:() => import(/* webpackChunkName: "mockData" */ '@/views/pages/otherTemp/mockData'),
            meta:{
              title:'MOCK数据',
              label: 'mockData',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/mockData', label: 'mockData', name: 'MOCK数据' }
              ]
            }
          },
          {
            path:'goCanvas',
            name:'goCanvas',
            component:() => import(/* webpackChunkName: "goCanvas" */ '@/views/pages/otherTemp/goCavans'),
            meta:{
              title:'GOJS图形',
              label: 'goCanvas',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/goCanvas', label: 'goCanvas', name: 'GOJS图形' }
              ]
            }
          },
          {
            path: 'encrypt',
            name:'encrypt',
            component:() => import(/* webpackChunkName: "encrypt" */ '@/views/pages/otherTemp/encrypt'),
            meta:{
              title:'加密/解密',
              label: 'encrypt',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/encrypt', label: 'encrypt', name: '加密/解密' }
              ]
            }
          },
          {
            path: 'imageCode',
            name:'imageCode',
            component:() => import(/* webpackChunkName: "nodeFile" */ '@/views/pages/otherTemp/imageCode'),
            meta:{
              title:'拼图验证码',
              label: 'imageCode',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', label: 'otherTemp', icon: 'el-icon-document' },
                { path: '/otherTemp/imageCode', label: 'imageCode', name: '拼图验证码' }
              ]
            }
          }
        ]
      },
      {
        path:'statisticsGraph',
        name:'statisticsGraph',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'统计图(v-chart)',
          label: 'summaryGraph',
          icon: 'el-icon-coin',
          breadcrumb: [
            { path: '/statisticsGraph', label: 'summaryGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' }
          ]
        },
        children: [
          {
            path:'lineChart',
            name:'lineChart',
            component:() => import(/* webpackChunkName: "lineChart" */ '@/views/pages/statisticsChart/lineChart'),
            meta:{
              title:'折线图',
              label: 'lineChart',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/lineChart', label: 'lineChart', name: '折线图' }
              ]
            }
          },
          {
            path:'barChart',
            name:'barChart',
            component:() => import(/* webpackChunkName: "barChart" */ '@/views/pages/statisticsChart/barChart'),
            meta:{
              title:'柱状图',
              label: 'barChart',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/barChart', label: 'barChart', name: '柱状图' }
              ]
            }
          },
          {
            path:'pieChart',
            name:'pieChart',
            component:() => import(/* webpackChunkName: "pieChart" */ '@/views/pages/statisticsChart/pieChart'),
            meta:{
              title:'扇形图/环形图',
              label: 'ringChart',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/pieChart', label: 'ringChart', name: '扇形图/环形图' }
              ]
            }
          },
          {
            path:'otherChartA',
            name:'otherChartA',
            component:() => import(/* webpackChunkName: "otherChartA" */ '@/views/pages/statisticsChart/otherChartA'),
            meta:{
              title:'其他类型A',
              label: 'otherTypeA',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/otherChartA', label: 'otherTypeA', name: '其他类型A' }
              ]
            }
          },
          {
            path:'otherChartB',
            name:'otherChartB',
            component:() => import(/* webpackChunkName: "otherChartB" */ '@/views/pages/statisticsChart/otherChartB'),
            meta:{
              title:'其他类型B',
              label: 'otherTypeB',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/otherChartB', label: 'otherTypeB', name: '其他类型B' }
              ]
            }
          },
          {
            path:'chartEvent',
            name:'chartEvent',
            component:() => import(/* webpackChunkName: "chartEvent" */ '@/views/pages/statisticsChart/chartEvent'),
            meta:{
              title:'图形事件',
              label: 'chartEvent',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', label: 'summaryGraph', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/chartEvent', label: 'chartEvent', name: '图形事件' }
              ]
            }
          }
        ]
      },
      {
        path:'examples',
        name:'examples',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'特效实例',
          label: 'specialInstance',
          icon: 'el-icon-notebook-2',
          breadcrumb: [
            { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' }
          ]
        },
        children: [
          {
            path:'weather',
            name:'weather',
            component:() => import(/* webpackChunkName: "weather" */ '@/views/pages/examples/weather'),
            meta: {
              title: '天气展示',
              label: 'weather',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/weather', label: 'weather', name: '天气展示'}
              ]
            }
          },
          {
            path:'buttons',
            name:'buttons',
            component:() => import(/* webpackChunkName: "buttons" */ '@/views/pages/examples/buttons/index'),
            meta: {
              title: '30种按钮特效',
              label: 'btnEffects',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/buttons', label: 'btnEffects', name: '30种按钮特效'}
              ]
            }
          },
          {
            path:'cssClock',
            name:'cssClock',
            component:() => import(/* webpackChunkName: "cssClock" */ '@/views/pages/examples/cssClock'),
            meta: {
              title: 'CSS时钟',
              label: 'CSSClock',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/cssClock', label: 'CSSClock', name: 'CSS时钟'}
              ]
            }
          },
          {
            path:'ledClock',
            name:'LedClock',
            component:() => import(/* webpackChunkName: "LedClock" */ '@/views/pages/examples/LedClock/index'),
            meta: {
              title: 'LED时钟',
              label: 'LEDClock',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/ledClock', label: 'LEDClock', name: 'LED时钟'}
              ]
            }
          },
          {
            path:'3DBackground',
            name:'3DBackground',
            component:() => import(/* webpackChunkName: "3DBackground" */ '@/views/pages/examples/background/index'),
            meta: {
              title: '3D动态背景',
              label: 'back3D',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/3DBackground', label: 'back3D', name: '3D动态背景'}
              ]
            }
          },
          {
            path:'ringTime',
            name:'ringTime',
            component:() => import(/* webpackChunkName: "ringTime" */ '@/views/pages/examples/ringTime/index'),
            meta: {
              title: '环形中文时间',
              label:  'ringTime',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/ringTime', label:  'ringTime', name: '环形中文时间'}
              ]
            }
          },
          {
            path:'particleBall',
            name:'particleBall',
            component:() => import(/* webpackChunkName: "particleBall" */ '@/views/pages/examples/particleBall'),
            meta: {
              title: '粒子球',
              label: 'particleBall',
              breadcrumb: [
                { path: '/examples', name: '特效实例', label: 'specialInstance', icon: 'el-icon-notebook-2' },
                { path: '/examples/particleBall', label: 'particleBall', name: '粒子球'}
              ]
            }
          },
        ]
      },
      {
        path:'computer',
        name:'Computer',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'电脑管理',
          label: 'computer',
          icon: 'el-icon-cpu',
          breadcrumb: [
            { path: '/computer', label: 'computer', name: '电脑管理', icon: 'el-icon-cpu' }
          ]
        },
        children:[
          {
            path:'computerList',
            name:'computerList',
            component:() => import(/* webpackChunkName: "computerList" */ '@/views/pages/computer/index'),
            meta:{
              title:'电脑信息列表',
              label: 'computerList',
              breadcrumb: [
                { path: '/computer', label: 'computer', name: '电脑管理', icon: 'el-icon-cpu' },
                { path: '/computer/computerList', label: 'computerList', name: '电脑信息列表'},
              ]
            }
          },
          {
            path:'addInfo',
            name:'addInfo',
            component:() => import(/* webpackChunkName: "addInfo" */ '@/views/pages/computer/addInfo'),
            hidden: true,
            meta: {
              title: '新增电脑信息',
              label: 'addCompInfo',
              breadcrumb: [
                { path: '/computer', label: 'computer', name: '电脑管理', icon: 'el-icon-cpu' },
                { path: '/computer/computerList', label: 'computerList', name: '电脑信息列表'},
                { path: '/computer/addInfo', label: 'addCompInfo', name: '新增电脑信息'}
              ]
            }
          }
        ]
      },
      {
        path:'phone',
        name:'phone',
        component:{
          render (c) { return c('router-view') }
        },
        meta:{
          title:'手机管理',
          label: 'phone',
          icon: 'el-icon-mobile-phone',
          breadcrumb: [
            { path: '/phone', name: '手机管理',label: 'phone', icon: 'el-icon-mobile-phone' }
          ]
        },
        children:[
          {
            path:'phoneList',
            name:'phoneList',
            component:() => import(/* webpackChunkName: "phoneList" */ '@/views/pages/phone/index'),
            meta: {
              title: '手机列表',
              label: 'phoneList',
              breadcrumb: [
                { path: '/phone', name: '手机管理', label: 'phone', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', label: 'phoneList', name: '手机列表'}
              ]
            }
          },
          {
            path:'addPhone',
            name:'addPhone',
            component:() => import(/* webpackChunkName: "addPhone" */ '@/views/pages/phone/addPhone'),
            hidden: true,
            meta: {
              title: '新增手机信息',
              label: 'addPhone',
              breadcrumb: [
                { path: '/phone', name: '手机管理', label: 'phone', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', label: 'phoneList', name: '手机列表'},
                { path: '/phone/addPhone', label: 'addPhone', name: '新增手机信息'}
              ]
            }
          },
          {
            path:'otherPhone',
            name:'otherPhone',
            component: { render (c) { return c('router-view') } },
            meta:{
              title:'其他手机列表',
              label: 'otherPhone',
              breadcrumb: [
                { path: '/phone', name: '手机管理', label: 'phone', icon: 'el-icon-mobile-phone' },
                { path: '/phone/otherPhone', label: 'otherPhone', name: '其他手机列表'}
              ]
            },
            children: [
              {
                path: 'otherList',
                name: 'otherList',
                component: () => import(/* webpackChunkName: "otherList" */ '@/views/pages/phone/other'),
                meta: {
                  title: '其他类型',
                  label: 'otherType',
                  breadcrumb: [
                    { path: '/phone', name: '手机管理', label: 'phone', icon: 'el-icon-mobile-phone' },
                    { path: '/phone/otherPhone', label: 'otherPhone', name: '其他手机列表'},
                    { path: '/phone/otherList', label: 'otherType', name: '其他类型'}
                  ]
                }
              }
            ]
          },
          {
            path:'phoneType',
            name:'phoneType',
            component:() => import(/* webpackChunkName: "phoneType" */ '@/views/pages/phone/phoneType'),
            meta: {
              title: '手机类型',
              label: 'phoneType',
              breadcrumb: [
                { path: '/phone', name: '手机管理', label: 'phone', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', label: 'phoneType', name: '手机类型'}
              ]
            }
          }
        ]
      },
      {
        path:'system',
        name:'system',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'系统管理',
          label: 'system',
          icon: 'el-icon-cpu',
          breadcrumb: [
            { path: '/system', label: 'system', name: '系统管理', icon: 'el-icon-cpu' }
          ]
        },
        children: [
          {
            path:'systemPage',
            name:'systemPage',
            component:() => import(/* webpackChunkName: "systemPage" */ '@/views/system/index'),
            meta: {
              title: '系统页面',
              label: 'sysPage',
              breadcrumb: [
                { path: '/system', name: '系统管理', label: 'system', icon: 'el-icon-mobile-phone' },
                { path: '/system/systemPage', label: 'sysPage', name: '系统页面'}
              ]
            }
          },
        ]
      }
    ]
  }
];
/**
 * 详情页/新增/编辑
 */
const detailPage = [];

export default new Router({
  /*routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
  ]*/
  routes: systemRoute.concat(routeList)
})

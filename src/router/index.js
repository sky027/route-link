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
          icon: 'el-icon-s-home',
          breadcrumb: [
            { path: '/index', name: '首页', icon: 'el-icon-s-home' }
          ]
        },
      },
      {
        path:'tablePage',
        name:'TablePage',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'表格组件',
          icon: 'el-icon-s-grid',
          breadcrumb: [
            { path: '/tablePage', name: '表格组件', icon: 'el-icon-s-grid' }
          ]
        },
        children: [
          {
            path:'normalTable',
            name:'NormalTable',
            component:() => import(/* webpackChunkName: "NormalTable" */ '@/views/pages/tables/normalTable'),
            meta:{
              title:'普通列表',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', icon: 'el-icon-s-grid' },
                { path: '/tablePage/normalTable', name: '普通列表'}
              ]
            }
          },
          {
            path:'treeTable',
            name:'TreeTable',
            component:() => import(/* webpackChunkName: "TreeTable" */ '@/views/pages/tables/treeTable'),
            meta:{
              title:'树型列表',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', icon: 'el-icon-s-grid' },
                { path: '/tablePage/treeTable', name: '树型列表'}
              ]
            }
          },
          {
            path:'totalList',
            name:'TotalList',
            component:() => import(/* webpackChunkName: "TotalList" */ '@/views/pages/tables/totalList'),
            meta:{
              title:'合计列表',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', icon: 'el-icon-s-grid' },
                { path: '/tablePage/totalList', name: '合计列表'}
              ]
            }
          },
          {
            path:'mergeTable',
            name:'MergeTable',
            component:() => import(/* webpackChunkName: "MergeTable" */ '@/views/pages/tables/mergeTable'),
            meta:{
              title:'合并表格',
              breadcrumb: [
                { path: '/tablePage', name: '表格组件', icon: 'el-icon-s-grid' },
                { path: '/tablePage/mergeTable', name: '合并表格' }
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
          icon: 'el-icon-document',
          breadcrumb: [
            { path: '/otherTemp', name: '其他类型组件', icon: 'el-icon-document' }
          ]
        },
        children: [
          {
            path:'selectTemp',
            name:'SelectTemp',
            component:() => import(/* webpackChunkName: "SelectTemp" */ '@/views/pages/otherTemp/selectTemp'),
            meta:{
              title:'级联下拉、下拉框',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', icon: 'el-icon-document' },
                { path: '/otherTemp/selectTemp', name: '级联下拉、下拉框' }
              ]
            }
          },
          {
            path:'swiperTemp',
            name:'swiperTemp',
            component:() => import(/* webpackChunkName: "swiperTemp" */ '@/views/pages/otherTemp/swiperTemp'),
            meta:{
              title:'轮播组件',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', icon: 'el-icon-document' },
                { path: '/otherTemp/swiperTemp', name: '轮播组件' }
              ]
            }
          },
          {
            path:'vueAnimation',
            name:'vueAnimation',
            component:() => import(/* webpackChunkName: "swiperTemp" */ '@/views/pages/otherTemp/vueAnimation'),
            meta:{
              title:'VUE动画',
              breadcrumb: [
                { path: '/otherTemp', name: '其他类型组件', icon: 'el-icon-document' },
                { path: '/otherTemp/vueAnimation', name: 'VUE动画' }
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
          icon: 'el-icon-coin',
          breadcrumb: [
            { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' }
          ]
        },
        children: [
          {
            path:'lineChart',
            name:'lineChart',
            component:() => import(/* webpackChunkName: "lineChart" */ '@/views/pages/statisticsChart/lineChart'),
            meta:{
              title:'折线图',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/lineChart', name: '折线图' }
              ]
            }
          },
          {
            path:'barChart',
            name:'barChart',
            component:() => import(/* webpackChunkName: "barChart" */ '@/views/pages/statisticsChart/barChart'),
            meta:{
              title:'柱状图',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/barChart', name: '柱状图' }
              ]
            }
          },
          {
            path:'pieChart',
            name:'pieChart',
            component:() => import(/* webpackChunkName: "pieChart" */ '@/views/pages/statisticsChart/pieChart'),
            meta:{
              title:'扇形图/环形图',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/pieChart', name: '扇形图/环形图' }
              ]
            }
          },
          {
            path:'otherChartA',
            name:'otherChartA',
            component:() => import(/* webpackChunkName: "otherChartA" */ '@/views/pages/statisticsChart/otherChartA'),
            meta:{
              title:'其他类型A',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/otherChartA', name: '其他类型A' }
              ]
            }
          },
          {
            path:'otherChartB',
            name:'otherChartB',
            component:() => import(/* webpackChunkName: "otherChartB" */ '@/views/pages/statisticsChart/otherChartB'),
            meta:{
              title:'其他类型B',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/otherChartB', name: '其他类型B' }
              ]
            }
          },
          {
            path:'chartEvent',
            name:'chartEvent',
            component:() => import(/* webpackChunkName: "chartEvent" */ '@/views/pages/statisticsChart/chartEvent'),
            meta:{
              title:'图形事件',
              breadcrumb: [
                { path: '/statisticsGraph', name: '统计图(v-chart)', icon: 'el-icon-coin' },
                { path: '/statisticsGraph/chartEvent', name: '图形事件' }
              ]
            }
          }
        ]
      },
      {
        path:'computer',
        name:'Computer',
        component: { render (c) { return c('router-view') }},
        meta:{
          title:'电脑管理',
          icon: 'el-icon-cpu',
          breadcrumb: [
            { path: '/computer', name: '电脑管理', icon: 'el-icon-cpu' }
          ]
        },
        children:[
          {
            path:'computerList',
            name:'computerList',
            component:() => import(/* webpackChunkName: "computerList" */ '@/views/pages/computer/index'),
            meta:{
              title:'电脑信息列表',
              breadcrumb: [
                { path: '/computer', name: '电脑管理', icon: 'el-icon-cpu' },
                { path: '/computer/computerList', name: '电脑信息列表'},
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
              breadcrumb: [
                { path: '/computer', name: '电脑管理', icon: 'el-icon-cpu' },
                { path: '/computer/computerList', name: '电脑信息列表'},
                { path: '/computer/addInfo', name: '新增电脑信息'}
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
          icon: 'el-icon-mobile-phone',
          breadcrumb: [
            { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' }
          ]
        },
        children:[
          {
            path:'phoneList',
            name:'phoneList',
            component:() => import(/* webpackChunkName: "phoneList" */ '@/views/pages/phone/index'),
            meta: {
              title: '手机列表',
              breadcrumb: [
                { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', name: '手机列表'}
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
              breadcrumb: [
                { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', name: '手机列表'},
                { path: '/phone/addPhone', name: '新增手机信息'}
              ]
            }
          },
          {
            path:'otherPhone',
            name:'otherPhone',
            component: { render (c) { return c('router-view') } },
            meta:{
              title:'其他手机列表',
              breadcrumb: [
                { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' },
                { path: '/phone/otherPhone', name: '其他手机列表'}
              ]
            },
            children: [
              {
                path: 'otherList',
                name: 'otherList',
                component: () => import(/* webpackChunkName: "otherList" */ '@/views/pages/phone/other'),
                meta: {
                  title: '其他类型',
                  breadcrumb: [
                    { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' },
                    { path: '/phone/otherPhone', name: '其他手机列表'},
                    { path: '/phone/otherList', name: '其他类型'}
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
              breadcrumb: [
                { path: '/phone', name: '手机管理', icon: 'el-icon-mobile-phone' },
                { path: '/phone/phoneList', name: '手机类型'}
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
          icon: 'el-icon-cpu',
          breadcrumb: [
            { path: '/system', name: '系统管理', icon: 'el-icon-cpu' }
          ]
        },
        children: [
          {
            path:'systemPage',
            name:'systemPage',
            component:() => import(/* webpackChunkName: "systemPage" */ '@/views/system/index'),
            meta: {
              title: '系统页面',
              breadcrumb: [
                { path: '/system', name: '系统管理', icon: 'el-icon-mobile-phone' },
                { path: '/system/systemPage', name: '系统页面'}
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

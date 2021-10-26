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
    component: () => import('@/views/system/login'),
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
        component: () => import('@/views/home/index'),
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
            component:()=>import('@/views/pages/tables/normalTable'),
            meta:{
              title:'普通列表',
              breadcrumb: [
                { path: '/computer', name: '表格组件', icon: 'el-icon-s-grid' },
                { path: '/computer/computerList', name: '普通列表'}
              ]
            }
          },
          {
            path:'treeTable',
            name:'TreeTable',
            component:()=>import('@/views/pages/tables/treeTable'),
            meta:{
              title:'树型列表',
              breadcrumb: [
                { path: '/computer', name: '表格组件', icon: 'el-icon-cpu' },
                { path: '/computer/treeTable', name: '树型列表'}
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
            component:()=>import('@/views/pages/computer/index'),
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
            component:()=>import('@/views/pages/computer/addInfo'),
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
            component:()=>import('@/views/pages/phone/index'),
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
            component:()=>import('@/views/pages/phone/addPhone'),
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
                component: () => import('@/views/pages/phone/other'),
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
            component:()=>import('@/views/pages/phone/phoneType'),
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
            component:()=>import('@/views/system/index'),
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
const detailPage = [
];
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

import router from '../router/index'

// 白名单，不需要校验的路由页面
const whiteList = ['/login', '/error/404', '/error/401']

// 路由守卫拦截
router.beforeEach((to, from, next) => {
  // 读缓存，判断权限
  const token = window.localStorage.getItem('app_token')
  if (token) {
    // 存在token时，且页面为登录页，直接跳转首页
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 存在token，但是页面在其他页，需要判断权限，（假定有权限）
      const hasRoles = true
      if (hasRoles) {
        // 有token有权限，直接下一步
        next()
      } else {
        // 有token无权限时，跳转无权限页面
        next('/error/401')
      }
    }
    // 设置title
    document.title = to.meta.title
  } else {
    // 无token时, 是否属于白名单
    if (whiteList.includes(to.path)) {
      next()
      if (to.name === '404') {
        document.title = '404! 页面不存在'
      } else if (to.name === '401') {
        document.title = '401! 无权限'
      } else {
        document.title = '个人测试案例项目'
      }
      // window.localStorage.clear()
    } else {
      // 是否是内部路由页面
      if (!to.name) {
        next('/error/404')
      } else {
        // 跳转登录页
        next('/login')
        document.title = '个人测试案例项目'
      }
    }
  }
})

router.afterEach((to, from, next) => {
  // do something
})

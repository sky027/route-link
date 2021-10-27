import router from '../router/index'

// 白名单，不需要校验的路由页面
const whiteList = ['/login', '/error/404', '/error/401']

// 路由守卫拦截
router.beforeEach((to, from, next) => {
  if (!to.name) {
    next('/error/404')
  }
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
    // 无token时
    if (whiteList.includes(to.path)) {
      next()
      // window.localStorage.clear()
    } else {
      // 跳转登录页
      next('/login')
    }
    document.title = '个人测试案例项目'
  }
})

router.afterEach((to, from, next) => {
  // do something
})

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import CommonUtil from '@/utils/commonUtil'
import elementEnLocale from 'element-ui/lib/locale/lang/en' // element-ui lang
import elementZhLocale from 'element-ui/lib/locale/lang/zh-CN' // element-ui lang
import systemEn from './system/sys-en'
import systemZh from './system/sys-zh'
import userEn from './user/user-en'
import userZh from './user/user-zh'
import routeEn from './route/rout-en'
import routeZh from './route/rout-zh'

Vue.use(VueI18n)
if (!CommonUtil.getStorageItem('language')) {
  CommonUtil.setStorageItem('language', 'zh')
}

const messages = {
  en: {
    ...systemEn,
    ...userEn,
    ...routeEn,
    ...elementEnLocale
  },
  zh: {
    ...systemZh,
    ...userZh,
    ...routeZh,
    ...elementZhLocale
  }
}
// 国际化
const i18n = new VueI18n({
  locale: CommonUtil.getStorageItem('language') || 'zh', // 语言标识, 通过切换locale的值来实现语言切换,this.$i18n.locale
  messages: messages
})
export default i18n

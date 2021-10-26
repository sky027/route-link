import Vue from 'vue'

import SearchTable from '@/components/common/searchTable'
import UploadBtn from '@/components/common/uploadFileBtn'

SearchTable.install = function(Vue) {
  Vue.component(SearchTable.name, SearchTable)
}

UploadBtn.install = function(Vue) {
  Vue.component(UploadBtn.name, UploadBtn)
}

Vue.use(SearchTable)
Vue.use(UploadBtn)

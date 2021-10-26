import Vue from 'vue'

import SearchTable from '@/components/common/table/searchTable'
import UploadBtn from '@/components/common/upload/uploadFileBtn'
import SplitLine from '@/components/common/splitLine/splitLine'

SearchTable.install = function(Vue) {
  Vue.component(SearchTable.name, SearchTable)
}

UploadBtn.install = function(Vue) {
  Vue.component(UploadBtn.name, UploadBtn)
}

const SplitLines = {
  install: function(Vue) {
    Vue.component(SplitLine.name, SplitLine)
  }
}


Vue.use(SearchTable)
Vue.use(UploadBtn)
Vue.use(SplitLines)

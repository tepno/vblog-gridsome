// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'

import moment from 'moment'
import ElementUI from 'element-ui'
import util from './utils/util'
import 'element-ui/lib/theme-chalk/index.css'
import './assets/css/style.css'

export default function (Vue, { router, head, isClient, appOptions }) {
  // Set default layout as a global component

  Vue.filter('date', function (value, formatString) {
    formatString = formatString || 'YYYY-MM-DD HH:mm:ss';
    return moment(value).format(formatString);
  });

  Vue.use(ElementUI)


  Vue.prototype.$util = util

  Vue.prototype.$share = function (message) {
    if (!message) {
      message = window.location
    } else {
      let arr = (window.location + "").split("#")
      message = arr[0] + "#" + message
    }
    if (util.copy(message)) {
      Vue.prototype.$confirm('链接已复制,去分享给好友吧!!', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'success'
      })
    } else {
      Vue.prototype.$confirm('链接复制失败,可能因为浏览器不兼容', '分享', {
        showCancelButton: false,
        showClose: false,
        type: 'warning'
      })
    }
  }

  Vue.component('Layout', DefaultLayout)
}

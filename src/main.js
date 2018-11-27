// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import store from './store/store'

// Mint-ui
import Mint from 'mint-ui';
Vue.use(Mint);

// 通用组件
import TopBar from './components/common/topBar'
import ToTop from './components/common/toTop'
import Search from './components/common/search'
import Footer from './components/common/footer'

Vue.component('Footer',Footer)
Vue.component('ToTop',ToTop)
Vue.component('TopBar',TopBar)
Vue.component('Search',Search)

import 'mint-ui/lib/style.css'; 
import './style/mui/dist/css/mui.min.css'
import './style/common/global.scss'

// axios
Vue.prototype.$ajax = axios
// axios.defaults.baseURL = 'http://www.wanandroid.com'

// 拦截器
axios.interceptors.request.use(function(config){
  Mint.Indicator.open({
    text:'拼命加载中...',
    spinnerType:'fading-circle'
  })
  return config
})
axios.interceptors.response.use(function(config){
  Mint.Indicator.close()
  return config
})

// 路由导航 如果用户想要进入二级 页面，强制先登录
router.beforeEach(({meta, path}, from, next) =>{
  const {auth = true} = meta
  let isLogin = Boolean(store.state.AllState)
  if( auth && !isLogin 
    && path !== '/user/login' 
    && path !== '/user/reg' 
    && path !== '/blogs'
    && path !== '/projects'
    && path !== '/tabs'
    && path !== '/wechat'
    && path !== '/mine' ) {
    return next ({path:'/user/login'})
  }
  next()
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})


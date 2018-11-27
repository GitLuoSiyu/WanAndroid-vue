import Vue from 'vue'
import Router from 'vue-router'

import Blogs from '../components/page/blogs/Blogs'
import Projects from '../components/page/projects/Projects'
import Wechat from '../components/page/wechat/Wechat'
import WechatDetail from '../components/page/wechat/WechatDetail'
import Tabs from '../components/page/tabs/Tabs'
import TabsDetail from '../components/page/tabs/TabsDetail'

import Mine from '../components/page/mine/Mine'
import Login from '../components/page/user/Login'
import Reg from '../components/page/user/Reg'
import Setting from '../components/page/user/Setting'

import Fire from '../components/page/others/Fire'
import Collect from '../components/page/collect/Collect'

Vue.use(Router)

export default new Router({
  mode:'history',
  linkActiveClass:'mui-active',
  routes: [
    { path: '/',
      redirect:{name:'login'}
    },
    { path: '/blogs',component: Blogs,
      name: 'blogs'
    },
    { path: '/projects',component: Projects,
      name: 'projects'
    },
    { path: '/wechat',component: Wechat,
      name: 'wechat'
    },
    { path: '/wechat/detail/:id',component: WechatDetail,
      name: 'wechatDetail'
    },
    { path: '/tabs',component: Tabs,
      name: 'tabs'
    },
    { path: '/tabs/detail/:id',component: TabsDetail,
      name: 'tabsDetail'
    },
    { path: '/mine',component: Mine,
      name: 'mine'
    },
    { path: '/tabs/fire',component: Fire,
      name: 'fire'
    },
    { path: '/user/login',component: Login,
      name: 'login'
    },
    { path: '/user/reg',component: Reg,
      name: 'reg'
    },
    { path: '/user/setting',component: Setting,
      name: 'setting'
    },
    { path: '/user/collect',component: Collect,
      name: 'collect'
    }
  ]
})

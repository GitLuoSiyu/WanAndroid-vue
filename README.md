# app
 A Vue.js project
 
## Build Setup
``` bash
# install dependencies
  cnpm install/npm install/yarn add
  cnpm run dev / yarn start
```
## 前言
    前段时间 跟随团队赶完 Weex 的项目后，对混合开发突然干西青区，然后就写了这个 WanAndroid 的vue版本，
    顺便整理一下vue的知识点。后期做个 ReactNative 版本的 WanAndroid 相互比较一下 各个框架的WebApp 的体验。

## 项目结构和依赖
    脚手架: vue-cli2 vue-router vuex sass 
    UI框架：mint-ui mui
    API：鸿洋大神的 wanandroid

## 页面
    1.主页面导航: 首页(博文)、项目、公众号、体系、我的(个人中心)
    2.子页面：各个模块的详情页、登录、注册、系统设置、收藏页、左侧个人中心
## PreViews
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1collect.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1projects.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1wechat.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1tabs.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1mine.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1setting.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1collect.png) 
    ![](https://github.com/GitLuoSiyu/WanAndroid-vue/blob/master/static/vueandroid1tabde.png) 
  
  
## 主要功能
    
    底部导航:博文、项目、公众号、体系、个人中心等
    首页博文:轮播图、文章列表
    项   目:文章内容、分类及详情
    公众 号：公众号、公众号详情页
    知识体系：知识体系专题、开发环境、基础知识、用户交互、点击跳转详情页等
    关于我们
    登录、注册、退出(有路由守卫)
    收藏：我的收藏、添加收藏、取消收藏(文章收藏)
    夜间模式
    上拉回升
    文章收藏
    系统设置
    清除缓存

## 留下的坑
    登录注册之后，首页的左侧个人中心里的 “我的收藏”，可以实现左滑删除，但是我目前只做了DOM删除,store里还没做删除。我把左滑删除分为2部分做的，但是如果采用store删除然后重新渲染，会有一瞬间的抖屏。这部分下次再修改。  

## Thanks
    Thanks to WanAndroid
    Thanks to Mint-ui Mui

## 致谢
    首先非常鸿洋大神提供的帮助,也非常感谢玩Android提供的API,
    本应用采用Vue+MUI,根据WanAndroid的JAVA客户端的样式,
    尽力去完善各项功能.当然这只是目前的功能,
    后续我会在WanAndroid的原本基础上新增一些新的功能,
    未来我将使用JS极力去完善和提供更加便捷的功能.对于使用JS去模仿原生APP,
    此外我还会使用ReactNative去实现,极力去接近原生APP的体验,
    如果您有任何好的建议、想法、意见,欢迎Issue.

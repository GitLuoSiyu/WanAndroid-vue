<template>
  <div id="app">
    <div class="mask" v-show="flag"></div>
    <header class="mui-bar mui-bar-nav">
      <a class="mui-icon mui-icon-bars blog-top" @click="flag=!flag"></a>
        <h1 class="mui-title blog-top">{{title}}</h1>
      <a class="mui-icon-right-nav mui-pull-right mui-icon mui-icon-gear blog-top" @click="goMore" ></a>
    </header>
    <mt-swipe :auto="3000">
      <mt-swipe-item
      v-for="ban in banners"
      :key ="ban.id"
      ><img :src="ban.imagePath" /></mt-swipe-item>
    </mt-swipe>
    <!-- 首页最新文章 -->
    <div class="blogs-content">
      <ul>
        <li
        v-for="blog in blogs"
        :key="blog.id"
        >
            <div class="mui-card">
              <div class="mui-card-header mui-card-media">
              <img src="http://www.wanandroid.com/resources/image/pc/logo.png" />
              <div class="mui-media-body">
                 {{blog.author}}
                  <p>发表于 {{blog.niceDate}}</p>
              </div>
              </div>
              <div class="mui-card-content" >
                <router-link :to="{name:'blogDetail'}">{{blog.title}}</router-link>
              </div>
              <div class="mui-card-footer">
                <a class="mui-card-link"
                >  
                    公众号<span class="blog-kind">{{blog.chapterName}}</span>
                  </a>
                <a class="mui-card-link"
                @click ='changeState(blog.id,blog.collect)'
                ><i class="mui-icon mui-icon-star"
                @click="blog.collect = !blog.collect"
                :class="blog.collect?'mui-icon-starhalf .star-selected':''"
                ></i><span class="blog-kind"></span></a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <transition name="leftNav">
        <ul class="leftNav" v-show="flag">
            <li class="user-logo">
              <!-- <img src="http://www.wanandroid.com/resources/image/pc/logo.png" /> -->
              <div class="user-logo-img"></div>
            </li>
            <li class="user-name left-btn">
              <a @click="goLogin()">{{this.$store.state.AllState ? this.$store.state.name:"请登录"}}</a>
            </li>
            <li class="collect left-btn">
              <i class="mui-icon mui-icon-starhalf"></i>
              <a @click="goCollect" >我的收藏</a>
              <span class="collect-num mui-badge mui-badge-danger"
              v-if='(this.$store.state.AllState)'
              >{{collectNum}}</span>
            <li class="theme left-btn" @click="changeTheme()" >
              <i class="mui-icon mui-icon-paperplane"></i>
              {{isThemeMsg}}</li>
            <li class="setting left-btn">
              <i class="mui-icon mui-icon-gear"></i>
              <router-link :to="{name:'setting'}" >系统设置</router-link></li>
            <li class="aboutMe left-btn">
              <i class="mui-icon mui-icon-info"></i>
              <router-link :to="{name:'mine'}" >关于我们</router-link></li>
            <li class="loginout left-btn" @click="loginOut()" v-if='(this.$store.state.AllState)'>
              <i class="mui-icon mui-icon-close" ></i>
              退出登录</li>
        </ul>
    </transition>
    <ToTop></ToTop>
    <Footer/>
  </div>
</template>

<script>
import axios from 'axios'
import { Toast } from 'mint-ui';

export default {
  data(){
      return{
        banners:[],
        blogs:[],
        title:'玩Android',
        flag: false,
        userName:'请登录',
        userLogo:'',
        collectNum:'',
        isTheme:false,
        isThemeMsg:'夜间模式',
        collectNum:0
      }
  },
  methods:{
    changeState(id,state) {
      let _this = this
      if(!this.$store.state.AllState) {
        Toast({
          message:'请先登录',
          duration:500,
          iconClass:'icon icon-success'
        })
      }
      if(this.$store.state.AllState && state) {
        this.blogs.map( item => {
          if(item.id == id) {
            _this.$store.commit('getCollect',item)
          }
        })
      }
      if(this.$store.state.AllState && !state) {
        _this.$store.commit('delCollect',id)
      }
    },

    goLogin(){
      if(this.$store.state.name == '') {
        setTimeout( () =>{
          this.$router.push({name:'login'})
        },500)
      }
    },

    goCollect(){
      if(this.$store.state.AllState) {
        this.$router.push({name:"collect"})
      } else {
        Toast({
          message:'请先登录',
          duration:500,
          iconClass:'icon icon-success'
        })
      }
    },

    onCollect(){
      blog.collect = !blog.collect
    },

    readMore(){
      console.log('进入文章详情')
    },

    loginOut(){
      //  退出操作
      this.$ajax.get('/api/user/logout/json')
      .then(res=>{
        console.log(res);
        // localStorage.clear();
        this.$store.state.AllState = false
        localStorage.removeItem("collect")
        this.colNumFlage()
      })
      .catch(err=>{
        console.log(err);
      })
    },

    changeTheme(){
      // 左侧个人中心，夜间模式
      if(this.isTheme === false) {
        document.querySelector('.leftNav').style.background = '#000'
        document.querySelector('.theme,.aboutMe').style.color = '#fff'
        this.isTheme = !this.isTheme
        this.isThemeMsg = '白天模式'
        /* 这个全局功能 暂时不会做 */
      } else {
        document.querySelector('.leftNav').style.background = '#fff'
        document.querySelector('.theme').style.color = '#333'
        this.isTheme = !this.isTheme
        this.isThemeMsg = '夜间模式'
      }

    },

    goMore(){
      // 进入系统设置页面
      this.$router.push({name:'setting'})
    },

    colNumFlage(){
      // 收藏数量的判断与现实
      if(!this.$store.state.AllState == false) {
        let colNum = this.$store.state.Collect.length
        _this.collectNum = colNum
      }
    }

  },
  created(){
    let _this = this
		this.$ajax.all([
			this.$ajax.get('/api/banner/json'),
			this.$ajax.get('/api/article/list/0/json')
		]).then(this.$ajax.spread(function(bannersRes,blogsRes){
				_this.banners = bannersRes.data.data
				_this.blogs = blogsRes.data.data.datas
    }))
    // 路由判断以及收藏数量的判断
    this.colNumFlage()
    
  }
}
</script>

<style>

.mint-swipe-items-wrap{
  height:1.6rem;
}
.mint-swipe-items-wrap img{
  width:100%;
  height:1.6rem;
}
.blog-kind{
  color:#777;
  padding-left:0.04rem;
}
.blogs-content{
  margin-bottom:0.6rem;
}
.mui-media-body p{
  font-size: 0.09rem;
  padding-top:0.02rem;
}
.mui-card-content{
  padding-left:0.1rem;
  margin: 0.06rem 0;
  font: bold 0.14rem "";
  color: #26a2ff;
  width:2.4rem;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.mui-card-link{
  color: #555;
}
.star-selected{
  color: blue;
}
.blog-top{
  background-color: #26a2ff;
  color: #fff;
}

/* sideBar */
.mask{
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 99;
    background-color: #999;
    opacity: 0.5;
}
.leftNav {
    position: fixed;
    height: 100%;
    background: #fff;
    color: red;
    top: 0.27rem;
    z-index: 99999;
    box-shadow: 0.01rem 0.01rem 0.01rem #ccc;
}

.leftNav li {
    padding: 0.15rem 0.25rem;
    width: 2rem;
}
.leftNav li a{
    color: #333;
}
.leftNav-enter,
.leftNav-leave-to {
    transform: translateX(-100%);
}

.leftNav-enter-active,
.leftNav-leave-active {
    transition: all 0.5s ease-out;
}
.leftNav li {
  font: 0.18rem "楷体";
  color: #333;
}
.leftNav li i{
  font-weight: bold;
}
.user-logo,.user-name{
  background-color: #ef4f4f; 
  color: #fff !important;
  text-align: center;
}
.user-name a{
  color: #fff !important;
}
.user-logo {
  margin: 0;
}
.user-logo .user-logo-img{
  display: block;
  margin: 0 auto;
  width: 0.6rem;
  height: 0.6rem;
  color: #fff;
  background-color: bisque;
  border-radius: 50%;
}
.collect{
  margin-top: 0.1rem;
  position: relative;
}
.collect-num{
  position: absolute;
  top: 0.1rem;
}
.mint-toast{
  z-index: 999999 !important;
}

</style>
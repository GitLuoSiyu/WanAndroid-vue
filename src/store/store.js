import Vue from 'vue'
// 注册vuex
import { Toast } from 'mint-ui'
import Vuex from 'vuex'
Vue.use(Vuex)

let Collect = JSON.parse(localStorage.getItem('collect')) || []
let store = new Vuex.Store({
    state:{
		AllState:false,
		Collect:Collect,
        name:''
    },
    mutations:{
		// 左侧个人中心的 状态判断、登录的状态判断
        changeState(state,username){
            state.AllState = true
            state.name = username
		},
		// 点赞 收藏
		getCollect(state,options) {
			let flag = false
			state.Collect.map( item => {
				// 如果点赞图标是 实心
				if(item.id == options.id) {
					flag = true
					Toast({
						message:'收藏已存在',
						duration: 500,
						iconClass:'icon icon-success'
					})
					return true
				}
			})
			// 如果还没收藏(空心)
			if(!flag) {
				state.Collect.push(options)
				Toast({
					message: '收藏成功',
					duration: 500,
					iconClass: 'icon icon-success'
				})
			}
			// 将点赞行为存入 localstorage 本地化
			localStorage.setItem('collect',JSON.stringify(state.Collect))
		},

		// 二次点击，取消点赞的变化
		delCollect(state,id) {
			state.Collect.map( (item,id) =>{
				if(item.id == id) {
					state.Collect.splice(i,1)
					Toast({
						message:'取消收藏',
						duration: 500,
						iconClass: 'icon icon-fail'
					})
				}
			})
			// 更改 localstorage 里面的状态
			localStorage.setItem('collect',JSON.stringify(state.Collect))
		}
    },  
    getters:{

    }
})

export default store

/*
<template>
  <div id="Project">
			<NavBar title='项目'></NavBar>
			<!-- 项目导航条 -->
			<nav>
				<a :class="((All == Plist.id )? 'P_Active':'')"
					v-for="Plist in Projectlist" :key='Plist.id'
					@click="changeAll(Plist.id)"
				>{{Plist.name}}</a>
			</nav>
	
			<div class="Project">
				<div class="Pcontent">
					
						<div class="P_card"
							v-for="P_Clist in PClist" :key='P_Clist.id'
							@click="collectmsg(P_Clist.id,P_Clist.collect)"
						>
							
								<div class="P-left">
									<a></a>
									<img :src="P_Clist.envelopePic" />
								</div>
					
								<div class="P-right">
								<div class="P-Body">
									<p class="p-Btitle">{{P_Clist.title}}</p>
									<p class="p-Bcontent">{{P_Clist.superChapterName}}</p>
									<p class="p-Bdesc">{{P_Clist.desc}}</p>
								</div>
								<div class="P-Bottom">
									<span>{{P_Clist.author}}</span>
									<span>{{P_Clist.niceDate}}</span>
								</div>
								<div class="Mask"
									@click="P_Clist.collect = !P_Clist.collect"
								><i :class="(P_Clist.collect ? 'el-icon-star-on Ismask':'el-icon-star-off') "></i></div>
							</div>
						</div>
						
						
						
						
				</div>	
			</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
export default {
  data () {
    return {
      Projectlist:[],
			All:294,
			PClist:[]
    }
  },
	methods:{
		collectmsg(id,state){
			// console.log(id,state)
			let _this = this
			if(!this.$store.state.AllState){
				Toast({
					message:'请先登录',
					duration:800,
					iconClass: 'icon icon-success'
				});
			}
			if(this.$store.state.AllState && state){
				this.PClist.map( item => {
					if(item.id == id){
						// console.log(item)
						_this.$store.commit('getCollect',item)
					}
				})
			}	
			if(this.$store.state.AllState && !state){
				_this.$store.commit('delCollect',id)
			}
		},
		changeAll(all){
			this.All = all;
			let _this = this
			this.$ajax.get('/api/project/list/1/json?cid='+ this.All).then( res => {
				// console.log(res.data.data.datas)
				_this.PClist = res.data.data.datas
			}).catch( err => {
				console.log(err)
			})
		}
	},
	created(){
		let _this = this
		this.$ajax.get('/api/project/tree/json').then( res => {
			// console.log(res.data.data)
			_this.Projectlist = res.data.data
			_this.changeAll(_this.All)
		}).catch( err => {
			console.log(err)
		})
	}
}
</script>

<style scoped>
#Project{
	margin:0.5rem 0;
}
nav{
	height:0.5rem;
	display: flex;
	overflow-x:auto;
	white-space:nowrap;
	background:#ff6a6a;
	padding:0.04rem 0;
	position:fixed;
	top:0.5rem;
	left:0;
	width:100%;
	z-index:100;
}
nav a{
	display:inline-block;
	line-height: 0.4rem;
	padding:0 0.1rem;
	color:#fff;
}
nav a.P_Active{
	border-bottom:0.02rem solid #fff;
}
.Project{
	margin-top:1rem;
}
/* 真正的内容 */
/*
.P_card{
	display:flex;
	justify-content:space-between;
	overflow: hidden;
	height:3rem;
	padding:0.1rem 0.04rem;
	border-bottom: 0.02rem solid #e5e5e5;
}
.P_card .P-left{
	display:block;
	width:40%;
	height: 100%;
	margin:0 0.06rem 0 0 ;
}
.P_card .P-left img{
	width:100%;
	height: 100%;
}

.P_card .P-right{
	width:60%;
	padding:0 0.04rem 0 0;
	position: relative;
}
.P_card .P-right .P-Body{
	min-height:40%;
	padding:0.1rem 0 0 0;
	font:0.16rem/1.5 '';
}
.P_card .P-right .P-Body .p-Btitle{
	color:#333;
	font:800 0.16rem/1.5 '';
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}
.P_card .P-right .P-Body .p-Bcontent{
	 
}            
.P_card .P-right .P-Body .p-Bdesc{
	width: 100%;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp:5;
	overflow: hidden;	
}
.P_card .P-right .P-Bottom{
	display: flex;
	justify-content: space-between;
	color:#666;
}
.P_card .P-right .Mask{
	position:absolute;
	right:0.04rem;
	font-size:0.3rem;
	color:#666;
}
.P_card .P-right .Mask .Ismask{
		color:#ff6a6a;
}
</style>
linwanru 12:40:16
<template>
  <div id="Home">		
			<header class="mui-bar mui-bar-nav">
				<a class="mui-action-back mui-icon mui-icon-left-nav mui-icon-bars"
					@click="flag=!flag"
				></a>
				<h1 class="mui-title">玩 Android</h1>
			</header>
			
			
			<div class='Home'>
					<!-- 轮播图 -->
				<div class="Banner">
					<mt-swipe :auto="4000">
					  <mt-swipe-item
							v-for='Blist in bannerList' :key='Blist.id'
						>
							<img :src='Blist.imagePath' />
						</mt-swipe-item>
					</mt-swipe>
				</div>
				
				<!-- 首页图文信息 -->
					<div class="PhotoMsg">
						<el-card class="box-card"
							v-for='PList in photoList' :key='PList.id'
						>
							<div slot="header" class="clearfix">
								<img src='/api/resources/image/pc/logo.png' />
								<span>{{PList.author}}</span>
								<el-button style="float: right; padding: 3px 0" type="text">{{PList.niceDate}}</el-button>
							</div>
							<div class="text item">
								{{PList.title}}
							</div>
							<span class='span'>{{PList.superChapterName}}</span>
							<el-button style="float: right; padding: 3px 0" type="text"
								@click ='ChangeState(PList.id,PList.collect)'
							>
								<i 
									@click="PList.collect = !PList.collect"
								:class="(PList.collect ? 'el-icon-star-on  Mask' :'el-icon-star-off mask')"
								></i>
							</el-button>
						</el-card>						
					</div>
				
			</div>
			
			<transition name="leftNav">
        <ul class="leftNav" v-show="flag">
            <li class="user-logo">
              <img src="https://ss1.baidu.com/9vo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=8d92cdd953df8db1a32e7a643922dddb/0ff41bd5ad6eddc4802878ba34dbb6fd536633a0.jpg" />
            </li>
            <li class="user-name"
							@click="ILogin"
						>
              {{this.$store.state.AllState? this.$store.state.name:"请先登录"}}
            </li>
            <li class="collect"
							@click="collectJump"
						>
								<i class="mui-icon mui-icon-starhalf"></i>
								我的收藏
								<span class="collect-num mui-badge mui-badge-danger">45</span>
						<li class="theme">
              <i class="mui-icon mui-icon-paperplane"></i>
              夜间模式</li>
            <li class="setting">
              <i class="mui-icon mui-icon-gear"></i>
              系统设置</li>
            <li class="aboutMe">
              <i class="mui-icon mui-icon-info"></i>
              关于我们</li>
            <li class="loginout"
							v-if='(this.$store.state.AllState)'
							@click="delstate"
						>
              <i class="mui-icon mui-icon-close"></i>
              退出登录</li>
        </ul>
    </transition>
			
  </div>
</template>

<script>
	import { Toast } from 'mint-ui';
export default {
  data () {
    return {
     bannerList:[],
		 photoList:[],
		 isMask:false,
		 flag:false,
		 istemp:false,
		 userName:'请先登录',
		 userLogo:'',
		 collectNum:''
    }
  },
	methods:{
		delstate(){
			// this.$store.state.AllState = false
			let _this = this
			this.$ajax.get('/api/user/logout/json').then( res => {
				console.log(res)
				_this.$store.state.AllState = false
				_this.$store.state.name = ''
			}).catch( err => {
				console.log(err)
			})
		},
		collectJump(){
			if(this.$store.state.AllState){
				this.$router.push({name:'Collection'})
			}else{
				Toast({
					message:'请先登录',
					iconClass: 'icon icon-success'
				});
			}
		},
		ChangeState(id,state){
				let _this = this
				// console.log(this.$store.state.AllState)
				if(!this.$store.state.AllState){
					Toast({
						message:'请先登录',
						iconClass: 'icon icon-success'
					});
				}
			 if(this.$store.state.AllState && state){
					this.photoList.map( item => {
						if(item.id == id){
							_this.$store.commit('getCollect',item)
						}
					})
			 }
			 
			 if(this.$store.state.AllState && !state){
					_this.$store.commit('delCollect',id)
			 }
		},
		ILogin(){
			// console.log(this.$store.state)
			if(this.$store.state.name == ''){
				setTimeout( () => {
					this.$router.push({name:'Login'})
				},2000)
				}
			}
	},
	created(){
		let _this = this
		this.$ajax.all([
			this.$ajax.get('/api/banner/json'),
			this.$ajax.get('/api/article/list/0/json')
		]).then(this.$ajax.spread(function(userResp, reposResp){
// 				console.log(userResp.data.data)
// 				console.log(reposResp.data.data.datas)
				_this.bannerList = userResp.data.data
				_this.photoList = reposResp.data.data.datas
		}))
	}
}
</script>

<style scoped>
	header{
		position:fixed;
	}
	.mui-bar{
		height:0.5rem;
		background: #ff6a6a;
	}
	.mui-title{
		line-height:0.5rem;
		color:#fff
	}
	a{
		color:#fff
	}
.Home{
	margin: 0.5rem 0;
}
.Banner{
	height:2.4rem;
}
.mt-swipe{
		height:100%
}
img{
	height:100%;
	width: 100%;
}

.text {
    font-size:0.14rem;
  }
.item {
    margin-bottom:0.1rem;
  }
.clearfix:before,
.clearfix:after {
	display: table;
	content: "";
}
.clearfix:after {
	clear: both
}
.el-card__header{
	display: flex;
	justify-content: space-between;
	padding:0.14rem 0.2rem;
}
.el-card__header img{
	width:0.55rem;
	height:0.55rem;
	margin-right:0.1rem;
	vertical-align: middle;
}
.el-card__body .span{
	padding:0.03rem 0.06rem;
	background: #8B4C39;
	border-radius:0.06rem;
	color:#EAEAEA;
	font:0.1rem/1.5 '';
}
.mask{
	font-size:0.24rem;
	color:#666;
}
.Mask{
	font-size:0.24rem;
}


.leftNav {
    position: fixed;
    height: 100%;
    background: #fff;
    color: #333;
    top: 0.5rem;
    z-index:0;
    box-shadow: 0.01rem 0.01rem 0.01rem #ccc;
}

.leftNav li {
    padding: 0.15rem 0.25rem;
    width: 3rem;
}

.leftNav-enter,
.leftNav-leave-to {
    transform: translateX(-100%);
}

.leftNav-enter-active,
.leftNav-leave-active {
    transition: all 0.5s ease-out;
}
.leftNav li a{
  font-size: 0.18rem;
  color: #333;
}
.leftNav li i{
  font-weight: bold;
}
.user-logo,.user-name{
  background-color: #ff5053; 
  color: #fff !important;
  text-align: center;
}
.collect{
  margin-top: 0.1rem;
  position: relative;
}
.collect-num{
  position: absolute;
  top: 0.1rem;
}




</style>
  * 
  */

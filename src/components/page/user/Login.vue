<template>
  <div id="app">
	  <TopBar title="登录"></TopBar>
		<div class="login-logo"> 

		</div>
		<div class="login-panel"> 
			<form class="mui-input-group">
				<div class="mui-input-row">
						<label>用户名</label>
				<input type="text" class="mui-input-clear" v-model="acount" placeholder="请输入用户名">
				</div>
				<div class="mui-input-row">
						<label>密码</label>
						<input type="password" v-model="pass" class="mui-input-password mui-input-clear" placeholder="请输入密码">
				</div>
				<div class="mui-button-row">
						<button type="button" class="mui-btn mui-btn-primary" @click="onlogin" >确认</button>
						<button type="button" class="mui-btn mui-btn-danger" @click="onreg">注册</button>
				</div>
			</form>
		</div>
		<!-- <div class="mui-numbox" data-numbox-step='10' data-numbox-min='0' data-numbox-max='100'>
			<button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
			<input class="mui-numbox-input" type="number" />
			<button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
		</div> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data(){
      return{
				acount:'',
				pass:'',
				errmsg:''
      }
  },
  methods:{
		onlogin(){
			let _this = this
			this.$ajax.post('/api/user/login',`username=${this.acount}&password=${this.pass}`)
			.then(res=>{
				// console.log(res)
				this.errmsg = res.data.errorMsg
				if(res.data.errorCode == 0){
					_this.returnMsg = "登录成功,欢迎来到WanAndroid",
					_this.toastMsg(_this.returnMsg)
					_this.$store.commit("changeState",_this.acount)
					setTimeout(()=>{
						this.$router.push({name:'blogs'})
						window.localStorage.setItem('isLogin',true)
					},3000)
				}
				if(res.data.errorCode == -1){
					Toast({
						message: this.errmsg,
						position: 'center',
						duration: 4000
					});
				}
				
			})
			.catch(error=>{
				console.log(error)
			})
		},
		toastMsg(value){
			Toast({
				message:value,
				duration:3000,
				position:'center'
			})
		},
		onreg(){
			this.$router.push({name:'reg'})
		}
  }
}
</script>

<style scoped>

.login-panel{
	margin-bottom: 0.6rem;
}
.login-logo{
	margin: 0.02rem 0;
	width: 100%;
	height: 1.6rem;
	background-color: rebeccapurple;
}
.mui-input-row{
	padding: 0.04rem 0;
	margin: 0 0.5rem;
	font-size: 0.14rem;
	color:#666;
}
.mui-input-row input{
	font-size: 0.14rem;
}
.mui-button-row button{
	margin: 0.01rem 0.12rem;
}


</style>
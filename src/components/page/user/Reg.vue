<template>
  <div id="app">
	<TopBar title="注册"></TopBar>
    <div class="login-logo"> 

	</div>
        <div class="mui-content">
			<form class="mui-input-group">
				<div class="mui-input-row">
					<label>账号</label>
					<input id='account' type="text" class="mui-input-clear mui-input" placeholder="请输入账号"
                    v-model="acount"
                    >
				</div>
				<div class="mui-input-row">
					<label>密码</label>
					<input id='password' type="password" class="mui-input-clear mui-input" placeholder="请输入密码"
                    v-model="pass"
                    >
				</div>
				<div class="mui-input-row">
					<label>确认密码</label>
					<input id='repassword' type="password" class="mui-input-clear mui-input" placeholder="再次输入密码"
                    v-model="repass"
                    >
				</div>
			</form>
			<div class="mui-content-padded">
				<mt-button size="large" type="primary" @click="onreg" >注册</mt-button>
			</div>
		</div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

export default {
  data(){
      return{
		acount:'',
		pass:'',
		repass:'',
		errmsg:''
      }
  },
  methods:{
	  onreg(){
			if(this.pass !== this.repass){
			  	Toast({
					message: this.errmsg,
					position: 'center',
					duration: 4000
				});
		  	} else {
			// console.log('点击了注册')
			this.$ajax.post('/api/user/register',`username=${this.acount}&password=${this.pass}&repassword=${this.repass}`)
			.then(res=>{
				// console.log(res)
				if(res.data.errorCode == '-1'){
					this.errmsg = '信息填写有误'
				} else {
					this.errmsg = res.data.errorMsg
				}
			})
			.catch(err=>{
				console.log(err)
			})
		  }
	  },
  }
}
</script>

<style scoped>

.login-logo{
	margin: 0.02rem 0;
	width: 100%;
	height: 1.6rem;
	background-color: peru;
}
.mui-input-row{
	font: 0.14rem "";
	color:#333;
}
.mui-input-row label{
	text-align: left;
	padding-left: 0.2rem;
}
.mui-input-row input{
	font-size: 0.14rem;
}
.mint-toast .is-placemiddle{
	width: 70%;
	height: 10%;
	text-align: center;
}



</style>
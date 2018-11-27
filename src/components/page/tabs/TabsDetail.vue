<template>
  <div id="app">
    <TopBar :title="name"></TopBar>
    <div class="tab-detail-cont"> 
      <ul> 
        <li
        v-for="tabItem in proDetails"
        :key="tabItem.id"
        >
          <div class="mui-card">
            <div class="tab-detail-cart-info">
                <div class="mui-card-header">
                  {{tabItem.title}}</div>
                <div class="mui-card-footer">
                  <span class="card-item-user">{{tabItem.niceDate}} @{{tabItem.author}}</span>
                  <span><a :href="tabItem.link">查看原文</a></span>
                </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  data(){
      return{
        id:'',
        name:'',
        proDetails:[]
      } 
  },
  created(){
    let id = this.$route.params.id
    this.name = this.$route.params.name
    let _this = this
    this.$ajax.get('/api/article/list/0/json?cid='+id)
    .then(res=>{
      _this.proDetails = res.data.data.datas
    })
    .catch(error=>{
      console.log(error)
    })
  },
  methods:{

  }
}
</script>

<style scoped>

.mui-card{
  display: flex;
  height: 0.9rem;
}
.tab-detail-cont{
  margin: 0.46rem 0 0.7rem 0;
}
.tab-detail-cart-info{
  margin: 0 auto;
  width: 90%;
}
.tab-detail-cart-info .mui-card-content,.mui-card-header,.mui-card-footer{
  text-align: left;
  padding-left: 0.06rem;
}
.mui-card-content{
  height: 44%;
  overflow: hidden;
  text-indent: 0.16rem;
  color: #666;
}
.mui-card-header{
  color: orangered;
  font: bold 0.14rem "";
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.mui-card-footer{
  width: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
}
.mui-card-footer span{
  font-size: 0.1rem;
}
.card-item-user{
  color: #222;
  vertical-align: middle;
}
/*
//成功注册了用户名为liu123，密码为123456的账号
// this.$axios.post('/api/user/register',
// 'username=lgq123&password=123456&repassword=123456'
// )
//   .then(res=>{
//     console.log(res)
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//登录成功
// this.$axios.post('/api/user/login','username=liu123&password=123456')
//   .then(res=>{
//     console.log(res);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//退出登录
// this.$axios.get('/api/user/logout/json')
//   .then(res=>{
//     console.log(res);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//收藏文章列表
this.$axios.get('/api/lg/collect/list/0/json')
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  }) 
*/

</style>

<template>
  <div id="app">
    <TopBar title="公众号"></TopBar>
    <div class="webchat-cont">
      <div class="webchat-header">
        <ul>
          <li
          v-for="(tab,index) in wechatTabList"
          :class="{active:index == num}"
          @click="choseTab(index,tab.id)"
          :key="tab.id"
          >
            <span class="">{{tab.name}}</span>
          </li>
        </ul>
      </div>
      <div class="wechat-content">
        <ul>
          <li
          v-for="weblog in wechatBlogs"
          :key="weblog.id"
          >
            <router-link :to="{name:'wechatDetail'}">
              <div class="mui-card">
                <div class="mui-card-content" >
                  <p class="wec-title">{{weblog.title}}</p>
                  <p class="wec-info"><span class="mui-icon mui-icon-compose"></span>{{weblog.niceDate}} @{{weblog.author}}</p>
                  <p class="wec-from">
                    <span class="wec-from-kind">分类</span>
                    {{weblog.superChapterName}} / {{weblog.chapterName}}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
      <ToTop></ToTop>
      <Footer/>
    </div>
  </div>
</template>

<script>

export default {
  data(){
      return{
        wechatTabList:[],
        wechatBlogs:[],
        num:0,
        cd:408
      }
  },
  created(){
    
      document.body.addEventListener('scroll',function(e){
        e.preventDefault()
        e.stopPropagation()
      },{passive: false})
    

    this.$ajax.get('/api/wxarticle/chapters/json')
    .then(res=>{
      // console.log(res.data.data)
      this.wechatTabList = res.data.data
    })
    .catch(error=>{
      console.log(error)
    })
    this.$ajax.get('/api/wxarticle/list/408/1/json')
    .then(res=>{
      // console.log(res.data.data.datas)
      this.wechatBlogs = res.data.data.datas
    })
    .catch(error=>{
      console.log(error)
    })

    // 
    

  },
  methods:{
    choseTab(index,id){
      this.num = index
      this.cd = id
      this.$ajax.get('/api/wxarticle/list/'+this.cd+'/1/json')
      .then(res=>{
      // console.log(res.data.data.datas)
        this.wechatBlogs = res.data.data.datas
      })
      .catch(error=>{
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>

.webchat-cont{
  display: flex;
  justify-content: space-between;
}
.webchat-header{
  background-color: #26a2ff;
  width: 26%;

}
.webchat-header ul {
  padding-left: 0rem;
  margin: 0;
}
.webchat-header ul li {
  list-style: none;
  display: block;
  height: 0.5rem;
  line-height: 0.5rem;
  color: #fff;
  font-size: 0.14rem;
  text-align: center;
}
.active{
  background-color: skyblue;
  box-sizing: border-box;
  border-left: solid 0.04rem #ef4f4f;
}

.wechat-content{
  margin-bottom: 0.6rem;
  width: 74%;
  overflow-y: scroll;
}
.mui-card-content .wec-title{
  padding: 0.1rem;
  margin-bottom: 0;
  font: 700 0.12rem "";
  color: #222;
  white-space: inherit;
}
.wec-info{
  padding: 0;
  margin-bottom: 0;
  padding-left: 0.1rem;
  color: #666;
  font: normal 0.12rem "宋体"; 
}
.wec-info .mui-icon{
  font-size: 0.18rem;
  font-weight: 700;
  color: green;
}
.wec-from{
  padding: 0.04rem 0.1rem 0.04rem 0.1rem;
  margin-bottom: 0;
  color: #666;
  font: normal 0.12rem "";
}
.wec-from-kind{
  border: 0.01rem solid green;
  color: green;
  width: 0.34rem;
  display: inline-block;
  text-align: center;
  border-radius: 0.04rem;
  font: 600 0.12rem/1.5 "";
  padding-top: 0.02rem;
  margin-right: 0.04rem;
}

.webchat-search{
  display: inline-block;
  width: 0.4rem;
  height: 0.4rem;
  background-color: #26a2ff;
  border-radius: 50%;
  font-weight: 800;
  color: #fff;
  text-align: center;
  line-height: 0.4rem;
  position: fixed;
  bottom: 0.7rem;
  right: 0.20rem;
}



</style>
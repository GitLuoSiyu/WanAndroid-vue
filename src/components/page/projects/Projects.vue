<template>
  <div id="app">
    <TopBar title="项目"></TopBar>
    <div class="pro-tabs"> 
      <div class="tab-ul">
        <div class="tab-ul-li"
        v-for="(tab,index) in projectList"
        :class="{active:index == num}"
        @click="tabopen(index,tab.id)"
        :key="tab.id"
        >{{tab.name}}</div>
      </div>
    </div>
    <div class="project-content">
      <ul>
        <li
        v-for="(itemCon) in proDetails"
        :key="itemCon.id"
        >
            <div class="mui-card">
              <div class="mui-card-content" >
                <p class="pro-desc">{{itemCon.desc}}</p>
              </div>
              <div class="mui-card-header mui-card-media">
                <img :src="itemCon.envelopePic" />
                <div class="mui-media-body">
                 {{itemCon.desc}}
                </div>
              </div>
              <div class="mui-card-footer">
                <a class="mui-card-link"><span class="pro-title">分类</span> {{itemCon.chapterName}}</a>
                <a class="mui-card-link">时间 {{itemCon.niceDate}} @{{itemCon.author}}</a>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <ToTop></ToTop>
    <Footer/>
  </div>
</template>

<script>
import { TabContainer, TabContainerItem } from 'mint-ui';
export default {
  data(){
      return{
        projectList:[],
        proDetails:[],
        selected:'',
        num:0,
        cd:294
      }
  },
  created(){
    this.$ajax.get('/api/project/tree/json')
    .then(res=>{
      // console.log(res.data.data)
      this.projectList = res.data.data
    })
    .catch(error=>{
      console.log(error)
    })
    // 只在首次打开时执行一次
    this.$ajax.get('/api/project/list/1/json?cid=294')
    .then(res=>{
      // console.log(res)
      this.proDetails = res.data.data.datas
    })
    .catch(error=>{
      console.log(error)
    })


  },
  methods:{
    tabopen(index,id) {
        this.cd = id
        this.num = index
        this.$ajax.get('/api/project/list/1/json?cid=' + this.cd)
        .then(res=>{
          // console.log(res)
          this.proDetails = res.data.data.datas
        })
        .catch(error=>{
          console.log(error)
        })
    }
  } 
}
</script>

<style scoped>
.project-content{
  margin-bottom: 0.6rem;
}
.mint-swipe-items-wrap{
  height:1.6rem;
}
.mui-card{
  font-size: 0.12rem;
  color: #777 !important;
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
.mint-navbar{
  width: 100%;
}
.mui-media-body p{
  padding-top:0.02rem;
}
.mui-card-content p{
  padding-left:0.1rem;
  margin: 0.1rem 0;
  font: bold 0.16rem "";
  color: #26a2ff;
  width:2.4rem;
  overflow:hidden;
  text-overflow:ellipsis;
  white-space:nowrap
}
.mui-card-link{
  color: #555;
}
.pro-title{
  border: 0.01rem solid #26a2ff;
  color: #fff;
  width: 0.34rem;
  display: inline-block;
  text-align: center;
  background-color: #26a2ff;
  border-radius: 0.04rem;
  line-height: 0.18rem;
  padding-top: 0.02rem;
  margin-right: 0.04rem;
}
.mui-media-body{
  width: 80%;
  height: 0.36rem;
  font-size: 0.1rem !important;
  overflow:hidden;
  color: #555 !important;
}
.mui-card-header.mui-card-media{
  padding-top: 0;
}
.mint-navbar{
  background: #26a2ff;
}
.mint-navbar a{
  color: #fff;
  font-weight: 600;
}
.pro-nav-selected{
  background-color: #008bf5;
}
.mui-card-footer{
  padding: 0.1rem;
}

.pro-tabs{
  height: 0.5rem;
  line-height: 0.5rem;
  background-color: #26a2ff;
}
.tab-ul{
  width: 100%;
  white-space: nowrap;
  overflow-x: auto;
}
.tab-ul-li{
  color: #fff;
  display: inline-block;
  font:0.14rem "";
  margin: 0 0.1rem;
}
.active{
  padding-bottom: 0.06rem;
  border-bottom: solid 0.02rem #fff;
}



</style>
<template>
  <div id="app">
    <TopBar title="体系"></TopBar>
    <mt-header title="">
      <router-link to="/" slot="left">
        <mt-button ></mt-button>
        <mt-button >Hot</mt-button>
      </router-link>
        <mt-button icon="search" slot="right" @click="onTabsList()" >
          <router-link :to="{name:'fire'}" class="to-fire" >热搜</router-link>
        </mt-button>
    </mt-header>
    <div class="tabs-content">
      <div class="tab-one"> 
        <ul class="mui-table-view">
          <li class="mui-table-view-cell"
          v-for="navone in tabListOne"
          :key="navone.id"
          >
            <a class="mui-navigate-right">
              <mt-button class="mui-navigate-right" type="danger" size="small" @click="onlistTwo()" >{{navone.name}}</mt-button>
              <p class="tab-one-item">
                <span class="mui-btn"
                v-for="tabOneItem in navone.children"
                :key="tabOneItem.id"
                @click="onlistTwo(tabOneItem.id)"
                >
                <router-link id="tab-detail-to" :to="{name:'tabsDetail',params:{id:tabOneItem.id,name:tabOneItem.name}}">
                  {{tabOneItem.name}}
                </router-link>
                </span>
              </p>
            </a>
          </li>
        </ul>
      </div>
      <div class="tab-two"> 
        <ul>
          <li
          v-for="navtwo in tabListTwo"
          :key="navtwo.id"
          >
            <span>{{navtwo.name}}</span>
          </li>
        </ul>
      </div>
      </div>
      <Search></Search>
      <Footer/>
  </div>
</template>

<script>

export default {
  data(){
      return{
        tabListOne:[],
        tabBlogsList:[],
        tabListTwo:[],
        keyone:1,
        keytwo:'',
        cid:60
      }
  },
  created(){
    this.$ajax.get('/api/tree/json')
    .then(res=>{
      // console.log(res.data.data)
      this.tabListOne = res.data.data
    })
    .catch(error=>{
      console.log(error)
    })
  },
  methods:{
    onlistTwo(id){
      this.cid = id

    },

    onTabsList(){
      console.log('打开热搜页面')
    }

  }
}
</script>

<style scoped>


.tabs-content{
  margin-bottom: 0.6rem;
}
.tab-one ul li button{
  color: #fff;
}
.tab-one ul{
  margin: 0.1rem 0.06rem;
  background: inherit;
  border: none;
}
.mui-table-view:before{
  background-color: inherit;
}
.tab-one ul li{
  background-color: #fff;
  margin: 0.04rem 0.05rem;
}
.tab-one ul li:nth-child(2n) button{
  background-color: #26a2ff;
}
.tab-one ul li:nth-child(3n+1) button{
  background-color: rgb(31, 204, 31);
}
.to-fire{
  color:#fff;
}
.mui-table-view-cell:after{
  background-color: #fff; 
}
.tab-one-item{
  margin-top: 0.1rem;
  width: 100%;
  display: flex;
  flex-wrap: wrap; 
}
.tab-one-item .mui-btn{
  display: inline;
  padding-left: 0.04rem;
  border: none;
  color: #666;
}
#tab-detail-to{
  color:#666;
}


</style>
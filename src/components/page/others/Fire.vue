<template>
  <div id="app">
    <TopBar title="热门导航"></TopBar>
    <div class="hotkey-content">
        <h3 class="key-title">大家都在搜</h3>
        <div class="fire-nav"> 
            <ul>
                <li
                v-for="hotkey in hotkeys"
                :key="hotkey.id"
                >
                    <mt-button type="danger" size="small" >{{hotkey.name}}</mt-button>
                </li>
            </ul>
        </div>
        <h3 class="key-title">常用网址</h3>
        <div class="fire-nav hoturl"> 
            <ul>
                <li
                v-for="hoturl in hoturls"
                :key="hoturl.id"
                >
                <a :href="hoturl.link">
                    <button type="button" class="mui-btn mui-btn-primary">{{hoturl.name}}</button> 
                </a>    
                </li>
            </ul>
        </div>
    </div>
    
    <div class="addHotkey" @click="addHotkey()"> 
        <mt-palette-button content="+" 
            direction="rt" class="pb" :radius="80" ref="target_1" mainButtonStyle="color:#fff;background-color:#26a2ff;"
            style="left:30px;">
            <div class="my-icon-button indexicon icon-popup"></div>
        </mt-palette-button>
    </div>
    
  </div>
</template>

<script>

export default {
  data(){
      return{
        hotkeys:[],
        hoturls:[]
      }
  },
  created(){
    this.$ajax.get('/api/hotkey/json')
    .then(res=>{
        console.log(res.data.data)
        this.hotkeys = res.data.data
    })
    .catch(error=>{
        console.log(error)
    })

    this.$ajax.get('/api/friend/json')
    .then(res=>{
        // console.log(res.data.data)
        this.hoturls = res.data.data
    })
    .catch(error=>{
        console.log(error)
    })

  },
  methods:{
      addHotkey(){
          console.log('添加一个新建关键词')
      }
  }
}
</script>

<style scoped>

.fire-nav ul{
  margin: 0.1rem 0.06rem;
}
.fire-nav ul li{
  display: inline-block;
  margin: 0.04rem 0.05rem
}
.pb{
    position: fixed;
    bottom: 0.65rem;
    left: 3.1rem !important;
}
.pb .mint-main-button{
    left: 0.3rem;
}
.key-title{
    font: 0.16rem "";
    width: 100%;
    height: 0.4rem;
    line-height: 0.4rem;
    padding-left: 0.1rem;
    color: #333;
    background-color: #fff;
    box-shadow: 0 0.01rem 0.01rem #bbb;
    border-radius: 0.04rem;
}
.hoturl ul li button{
    border: 0;
}
.hoturl ul li:nth-child(2n) button{
    background-color: rgb(173, 36, 173);
}
.hoturl ul li:nth-child(3n+1) button{
    background-color: #26a2ff;
}
.hoturl ul li:nth-child(4n+1) button{
    background-color: rgb(31, 204, 31);
}



</style>
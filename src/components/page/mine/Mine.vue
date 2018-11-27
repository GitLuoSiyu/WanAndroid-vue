<template>
  <div id="app">
    <TopBar title="个人中心"></TopBar>
      <div class="mine-header">
          <p class="mine-userinfo">关于我们</p>
        <div class="mine-logo">></div>
      </div> 
    <div class="mine-content"> 
      <div>
        <div><img :src="mineimg" /></div>
        <h5>Vueapp Wan Andriod V1.0.0</h5>
        <h4>应用内容</h4>
        <div class="mine-cont-info">
          <p>首先非常鸿洋大神提供的帮助,也非常感谢玩Android提供的API,本应用采用Vue+MUI,根据WanAndroid的JAVA客户端的样式,尽力去完善各项功能.</p>
          <p>当然这只是目前的功能,后续我会在WanAndroid的原本基础上新增一些新的功能,未来我将使用JS极力去完善和提供更加便捷的功能.</p>
          <p>对于使用JS去模仿原生APP,此外我还会使用ReactNative去实现,极力去接近原生APP的体验,如果您有任何好的建议、想法、意见,欢迎Issue.</p>
        </div>
      </div>
      <div>
        <ul>
          <li>

          </li>
        </ul>
      </div>
    </div>
    <!-- <button type="button" data-loading-icon="mui-spinner mui-spinner-custom" class="mui-btn mui-btn-primary">确认</button> -->
    <Footer/>
  </div>
</template>

<script>

export default {
  data(){
      return{
        collectList:[],
        collect:[],
        mineimg:'',
      }
  },
}
</script>

<style scoped>
.mine-header{
  width: 100%;
  height: 1rem;
  background-color: #26a2ff;
  padding-top: 0.16rem;
}
.mine-header .mine-logo{
  margin-top: 0.5rem;
  margin-left: 0.06rem;
  width: 0.4rem;
  height: 0.4rem;
  line-height: 0.4rem;
  font: bold 0.25rem "";
  padding-left: 0.03rem;
  padding-top: 0.01rem;
  border-radius: 50%;
  text-align: center;
  color: #fff;
  vertical-align: middle;
  border: solid 0.01rem #fff;
  background-color: #26a2ff;
}
.mine-userinfo{
  text-align: left;
  padding-left: 0.1rem;
  color: #fff;
  font-size: 0.18rem;
}
.mine-content{
  margin: 0.6rem 0.33rem;
}
.mine-content h5{
  text-align: center;
  margin: 0.2rem 0;
}
.mine-content h4{
  text-align: left;
  margin: 0.2rem 0;
  color: #333;
}
.mine-cont-info p{
  text-align: left;
  text-indent: 0.16rem !important;
  color: #666;
}


</style>

<template>
  <div id="app">
    <TopBar title="设置"></TopBar>
    <div class="setting-cont">
      <div class="setting-til">{{settil1}}</div>
      <div class="mui-content">
        <div class="mui-row">
          <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-download">
                      {{settingMsg[0].tle}}    
                  </a>
              </li>
          </div>
          <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-image">
                      {{settingMsg[1].tle}}  
                  </a>
              </li>
          </div>
          <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-navigate">
                      {{settingMsg[2].tle}}  
                  </a>
              </li>
          </div>
           <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-paperclip">
                      {{settingMsg[5].tle}}  
                  </a>
              </li>
          </div>
        </div>
      </div>
      <div class="setting-til">{{settil1}}</div>
      <div class="mui-content">
        <div class="mui-row">
          <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-compose">
                      {{settingMsg[3].tle}}      
                  </a>
              </li>
          </div>
          <div class="mui-col-sm-6 mui-col-xs-12">
              <li class="mui-table-view-cell">
                  <a class="mui-icon mui-icon-trash">
                      {{settingMsg[4].tle}}  
                  </a>
              </li>
          </div>
        </div>
      </div>
    </div> 
    
  </div>
</template>

<script>

export default {
  data(){
      return{
        settil1:'通用设置',
        settil2:'其他设置',
        settingMsg:[
          {id:1,"tle":"自动缓存","icon":""},
          {id:2,"tle":"无图模式","icon":""},
          {id:3,"tle":"夜间模式","icon":""},
          {id:4,"tle":"意见反馈","icon":""},
          {id:5,"tle":"清楚缓存","icon":""},
          {id:6,"tle":"提交意见","icon":""}
        ]
      }
  },
  methods:{

  }
}
</script>

<style scoped>

.set-form{
  margin: 0.02rem 0 0.7rem 0;
}
.setting-cont{
  margin: 0.5rem 0.1rem;
}
.mui-content{
  background-color: #fff;
  box-shadow: 0.01rem 0.01rem 0.01rem #bbb;
}
.mui-table-view-cell{
  box-shadow: 0.01rem 0.01rem 0.01rem #eee;
  display: block;
}
.setting-til{
  margin: 0.1rem 0;
  color: #444;
}
.mui-content .mui-icon {
  color: red;
}
.mui-table-view-cell>a:not(.mui-btn){
  color: #555;
  font-size: 0.15rem;
}

</style>
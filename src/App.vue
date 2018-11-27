<template>
  <div id="app">
    <!-- <mt-header title="玩Android" ></mt-header> -->
    <transition name="router" mode="out-in">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>

export default {
  data(){
    return{
      msg:'1'
    }
  },
  created(){
    
  },
  methods:{
    openTask(){
      console.log('打开二级表格')
    },
    goback(){
      this.$router.go(-1); 
    }
  }
}
</script>

<style scoped>
#app{
    margin-top: 0.4rem;
}
.router-enter-active,.router-leave-active{
    transition: opacity .5s;
}
.router-enter,.router-leave-to{
    opacity: 0;
}



</style>

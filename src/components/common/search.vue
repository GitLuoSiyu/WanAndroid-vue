<template>
    <div>
        <div class="webchat-search">
        <span class="mui-icon mui-icon-search" @click="wechatSearch()" ></span>
      </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            }
        },
        methods:{
            wechatSearch(){
                console.log('点击搜索公众号内的所有文章')
            },
        }
    }
</script>

<style scoped>
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
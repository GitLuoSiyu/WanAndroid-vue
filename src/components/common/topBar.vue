<template>
    <div>
        <header class="mui-bar mui-bar-nav" >
            <a class="mui-icon mui-icon-arrowleft" @click="goBack"></a>
            <h1 class="mui-title">{{title}}</h1>
            <a class="mui-action-back mui-icon-right-nav mui-pull-right mui-icon mui-icon-gear" @click="goMore"></a>
        </header>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                
            }
        },
        props:['title','left','right'],
        methods:{
            goBack(){
                this.$router.go(-1); 
            },
            goMore(){
                console.log('分享页面')
                this.$router.push({name:'setting'})
            }
        }
    }
</script>

<style scoped>
.mui-bar.mui-bar-nav{
    position: fixed;
    height: 0.4rem;
    background-color: #26a2ff;
}
.mui-bar.mui-bar-nav a,h1{
    color: #fff;
    height: 100%;
}
</style>
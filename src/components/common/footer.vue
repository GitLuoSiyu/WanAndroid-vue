<template>
    <div>
        <nav class="mui-bar mui-bar-tab">
        <router-link class="mui-tab-item" :to="{name:'blogs'}">
            <span class="mui-icon mui-icon-list"></span>
            <span class="mui-tab-label">博文</span>
        </router-link>
        <router-link class="mui-tab-item" :to="{name:'projects'}">
            <span class="mui-icon mui-icon-compose"></span>
            <span class="mui-tab-label">项目</span>
        </router-link>
        <router-link class="mui-tab-item" :to="{name:'wechat'}">
            <span class="mui-icon mui-icon-weixin"></span>
            <span class="mui-tab-label">公众号</span>
        </router-link>
        <router-link class="mui-tab-item" :to="{name:'tabs'}">
            <span class="mui-icon mui-icon-paperplane"></span>
            <span class="mui-tab-label">体系</span>
        </router-link>
        <router-link class="mui-tab-item" :to="{name:'mine'}">
            <span class="mui-icon mui-icon-contact"></span>
            <span class="mui-tab-label">我的</span>
        </router-link>
        </nav>
    </div>
</template>

<script>
    export default {
        data(){
            return {

            }
        },
    }
</script>

<style scoped>
</style>
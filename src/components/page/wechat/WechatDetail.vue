<template>
  <div id="app">
    <TopBar title="公众号文章"></TopBar>
    <div class="wechat-chapter-blog-content">
        <ul>
            <li
            v-for="blog in wecDeBlogs"
            :key="blog.id"
            >
                <div class="mui-card">
                    <div class="mui-card-content" >
                        <p class="wec-title">{{blog.title}}</p>
                        <p class="wec-info">
                            <span class="mui-icon mui-icon-compose"></span>
                            {{blog.niceDate}} @{{blog.author}}</p>
                        <p class="wec-from">
                        <span class="wec-from-kind">分类</span>
                        {{blog.superChapterName}} / {{blog.chapterName}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>

  </div>
</template>

<script>

export default {
  data(){
      return{
          wecDeBlogs:[],
      }
  },
  created(){
      this.$ajax.get('/api/wxarticle/list/408/1/json')
      .then(res=>{
        //   console.log(res.data.data.datas)
          this.wecDeBlogs = res.data.data.datas
      })
      .catch(error=>{
          console.log(error)
      })
  },
}
</script>

<style scoped>

.wechat-content{
  margin-bottom: 0.6rem;
}
.mui-card-content .wec-title{
  padding: 0.1rem;
  margin-bottom: 0;
  font: 700 0.12rem "";
  color: #222;
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


</style>
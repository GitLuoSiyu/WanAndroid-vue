<template>
  <div id="app">
    <TopBar :title="name"></TopBar>
      <ul class="page-content">
        <li class="list-item" 
        v-for="(item,index) in collectList"
        :key="item.id" 
        data-type="0"
        >
            <div class="list-box" 
            @touchstart.capture="touchStart" 
            @touchend.capture="touchEnd" 
            @click="skip">
                <div class="list-content">
                    <p class="tips">{{item.author}}</p>
                    <p class="title">
                      <span>{{item.title}}</span>
                      <span>{{item.title}}</span>
                    </p>
                    <p class="time">{{item.niceDate}}</p>
                    <div class="link">
                      <span class="link-kind">分类 </span><a href="" > {{item.chapterName}}</a>
                    </div>
                </div>
            </div>
            <div class="delete" @click="deleteItem" :data-index="index">删除</div>
        </li>
      </ul>
      <ToTop/>
  </div>
</template>

<script>

export default {
  data(){
      return{
        name:'我的收藏',
        collectList:[],
        startX : 0 ,
        endX : 0 ,
      }
  },
  created(){
      this.collectList = this.$store.state.Collect
      console.log(this.$store.state.Collect)
  },
  methods : {
			//跳转
			skip(){
				if( this.checkSlide() ){
					this.restSlide();
                }else{
					alert('You click the slide!')
                }
			},
			//滑动开始
			touchStart(e){
				this.startX = e.touches[0].clientX;
			},
			//滑动结束
			touchEnd(e){
				let parentElement = e.currentTarget.parentElement;
				this.endX = e.changedTouches[0].clientX;
				if( parentElement.dataset.type == 0 && this.startX - this.endX > 30  ){
					this.restSlide();
					parentElement.dataset.type = 1;
				}

				if( parentElement.dataset.type == 1 && this.startX - this.endX < -30 ){
					this.restSlide();
					parentElement.dataset.type = 0;
				}
				this.startX = 0;
				this.endX = 0;
			},
            //判断当前是否有滑块处于滑动状态
            checkSlide(){
				let listItems = document.querySelectorAll('.list-item');
				for( let i = 0 ; i < listItems.length ; i++){
					if( listItems[i].dataset.type == 1 ) {
						return true;
                    }
				}
				return false;
            },
			//一次只能滑动一个
			restSlide(){
				let listItems = document.querySelectorAll('.list-item');
				for( let i = 0 ; i < listItems.length ; i++){
					listItems[i].dataset.type = 0;
				}
			},
			// 左滑删除，并删除 store 里的
			deleteItem(e,id){
                let _this = this
				let index = e.currentTarget.dataset.index;
				this.restSlide();
                this.collectList.splice(index,1);
                if(this.$store.state.AllState && !state) {
                    _this.$store.commit('delCollect',id)
                }
			}
		}
}
</script>

<style scoped>

.page-content{
    width: 100%;
    overflow: hidden;
    margin: 0.42rem 0 0.7rem 0;
}
.list-item{
    margin: 0.04rem 0;
    position: relative;
    height: 1rem;
    -webkit-transition: all 0.2s;
    transition: all 0.2s;
}
.list-item[data-type="0"]{
    transform: translate3d(0,0,0);
}
.list-item[data-type="1"]{
    transform: translate3d(-1.2rem,0,0);
}
.list-item:after{
    content: " ";
    position: absolute;
    left: 0.1rem;
    bottom: 0;
    right: 0;
    height: 0.01rem;
    border-bottom: 0.01rem solid #ccc;
    color: #ccc;
    -webkit-transform-origin: 0 100%;
    transform-origin: 0 100%;
    -webkit-transform: scaleY(0.5);
    transform: scaleY(0.5);
    z-index: 2;
}
.list-box{
    padding: 0.06rem;
    background: #fff;
    display: flex;
    align-items: center;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    justify-content: flex-end;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    font-size: 0;
}
.list-item .list-content{
    padding: 0.1rem;
    position: relative;
    flex: 1;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    overflow: hidden;
}
.list-item .title{
    display: block;
    color: #999;
    overflow: hidden;
    font-size: 0.14rem;
    font-weight: bold;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-item .tips{
    display: block;
    overflow: hidden;
    font: normal 0.14rem "";
    color: #26a2ff;
    line-height: 0.2rem;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.list-item .time{
    display: block;
    font-size: 0.12rem;
    position: absolute;
    right: 0.08rem;
    top: 0.1rem;
    color: #666;
}
.list-item .link{
    display: block;
    border-top: 0.01rem solid #eee;
    padding-top: 0.04rem;
    font-size: 0.12rem;
    color: #666;
}
.list-item .delete{
    width: 1.5rem;
    height: 1rem;
    text-align: center;
    background: #ff4949;
    font-size: 0.16rem;
    color: #fff;
    line-height: 1rem;
    position: absolute;
    top:0;
    right: -1.5rem;
    padding-right: 0.2rem;
}
.link-kind{
    color:#fff;
    display: inline-block;
    width: 0.36rem;
    height: 0.2rem;
    border-radius: 0.04rem;
    text-align: center;
    line-height: 0.2rem;
    background-color: #ff4949;
}

/*
//成功注册了用户名为liu123，密码为123456的账号
// this.$axios.post('/api/user/register',
// 'username=lgq123&password=123456&repassword=123456'
// )
//   .then(res=>{
//     console.log(res)
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//登录成功
// this.$axios.post('/api/user/login','username=liu123&password=123456')
//   .then(res=>{
//     console.log(res);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//退出登录
// this.$axios.get('/api/user/logout/json')
//   .then(res=>{
//     console.log(res);
//   })
//   .catch(err=>{
//     console.log(err);
//   })
//收藏文章列表
this.$axios.get('/api/lg/collect/list/0/json')
  .then(res=>{
    console.log(res);
  })
  .catch(err=>{
    console.log(err);
  }) 
*/

</style>

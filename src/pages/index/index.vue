<template>
  <view :style="{height: pageHeight, overflow: 'hidden'}">
    <search @search="disableScroll" />

    <!-- 焦点图 -->
    <swiper class="banner" indicator-dots indicator-color="rgba(255, 255, 255, 0.6)" indicator-active-color="#fff">

      <swiper-item v-for="item in swiperArr" :key="item.goods_id">
        <navigator url="/pages/goods/index">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>


    </swiper>


    <!-- 导航条 -->
    <view class="navs">
      <navigator open-type="switchTab" url="/pages/category/index" v-for="item in navArr" :key="item.name">
        <image :src="item.image_src"></image>
      </navigator>
    </view>


    <!-- 楼层 -->
    <view class="floors">

      <view class="floor" v-for="(item,index) in floorArr" :key="index">
        <view class="title">
          <image :src="item.floor_title.image_src"></image>
        </view>
        <view class="items">

          <navigator url="/pages/list/index" v-for="one in item.product_list" :key="one.name">
            <image :src="one.image_src"></image>
          </navigator>


        </view>
      </view>


    </view>


    <!-- 回到顶部 -->
    <view class="goTop icon-top" @tap="scroll" v-if="key"></view>



  </view>
</template>

<script>
  import search from '@/components/search';

  export default {

    data () {
      return {
        pageHeight: 'auto',
        swiperArr:[],
        navArr:[],
        floorArr:[],
        key:false,
      }
    },

    components: {
      search
    },
    
    methods: {
      disableScroll (ev) {
        this.pageHeight = ev.pageHeight + 'px';
      },
      // 获取轮播图数据
      async getSwiper(){

        // 1.获取数据
        // const [err,res] =  await uni.request({
        //   url:"https://api-ugo-web.itheima.net/api/public/v1/home/swiperdata"
        // });

        // // 2.渲染数据
        // this.swiperArr = res.data.message;


        // *********************************************************配置插件后代码：
        const {message}  = await this.$request({
          url:"/api/public/v1/home/swiperdata"
        });

        this.swiperArr = message;
      },
      // 获取导航数据
      async getNav(){
        const {message}  = await this.$request({
          url:"/api/public/v1/home/catitems"
        });

        this.navArr = message;
      },
      async getFloor(){
        const {message}  = await this.$request({
          url:"/api/public/v1/home/floordata"
        });

        this.floorArr = message;
      },
      // 回到顶部
      scroll(){
        // api:页面滚动
        uni.pageScrollTo({scrollTop:0});


      }
    },
    // 基本用的小程序生命周期
    onLoad(){
      // 获取轮播图
      this.getSwiper();

      // 导航
      this.getNav();

      this.getFloor();
    },
    // 监听下拉刷新动作
    async onPullDownRefresh(){
      // 刷新？该页面中所有的请求重新请求一次
      await this.getSwiper();
      await this.getNav();
      await this.getFloor();

      // 响应完成后：关闭效果； API;
      uni.stopPullDownRefresh();
    },
    // 1.初始化：按钮是看不见！
    // 2.什么时候能看见呢？页面滚动到某个位置的时候，才能看的见；
    //    页面滚动的时候，怎么函数呢？特别的生命周期；onPageScroll
    //    滚动到位置？值如何获取？拿到值有什么用？和固定值进行比较，
    onPageScroll(e){
      // 通过滚动去控制key的值；
      this.key = e.scrollTop>200?true:false;
    }
  }
</script>

<style scoped lang="less">
  .banner {
    width: 100%;
    height: 340rpx;

    image {
      width: 100%;
      height: 340rpx;
    }
  }

  .navs {
    display: flex;
    justify-content: space-between;
    padding: 30rpx 44rpx;

    image {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor {

    .title {
      width: 750rpx;
      height: 60rpx;
      padding: 20rpx 0 0 8rpx;
      background-color: #f4f4f4;
    }

    .items {
      padding: 20rpx 16rpx;
      overflow: hidden;

      navigator {
        width: 193rpx;
        height: 188rpx;
        margin-left: 10rpx;
        margin-bottom: 10rpx;
        float: left;
      }

      navigator:first-child {
        width: 232rpx;
        height: 386rpx;
        margin-left: 0rpx;
      }

      navigator:nth-child(2),
      navigator:nth-child(5) {
        width: 273rpx;
      }
    }

    &:first-child {

      .items {

        navigator {
          width: 233rpx;
        }
      }
    }
  }

  .goTop {
    position: fixed;
    bottom: 30rpx;
    /* #ifdef H5 */
    bottom: 65px;
    /* #endif */
    right: 30rpx;
  
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100rpx;
    height: 100rpx;
    font-size: 48rpx;
    color: #666;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.8);
  }
</style>
<template>
  <div class="box">
    <!-- 头部布局样式 -->
    <div class="user-head">
      <div class="head-left">
        <van-uploader v-model="fileList">
          <van-icon name="add-o" size="80" color="#F0F0F0" v-show="fileList.length == 0" />
        </van-uploader>
      </div>
      <div class="head-right">
        <p v-show="isLogin == false" @click="$router.push('/login')">立即登陆</p>
        <p >积分:2</p>
        <p v-show="isLogin == true" @click="logout">退出登陆</p>
      </div>
    </div>
    <!-- 通知栏区域 -->
    <van-notice-bar
      left-icon="volume-o"
      background="#FFF"
      color="#A00000"
      text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
    />

    <!-- 订单区域 -->
    <div class="order">
      <div class="order-head">
        <p>
          <van-icon name="orders-o" size="20" color="#0088dd" />
        </p>
        <p>我的订单</p>
        <p>
          <van-icon name="arrow" />
        </p>
      </div>
      <div>
        <van-grid :border="false">
          <van-grid-item icon="balance-pay" text="待付款" />
          <van-grid-item icon="photo-o" text="待发货" />
          <van-grid-item icon="photo-o" text="待收货" />
          <van-grid-item icon="photo-o" text="待评价" />
        </van-grid>
      </div>
    </div>

    <!-- 九宫格效果 -->
    <div class="nine-box">
      <figure>
        <van-icon name="balance-o" size="40"/>
        <figcaption>我的余额</figcaption>
      </figure>
       <figure>
        <van-icon name="balance-o" size="40"/>
        <figcaption>我的砍价</figcaption>
      </figure>
       <figure>
        <van-icon name="gift-o" size="40"/>
        <figcaption>我的礼券</figcaption>
      </figure>
       <figure>
        <van-icon name="star-o" size="40"/>
        <figcaption>我的收藏</figcaption>
      </figure>
       <figure>
        <van-icon name="gift-o" size="40"/>
        <figcaption>我的地址</figcaption>
      </figure>
       <figure>
        <van-icon name="gift-o" size="40"/>
        <figcaption>客户服务</figcaption>
      </figure>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  created() {
    let data = localStorage.getItem("09c_user");
    if(data == null){
      this.isLogin = false;
    }else{
      this.isLogin = true;
    }
  },
  data() {
    return {
      isLogin: false,
      fileList: [{ url: "/static/user.png" }],
    };
  },
  computed: {},
  methods: {
    logout(){
      localStorage.removeItem("09c_user");

      this.isLogin = false;
    }
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 100%;
  background: #f0f0f0;
  .user-head {
    width: 100%;
    padding: 0.2rem;
    box-sizing: border-box;
    background: #c1b193;
    display: flex;
    align-items: center;
    div:nth-of-type(1) {
      width: 30%;
    }
    div:nth-of-type(2) {
      width: 70%;
      p {
        line-height: 0.6rem;
      }
      p:nth-of-type(1) {
        font-size: 0.4rem;
        color: #f0f0f0;
      }
      p:nth-of-type(3) {
        font-size: 0.4rem;
        color: #f0f0f0;
      }
      p:nth-of-type(2) {
        background: #b3a078;
        padding: 0.05rem;
        font-size: 0.25rem;
        color: #f0f0f0;
        width: 30%;
        border-radius: 0.15rem;
      }
    }
    .van-uploader__preview-image img {
      border-radius: 50% !important;
    }
  }

  .order {
    width: 100%;
    margin-top: 0.3rem;
    background: #fff;
    .order-head {
      padding: 0 0.2rem;
      box-sizing: border-box;
      border-bottom: #dddddd 1px solid;
      line-height: 0.88rem;
      display: flex;
      align-items: center;
      p:nth-of-type(1) {
        width: 10%;
      }
      p:nth-of-type(2) {
        width: 80%;
      }
    }
  }

  .nine-box{
    padding: .2rem;
    box-sizing: border-box;
    width: 100%;
    margin-top: .3rem;
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    figure{
      width: 31%;
      margin: 1%;
      text-align: center;
      figcaption{
        line-height: .6rem;
      }
    }
  }
}
</style>

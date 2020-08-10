<template>
  <div>
    <!-- 商品列表区域 -->
    <div class="main">
      <div class="item" v-for="(item,index) in searchGoods" :key="index">
        <div class="img">
          <img src :data-src="item.pic" />
        </div>
        <p>{{item.title}}</p>
        <div>
          <p class="price">￥{{item.price}}</p>
          <van-icon name="cart-o" size="20" @click="showCart(item)"></van-icon>
        </div>
      </div>
    </div>
    <!-- sku的组件 -->
    <van-sku
      v-model="skuShow"
      :sku="sku"
      :goods="goods"
      :custom-stepper-config="customStepperConfig"
    >
      <!-- <template #sku-stepper>
        <van-stepper v-model="nums"/>
      </template>-->
    </van-sku>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["searchGoods"],
  mounted() {
    this.lazyLoad();
    window.addEventListener("scroll",this.lazyLoad);
  },
  data() {
    return {
      //商品sku信息
      skuShow: false,
      sku: {
        tree: [
          {
            k: "颜色",
            k_s: "c1",
            v: [
              { id: 1, name: "骚粉色" },
              { id: 2, name: "白色" },
              { id: 3, name: "黑色" },
            ],
          },
          {
            k: "尺码",
            k_s: "s1",
            v: [
              { id: 4, name: "L" },
              { id: 5, name: "M" },
            ],
          },
        ],
        list: [
          {
            id: 1000,
            c1: 1,
            s1: 4,
            price: 300,
            stock_num: 120,
          },
          {
            id: 1000,
            c1: 1,
            s1: 5,
            price: 400,
            stock_num: 120,
          },
          {
            id: 1000,
            c1: 2,
            s1: 4,
            price: 300,
            stock_num: 120,
          },
          {
            id: 1000,
            c1: 2,
            s1: 5,
            price: 300,
            stock_num: 120,
          },
          {
            id: 1000,
            c1: 3,
            s1: 4,
            price: 300,
            stock_num: 120,
          },
          {
            id: 1000,
            c1: 3,
            s1: 5,
            price: 300,
            stock_num: 120,
          },
        ],
        price: 3000,
        stock_num: 100,
      },
      goods: {
        picture: "",
      },
      nums: 0,
      //自定义步近器
      customStepperConfig: {
        handleStepperChange: (currentValue) => {
          console.log(currentValue);
          this.nums = currentValue;
        },
      },
    };
  },
  computed: {},
  methods: {
    //点击显示商品的。
    showCart(item) {
      this.skuShow = !this.skuShow;
      //设置sku中图片和价格
      this.goods.picture = item.pic;
      this.sku.price = item.price;
    },
    //图片懒加载操作
    lazyLoad() {
      let html = document.documentElement || document.body;
      let imgs = document.getElementsByTagName("img");
      //判断图片的offsetTop > scrollTop + clientHeight
      for (var i = 0; i < imgs.length; i++) {
        if (imgs[i].offsetTop < html.scrollTop + html.clientHeight) {
          imgs[i].src = imgs[i].getAttribute("data-src");
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
.main {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .item {
    width: 46%;
    margin: 2%;
    background: #fff;
    .img {
      img {
        width: 100%;
        height: 3.5rem;
        border-radius: 0.15rem;
      }
    }
    p {
      line-height: 0.8rem;
      width: 100%;
      font-size: 0.32rem;
      text-indent: 0.1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    div:nth-of-type(2) {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.1rem;
      box-sizing: border-box;
      .price {
        color: #ff0000;
      }
    }
  }
}
</style>

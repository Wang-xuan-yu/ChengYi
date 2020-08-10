<template>
  <div class="lativ">
    <!-- 搜索框 -->
    <van-search placeholder="搜索商品" shape="round" @focus="$router.push('/lativ/search')"/>
    <!-- 顶部导航栏 -->
    <van-tabs color="#A00000" line-height="1px" @change="changeItem">
      <van-tab :title="item.title" :name="item._id" v-for="(item,index) in cate" :key="index"></van-tab>
    </van-tabs>
    <!-- 价格排序 -->
    <div class="sort">
      <p>综合</p>
      <p>销量</p>
      <p>新品</p>
      <p @click="changeSort">
        价格
        <van-icon name="arrow-up" v-show="sort==1" />
        <van-icon name="arrow-down" v-show="sort==2" />
      </p>
    </div>
    <!-- 商品列表数据 -->
    <goods :searchGoods="searchGoods"/>
    <!-- 返回顶部的组建 -->
    <div class="top" v-show="topShow == true" @click="goTop">
      <van-icon name="arrow-up" size="20"/>
    </div>

  </div>
</template>

<script>
import goods from "./goods";
export default {
  name: "",
  mounted() {
    this.getCategory();
    this.getList();

    window.addEventListener("scroll",()=>{
        let html = document.documentElement || document.body;
        //判断页面滚动的高度，大于可视化窗口的高度
        if(html.scrollTop > html.clientHeight){
            this.topShow = true;
        }else{
            this.topShow = false;
        }
    })

  },
  components:{
    goods
  },
  data() {
    return {
      cate: [],
      cid: 0,
      sort: 0, //0 1， 2
      goodsList: [],
      topShow:false,
    };
  },
  computed: {
    searchGoods() {
      let data = this.goodsList;
      data.sort((a, b) => {
        if (this.sort == 1) {
          console.log("tes");
          return a.price - b.price;
        } else {
          return b.price - a.price;
        }
      });
      //无需过滤直接返回
      if (this.cid == 0) {
        return data;
      }
      data = data.filter((item) => {
        return item.cid == this.cid;
      });

      return data;
    },
  },
  methods: {
    //获取商品的分类
    getCategory() {
      this.$axios({
        url: "/static/fenlei.json",
      }).then((res) => {
        console.log(res);
        this.cate = res.result;
      });
    },
    //获取商品列表
    getList() {
      this.$axios({
        url: "/static/list.json",
      }).then((res) => {
        console.log(res);
        this.goodsList = res.result;
      });
    },
    //切换tab栏的信息
    changeItem(name, title) {
      console.log(name, title);
      this.cid = name;
    },
    //点击切换升序降序
    changeSort() {
      if (this.sort == 0 || this.sort == 2) {
        this.sort = 1;
      } else {
        this.sort = 2;
      }
    },
    //返回顶部操作
    goTop(){
      //获取兼容性html元素
        let html = document.documentElement || document.body;
        //清楚定时器
        let timer = setInterval(()=>{
          if(html.scrollTop <= 0){
            clearInterval(timer);
          }
          html.scrollTop -= 50;
        },10);
    },
   
  },
};
</script>

<style lang="scss" scoped>
.lativ {
  width: 100%;
  background: #f8f8f8;
  .top {
    position: fixed;
    padding: 0.2rem;
    background: #f0f0f0;
    border-radius: 50%;
    bottom: .88rem;
    right: .15rem;
  }
  .sort {
    line-height: 0.88rem;
    background: #fff;
    display: flex;
    align-items: center;
    border-bottom: #dddddd 1px solid;
    p {
      width: 15%;
      text-align: center;
    }
    p:nth-of-type(4) {
      color: #a00000;
    }
  }
}
</style>

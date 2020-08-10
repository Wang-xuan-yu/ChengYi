<template>
  <div class="box">
    <!-- banner的盒子 -->
    <div id="banner">
      <!-- 轮播图插件 -->
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(item,index) in banner" :key="index">
          <img :src="item.picUrl" />
        </van-swipe-item>
      </van-swipe>
      <div class="icons">
        <div class="icon-item">
          <van-icon name="like" size="30" />
          <p>签到</p>
        </div>
        <div class="icon-item">
          <van-icon name="gift" size="30" />
          <p>礼券</p>
        </div>
        <div class="icon-item">
          <van-icon name="coupon" size="30" />
          <p>砍价</p>
        </div>
        <div class="icon-item">
          <van-icon name="label" size="30" />
          <p>专栏</p>
        </div>
      </div>
    </div>

    <!-- 砍价区域 -->
    <div id="cut">
      <div class="cut-head">
        <span>全民砍价</span>
        <van-icon name="arrow" />
      </div>
      <!-- 父传子组件通信 -->
      <Cut :cutList="cutList" />
    </div>

    <!-- 精选专题区域 -->
    <div id="article">
      <div class="article-head">
        <span>精选专题</span>
        <van-icon name="arrow" />
      </div>
      <div class="article-list">
        <ul>
          <li v-for="(item,index) in articleList" :key="index">
            <img :src="item.pic" />
            <p v-html="item.title"></p>
            <p v-html="item.descript"></p>
          </li>
        </ul>
      </div>
    </div>
    <!-- 人气推荐 -->
    <div class="recommand">
      <div class="r-head">
        <span>人气推荐</span>
        <van-icon name="arrow" />
      </div>
      <Recommand :goodsList="goodsList" />
    </div>


    <div id="top" v-show="show" @click="toTop">
      <van-icon name="arrow-up" size="25"/>
    </div>
  </div>
</template>

<script>
import Cut from "@/components/home/cut.vue"; //第一步import导入组件
import Recommand from "@/components/home/recommand.vue";
export default {
  name: "",
  mounted() {
    this.getBanners();
    this.getCutList();
    this.getArticleList();
    this.getGoodsList();

    //页面监听数据的显示
    window.addEventListener("scroll",()=>{
      let html = document.documentElement || document.body;
      if(html.scrollTop > html.clientHeight){
        this.show = true;
      }else{
        this.show = false;
      }
    })
  },
  data() {
    return {
      banner: [],
      cutList: [],
      articleList: [],
      goodsList: [],
      show:false,
    };
  },
  computed: {},
  components: {
    Cut,
    Recommand,
  },
  methods: {
    //获取banner图的嘻嘻你
    getBanners() {
      this.$axios({
        url: "/banner/list",
      }).then((res) => {
        console.log(res);
        this.banner = res.data;
      });
    },
    //获取砍价的列表
    getCutList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/kanjia/list",
      }).then((res) => {
        console.log(res);
        //获取对象中所有key值
        let ids = Object.keys(res.data.goodsMap).splice(-3);
        ids.forEach((item) => {
          this.cutList.push(res.data.goodsMap[item]);
        });
      });
    },

    getArticleList() {
      this.$axios({
        url: "https://api.it120.cc/small4/cms/news/list",
      }).then((res) => {
        console.log(res);
        this.articleList = res.data;
      });
    },

    getGoodsList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list",
      }).then((res) => {
        console.log(res.data);
        let data = res.data.filter((item) => {
          return item.name.indexOf("测试") == -1; //过滤包含测试关键字的商品
        });

        this.goodsList = data.slice(-6);
      });
    },
    toTop(){
       let html = document.documentElement || document.body;

       //html.scrollTop = 0;

       let timer = setInterval(()=>{
         if(html.scrollTop == 0){
           clearInterval(timer);
         }
         html.scrollTop = html.scrollTop -30;
       },30);
    }
  },
};
</script>

<style scoped lang="scss">
.box {
  width: 100%;
  background: #f0f0f0;
  padding-bottom: 1rem;
  #top{
    position:fixed;
    padding: .2rem;
    background: #f0f0f0;
    bottom: 1.2rem;
    right: .2rem;
    border-radius: 50%;
    box-shadow: 0px 3px 5px rgba(0, 0, 0,.6);
  }
  #banner {
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .icons {
      width: 100%;
      height: 2rem;
      background: #fff;
      position: absolute;
      bottom: 0px;
      display: flex;
      justify-content: space-around;
      border-top-left-radius: 0.3rem;
      border-top-right-radius: 0.3rem;
      align-items: center;
      p {
        text-align: center;
        margin-top: 0.2rem;
        font-size: 0.4rem;
      }
    }
  }

  #cut {
    width: 100%;
    background: #fff;
    margin-top: 0.25rem;
    .cut-head {
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.35rem;
      border-bottom: #dddddd 1px solid;
    }
  }

  // 精选专题
  #article {
    width: 100%;
    background: #fff;
    margin-top: 0.2rem;
    .article-head {
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.35rem;
      border-bottom: #dddddd 1px solid;
    }
    .article-list {
      width: 100%;
      overflow: auto;
      height: 4rem;
      padding: 0.2rem;
      box-sizing: border-box;
      ul {
        width: 26rem;
        display: flex;
        li {
          width: 5rem;
          height: 2.8rem;
          margin-left: 0.12rem;
          img {
            width: 100%;
            height: 3rem;
          }
          p {
            width: 100%;
            line-height: 0.6rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          p:nth-of-type(1) {
            font-size: 0.35rem;
          }
          p:nth-of-type(2) {
            font-size: 0.3rem;
            color: #808080;
          }
        }
      }
    }
  }

  //人气推荐
  .recommand {
    width: 100%;
    background: #fff;
    margin-top: 0.2rem;
    .r-head {
      line-height: 0.88rem;
      text-align: center;
      font-size: 0.35rem;
      border-bottom: #dddddd 1px solid;
    }
  }
}
</style>

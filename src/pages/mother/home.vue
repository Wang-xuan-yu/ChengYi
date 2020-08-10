<template>
  <div class="main">
    <van-nav-bar title="商品列表" />
    <!-- 导航栏区域 -->
    <nav>
      <ul>
        <li
          :class="{act: index == active}"
          @click="active = index"
          v-for="(item,index) in navs"
          :key="index"
        >{{item}}</li>
      </ul>
    </nav>
    <div class="content" v-for="(item,index) in navs" :key="index" v-show="active==index">
      <div v-if="index == 0">
        <div class="sort">
            <p>综合排序</p>
            <p>销量优先</p>
            <p @click="changeSort">价格 <van-icon name="arrow-up" v-show="sortFlag==1"/><van-icon name="arrow-down" v-show="sortFlag==2"/></p>
        </div>
        <van-card
          :price="item.salePrice"
          :title="item.productName"
          :thumb="'/static/img/'+item.productImage"
          v-for="(item,index) in goodsSort"
          :key="index"
        >
        <template #num>
            <van-button type="primary" size="mini" @click="addCart(item)">+</van-button>
        </template>
        </van-card>
      </div>
      <div v-else>
        <p style="line-height: 2rem;font-size:.4rem;width: 100%;text-align:center">{{item}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  mounted() {
      this.getGoodsList();
  },
  data() {
    return {
      active: 0, //高亮的下标
      navs: ["推荐", "母婴", "鞋包饰品", "数码相机", "食品", "手机电脑"], //导航栏列表
      goodsList:[],

      sortFlag: 0,//0无序， 1升序，2降序
    };
  },
  computed: {
      //商品的排序
      goodsSort(){
          //赋值
          let data = this.goodsList;
          console.log(this.sortFlag);
          //判断flag的值为0，直接返回元数据
          if(this.sortFlag ==0){
              return data;
          }
          //数据的排序
          data.sort((a,b)=>{
              if(this.sortFlag == 1) {
                  return a.salePrice-b.salePrice
               }else if(this.sortFlag == 2){
                  return b.salePrice-a.salePrice;
               } 
          });

          console.log(data);
          //返回数据即可
          return data;
      }
  },
  methods: {
      getGoodsList(){
          this.$axios({
              url:"/static/data.json"
          }).then(res=>{
              this.$store.commit("setLoading",false);
              console.log(res);
              this.goodsList = res.result.list;
          })
      },
      //切换排序标志位
      changeSort(){
          if(this.sortFlag == 0 ||this.sortFlag == 2){
              this.sortFlag  = 1;
          }else{
              this.sortFlag = 2;
          }
      },
      //加入购物车
      addCart(good){
          //购物车中的商品数据
          let goodsList = this.$store.state.m_cartList;
        
          let index = goodsList.findIndex(item=>{
              return item._id == good._id;
          })
          //如果添加到的商品不存在的话，追加
          if(index == -1){
              good.checked = true;
              good.num = 1;
              goodsList.push(good);
          }else{//如果存在的话，修改数量即可
              goodsList.map(item=>{
                  if(item._id == good._id){
                      item.num++;
                  }
              })
          }
          this.$store.commit("addCart",goodsList);
          this.$router.push("/m/cart");
      }
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  background: #f0f0f0;

  nav {
    width: 100%;
    overflow: auto;
    ul {
      width: 12rem;
      display: flex;
      background: #0088dd;
      li {
        width: 2rem;
        line-height: 0.88rem;
        text-align: center;
        color: #fff;
      }
      li.act {
        background: #ff0000;
      }
    }
  }
  .content {
    width: 100%;
    min-height: 2rem;
    .sort{
        line-height: .88rem;
        display:flex;
        justify-content: space-around;
        align-items: center;
        background: #FFF;
        p{
            width: 33%;
            text-align:center;
        }
    }
  }
}
</style>

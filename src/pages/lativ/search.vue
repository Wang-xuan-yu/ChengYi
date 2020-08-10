<template>
  <div>
    <!-- 搜索框 -->
    <van-search placeholder="搜索商品" shape="round" v-model="keywords" @keypress.enter="addHistory">
      <template #left><van-icon name="arrow-left" size="20" @click="$router.go(-1)"/></template>
    </van-search>

    <div class="history" v-show="historyShow">
      <div class="history-head">
        <p>历史记录</p>
        <p><van-icon name="delete" @click="removeHistory"/></p>
      </div>
      <div class="history-list">
        <div class="item" v-for="(item,index) in history" :key="index">{{item}}</div>
      </div>
    </div>

    <goods :searchGoods="searchGoods" v-show="!historyShow"/>
  </div>
</template>

<script>
import goods from "./goods";
export default {
  name: "",
  mounted() {
    this.getList();
    this.getHistory();
  },
  components:{
    goods
  },
  data() {
    return {
      keywords:"",
      goodsList:[],
      history:[],
      historyShow: true,
    };
  },
  computed: {
    searchGoods(){
      let data = this.goodsList;
      if(this.keywords == ""){
        this.historyShow = true;
        return [];
      }
      this.historyShow = false;
      return data.filter(item=>{
        return item.title.indexOf(this.keywords) > -1;
      })
    }
  },
  methods: {
    //获取历史纪录
    getHistory(){
      this.history = this.$store.state.lativ_history;
    },
    addHistory(){
      if(this.keywords == ""){
        return false;
      }
      this.history.unshift(this.keywords);

      //超出总条数，尾部删除
      if(this.history.length > 6){
        this.history.pop();
      }

      //提交到vuex数据
      this.$store.commit("addHistory",this.history);
      this.getHistory();
      this.keywords = "";
    },
    //删除历史纪录
    removeHistory(){
      this.$store.commit("addHistory",[]);
      this.getHistory();
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
  },
};
</script>

<style lang="scss" scoped>

.history{
  width: 100%;
  padding: .3rem;
  box-sizing: border-box;
  .history-head{
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p:nth-of-type(1){
      font-weight:bold;
    }
  }
  .history-list{
    margin-top: .5rem;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

    .item{
      background: #F0F0F0;
      padding: .2rem;
      box-sizing: border-box;
      width: 23%;
      margin: 1%;
      border-radius: .1rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
}
</style>

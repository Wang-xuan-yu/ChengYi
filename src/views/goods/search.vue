<template>
  <div>
      <!-- 头部搜索区域 -->
      <van-search placeholder="请输入商品的名字" v-model="keywords" @keypress.enter="setHistory">
          <template #left>
              <van-icon name="arrow-left" size="25" @click="$router.go(-1)"/>
          </template>
      </van-search>

        <!-- 历史纪录的结构 -->
       <div class="history" v-show="historyFlag">
           <p class="h-head">
               <span>历史纪录</span>
                <van-icon name="delete" size="20" @click="removeHistory"/>
           </p>
           <div class="history-list">
               <div class="item" v-for="(item,index) in historyList" :key="index">
                   {{item}}
               </div>
           </div>
       </div>

       <Recommand :goodsList="searchGoods" v-show="!historyFlag"/>
  </div>
</template>

<script>
import Recommand from "@/components/home/recommand.vue";
export default {
  name: '',
  mounted() {
      this.getGoodsList();
      this.getHistory();
  },
  data() {
    return {
        keywords:"",
        goodsList:[],
        historyList:[],//历史纪录
        historyFlag:true,
    };
  },
  components:{
      Recommand
  },
  computed:{
      //商品的模糊搜索
      searchGoods(){
          //先把商品所有的数据付给变量
          let data = this.goodsList;
          //搜索的关键字为空的时候
          if(this.keywords == ""){
              this.historyFlag = true;//历史纪录显示
              return [];
          }

          this.historyFlag = false; //历史纪录隐藏
        return data.filter(item=>{
            return item.name.indexOf(this.keywords) > -1;
        });
      }
  },
  methods: {
    //商品列表数据
    getGoodsList() {
      this.$axios({
        url: "https://api.it120.cc/small4/shop/goods/list",
      }).then((res) => {
        
        this.goodsList = res.data;
      });
    },
    //获取历史纪录列表
    getHistory(){
        let data = localStorage.getItem("09c_history");

        if(data != null){
            this.historyList = JSON.parse(data);//解析数据，返回给history
        }else{
            this.historyList = [];
        }
    },
    // 设置历史纪录信息
    setHistory(){
        console.log("test");
        //搜索的关键字为空，不让他添加历史纪录了
        if(this.keywords == ""){
            return false;
        }
        //插入记录到数组的第一条
        this.historyList.unshift(this.keywords);

        //最多存储8条记录
        if(this.historyList.length>8){
            this.historyList.pop();
        }

        localStorage.setItem("09c_history",JSON.stringify(this.historyList));
        this.keywords = "";
    },
    removeHistory(){
        localStorage.removeItem("09c_history");
        
        this.getHistory();
    }
  },
};
</script>

<style scoped  lang="scss">
.history{
    width: 100%;
    padding: .3rem;
    box-sizing: border-box;
    .h-head{
        width: 100%;
        height: .88rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        span{
            font-size: .35rem;
            font-weight: bold;
        }
    }
    .history-list{
        width: 100%;
        display: flex;
        flex-wrap: wrap;

        .item{
            width: 23%;
            padding: .2rem;
            margin:1%;
            box-sizing: border-box;
            background: #F0F0F0;
            border-radius: .15rem;
            font-size: .3rem;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>

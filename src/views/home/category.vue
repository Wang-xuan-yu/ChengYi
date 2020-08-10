<template>
  <div class="box">
      <!-- 头部的搜索框 -->
      <van-search placeholder="请输入商品的名字" @focus="$router.push('/goods/search')"/>

      <div>
        <van-tree-select :items="category" :main-active-index.sync="active" class="tree">
          <template #content>
            <div id="sub_cate">
              <div class="item" v-for="(item,index) in getCate" :key="index" @click="gotoCate(item.id)">
                <img :src="item.icon" />
                <p>{{item.name}}</p>
              </div>
            </div>
          </template>
        </van-tree-select>
      </div>
  </div>
</template>

<script>
export default {
  name: '',
  mounted(){
    this.getCategory()
  },
  data() {
    return {
      active: 0,
      category: [{ text: '所有分类',id:0}],
      subCategory:[],
    };
  },
  mounted() {
    this.getCategory();
  },
  computed:{
    getCate(){
      let data = this.subCategory;
      //如果active的值是0，
      if(this.active == 0){
        return data;
      }
      //当前选中的商品分类的ID
      let id = this.category[this.active].id;
      console.log(id);
      return data.filter(item=>{
        return item.pid == id;
      })
    }
  },
  methods: {
    //获取分类的列表数据
    getCategory(){
      this.$axios.get("https://api.it120.cc/small4/shop/goods/category/all")
      .then(res=>{
        console.log(res);
        //遍历所有的商品分类，然后找出pid==0的商品
        let data = res.data.forEach(item=>{
          if(item.pid == 0){//顶级分类
          //实例化对象
            let object = new Object();
            object.id = item.id;
            object.text = item.name;
            this.category.push(object);
          }
        })

        this.subCategory = res.data;
      })
    },
    gotoCate(cid){
      this.$router.push("/goods/cate/"+cid);
    },
    
  },
};
</script>

<style scoped lang="scss">
.box{
  width: 100%;
  .tree{
    height: 100% !important;

    #sub_cate{
      width:65%;
      max-height: 85%;
      position: fixed;
      overflow: scroll;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .item{
        width: 31%;
        margin: 1%;
        text-align: center;
        img{
          width: 96%;
          margin-left:2%;
        }
        p{
          line-height: .55rem;
        }
      }
    }
  }
}
</style>

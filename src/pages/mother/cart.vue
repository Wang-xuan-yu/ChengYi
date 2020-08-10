<template>
  <div>
    <van-nav-bar title="购物车列表" left-arrow @click-left="$router.push('/m/home')" />

    <van-card
      :price="item.salePrice"
      :title="item.productName"
      :thumb="'/static/img/'+item.productImage"
      v-for="(item,index) in cartList"
      :key="index"
    >
      <template #thumb>
        <div style="width: 100%;display:flex;">
          <van-checkbox v-model="item.checked" />
          <img :src="'/static/img/'+item.productImage" style="width:70%" />
        </div>
      </template>
      <template #num>
        <van-stepper v-model="item.num" />
      </template>
    </van-card>

    <van-submit-bar :price="totalAmount" button-text="提交订单">
      <van-checkbox v-model="checked" @change="checkAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.cartList = this.$store.state.m_cartList;
  },
  data() {
    return {
      cartList: [],
      checked: true,
    };
  },
  computed: {
      totalAmount(){
          if(this.cartList.length>0){
                this.$store.commit("addCart",this.cartList);
          }
          let amount = 0;
          this.cartList.forEach(item=>{
              if(item.checked == true){
                  amount += item.salePrice*item.num;
              }
          })

          return amount*100;
      }
  },
  methods: {
      checkAll(e){
          this.cartList.map(item=>{
              item.checked = e;
          })
      }
  },
};
</script>

<style scoped>
</style>

<template>
  <div class="goods-list">
    <div class="good-item" v-for="(item,index) in goodsList" :key="index" @click="$router.push('/goods/detail/'+item.id)">
      <img :src="item.pic" />
      <p v-html="item.name"></p>
      <p v-html="item.characteristic"></p>
      <p>￥{{item.originalPrice}}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "",
  props:['goodsList'],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
.goods-list {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  .good-item {
    width: 48%;
    margin: 1%;
    box-sizing: border-box;
    img {
      width: 100%;
    }
    p {
      font-size: 0.35rem;
      width: 100%;
      line-height: 0.6rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    p:nth-of-type(2) {
      color: #808080;
      font-size: 0.3rem;
    }
    p:nth-of-type(3) {
      color: #ff0000;
    }
  }
}
</style>

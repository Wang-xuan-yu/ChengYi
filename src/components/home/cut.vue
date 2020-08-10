<template>
  <div class="cut-list">
    <div class="cut-item" v-for="(item,index) in cutList" :key="index">
      <div>
        <img v-bind:src="item.pic" />
      </div>
      <div>
        <p v-html="item.name"></p>
        <p>{{item.characteristic}}</p>
        <div class="cut-price">
          <div>
            <p>￥{{item.minPrice}}</p>
            <p>低价</p>
          </div>
          <div>
            <p>￥{{item.originalPrice}}</p>
            <p>原价</p>
          </div>
          <div>
            <p>{{item.stores}}</p>
            <p>限量</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ['cutList'],
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped lang="scss">
// 砍价列表样式
.cut-list {
  width: 100%;
  .cut-item {
    width: 100%;
    display: flex;
    padding: 0.2rem;
    box-sizing: border-box;
    border-bottom: #dddddd 1px solid;
    div:nth-of-type(1) {
      width: 30%;
      img {
        width: 100%;
        border-radius: 0.1rem;
      }
    }
    div:nth-of-type(2) {
      width: 65%;
      margin-left: 5%;
      p:nth-of-type(1) {
        line-height: 0.65rem;
        font-size: 0.35rem;
      }
      p:nth-of-type(2) {
        line-height: 0.6rem;
        font-size: 0.3rem;
        color: #505050;
      }

      .cut-price {
        width: 100%;
        display: flex;
        margin-top: 0.3rem;
        div {
          width: 33%;
          text-align: center;
        }
      }
    }
  }
}
</style>

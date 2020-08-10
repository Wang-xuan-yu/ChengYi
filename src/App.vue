<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <van-overlay :show="this.$store.state.loading" class="overlay">
      <van-loading color="#F0F0F0" size="30" vertical>加载中</van-loading>
    </van-overlay>

    <keep-alive include="drag">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
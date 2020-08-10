<template>
  <div>
    <!-- <div id="drag" v-drag="msg"></div>
    <div id="drag1" v-drag="msg"></div> -->
    <router-link to="/study/keep">keep-alive</router-link>
    <h3>{{msg}}</h3>
  </div>
</template>

<script>
export default {
  name: "drag",
  mounted() {
      console.log("页面挂载");
  },
  activated() {
      console.log("页面重新进入")
  },
  deactivated() {
      this.msg = "hello Vue";
      console.log("离开页面");
  },
  data() {
    return {
      msg: "hello world",
    };
  },
  computed: {},
  //自定义指令
  directives: {
    drag: {
      bind(el, binding) {
          el.innerText = binding.value;
        el.onmousedown = () => {
          var event = window.event || event;
          //获取鼠标的坐标
          var x = event.clientX;
          var y = event.clientY;

          // 获取盒子偏移值
          var L = el.offsetLeft;
          var T = el.offsetTop;

          //鼠标移动
          document.onmousemove = function (event) {
            //获取鼠标移动后的坐标
            //获取鼠标的坐标
            var x1 = event.clientX;
            var y1 = event.clientY;

            // 移动后盒子偏移值
            var l = x1-x+L;
            var t = y1-y+T;

            el.style.left = l+"px";
            el.style.top = t+"px";
          }

          document.onmouseup = function(){
              document.onmousemove = null;
          }
        };
      },
      inserted() {},
      unbind(el, binding) {},
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
#drag,#drag1 {
  width: 100px;
  height: 100px;
  
  position: absolute;
}

#drag{
    background: #0088dd;
}
#drag1{
    background: #A00000;
}
</style>

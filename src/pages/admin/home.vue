<template>
  <div>
    <el-container>
      <!-- 左侧菜单栏 -->
      <el-aside>
        <!-- 左侧菜单栏 -->
        <el-menu
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="height: 760px;"
          router
        >
          <el-menu-item index="/admin/home">
            <i class="el-icon-house"></i>
            <span>首页</span>
          </el-menu-item>
          <!-- 包含二级菜单的 -->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-user"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/admin/user">
              <i class="el-icon-caret-right"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-setting"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-caret-right"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-s-tools"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-caret-right"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-reading"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-caret-right"></i>
              <span>选项一</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主题区域 -->
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  computed: {},
  methods: {},
};
</script>

<style scoped>
</style>

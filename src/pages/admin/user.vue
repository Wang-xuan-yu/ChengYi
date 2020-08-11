<template>
  <el-container>
    <el-header style="background: #F0F0F0;line-height: 60px;">
      <el-breadcrumb separator="/" style="margin-top: 20px;">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>用户管理</el-breadcrumb-item>
        <el-breadcrumb-item>用户列表</el-breadcrumb-item>
      </el-breadcrumb>
    </el-header>
    <el-main>
      <div>
        <el-input placeholder="请输入内容" v-model="keywords" style="width: 300px;">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="primary" @click="addForm=true">添加用户</el-button>
      </div>

      <div style="margin-top: 20px">
        <el-table border :data="searchUser">
          <el-table-column prop="id" label="#"></el-table-column>
          <el-table-column prop="username" label="姓名"></el-table-column>
          <el-table-column prop="email" label="邮箱" width="180px"></el-table-column>
          <el-table-column prop="mobile" label="电话"></el-table-column>
          <el-table-column prop="role_name" label="角色"></el-table-column>
          <!-- <el-table-column prop="" label="创建时间" ></el-table-column> -->
          <el-table-column label="状态">
            <template slot-scope="scope">
              <el-switch
                v-model="scope.row.mg_state"
                active-color="#13ce66"
                inactive-color="#ff4949"
                @change="changeState"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="editShow(scope.row)"
                circle
              ></el-button>
              <el-button
                type="danger"
                icon="el-icon-delete"
                @click="removeUser(scope.row)"
                size="mini"
                circle
              ></el-button>
              <el-button type="warning" icon="el-icon-star-off" size="mini" circle></el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- <el-pagination
          :current-page.sync=""
          :page-size="2"
          layout="total, prev, pager, next"
          :total="1000"
        ></el-pagination>-->

        <!-- 添加用户的弹框信息 -->
        <el-dialog title="添加用户" :visible.sync="addForm">
          <el-form :model="form">
            <el-form-item label="用户名" label-width="80px">
              <el-input v-model="form.username" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" label-width="80px">
              <el-input type="password" v-model="form.pwd" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px">
              <el-input v-model="form.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="80px">
              <el-input v-model="form.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="addUser">确 定</el-button>
          </div>
        </el-dialog>

        <!-- 编辑用户的弹框信息 -->
        <el-dialog title="编辑用户" :visible.sync="editForm">
          <el-form :model="form">
            <el-form-item label="用户名" label-width="80px">
              <el-input v-model="saveForm.username" autocomplete="off" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="邮箱" label-width="80px">
              <el-input v-model="saveForm.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="手机" label-width="80px">
              <el-input v-model="saveForm.mobile" autocomplete="off"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" @click="editUser">确 定</el-button>
          </div>
        </el-dialog>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "",
  mounted() {
    this.getUserList();
  },
  data() {
    return {
      keywords: "",
      user: [],
      form: {
        username: "",
        pwd: "",
        email: "",
        mobile: "",
      },
      addForm: false,
      editForm: false, //编辑标识符
      saveForm: {},
    };
  },
  computed: {
    //模糊搜索的用户
    searchUser() {
      let user = this.user;

      if (this.keywords == "") {
        return user;
      }
      console.log("test");
      return user.filter((item) => {
        return item.username.indexOf(this.keywords) > -1;
      });
    },
  },
  methods: {
    changeState() {
      this.$store.commit("setUserList", this.user);
    },
    getUserList() {
      //本地存储无数据
      if (this.$store.state.userList.length == 0) {
        this.$axios({
          url: "/static/userlist.json",
        }).then((res) => {
          console.log(res);
          if (res.meta.status == 200) {
            this.user = res.data.users;
            this.$store.commit("setUserList", this.user);
          }
        });
      } else {
        this.user = this.$store.state.userList;
      }
    },
    addUser() {
      if (
        this.form.username == "" ||
        this.form.email == "" ||
        this.form.mobile == ""
      ) {
        this.$message({
          message: "用户信息不能为空",
          type: "error",
        });
        return false;
      }

      this.form.id = parseInt(Math.random() * 10000);
      this.form.mg_state = true;
      this.form.role_name = "超级管理员";

      this.user.unshift(this.form); //本地添加数据
      this.$store.commit("setUserList", this.user);

      this.$message({
        message: "添加成功",
        type: "success",
      });
      this.addForm = false;
    },
    //控制编辑盒子的显示操作
    editShow(row) {
      //控制编辑弹框显示
      this.editForm = true;
      this.saveForm = row;
    },
    //用户编辑
    editUser() {
      this.user.map((item) => {
        if (item.id == this.saveForm.id) {
          item.email = this.saveForm.email;
          item.mobile = this.saveForm.mobile;
        }
      });
      this.$store.commit("setUserList", this.user);
      this.editForm = false; //隐藏编辑
    },
    //删除用户
    removeUser(row) {
      console.log(row);
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //找出要删除的的位置
          let ind = this.user.findIndex((item) => {
            return item.id == row.id;
          });
          //数组中清楚数据
          this.user.splice(ind, 1);
          this.$store.commit("setUserList", this.user);

          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>

<style scoped>
</style>

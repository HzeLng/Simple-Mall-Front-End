<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区 -->
      <div class="avatar_box">
        <!-- <img src="@/assets/logo.png" alt=""> -->
      </div>
      <!-- 表单区 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        label-width="0px"
        class="login_form"
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            prefix-icon="iconfont icon-yonghu"
          ></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="iconfont icon-mima"
            type="password"
          ></el-input>
        </el-form-item>
        <!-- 按钮 -->
        <el-form-item class="btns">
          <el-button type="primary" disabled @click="forget" >忘记密码</el-button>
          <el-button type="primary" @click="login">登陆</el-button>
          <el-button type="info" @click="restLoginForm">重置</el-button>
          <router-link to="/register">
            <el-button type="primary">注册账号</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
      },
      // 表单验证
      loginFormRules: {
        username: [
          {
            required: true,
            message: "6-10位数字加英文，不包含特殊字符",
            trigger: "blur",
            pattern: /^[a-zA-Z0-9]{6,10}$/,
          },
        ],
        password: [
          { required: true,
            message:
              "6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种",
            trigger: "blur",
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/, },
        ],
      },
    };
  },
  methods: {
    restLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$axios
        .post("/login", {
          username: this.loginForm.username,
          password: this.loginForm.password,
        })
        .then((successResponse) => {
          console.log(successResponse);
          if (successResponse.data.code === 200) {
            this.GLOBAL.username = this.loginForm.username;
            console.log("after login, set the global username: ");
            console.log(this.GLOBAL.username);
            this.$router.replace({ path: "/home" });
          }
        })
        .catch((failResponse) => {
          this.$message({
            type: "error",
            message: `用户名/密码错误/网络原因`,
          });
        });
    },
    toRegister() {
      this.$router.replace({ path: "/register" });
    }
  },
};
</script>

// scoped控件组件生效 当前
<style>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.avatar_box {
  height: 130px;
  width: 130px;
  border: 1px solid #eee;
  border-radius: 50%;
  padding: 10px;
  box-shadow: 0 0 10px #ddd;
  position: absolute;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background-color: #eee;
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
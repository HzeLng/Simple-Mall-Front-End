<template>
  <div class="page-register" style="margin: auto">
    <article class="header">
      <header>
        <el-avatar icon="el-icon-user-solid" shape="circle"></el-avatar>
        <span class="login">
          <em class="bold">已有账号？</em>
          <router-link to="/login">
            <el-button type="primary" size="small">登录</el-button>
          </router-link>
        </span>
      </header>
    </article>
    <el-steps :active="active" finish-status="success">
      <el-step title="步骤 1"></el-step>
    </el-steps>

    <div class="section-div-class" style="margin: auto">
      <section>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="100px"
          class="demo-ruleForm"
          autocomplete="off"
          style="width: 50%; margin: auto"
        >
          <div v-if="active == 0">
            <el-form-item label="用户名" prop="name" style="ma">
              <el-input v-model="ruleForm.name" />
              <div class="username-check-result-div">
                <i :class="iconClass"></i>
                <span style="font-size: 4px">{{ this.usernameCheckText }}</span>
              </div>
            </el-form-item>
            <el-form-item label="密码" prop="pwd">
              <el-input v-model="ruleForm.pwd" type="password" />
            </el-form-item>
            <el-form-item label="确认密码" prop="cpwd">
              <el-input v-model="ruleForm.cpwd" type="password" />
            </el-form-item>
            <el-form-item label="用户昵称" prop="nickName">
              <el-input v-model="ruleForm.nickName" type="String" />
            </el-form-item>
            <el-form-item label="邮箱地址" prop="email">
              <el-input v-model="ruleForm.email" type="email" />
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
              <el-input v-model="ruleForm.phone" type="number" />
            </el-form-item>
            <el-form-item label="性别" prop="genderValue">
              <el-select v-model="ruleForm.genderValue" placeholder="请选择">
                <el-option
                  v-for="item in genderOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="默认收货地址">
              <div>
                <el-cascader
                  :options="regionOptions"
                  v-model="regionSelectedOptions"
                  @change="regionHandleChange"
                >
                </el-cascader>
              </div>
            </el-form-item>
            <el-form-item label="详细信息">
              <el-input
                v-model="ruleForm.detailRegionInfo"
                type="String"
              ></el-input>
            </el-form-item>
          </div>
        </el-form>
      </section>
    </div>
    <div class="footer">
      <el-button
        v-if="active > 0"
        type="primary"
        icon="el-icon-arrow-left"
        @click="prev"
        >上一步</el-button
      >
      <el-button
        v-if="active < step - 1"
        type="primary"
        icon="el-icon-arrow-right"
        @click="next"
        :disabled="nextBtnDisabled"
        >下一步</el-button
      >
      <el-button v-if="active == step - 1" type="primary" @click="register"
        >同意以下协议并注册</el-button
      >
      <div class="error">{{ error }}</div>
    </div>
  </div>
</template>
  
  <script>
import { regionDataPlus } from "element-china-area-data";
export default {
  data() {
    return {
      step: 2,
      active: 0,
      statusMsg: "",
      error: "",
      regionOptions: regionDataPlus,
      iconClass: "",
      usernameCheckText: "",
      regionSelectedOptions: [],
      nextBtnDisabled: false,
      genderOptions: [
        {
          value: "选项1",
          label: "男",
        },
        {
          value: "选项2",
          label: "女",
        },
      ],
      ruleForm: {
        textarea: "请仔细阅读以下协议",
        agreed: false,
        name: "",
        code: "",
        pwd: "",
        cpwd: "",
        email: "",
        phone: "",
        nickName: "",
        genderValue: "男",
        detailRegionInfo: "",
      },
      rules: {
        agreed: [
          {
            validator: (rule, value, callback) => {
              console.log("value:" + value);
              if (value !== true) {
                callback(new Error("请确认同意注册协议"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        name: [
          {
            required: true,
            message: "6-10位数字加英文，不包含特殊字符",
            trigger: "blur",
            pattern: /^[a-zA-Z0-9]{6,10}$/,
          },
        ],
        email: [
          {
            required: true,
            type: "email",
            message: "邮箱格式不正确",
            trigger: "blur",
          },
        ],
        pwd: [
          {
            required: true,
            message:
              "6-20位英文字母、数字或者符号（除空格），且字母、数字和标点符号至少包含两种",
            trigger: "blur",
            pattern:
              /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$)([^\u4e00-\u9fa5\s]){6,20}$/,
          },
        ],
        cpwd: [
          {
            required: true,
            message: "确认密码",
            trigger: "blur",
          },
          {
            validator: (rule, value, callback) => {
              if (value === "") {
                callback(new Error("请再次输入密码"));
              } else if (value !== this.ruleForm.pwd) {
                callback(new Error("两次输入密码不一致"));
              } else {
                callback();
              }
            },
            trigger: "blur",
          },
        ],
        phone: [
          {
            required: true,
            type: "number",
            message: "手机号格式不正确",
            trigger: "blur",
            transform(value) {
              var phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/;
              if (!phonereg.test(value)) {
                return false;
              } else {
                return Number(value);
              }
            },
          },
        ],
        nickName: [
          {
            required: true,
            pattern: /^[\u4e00-\u9fa5_a-zA-Z0-9]{3,10}$/,
            message: "请输入3-10位中英文/数字/下划线",
            trigger: "blur",
          },
        ],
        genderValue: [],
      },
    };
  },
  layout: "blank",
  methods: {
    sendMsg: function () {
      const self = this;
      let namePass;
      let emailPass;
      if (self.timerid) {
        return false;
      }
      this.$refs["ruleForm"].validateField("name", (valid) => {
        namePass = valid;
      });
      self.statusMsg = "";
      if (namePass) {
        return false;
      }
      this.$refs["ruleForm"].validateField("email", (valid) => {
        emailPass = valid;
      });
      // 模拟验证码发送
      if (!namePass && !emailPass) {
        let count = 60;
        self.statusMsg = `验证码已发送,剩余${count--}秒`;
        self.timerid = setInterval(function () {
          self.statusMsg = `验证码已发送,剩余${count--}秒`;
          if (count === 0) {
            clearInterval(self.timerid);
          }
        }, 1000);
      }
    },

    next: function () {
      if (this.active === 0) {
        this.$axios
          .post("/register", {
            username: this.ruleForm.name,
            password: this.ruleForm.pwd,
            nickName: this.ruleForm.nickName,
            email: this.ruleForm.email,
            phone: this.ruleForm.phone,
            gender: this.ruleForm.genderValue,
            regionSelectedOptions: this.regionSelectedOptions,
            detailRegionInfo: this.ruleForm.detailRegionInfo,
          })
          .then((successResponse) => {
            if (successResponse.data.code === 200) {
              this.$router.replace({ path: "/login" });
            }
          })
          .catch((failResponse) => {
            this.$message.error("注册失败，请检查网络状况");
          });
      }
    },
    prev: function () {
      if (--this.active < 0) this.active = 0;
    },

    // 模拟登录
    register: function () {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          setTimeout(this.$router.push("/login"), 2000);
        }
      });
    },
    // region相关
    regionHandleChange(value) {
      console.log(value);
      console.log(value.length);
      console.log("whole list");
      //   console.log(this.regionSelectedOptionsList)
      //   console.log(this.regionSelectedOptionsList[0])
      //   console.log(this.regionSelectedOptionsList[0].length)
    },
    // testttttt
    nextToTrue() {
      this.nextBtnDisabled = true;
    },
    nextToFalse() {
      this.nextBtnDisabled = false;
    },
  },
  watch: {
    "ruleForm.name": {
      handler(newVal, oldVal) {
        console.log("newVal", newVal);
        console.log("oldVal", oldVal);
        var nameReg = /^[a-zA-Z0-9]{6,10}$/;
        if (!nameReg.test(newVal)) {
          this.iconClass = "el-icon-loading";
          this.usernameCheckText = "";
          return;
        } else {
          let data = new FormData();
          data.append("possbileUsername", newVal);
          this.iconClass = "el-icon-loading";
          this.usernameCheckText = "";
          this.$axios
            .post("/usernameDuplicateCheck", data)
            .then((response) => {
              console.log(response);
              if (response.data.code === 200) {
                this.iconClass = "el-icon-check";
                this.usernameCheckText = "该用户名可注册";
              } else if (response.data.code === 515) {
                this.iconClass = "el-icon-close";
                this.usernameCheckText = "该用户名已注册";
              }
            })
            .catch((failResponse) => {
              this.iconClass = "el-icon-warning";
              this.usernameCheckText = "请求出错";
            });
        }
      },
      immediate: true,
    },
  },
};
</script>
  
  <style >
.page-register {
  margin: auto;
  /* .header {
    //border-bottom: 2px solid rgb(235, 232, 232);
    min-width: 980px;
    color: #666;

    header {
      margin: 0 auto;
      padding: 10px 0;
      width: 980px;

      .login {
        float: right;
      }

      .bold {
        font-style: normal;
      }
    }
  }

  .register {
    color: #1890ff;
  }

  a {
    color: #1890ff;
    text-decoration: none;
    background-color: transparent;
    outline: none;
    cursor: pointer;
    transition: color 0.3s;
  }

  > section {
    margin: 0 auto 30px;
    padding-top: 30px;
    width: 980px;
    min-height: 300px;
    padding-right: 550px;
    box-sizing: border-box;

    .status {
      font-size: 12px;
      margin-left: 20px;
      color: #e6a23c;
    }

    .error {
      color: red;
    }
  }

  .footer {
    text-align: center;
  } */
}
.el-input {
  width: 50%;
  float: left;
}
.username-check-result-div {
  width: 30%;
  float: left;
  height: 10%;
}
</style>
  
  
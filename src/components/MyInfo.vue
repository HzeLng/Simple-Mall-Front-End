<template>
  <el-tabs :tab-position="tabPosition">
    <el-tab-pane label="个人信息管理">
      <el-form
        :model="privateInfoRuleForm"
        :rules="privateInfoRules"
        ref="privateInfoRuleForm"
        label-width="100px"
        class="demo-privateInfoRuleForm"
        :disabled="privateInfo_edit"
      >
        <el-form-item label="用户昵称" prop="nickName">
          <el-input v-model="privateInfoRuleForm.nickName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码" prop="phone">
          <el-input v-model="privateInfoRuleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="privateInfoRuleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="genderValue">
          <el-select v-model="genderValue" placeholder="请选择">
            <el-option
              v-for="item in genderOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="privateInfoSubmitForm('privateInfoRuleForm')"
            >立即创建</el-button
          >
          <el-button @click="privateInfoResetForm('privateInfoRuleForm')"
            >重置</el-button
          >
          <el-button
            type="primary"
            @click="privateInfoSubmitForm('privateInfoRuleForm')"
            :disabled="false"
            >编辑</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="密码修改">
      <el-form
        :model="passWordRuleForm"
        status-icon
        :rules="passWordRules"
        ref="passWordRuleForm"
        label-width="100px"
        class="demo-passWordRuleForm"
      >
        <el-form-item label="密码" prop="pass">
          <el-input
            type="password"
            v-model="passWordRuleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input
            type="password"
            v-model="passWordRuleForm.checkPass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            @click="passWordSubmitForm('passWordRuleForm')"
            >提交</el-button
          >
          <el-button @click="passWordResetForm('passWordRuleForm')"
            >重置</el-button
          >
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="收货地址">
      <el-form>
        <el-row v-for="(item, index) of regionSelectedOptionsList" :key="index">
          <el-col>
            <div>
            <span>收货地址{{index + 1}}:</span>
              <el-cascader
                :options="regionOptions"
                v-model="regionSelectedOptionsList[index]"
                @change="regionHandleChange"
                :disabled="regionEdit"
              >
              </el-cascader>
            </div>
            <el-form-item
              prop="string"
              label="详细信息"
              :rules="[
                { required: false, message: '请输入详细信息', trigger: 'blur' },
                {
                  type: 'string',
                  message: '请输入正确的地址信息',
                  trigger: ['blur', 'change'],
                },
              ]"
            >
              <el-input v-model="detailRegion[index]" style="width: 50%;"></el-input>
              <el-button @click.prevent="removeRegion(regionSelectedOptionsList[index])">删除</el-button>
            </el-form-item>
          </el-col>
          
        
        </el-row>
        <el-button @click="addRegion">新增收货地址</el-button>
      </el-form>
    </el-tab-pane>
  </el-tabs>
</template>


<script>
import { regionDataPlus } from "element-china-area-data";
export default {
  data() {
    // 密码管理相关
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.passWordRuleForm.checkPass !== "") {
          this.$refs.passWordRuleForm.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.passWordRuleForm.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      tabPosition: "left",
      privateInfo_edit: true,
      privateInfoRuleForm: {
        nickName: "京东用户1号",
        phone: "10086",
        email: "123456789@qq.com",
      },
      genderValue: "男",
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
      privateInfoRules: {
        nickName: [
          { required: false, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
      },
      dynamicValidateForm: {
        domains: [
          {
            value: "",
          },
        ],
        email: "",
      },
      // 密码管理相关
      passWordRuleForm: {
        pass: "",
        checkPass: "",
      },
      passWordRules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
      },
      // region
      regionOptions: regionDataPlus,
      regionSelectedOptions: [],
      regionSelectedOptionsList: [["110000", "110100", "110101"], []],
      regionEdit: false,
      detailRegion: [""],
    };
  },
  methods: {
    privateInfoSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    privateInfoResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    passWordSubmitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    passWordResetForm(formName) {
      this.$refs[formName].resetFields();
    },
    // 收获地址
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    removeDomain(item) {
      var index = this.dynamicValidateForm.domains.indexOf(item);
      if (index !== -1) {
        this.dynamicValidateForm.domains.splice(index, 1);
      }
    },
    addDomain() {
      this.dynamicValidateForm.domains.push({
        value: "",
        key: Date.now(),
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
    addRegion() {
      this.regionSelectedOptionsList.push([]);
      this.detailRegion.push("");
    },
    removeRegion(item) {
      var index = this.regionSelectedOptionsList.indexOf(item);
      if (index !== -1) {
        this.regionSelectedOptionsList.splice(index, 1);
        this.detailRegion.splice(index, 1);
      }
    },
  },
};
</script>
<template>
  <div class="login">
    <div class="banner">
      <img src="../../images/log.png" alt />
    </div>
    <div class="fonter"></div>
    <form class="log_nav">
      <h3>企业微信交接班后台管理系统</h3>
      <el-form ref="loginForm" :model="ruleForm" :rules="rules">
        <el-form-item prop="name">
          <div class="flex-form">
            <i class="login-icon el-icon-user" />
            <el-input class="login-input" v-model="ruleForm.name" placeholder="请输入账号" />
          </div>
        </el-form-item>
        <el-form-item prop="pasword">
          <div class="flex-form">
            <i class="login-icon el-icon-s-goods" />
            <el-input
              class="login-input"
              v-model="ruleForm.pasword"
              :type="iconVisible ? 'password' : ''"
              placeholder="请输入密码"
            />
            <i @click="iconSwitch()" v-if="iconVisible" class="onlin el-icon-view" />
            <i @click="iconSwitch()" v-else class="onlin el-icon-pear" />
          </div>
        </el-form-item>
        <el-button type="primary" @click="submit()">登 陆</el-button>
      </el-form>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      iconVisible: true,
      ruleForm: {
        name: "",
        pasword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入用户名！", trigger: "blur" }],
        pasword: [
          {
            required: true,
            min: 6,
            message: "密码不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    submit() {
      this.$refs["loginForm"].validate(res => {
        if (res) {
          console.log("登陆");
        }
      });
    },
    iconSwitch() {
      this.iconVisible = !this.iconVisible;
    }
  }
};
</script>

<style scoped>
.login {
  min-height: 100%;
  width: 100%;
  background-color: #f1faff;
  overflow: hidden;
}
.banner {
  width: 50%;
  height: auto;
  position: absolute;
  left: 0;
  bottom: 20%;
  z-index: 10;
}
.banner img {
  width: 100%;
  height: 100%;
}
.log_nav {
  width: 420px;
  padding: 50px 30px;
  box-shadow: 0 0 20px rgba(26, 26, 26, 0.2);
  background: #fff;
  border-radius: 10px;
  position: absolute;
  left: 55%;
  top: 20%;
  box-sizing: border-box;
}
.log_nav h3 {
  font-size: 26px;
  margin: 0 0 40px 0;
  text-align: center;
  color: #666;
  font-weight: 700;
}
/* .el-form-item {
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid #09f;
  color: #454545;
} */
.el-button {
  width: 100%;
  margin-bottom: 30px;
}
.el-input {
  border: 0px;
  outline: none;
}
.fonter {
  height: 25%;
  background-color: #abe0fd;
  width: 100%;
  position: absolute;
  bottom: 0;
}
.flex-form {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #09f;
}
.login-icon {
  width: 14px;
  flex: 0 0 14px;
  margin: 0 10px;
}
.login-input {
  flex: 1;
}
.login-input .el-input__inner {
  border: 0;
}
.onlin {
  cursor: pointer;
}
</style>

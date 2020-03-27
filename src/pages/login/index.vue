
<template>
  <div class="loginCopty">
    <div class="bgimg">
      <img src="../../images/log.png" alt />
    </div>
    <div class="login">
      <h3>企业微信交接班后台管理系统</h3>
      <el-form :model="ruleForm" ref="ruleForm" :rules="rules">
        <div class="formStyle">
          <el-form-item prop="name">
            <i class="el-icon-user"></i>
            <el-input placeholder="请输入账号" v-model="ruleForm.name"></el-input>
          </el-form-item>
        </div>
        <div class="formStyle">
          <el-form-item prop="pasword">
            <i class="el-icon-s-goods" />
            <el-input
              @keyup.enter.native="submit()"
              v-bind:type="isIcon? 'password':'text'"
              placeholder="请输入密码"
              v-model="ruleForm.pasword "
            ></el-input>
            <i @click="isIcons()" v-if="isIcon" class="el-icon-view onlin" />
            <i @click="isIcons()" v-else class="el-icon-pear onlin" />
          </el-form-item>
        </div>
        <el-button :loading="loading" type="primary" @click="submit()">登录</el-button>
      </el-form>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script>
import Cookie from "js-cookie";
export default {
  name: "loginCopy",
  data() {
    return {
      isIcon: true,
      loading: false,
      ruleForm: {
        name: "",
        pasword: ""
      },
      rules: {
        name: [{ required: true, message: "请输入账号", trigger: "blur" }],
        pasword: {
          min: 6,
          required: true,
          message: "请输入密码",
          trigger: "blur"
        }
      }
    };
  },
  methods: {
    isIcons() {
      return (this.isIcon = !this.isIcon);
    },
    submit() {
      this.$refs["ruleForm"].validate(res => {
        if (res) {
          this.loading = true;
          this.$ajax({
            url: "/admin/manager/login",
            method: "post",
            data: {
              username: this.ruleForm.name,
              password: this.ruleForm.pasword
            }
          })
            .then(res => {
              this.loading = false;
              this.$message({
                message: res.msg,
                type: "success",
                duration: 1500
              });
              Cookie.set("token", res.data.token);
            })
            .catch(res => {
              this.loading = false;
            });
        }
      });
    }
  }
};
</script>

<style spoced>
.loginCopty {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f1faff;
}
.loginCopty .bgimg {
  position: absolute;
  left: 0;
  bottom: 20%;
  width: 50%;
  height: auto;
  z-index: 100;
}
.bgimg img {
  height: 100%;
  width: 100%;
}
.loginCopty .login {
  position: absolute;
  left: 55%;
  top: 20%;
  background: #fff;
  width: 420px;
  box-sizing: border-box;
  padding: 50px 30px;
  box-shadow: 0 0 20px rgba(26, 26, 26, 0.2);
  border-radius: 10px;
  z-index: 1000;
}
.loginCopty .login h3 {
  margin-bottom: 30px;
  font-size: 26px;
  margin: 0 auto 40px auto;
  text-align: center;
  font-weight: 700;
  color: #666;
}
.formStyle .el-form-item .el-form-item__content {
  font-size: 14px;
  align-items: center;
  justify-content: center;
  display: flex;
  border: 1px solid hsla(0, 0%, 100%, 0.1);
  border-bottom: 1px solid #09f;
  margin-bottom: 22px;
}
.onlin {
  cursor: pointer;
}
.footer {
  background-color: #abe0fd;
  width: 100%;
  height: 25%;
  position: absolute;
  bottom: 0;
  z-index: 1;
}
</style>

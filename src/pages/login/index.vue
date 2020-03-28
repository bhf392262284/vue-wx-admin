
<template>
  <div class="loginCopty">
    <div class="bgimg">
      <img src="../../images/log.png" alt />
    </div>
    <div class="login">
      <h3>企业微信交接班后台管理系统</h3>
      <el-form :model="form" :rules="rules" ref="formName">
        <div class="formStyle">
          <el-form-item prop="name">
            <i class="el-icon-user"></i>
            <el-input placeholder="请输入账号" v-model="form.name"></el-input>
          </el-form-item>
        </div>
        <div class="formStyle">
          <el-form-item prop="password">
            <i class="el-icon-s-goods" />
            <el-input
              v-model="form.password"
              :type="isIcon ? 'password':'text'"
              placeholder="请输入密码"
            ></el-input>
            <i @click="clickIcon()" v-if="isIcon" class="el-icon-view onlin" />
            <i @click="clickIcon()" v-else class="el-icon-pear onlin" />
          </el-form-item>
        </div>
        <el-button type="primary" @click="submitLogin()" :loading="isRotate">登录</el-button>
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
      isRotate: false,
      isIcon: true,
      form: {
        name: "",
        password: ""
      },
      rules: {
        name: [{ required: true, message: "请输入密码", trigger: "blur" }],
        password: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 6,
            required: true,
            message: "密码不能少于6位",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    clickIcon() {
      this.isIcon = !this.isIcon;
    },
    submitLogin() {
      this.$refs["formName"].validate(valid => {
        if (valid) {
          this.isRotate = !this.isRotate;
          this.axios({
            url: "/admin/manager/login",
            method: "post",
            data: {
              username: this.form.name,
              password: this.form.password
            }
          })
            .then(res => {
              this.isRotate = false;
              Cookie.set("token", res.data.token);
              this.$message({
                message: "密码正确",
                type: "success"
              });
            })
            .catch(res => {});
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
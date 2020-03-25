<template>
  <div class="login">
    <div class="banner">
      <img src="../../images/log.png" alt />
    </div>
    <div class="fonter"></div>
    <form class="log_nav">
      <h3>企业微信交接班后台管理系统</h3>
      <el-form :model="ruleForm" :rules="rules">
        <el-form-item prop="name">
          <el-input v-model="ruleForm.name" placeholder="请输入账号"></el-input>
        </el-form-item>
            <el-form-item prop="region">
          <el-input v-model="ruleForm.pasword" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-button type="primary">提交</el-button>
      </el-form>
    </form>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        name: '',
        pasword:''
      },
      rules: {
        name: [{ required: true, message: "请输入用户名！", trigger: "blur" }],
        region: [{ min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' } ],
      }
    };
  }
};
</script>

<style scoped>
.login {
    min-height: 100%;
    width: 100%;
    background-color: #f1faff;
    overflow: hidden
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
.el-input__inner ::placeholder {
  border:none;
  font-size: 12px;
  color: black;
}
</style>

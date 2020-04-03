<template>
  <div id="see">
    <div class="tableHeader">
      <span>行政日志</span>
    </div>
    <div class="contentArea">
      <h2>{{templateName}}</h2>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h3>
              创建时间：
              <span>{{createTime}}</span>
            </h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h3>
              类型：
              <span>行政日志</span>
            </h3>
          </div>
        </el-col>
      </el-row>
      <div class="xian"></div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h3>
              值班人：
              <span>{{handoverPerson}}</span>
            </h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h3>
              接班人：
              <span>{{successor}}</span>
            </h3>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h3>值班日志：</h3>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <p>{{watchLog}}</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <h3>
            提交时间:
            <span>{{handoverTime}}</span>
          </h3>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <h2>
            处理进度:
            <span>已接班</span>
          </h2>
        </el-col>
      </el-row>
    </div>
    <el-row class="cent">
      <el-button type="primary" size="medium" round @click="goReturn()">
        <i class="el-icon-back"></i>
        返回列表
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "see",
  data() {
    return {
      templateName: "",
      administration: "",
      createTime: "",
      handoverPerson: "",
      successor: "",
      handoverTime: "",
      watchLog: ""
    };
  },
  created() {
    this.axios({
      url: "/admin/rotaLog/getRotaLogById",
      method: "post",
      data: {
        id: this.$route.params.id
      }
    }).then(res => {
      console.log(res);
      this.templateName = res.data.templateName;
      this.administration = res.data.administration;
      this.createTime = res.data.createTime;
      this.handoverPerson = res.data.handoverPerson;
      this.successor = res.data.successor;
      this.handoverTime = res.data.handoverTime;
      this.watchLog = res.data.watchLog;
    });
  },
  methods: {
    goReturn() {
      this.$router.push({ path: "dutyList" });
    }
  }
};
</script>
<style>
.contentArea {
  border-radius: 0 0 10px 10px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.12), 0 0 10px 0 rgba(0, 0, 0, 0.04);
}
.tableHeader span {
  line-height: 39px;
  background-color: #409eff;
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  font-size: 14px;
  font-weight: 500;
  border-radius: 10px 10px 0 0;
}
.contentArea {
  padding: 15px;
  background-color: white;
}
#see .xian {
  background-color: black;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}
h2 {
  font-size: 27px;
  margin: 20px 0;
}
h3 {
  margin: 18px 0;
  font-size: 21px;
}
p {
  margin: 16px 0;
}
</style>

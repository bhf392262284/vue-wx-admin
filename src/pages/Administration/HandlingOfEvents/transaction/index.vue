<template>
  <div id="transaction">
    <div class="tableHeader">
      <span>事务处理</span>
    </div>
    <div class="warp">
      <h2>{{templateName}}</h2>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              创建时间：
              <span>{{createTime}}</span>
            </h4>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              部门/科室：
              <span>{{templateName}}</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              级别：
              <span>重大</span>
            </h4>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              类型：
              <span>{{eventTypeName}}</span>
            </h4>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              监督人：
              <span>{{supervisor}}</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <div class="xian"></div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              汇报人：
              <span>{{reporter}}</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              内容
              <span>{{content}}</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            经历过
            <span></span>
          </div>
        </el-col>
      </el-row>
      <div class="xian"></div>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              回复时间：
              <span>123456</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              值班人：
              <span>123456</span>
            </h4>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              转交人
              <span>123456</span>
            </h4>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-dark">
            <h4>
              二线领导：
              <span>123456</span>
            </h4>
          </div>
        </el-col>
      </el-row>
      <el-row>
        <h4>处理意见：</h4>
        <span>你你你你</span>
      </el-row>
      <div class="xian"></div>
      <el-row>
        <h2>
          处理进度:
          <span>已经处理</span>
        </h2>
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
  name: "transaction",
  data() {
    return {
      templateName: "",
      createTime: "",
      deptName: "",
      eventTypeName: "",
      supervisor: "",
      reporter: "",
      content: ""
    };
  },
  created() {
    this.axios({
      url: "admin/event/getEventById",
      method: "post",
      data: {
        id: this.$route.params.id
      }
    }).then(res => {
      this.templateName = res.data.templateName;
      this.createTime = res.data.handoverEvent.createTime;
      this.deptName = res.data.handoverEvent.deptName;
      this.eventTypeName = res.data.handoverEvent.eventTypeName;
      this.supervisor = res.data.handoverEvent.supervisor;
      this.reporter = res.data.handoverEvent.reporter;
      this.content = res.data.handoverEvent.content;
    });
  },
  methods: {
    goReturn() {
      this.$router.push({ path: "affairList" });
    }
  }
};
</script>

<style>
.xian {
  background-color: #ccc;
  height: 1px;
  width: 100%;
  margin: 24px 0;
}
.warp {
  border-radius: 0 0 10px 10px;
  box-shadow: 0 20px 20px 0 rgba(0, 0, 0, 0.12), 0 0 10px 0 rgba(0, 0, 0, 0.04);
  padding: 15px;
  background-color: white;
}
.warp h2 {
  font-size: 27px;
  margin: 20px 0;
}
.warp h4 {
  margin: 18px 0;
  font-size: 18px;
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, Arial, sans-serif;
}
.warp p {
  margin: 16px 0;
}
</style>

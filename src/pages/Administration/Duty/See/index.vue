<template>
  <div id="see">
    <div class="tableHeader">
      <span>行政日志</span>
    </div>
    <div class="contentArea">
      <h2>值班日志-行政</h2>
      <el-row>
        <el-col :span="8">
          <div class="grid-content bg-purple">
            <h3>
              创建时间：
              <span>2020-03-02 16:33</span>
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
              <span>江承煌</span>
            </h3>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            <h3>
              接班人：
              <span>任我行</span>
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
          <p>1、重大 医患矛盾 信息科 江承煌 有人死了 处理意见/结果：无 2、重大 工作意见/建议 信息科 江承煌 经历过 处理意见/结果：你给你你你 孙兴民</p>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <h3>
            提交时间:
            <span>2020-03-02 16:33</span>
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
      <el-button type="primary" size="medium" round>
        <i class="el-icon-back"></i>
        返回列表
      </el-button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "see"
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
  border-radius: 10px 0 0 0;
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

<template>
  <div id="assistant">
    <div class="tableHeader">
      <span>会议助手</span>
    </div>
    <el-form :inline="true" ref="ruleForm" class="demo-ruleForm bgc" size="mini">
      <el-form-item label="日期:">
        <el-date-picker
          v-model="searchTime"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="月份:">
        <el-select v-model="form.Month" placeholder="请选择">
          <el-option label="请选择" value="0"></el-option>
          <el-option label="1月" value="1"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态:">
        <el-select v-model="form.state" placeholder="请选择">
          <el-option label="请选择" value="0"></el-option>
          <el-option label="待接班" value="1"></el-option>
          <el-option label="草稿" value="2"></el-option>
          <el-option label="已接班" value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-button type="primary" round size="mini" @click="search()">
        <i class="el-icon-search"></i> 查询
      </el-button>
      <el-button type="danger" round size="mini">
        <i class="el-icon-delete-solid"></i> 批量删除
      </el-button>
    </el-form>
    <el-table ref="multipleTable" :data="dataList" style="width: 100%" max-width="1000px">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="name" label="会议标题" align="center" width="200"></el-table-column>
      <el-table-column prop="name" label="会议室" align="center" width="300"></el-table-column>
      <el-table-column prop="name" label="状态" align="center"></el-table-column>
      <el-table-column prop="name" label="发布人" align="center"></el-table-column>
      <el-table-column prop="name" label="会议时间" align="center"></el-table-column>
      <el-table-column prop="name" label="会议时长" align="center"></el-table-column>
      <el-table-column prop="name" label="发布时间" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template>
          <el-button type="primary" round size="mini">查看</el-button>
          <el-button type="danger" round size="mini">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "assistant",
  data() {
    return {
      dataList: [
        {
          name: "小米",
          age: "小米",
          sex: "小米",
          one: "小米",
          fase: "小米",
          shijian: "小米"
        }
      ],
      searchTime: [],
      form: {
        Month: "",
        state: ""
      }
    };
  }
};
</script>

<style>
</style>
<template>
  <div id="duty">
    <div class="tableHeader">
      <span>总值值班</span>
    </div>
    <div class="table">
      <el-form :inline="true" class="demo-form-inline" size="mini">
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
          <el-select v-model="formInline.Month" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="1月" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select v-model="formInline.state" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="待接班" value="1"></el-option>
            <el-option label="草稿" value="2"></el-option>
            <el-option label="已接班" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模板类型:">
          <el-select v-model="formInline.taplateType" placeholder="请选择">
            <el-option label="请选择" value="0"></el-option>
            <el-option label="行政日志" value="1"></el-option>
            <el-option label="投诉日志" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" round size="mini" @click="search()">
          <i class="el-icon-search"></i> 查询
        </el-button>
        <el-button type="danger" round size="mini">
          <i class="el-icon-delete-solid"></i> 批量删除
        </el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="multipleSelection"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="loading"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="日期" width="120">
          <!-- <template slot-scope="scope">{{ scope.row.date }}</template> -->
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="address" label="地址" show-overflow-tooltip></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "duty",
  data() {
    return {
      loading: true,
      searchTime: [],
      formInline: {
        endTime: "",
        startTime: "",
        Month: "",
        state: "",
        taplateType: ""
      },
      multipleSelection: []
    };
  },
  methods: {
    search() {
      this.formInline.endTime = this.searchTime[0];
      this.formInline.startTime = this.searchTime[1];
      this.axios({
        url: "/admin/rotaLog/getPageRotaLogList",
        method: "post",
        data: {
          endTime: this.formInline.endTime,
          startTime: this.formInline.startTime,
          Month: this.formInline.Month,
          handoverStatus: this.formInline.state,
          logType: this.formInline.taplateType
        }
      }).then(res => {
        console.log(res);
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    }
  }
};
</script>

<style>
</style>
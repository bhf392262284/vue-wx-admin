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
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="模板分类" width="120">
          <template slot-scope="scope">
            <span v-show="parseInt(scope.row.watchLogType)===0" v-text="'行政日志'"></span>
            <span v-show="parseInt(scope.row.watchLogType)===1" v-text="'投诉日志'"></span>
          </template>
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <span v-show="parseInt(scope.row.handoverStatus) === 0" v-text="'待接班'" />
            <span v-show="parseInt(scope.row.handoverStatus) === 1" v-text="'草稿'" />
            <span v-show="parseInt(scope.row.handoverStatus) === 2" v-text="'已接班'" />
          </template>
        </el-table-column>
        <el-table-column prop="handoverPersonName" label="交班人"></el-table-column>
        <el-table-column prop="successorName" label="接班人"></el-table-column>
        <el-table-column prop="createTime" label="创建时间"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" round size="mini" @click="tiaozhuan(scope.row.id)">查看</el-button>
            <el-button
              type="danger"
              round
              size="mini"
              @click="handleDelete(scope.$index,scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
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
        startTime: "",
        endTime: "",
        Month: "", //月份
        state: "", //状态
        taplateType: "" //模板类型
      },
      multipleSelection: []
    };
  },
  methods: {
    tiaozhuan(id) {
      this.$router.push({
        path: "Seex",
        query: {
          di: id
        }
      });
    },
    handleDelete(index, row) {
      this.multipleSelection.splice(index, 1);
    },
    search() {
      this.formInline.startTime = this.searchTime[0];
      this.formInline.endTime = this.searchTime[1];
      this.axios({
        url: "admin/rotaLog/getPageRotaLogList",
        method: "post",
        data: {
          endTime: this.formInline.endTime,
          startTime: this.formInline.startTime,
          month: parseInt(this.formInline.Month),
          handoverStatus: parseInt(this.formInline.state),
          logType: parseInt(this.formInline.taplateType)
        }
      }).then(res => {
        this.multipleSelection = res.data.dataList;
      });
    }
    // handleSelectionChange(val) {
    //   this.multipleSelection = val;
    // }
  },
  created() {
    this.search();
  }
};
</script>

<style>
</style>
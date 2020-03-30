<template>
  <div id="HandlingOfEvents">
    <div class="tableHeader">
      <span>事务处理</span>
    </div>
    <div class="table">
      <el-form :inline="true" ref="ruleForm" class="demo-ruleForm" size="mini">
        <el-form-item label="日期:">
          <el-date-picker
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            v-mode="form.startTime"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="级别:">
          <el-select placeholder="请选择" v-model="form.eventLevel">
            <el-option label="轻微" value="1"></el-option>
            <el-option label="一般" value="2"></el-option>
            <el-option label="严重" value="3"></el-option>
            <el-option label="重大" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select placeholder="请选择" v-mode="form.eventStatus">
            <el-option label="待处理" value="1"></el-option>
            <el-option label="进行中" value="2"></el-option>
            <el-option label="已处理" value="3"></el-option>
            <el-option label="不处理" value="4"></el-option>
            <el-option label="草稿" value="5"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版类型:">
          <el-select placeholder="请选择" v-mode="form.templateType">
            <el-option label="事件处理" value="1"></el-option>
            <el-option label="投诉处理" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label=" 事件类型:">
          <el-select placeholder="请选择" v-model="form.eventType">
            <el-option label="医院管理" value="1"></el-option>
            <el-option label="后勤保障" value="2"></el-option>
            <el-option label="其他" value="3"></el-option>
            <el-option label="安全生产" value="4"></el-option>
            <el-option label="急症急救" value="5"></el-option>
            <el-option label="物业问题" value="6"></el-option>
            <el-option label="服务态度" value="7"></el-option>
            <el-option label="一换矛盾" value="8"></el-option>
            <el-option label="工作意见/建议" value="9"></el-option>
            <el-option label="上级交办事项" value="10"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" round size="mini">
          <i class="el-icon-search" @click="search()"></i> 查询
        </el-button>
        <el-button type="danger" round size="mini">
          <i class="el-icon-delete"></i>批量删除
        </el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="tableData"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        fit
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column prop="address" label="级别" align="center"></el-table-column>
        <el-table-column prop="address" label="事件时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="状态" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="模板分类" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="发起人" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="部门/科室" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="创建时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column prop="address" label="修改时间" align="center" show-overflow-tooltip></el-table-column>
        <el-table-column label="操作" show-overflow-tooltip align="center">
          <div class="bot">
            <el-button type="primary" round size="mini">查看</el-button>
            <el-button type="danger" round size="mini">删除</el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "HandlingOfEvents",
  data() {
    return {
      form: {
        startTime: "",
        endTime: "",
        eventLevel: "",
        eventStatus: "",
        templateType: "",
        eventType: ""
      },
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [
        {
          address: " 重大"
        },
        {
          address: "工作意见/建议"
        },
        {
          address: "工作意见/建议"
        },
        {
          address: "工作意见/建议"
        },
        {
          address: "工作意见/建议"
        },
        {
          address: "工作意见/建议"
        },
        {
          address: "工作意见/建议"
        }
      ],
      multipleSelection: []
    };
  },
  methods: {
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //  分页
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    search() {
      this.axios({
        url: "admin/event/getPageEventList",
        method: "post",
        data: {
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          eventLevel: this.form.eventLevel,
          eventStatus: this.form.eventLevel,
          templateType: this.form.templateType,
          eventType: this.form.eventType
        }
      }).then(res => {
        console.log(res);
      });
    }
  }
};
</script>
<style>
#HandlingOfEvents {
  background-color: white;
  border-radius: 10px 0 0 0;
}
.table {
  padding: 15px;
}
.bot {
  display: flex;
  flex-wrap: wrap;
  height: 56px;
  justify-content: center;
  align-content: center;
}
</style>
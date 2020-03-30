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
            v-model="searchTime"
            value-format="yyyy-MM-dd"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="级别:">
          <el-select placeholder="请选择" v-model="form.eventLevel">
            <el-option label="轻微" value="0"></el-option>
            <el-option label="一般" value="1"></el-option>
            <el-option label="严重" value="2"></el-option>
            <el-option label="重大" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态:">
          <el-select placeholder="请选择" v-model="form.eventStatus">
            <el-option label="待处理" value="0"></el-option>
            <el-option label="进行中" value="1"></el-option>
            <el-option label="已处理" value="2"></el-option>
            <el-option label="不处理" value="3"></el-option>
            <el-option label="草稿" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="模版类型:">
          <el-select placeholder="请选择" v-model="form.templateType">
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
        <el-button type="primary" round size="mini" @click="search()">
          <i class="el-icon-search"></i> 查询
        </el-button>
        <el-button type="danger" round size="mini" @click="del(index)">
          <i class="el-icon-delete"></i>批量删除
        </el-button>
      </el-form>
      <el-table
        ref="multipleTable"
        :data="dataList"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column label="级别" align="center">
          <template slot-scope="scope">
            <div v-text="levelTitle(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="eventTypeName" label="事件分类" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-html="zhuangtai(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="模板分类" align="center"></el-table-column>
        <el-table-column prop="reporter" label="发起人" align="center"></el-table-column>
        <el-table-column prop="deptName" label="部门/科室" align="center"></el-table-column>
        <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
        <el-table-column prop="updateTime" label="修改时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" round size="mini">查看</el-button>
            <el-button
              type="danger"
              round
              size="mini"
              @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
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
      searchTime: "",
      form: {
        startTime: "",
        endTime: "",
        eventLevel: "",
        eventStatus: "",
        templateType: "",
        eventType: ""
      },
      dataList: [],
      currentPage: 1
    };
  },
  methods: {
    zhuangtai(row) {
      if (row.handleStatus === "0") {
        return "待处理";
      }
      if (row.handleStatus === "1") {
        return "进行中";
      }
      if (row.handleStatus === "2") {
        return "已处理";
      }
      if (row.handleStatus === "3") {
        return "不处理";
      }
      if (row.handleStatus === "4") {
        return "草稿";
      }
    },
    levelTitle(o) {
      if (o.level === "0") {
        return "轻微";
      }
      if (o.level === "1") {
        return "一般";
      }
      if (o.level === "2") {
        return "严重";
      }
      if (o.level === "3") {
        return "重大";
      }
    },
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deletes(row);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deletes(row) {
      this.axios({
        url: "admin/event/deleteEventByIds",
        method: "post",
        data: { ids: row.id }
      }).then(res => {
        this.search();
        this.$message({
          type: "success",
          message: "删除成功!"
        });
      });
    },
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
      this.form.startTime = this.searchTime[0];
      this.form.endTime = this.searchTime[1];
      this.axios({
        url: "admin/event/getPageEventList",
        method: "post",
        data: {
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          eventLevel: this.form.eventLevel,
          eventStatus: this.form.eventStatus,
          templateType: this.form.templateType,
          eventType: this.form.eventType
        }
      }).then(res => {
        this.dataList = res.data.dataList;
      });
    }
  },
  created() {
    this.search();
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
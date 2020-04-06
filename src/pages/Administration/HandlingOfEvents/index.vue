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
            <el-option :label="k.name" :value="v" v-for="(k,v) in clickTypes" :key="v"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" round size="mini" @click="search()">
          <i class="el-icon-search"></i> 查询
        </el-button>
        <el-button type="danger" round size="mini" @click="del()">
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
        <el-table-column label="会议标题" align="center">
          <template slot-scope="scope">
            <div v-text="levelTitle(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="eventTypeName" label="会议室" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <div v-html="zhuangtai(scope.row)"></div>
          </template>
        </el-table-column>
        <el-table-column prop="address" label="发布人" align="center"></el-table-column>
        <el-table-column prop="reporter" label="会议时间" align="center"></el-table-column>
        <el-table-column prop="deptName" label="会议时长" align="center"></el-table-column>
        <el-table-column prop="createTime" label="发布时间" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" round size="mini" @click="Jump(scope.$index,scope.row)">查看</el-button>
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
      clickTypes: [],
      dataList: [],
      searchTime: "",
      // 表格选中数据
      multipleSelection: [],
      form: {
        startTime: "",
        endTime: "",
        eventLevel: "",
        eventStatus: "",
        templateType: "",
        eventType: ""
      },
      currentPage: 1
    };
  },
  methods: {
    Jump(index, row) {
      this.$router.push({
        name: "transaction",
        query: {
          id: row.id
        }
      });
    },
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
          this.deletes(row.id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    deletes(id) {
      this.axios({
        url: "admin/event/deleteEventByIds",
        method: "post",
        data: { ids: id }
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
    // 表格批量选中或取消
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
    },
    clickType() {
      this.axios({ url: "/admin/event/getEventType", method: "post" }).then(
        res => {
          this.clickTypes = res.data;
        }
      );
    },
    // 批量删除
    del() {
      let arr = [];
      for (let i = 0; i < this.multipleSelection.length; i++) {
        arr.push(this.multipleSelection[i].id);
      }
      this.deletes(arr.join(","));
    }
  },
  created() {
    this.search();
    this.clickType();
  }
};
</script>
<style>
#HandlingOfEvents {
  background-color: white;
  border-radius: 10px 0 0 0;
}

.bot {
  display: flex;
  flex-wrap: wrap;
  height: 56px;
  justify-content: center;
  align-content: center;
}
</style>
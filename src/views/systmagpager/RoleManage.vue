<!-- 角色管理 -->
<template>
  <div class="base-container user-page">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>角色管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>角色管理</h1>
    </div>
    <div class="main">
      <div class="main-header">
        <div>
          <el-button type="primary">新增角色</el-button>
          <el-button type="danger">批量删除</el-button>
        </div>
        <div>
          <el-input style="width: 250px;" v-model.trim="searchContent" placeholder="请输入内容">
            <i style="margin: 13px 0 0 0" class="el-icon-search" slot="suffix" @click="handleIconSearchClick"></i>
          </el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%;margin:10px 0">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <!-- <el-table-column
          type="index"
          width="50">
        </el-table-column> -->
        <el-table-column
          prop="name"
          label="名称">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column
          prop="status"
          label="状态">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.status === 1">启用</el-tag>
            <el-tag type="info" v-if="scope.row.status === 0">禁用</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="备注">
        </el-table-column>
        <el-table-column
          prop="userCteate"
          label="创建人">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'rolemanager',
  data () {
    return {
      searchContent: '',
      tableData: [
        {
          name: '总经理',
          type: 1,
          status: 1,
          remark: '这是一个总经理',
          userCteate: 'admin'
        },
        {
          name: '总经理2',
          type: 1,
          status: 0,
          remark: '这是一个总经理',
          userCteate: 'admin'
        }
      ]
    }
  },
  methods: {
    handleIconSearchClick () {

    },
    handleSelectionChange (e) {
      console.info(e)
    },
    handleEdit (index, row) {
      console.info(index, row)
    },
    handleDelete (index, row) {
      console.info(index, row)
    }
  }
}
</script>

<style lang="scss">
// 全局引用了基本布局.base-container 文件在base.scss
.user-page {
  .main {
    .main-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

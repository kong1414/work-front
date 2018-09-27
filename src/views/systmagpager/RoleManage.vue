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
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.name" placeholder="请输入内容" :maxlength="20"></el-input>
            <span v-show="!scope.row.show">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型">
        </el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <div v-if="!scope.row.show">
              <el-tag type="success" v-if="scope.row.status === 0" disable-transitions="false">启用</el-tag>
              <el-tag type="info" v-if="scope.row.status === 1" disable-transitions="false">禁用</el-tag>
            </div>
            <div v-if="scope.row.show">
              <el-button size="mini" type="success" :disabled="scope.row.status === 0" @click="handleStatus(scope.$index, scope.row)">启用</el-button>
              <el-button size="mini" type="success" :disabled="scope.row.status === 1" @click="handleStatus(scope.$index, scope.row)">禁用</el-button>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.remark" placeholder="请输入内容" :maxlength="20"></el-input>
            <span v-show="!scope.row.show">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="userCteate"
          label="创建人">
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <div v-if="scope.row.show">
              <el-button
                size="mini"
                @click="handleSave(scope.$index, scope.row)">保存</el-button>
              <el-button
              size="mini"
              @click="handleCancel(scope.$index, scope.row)">取消</el-button>
            </div>
            <div v-else>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)">权限配置</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增角色"
      :visible.sync="AddRoleDialogVisible"
      width="30%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'rolemanager',
  data () {
    return {
      AddRoleDialogVisible: false, // 新增角色弹窗是否显示的参数
      itemData: {}, // 编辑的暂存对象
      searchContent: '',
      tableData: [
        {
          id: 123,
          name: '总经理',
          type: 1,
          status: 1,
          remark: '这是一个总经理',
          userCteate: 'admin',
          show: false
        },
        {
          id: 1234,
          name: '总经理2',
          type: 1,
          status: 0,
          remark: '这是一个总经理',
          userCteate: 'admin',
          show: false
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
      row.show = !row.show
      this.itemData = JSON.parse(JSON.stringify(row))
      console.info(index, row)
    },
    handleDelete (index, row) {
      console.info(index, row)
    },
    handleSave (index, row) {
      row.show = false
      row = JSON.parse(JSON.stringify(this.itemData))
      console.info(index, row)
    },
    handleCancel (index, row) {
      console.info(index, row)
      if (!row.id) {
        this.tableData.splice(index, 1)
      }
      Object(row, this.itemData)
      row.show = false
    },
    handleStatus (index, row) {
      if (row.status === 1) {
        row.status = 0
      } else if (row.status === 0) {
        row.status = 1
      }
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

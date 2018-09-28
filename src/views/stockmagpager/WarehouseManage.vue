<!-- 仓库管理 -->
<template>
  <div class="base-container warehouse-page">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>仓库管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>仓库管理</h1>
    </div>
    <div class="main">
      <div class="main-header">
        <div>
          <el-button type="primary">新增仓库</el-button>
          <el-button type="danger" v-show="isShowDeleteButton">批量删除</el-button>
        </div>
        <div>
          <el-input style="width: 250px;" v-model.trim.lazy="searchContent" placeholder="请输入内容">
            <i style="margin: 13px 0 0 0" class="el-icon-search" slot="suffix" @click="handleIconSearchClick"></i>
          </el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        style="width: 100%;margin:10px 0">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.name" placeholder="请输入名称" :maxlength="20"></el-input>
            <span v-show="!scope.row.show">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="地址">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.address" placeholder="请输入地址" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.address}}</span>
          </template>
        </el-table-column>
        <el-table-column label="备注">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.remark" placeholder="请输入备注" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="180px">
          <template slot-scope="scope">
            <div v-if="!scope.row.show">
              <el-tag type="success" v-if="scope.row.status === 0" :disable-transitions="false">启用</el-tag>
              <el-tag type="info" v-if="scope.row.status === 1" :disable-transitions="false">禁用</el-tag>
            </div>
            <div v-if="scope.row.show">
              <el-button size="mini" type="success" :disabled="scope.row.status === 0" @click="handleStatus(scope.$index, scope.row)">启用</el-button>
              <el-button size="mini" type="success" :disabled="scope.row.status === 1" @click="handleStatus(scope.$index, scope.row)">禁用</el-button>
            </div>
          </template>
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
                @click="handleDetail(scope.$index, scope.row)">库存</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { reqWarehouseList } from '../../api/stock.js'
export default {
  name: 'warehousemanager',
  data () {
    return {
      ids: [],
      isShowDeleteButton: false, // 批量删除
      itemData: {}, // 编辑的暂存对象
      searchContent: '',
      tableData: [
        {
          id: 123,
          name: '中央仓库',
          address: '中央仓库地址',
          remark: '备注',
          status: 1,
          show: false
        },
        {
          id: 123456,
          name: '中央仓库2号',
          address: '中央仓库2号地址',
          remark: '备注',
          status: 1,
          show: false
        }
      ]
    }
  },
  watch: {
    ids: function () {
      console.info(this.ids)
      if (this.ids.length > 0) {
        this.isShowDeleteButton = true
      } else {
        this.isShowDeleteButton = false
      }
    },
    searchContent () {
      this._loadData()
    }
  },
  created () {
    this._loadData()
  },
  methods: {
    _loadData () {
      console.info(this.searchContent)
      let params = 'keyword=' + this.searchContent
      console.info(params)
      // reqWarehouseList(params).then(res => {
      //   if (res.resultCode === 200) {
      //     this.tableData = res.data
      //     console.info(this.tableData)
      //   }
      // })
    },
    handleIconSearchClick () {

    },
    handleSelectionChange (checkList) { // 选中表格框时触发
      if (checkList.length === 0) {
        this.ids = []
      } else {
        let arr = []
        checkList.forEach(item => {
          arr.push(item.id)
        })
        this.ids = arr
      }
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
    handleDetail (index, row) {
      console.info(index, row)
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
.warehouse-page {
  .main {
    .main-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

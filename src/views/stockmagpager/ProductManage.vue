<!-- 产品管理 -->
<template>
  <div class="base-container product-page">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>产品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>产品管理</h1>
    </div>
    <div class="main">
      <div class="main-header">
        <div>
          <el-button type="primary" @click="handleAddProduct">新增产品</el-button>
          <!-- <el-button type="danger" v-show="isShowDeleteButton">批量删除</el-button> -->
        </div>
        <div>
          <el-input style="width: 250px;" v-model.trim.lazy="searchContent" placeholder="请输入内容搜索">
            <!-- <i style="margin: 13px 0 0 0" class="el-icon-search" slot="suffix" @click="handleIconSearchClick"></i> -->
            <i style="margin: 12px 5px 0 0;font-size:16px" class="el-icon-search" slot="suffix"></i>
          </el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        style="width: 100%;margin: 10px 0">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="名称">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.name" placeholder="请输入名称" :maxlength="20"></el-input>
            <span v-show="!scope.row.show">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column label="描述">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.description" placeholder="请输入描述" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.description}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" v-model="scope.row.classify" placeholder="请输入分类" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.classify}}</span>
          </template>
        </el-table-column>
        <el-table-column label="成本价">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" @keydown="handleInput" v-model="scope.row.costPrice" placeholder="请输入成本价" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.costPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="售价">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" @keydown="handleInput" v-model="scope.row.unitPrice" placeholder="请输入售价" :maxlength="50"></el-input>
            <span v-show="!scope.row.show">{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220px" fixed="right">
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
                type="info"
                @click="handleDetail(scope.$index, scope.row)">详情</el-button>
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
import { reqProductList, reqDelProduct, reqUpdateProduct, reqAddProduct } from '../../api/stock.js'
export default {
  name: 'productmanager',
  data () {
    return {
      loading: false,
      ids: [],
      isShowDeleteButton: false, // 批量删除
      itemData: {}, // 编辑的暂存对象
      searchContent: '',
      tableData: []
    }
  },
  watch: {
    ids () {
      // console.info(this.ids)
      if (this.ids.length > 0) {
        this.isShowDeleteButton = true
      } else {
        this.isShowDeleteButton = false
      }
    },
    searchContent () {
      let timer
      if (timer) { // 优化搜索请求
        clearTimeout(timer)
      }
      timer = setTimeout(() => {
        this._loadData()
      }, 500)
    }
  },
  created () {
    this._loadData()
  },
  methods: {
    _loadData () {
      this.loading = true
      let params = 'keyword=' + this.searchContent
      reqProductList(params).then(res => {
        if (res.resultCode === 200) {
          res.data.forEach(element => {
            element.show = false
          })
          this.tableData = res.data
          this.loading = false
          console.info(this.tableData)
        }
      })
    },
    handleInput (e) { // 限制小数部分，价格：限制两位小数
      e.target.value = (e.target.value.match(/^\d*(\.?\d{0,1})/g)[0]) || null
    },
    handleAddProduct () {
      let item = { id: '', name: '', address: '', status: 1, remark: '', show: true }
      this.tableData.splice(0, 0, item)
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
      // console.info(index, row)
    },
    handleDelete (index, row) {
      let params = 'id=' + row.id
      reqDelProduct(params).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type: 'success',
            message: res.resultMessage
          })
          this._loadData()
        }
      })
    },
    handleSave (index, row) {
      this.loading = false
      if (row.id === '' || row.id === null) { // 新增产品的保存
        let params = {
          name: row.name,
          description: row.description,
          detail: row.detail,
          costPrice: row.costPrice,
          unitPrice: row.unitPrice,
          classify: row.classify
        }
        reqAddProduct(params).then(res => {
          if (res.resultCode === 200) {
            row.show = false
            this.$message({
              type: 'success',
              message: res.resultMessage
            })
            this._loadData()
          }
        })
      } else { // 更新角色
        row.show = false
        let params = {
          id: row.id,
          name: row.name,
          description: row.description,
          detail: row.detail,
          costPrice: row.costPrice,
          unitPrice: row.unitPrice,
          classify: row.classify
        }
        reqUpdateProduct(params).then(res => {
          if (res.resultCode === 200) {
            this.$message({
              type: 'success',
              message: res.resultMessage
            })
            this._loadData()
          }
        })
      }
    },
    handleCancel (index, row) {
      if (!row.id) {
        this.tableData.splice(index, 1)
      }
      Object(row, this.itemData)
      row.show = false
      this._loadData()
    },
    handleDetail (index, row) {
      this.$alert(row.detail, row.name + ' 详情')
    },
    handleStatus (index, row) {
      if (row.status === 1) {
        row.status = 0
      } else if (row.status === 0) {
        row.status = 1
      }
    },
    test () {
      console.info(null)
    }
  }
}
</script>

<style lang="scss">
// 全局引用了基本布局.base-container 文件在base.scss
.product-page {
  .main {
    .main-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

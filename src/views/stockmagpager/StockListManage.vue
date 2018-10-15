<!-- 库存管理 -->
<template>
  <div class="base-container stockList-page">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>入库管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>入库管理</h1>
    </div>
    <div class="main">
      <div class="main-header">
        <div>
          <el-button type="primary" @click="openDialog">新增库存</el-button>
          <el-button type="info">增强查询</el-button>
        </div>
        <div>
          <el-input style="width: 250px;" v-model.trim.lazy="searchContent" placeholder="请输入内容搜索">
            <i style="margin: 12px 5px 0 0;font-size:16px" class="el-icon-search" slot="suffix"></i>
          </el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        style="width: 100%;margin: 10px 0">
        <el-table-column label="" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.id}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品ID" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.productId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称" min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库ID" width="80">
          <template slot-scope="scope">
            <span>{{scope.row.productId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="仓库名称"  min-width="100">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="单价">
          <template slot-scope="scope">
            <span>{{scope.row.unitPrice}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <span>{{scope.row.quantity}}</span>
          </template>
        </el-table-column>
        <el-table-column label="时间" width="170px">
          <template slot-scope="scope">
            <span>{{ purchaseTime(scope.row.purchaseTime)}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作人">
          <template slot-scope="scope">
            <span>{{scope.row.userName}}</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增库存"
      :visible.sync="dialogVisible"
      width="50%">
      <div style="width: 400px;margin: 0 auto;">
        <el-form ref="form" :model="addFormData" label-width="80px" style="margin-top:20px">
          <el-form-item label="选择产品">
            <el-select
              style="width: 250px"
              v-model="addFormData.productId"
              filterable
              placeholder="请输入产品名称">
              <el-option
                v-for="item in productOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
            <el-tooltip content="需要先在产品管理里添加产品" placement="right" style="margin-left:10px">
              <i class="el-icon-info"></i>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="选择仓库">
            <el-select
              style="width: 250px"
              v-model="addFormData.warehouseId"
              filterable
              placeholder="请输入仓库名称">
              <el-option
                v-for="item in warehouseOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量">
            <el-input style="width: 250px" @keydown="handleInput" type="number" v-model.number="addFormData.quantity" min="1" placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleAddStock">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { reqStockList, reqAddStock, reqProductListByName, reqWarehouseList } from '../../api/stock.js'
import dataUtil from '../../util/dataUtil.js'
export default {
  name: 'stocklistmanager',
  data () {
    return {
      dialogVisible: false, // 新增库存弹窗
      loading: false,
      ids: [],
      isShowDeleteButton: false, // 批量删除
      searchContent: '',
      tableData: [],
      addFormData: { // 新增库存的表单数据
        productId: null,
        warehouseId: null,
        quantity: 0
      },
      productOptions: [],
      warehouseOptions: []
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
    this._loadOptionData()
  },
  methods: {
    _loadData () {
      let params = 'keyword=' + this.searchContent
      reqStockList(params).then(res => {
        if (res.resultCode === 200) {
          res.data.forEach(element => {
            element.show = false
          })
          this.tableData = res.data
          this.loading = false
          // console.info(this.tableData)
        }
      })
    },
    _loadOptionData () {
      reqProductListByName().then(res => {
        if (res.resultCode === 200) {
          let arr = []
          res.data.forEach(e => {
            let item = {
              value: e.id,
              label: e.name
            }
            arr.push(item)
          })
          this.productOptions = arr
          // console.info(this.productOptions)
        }
      })
      reqWarehouseList().then(res => {
        if (res.resultCode === 200) {
          let arr = []
          res.data.forEach(e => {
            let item = {
              value: e.id,
              label: e.name
            }
            arr.push(item)
          })
          this.warehouseOptions = arr
          // console.info('warehouseOptions', this.warehouseOptions)
        }
      })
    },
    handleInput (e) { // 限制 只能整数
      e.target.value = e.target.value.replace(/[^\d]/g, '')
    },
    purchaseTime (time) {
      return dataUtil.getStrData(time)
    },
    openDialog () {
      this._loadOptionData()
      this.dialogVisible = true
    },
    handleAddStock () {
      console.info(this.addFormData)
      let params = {
        productId: this.addFormData.productId,
        warehouseId: this.addFormData.warehouseId,
        quantity: this.addFormData.quantity
      }
      reqAddStock(params).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type: 'success',
            message: res.resultMessage
          })
          this._loadData()
          this.dialogVisible = false
          this.addFormData = {}
        }
      })
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
    }
  }
}
</script>

<style lang="scss">
// 全局引用了基本布局.base-container 文件在base.scss
.stockList-page {
  .main {
    .main-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

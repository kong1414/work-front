<!-- 库存管理 -->
<template>
  <div class="base-container stock-page">
    <div class="header">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/home/warehouse' }">库存管理</el-breadcrumb-item>
        <el-breadcrumb-item>库存管理</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{this.warehouseName}} - 库存管理</h1>
    </div>
    <div class="main">
      <div class="main-header">
        <div>
          <el-button type="primary" @click="dialogVisible = true">新增库存</el-button>
        </div>
        <div>
          <el-input style="width: 250px;" v-model.trim.lazy="searchContent" placeholder="请输入内容"></el-input>
        </div>
      </div>
      <el-table
        :data="tableData"
        @selection-change="handleSelectionChange"
        v-loading="loading"
        style="width: 100%;margin: 10px 0">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column label="产品ID">
          <template slot-scope="scope">
            <span>{{scope.row.productId}}</span>
          </template>
        </el-table-column>
        <el-table-column label="产品名称">
          <template slot-scope="scope">
            <span>{{scope.row.productName}}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类">
          <template slot-scope="scope">
            <span>{{scope.row.classify}}</span>
          </template>
        </el-table-column>
        <el-table-column label="数量">
          <template slot-scope="scope">
            <el-input v-show="scope.row.show" size="small" @keydown="handleInput" type="number" v-model.number="scope.row.quantity" min="1" placeholder="请输入数量"></el-input>
            <span v-show="!scope.row.show">{{scope.row.quantity}}</span>
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
                @click="handleEdit(scope.$index, scope.row)">修改</el-button>
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
import { reqStockListByWarehouseId, reqDelStockById, reqUpdateStock, reqAddStock, reqProductListByName, reqWarehouseList } from '../../api/stock.js'
export default {
  name: 'stockmanager',
  data () {
    return {
      warehouseId: 0,
      warehouseName: '',
      dialogVisible: false, // 新增库存弹窗
      loading: false,
      ids: [],
      isShowDeleteButton: false, // 批量删除
      itemData: {}, // 编辑的暂存对象
      searchContent: '',
      tableData: [],
      addFormData: { // 新增库存的表单数据
        productId: null,
        warehouseId: null,
        quantity: 0
      },
      productOptions: [],
      warehouseOptions: [],
      formLoading: false
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
  mounted () {
    this._loadOptionData()
  },
  methods: {
    _loadData () {
      this.warehouseId = this.$route.query.warehouseId
      this.warehouseName = this.$route.query.warehouseName
      this.loading = true
      let params = 'warehouseId=' + this.warehouseId + '&keyword=' + this.searchContent
      reqStockListByWarehouseId(params).then(res => {
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
    handleInput (e) { // 限制 只能整数
      e.target.value = e.target.value.replace(/[^\d]/g, '')
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
    },
    handleEdit (index, row) {
      row.show = !row.show
      this.itemData = JSON.parse(JSON.stringify(row))
      // console.info(index, row)
    },
    handleDelete (index, row) {
      let params = 'id=' + row.id
      reqDelStockById(params).then(res => {
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
      let params = {
        id: row.id,
        productId: row.productId,
        warehouseId: row.warehouseId,
        quantity: row.quantity
      }
      reqUpdateStock(params).then(res => {
        if (res.resultCode === 200) {
          this.$message({
            type: 'success',
            message: res.resultMessage
          })
          row.show = false
          this._loadData()
        }
      })
    
    },
    handleCancel (index, row) {
      row.show = false
      this._loadData()
    }
  }
}
</script>

<style lang="scss">
// 全局引用了基本布局.base-container 文件在base.scss
.stock-page {
  .main {
    .main-header {
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>

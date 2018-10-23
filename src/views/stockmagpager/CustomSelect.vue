<template>
  <div class="custom-select-box">
    <!-- {{index}} -->
    <el-select class="title-select" v-model="condition.title" @change="selectTitleChange">
      <el-option
        v-for="item in questionOptions"
        :key="item.value"
        :label="item.label"
        :value="item.value">
      </el-option>
    </el-select>
    <span v-if="IsSelectTitle(condition)">
      <el-select class="type-select" v-model="condition.type"
        no-data-text='请选择'
        @change="selectTypeChange">
        <el-option value="true" label="包括"></el-option>
        <el-option value="false" label="不包括"></el-option>
      </el-select>
    </span>
    <span v-if="IsSelectTitle(condition) && condition.type !== ''" class="select-input">
      <el-select v-if="condition.title === 'selectWarehouse'" allow-create multiple filterable v-model="condition.contentArray" @change="contentArrayChange">
        <el-option
          v-for="item in warehouseOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-select v-if="condition.title === 'selectProduct'" allow-create multiple filterable v-model="condition.contentArray">
        <el-option
          v-for="item in productOptions"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </span>

    <span v-if="IsNumberTitle(condition)">
      <el-select class="type-select" v-model="condition.type"
        no-data-text='请选择'
        @change="selectTypeChange">
        <el-option value="scope" label="范围"></el-option>
        <el-option value="confirm" label="确值"></el-option>
      </el-select>
      <span v-if="condition.type === 'scope'" class="">
        <el-input-number
          class="number-input1"
          v-model="condition.contentRange[0]"
          :min="1"
          :step="10"
          :max="condition.contentRange[1]"
          @change="numberChange"
          label="最小值">
        </el-input-number>
        ~
        <el-input-number
          class="number-input2"
          v-model="condition.contentRange[1]"
          :min="condition.contentRange[0]"
          :max="999999"
          :step="10"
          @change="numberChange"
          label="最大值">
        </el-input-number>
      </span>
      <span v-else-if="condition.type === 'confirm'">
        <el-input-number
          class="number-input"
          v-model="condition.contentNumber"
          :min="1"
          :max="9999999"
          :step="10"
          @change="numberChange"
          label="确值">
        </el-input-number>
      </span>
    </span>
    <span v-else-if="IsDateTitle(condition)">
      <el-date-picker
        class="datapicker-input"
        v-model="condition.contentDate"
        type="daterange"
        align="right"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="datepickerChange"
        :picker-options="pickerOptions">
      </el-date-picker>
    </span>
    <i class="del-button el-icon-circle-close-outline" @click="deleteItem"></i>
  </div>
</template>
<script>
import { reqProductListByName, reqWarehouseList } from '../../api/stock.js'
export default {
  name: 'customSelect',
  props: {
    index: {
      type: Number,
      default: 0
    },
    condition: {
      type: Object,
      default: () => {
        let obj = {
          title: ''
        }
        return obj
      },
      required: true
    }
  },
  data () {
    return {
      test: 0,
      // condition: {
      //   title: '',
      //   type: '',
      //   content: '',
      //   contentArray: '',
      //   contentDate: [],
      //   contentRange: [1, 100],
      //   contentNumber:
      // },
      productOptions: [],
      warehouseOptions: [],
      questionOptions: [ // 自定义查询第一个选项
        {
          value: 'selectWarehouse',
          label: '仓库'
        },
        {
          value: 'selectProduct',
          label: '产品'
        },
        {
          value: 'selectUnitPrice',
          label: '单价'
        },
        {
          value: 'selectQuantity',
          label: '数量'
        },
        {
          value: 'selectDate',
          label: '时间'
        }
      ],
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一周',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近三个月',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近半年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 180)
              picker.$emit('pick', [start, end])
            }
          },
          {
            text: '最近一年',
            onClick (picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 365)
              picker.$emit('pick', [start, end])
            }
          }
        ]
      }
    }
  },
  computed: {
  },
  watch: {
  },
  created () {
    this._loadOptionData()
  },
  methods: {
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
    IsSelectTitle (condition) { // 是否是这两种类型，是返回true
      if (condition.title === 'selectWarehouse' || condition.title === 'selectProduct') {
        return true
      } else {
        return false
      }
    },
    IsNumberTitle (condition) {
      if (condition.title === 'selectUnitPrice' || condition.title === 'selectQuantity') {
        return true
      } else {
        return false
      }
    },
    IsDateTitle (condition) {
      if (condition.title === 'selectDate') {
        return true
      } else {
        return false
      }
    },
    selectTitleChange (e) { // 需要清空状态
      this.condition.type = ''
      this.condition.content = ''
      this.condition.contentArray = []
      this.condition.contentDate = []
      this.condition.contentRange = [0, 100]
      this.condition.contentNumber = 0
      // console.info(this.condition)
    },
    selectTypeChange () {
      this.condition.content = ''
      this.condition.contentArray = []
      this.conditionChange()
    },
    contentArrayChange () {
      // console.info(this.condition)
      this.conditionChange()
      this.customQueryStart()
    },
    datepickerChange () {
      // console.info(this.condition)
      this.conditionChange()
      this.customQueryStart()
    },
    numberChange () {
      // console.info(this.condition)
      this.conditionChange()
      this.customQueryStart()
    },
    deleteItem () { // 删除该查询
      // console.info(this.index,'zizujian')
      this.$emit('deleteQuery', this.index)
      this.customQueryStart()
    },
    conditionChange () {
      this.$emit('conditionChange', this.index, this.condition)
    },
    customQueryStart () { // 启动查询
      this.$emit('customQueryStart')
    }
  }
}
</script>

<style lang="scss">
.custom-select-box {
  overflow: hidden;
  min-width: 760px;
  margin-top: 10px;
  display: block;
  .title-select {
  }
  .type-select {
    margin-left: 20px;
    width: 100px;
  }
  .select-input {
    margin-left: 20px;
    .el-select {
      width: 350px;
    }
  }
  .slider-input {
    width: 280px;
    display: inline-block;
    vertical-align: middle;
    margin-left: 30px;
    margin-right: 20px
  }
  .number-input1 {
    margin-left: 20px;
    margin-right: 15px;
    width: 150px;
  }
  .number-input2 {
    margin-left: 15px;
    width: 150px;
  }
  .number-input {
    margin-left: 20px;
    width: 200px;
  }
  .datapicker-input {
    width: 470px;
    margin-left: 20px;
  }
  .del-button {
    margin-left: 15px;
    font-size:22px;
    vertical-align: middle;
    cursor:pointer;
  }
}
</style>

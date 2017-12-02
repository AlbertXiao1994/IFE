<template>
  <div class="order-wrap">
    <h3>您的产品</h3>
    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品：
      </div>
      <v-selection :selections="products" @on-change="changeProduct"></v-selection>
      <div class="order-list-option">
        开始日期：
      </div>
      <date-picker @on-change="changeStartDate"></date-picker>
      <div class="order-list-option">
        结束日期：
      </div>
      <date-picker @on-change="changeEndDate"></date-picker>
      <div class="order-list-option">
        关键词：
        <input type="text" class="order-query" v-model.lazy="query">
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="item in tableHeads" @click="changeOrderType(item)" :class="{active:item.active}">{{ item.label }}</th>
        </tr>
        <tr v-for="row in tableData">
          <td v-for="item in row">{{ item }}</td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import VSelection from '../components/base/selection'
import DatePicker from '../components/base/datepicker'
import _ from 'lodash'
export default {
  components: {
    VSelection,
    DatePicker
  },
  watch: {
    query () {
      this.getList()
    }
  },
  mounted () {
    // this.getList()
    this.$store.dispatch('fetchOrderList')
  },
  computed: {
    tableData () {
      return this.$store.getters.getOrderList
    }
  },
  data () {
    return {
      query: '',
      productId: 0,
      startDate: '',
      EndDate: '',
      products: [
          {
            label: '数据统计',
            value: 0
          },
          {
            label: '数据预测',
            value: 1
          },
          {
            label: '流量分析',
            value: 2
          },
          {
            label: '广告发布',
            value: 3
          }
      ],
      tableHeads: [
        {
          label: '订单号',
          key: 'orderId'
        },
        {
          label: '购买产品',
          key: 'product'
        },
        {
          label: '版本类型',
          key: 'version'
        },
        {
          label: '有效时间',
          key: 'period'
        },
        {
          label: '购买日期',
          key: 'date'
        },
        {
          label: '数量',
          key: 'buyNum'
        },
        {
          label: '总价',
          key: 'amount'
        }
      ],
      // tableData: [],
      currentOrder: "asc"
    }
  },
  methods: {
    changeProduct (obj) {
      this.$store.commit('updateParams',{
        key: 'productId',
        val: obj.value
      })
      this.$store.dispatch('fetchOrderList')
      // this.productId=obj.value
      // this.getList()
    },
    changeStartDate (date) {
      this.$store.commit('updateParams',{
        key: 'startDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.startDate=date
      // this.getList()
    },
    changeEndDate (date) {
      this.$store.commit('updateParams',{
        key: 'EndDate',
        val: date
      })
      this.$store.dispatch('fetchOrderList')
      // this.EndDate=date
      // this.getList()
    },
    getList () {
      let reqParams= {
        query: this.query,
        productId: this.productId,
        startDate: this.startDate,
        endDate: this.endDate
      }

      this.$http.post('/api/getOrderList',reqParams)
      .then((res) => {
        this.tableData=res.data.list
      }, (err) => {
        console.log(err)
      })
    },
    changeOrderType (headItem) {
      this.tableHeads.map((item) => {
        item.active = false
        return item
      })
      headItem.active = true
      if (this.currentOrder === 'asc') {
        this.currentOrder = 'desc'
      }
      else if (this.currentOrder === 'desc') {
        this.currentOrder = 'asc'
      }
      this.tableData = _.orderBy(this.tableData, headItem.key, this.currentOrder)
    }
  }
}
</script>

<style scoped>
.order-wrap {
  width: 1200px;
  min-height: 800px;
  margin: 20px auto;
  overflow: hidden;
}
.order-wrap h3 {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
}
.order-query {
  height: 25px;
  line-height: 25px;
  border: 1px solid #e3e3e3;
  outline: none;
  text-indent: 10px;
}
.order-list-option {
  display: inline-block;
  padding-left: 15px;
}
.order-list-option:first-child {
  padding-left: 0;
}
.order-list-table {
  margin-top: 20px;
}
.order-list-table table {
  width: 100%;
  background: #fff;
}
.order-list-table td,
.order-list-table th {
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 10px 0;
}
.order-list-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  cursor: pointer;
}
.order-list-table th.active {
  background: #35495e;
}
</style>

<template>
  <div class="sales-board">
      <div class="sales-board-intro">
        <h2>数据预测</h2>
        <p>未来，大数据会变得越来越重要，其核心应用预测也会成为互联网行业以及产业变革的重要力量，我们很有必要对数据预测及其分析方法进行全面且深入的了解。在这一点上，《大数据预测》是本很好的读物，适合大数据所有相关行业的人阅读。</p>
      </div>
      <div class="sales-board-form">
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  购买数量：
              </div>
              <div class="sales-board-line-right">
                <v-counter :max="100" :min="20" @on-change="onParamChange('buyNum', $event)"></v-counter>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  媒介：
              </div>
              <div class="sales-board-line-right">
                <v-mult-chooser :selections="versionList" @on-change="onParamChange('media', $event)"></v-mult-chooser>
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  有效时间：
              </div>
              <div class="sales-board-line-right">
                  一年
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">
                  总价：
              </div>
              <div class="sales-board-line-right">
                  500 元
              </div>
          </div>
          <div class="sales-board-line">
              <div class="sales-board-line-left">&nbsp;</div>
              <div class="sales-board-line-right">
                  <div class="button" @click="showPayDialog">
                    立即购买
                  </div>
              </div>
          </div>
      </div>
      <div class="sales-board-des">
        <h2>产品说明</h2>
        <p>2020年的一天，在你驱车前往公司的路上，导航系统通过预测交通流量，会自动帮你选择一条最合适的交通路线；车内推荐系统会根据你的饮食习惯预测你可能会喜欢吃什么，并推荐沿途的早餐店；你的电子社交助理已经为你自动选择了你可能感兴趣的社交网信息；当车内系统预测到你驾车有些分心时，座椅会自动震动进行提醒……
以上这些情景不是科幻大片独有的，它们有的已经或会在未来的某一天成为现实。而这一切所倚靠的就是预测分析技术。
大数据时代下，作为其核心，预测分析已在商业和社会中得到广泛应用。随着越来越多的数据被记录和整理，未来预测分析必定会成为所有领域的关键技术。
作为预测分析领域的专家，埃里克·西格尔博士深谙预测分析界已经实现和正在发生的事情、面临的问题和将来可能的前景。在《大数据预测》一书中，他结合预测分析的应用实例，对其进行了深入、细致且全面的解读。
关于预测分析，你想了解的全部，你的生活以及这个世界会因为预测分析改变到什么程度，《大数据预测》都会告诉你。</p>
      </div>
      <my-dialog :is-show="isShowPayDialog" @on-close="hidePayDialog">
        <table class="buy-dialog-table">
          <tr>
            <th>购买数量</th>
            <th>媒介</th>
            <th>有效时间</th>
            <th>总价</th>
          </tr>
          <tr>
            <td>{{ buyNum }}</td>
            <td>
              <span v-for="item in media">{{ item.label }} </span>
            </td>
            <td>一年</td>
            <td>{{ price }}</td>
          </tr>
        </table>
        <h3 class="buy-dialog-title">请选择银行</h3>
        <bank-chooser @on-change="onChangeBanks"></bank-chooser>
        <div class="button buy-dialog-btn" @click="confirmBuy">
          确认购买
        </div>
      </my-dialog>
      <my-dialog :is-show="isShowErrDialog" @on-close="hideErrDialog">
        支付失败！
      </my-dialog>
      <check-order :is-show-check-dialog="isShowCheckOrder" :order-id="orderId" @on-close-check-dialog="hideCheckOrder"></check-order>
  </div>
</template>

<script>
import VMultChooser from '../../components/base/multiplyChooser'
import VCounter from '../../components/base/counter'
import Dialog from '../../components/base/dialog'
import BankChooser from '../../components/bankChooser'
import CheckOrder from '../../components/checkOrder'
import _ from 'lodash'
export default {
  components: {
    VMultChooser,
    VCounter,
    MyDialog: Dialog,
    BankChooser,
    CheckOrder
  },
  mounted () {
    this.buyNum=20,
    this.media=this.versionList[0],
    this.getPrice()
  },
  data () {
    return {
      buyNum: 20,
      media: {},
      price: 0,
      versionList: [
        {
          label: '纸质报告',
          value: 0
        },
        {
          label: 'pdf',
          value: 1
        },
        {
          label: '页面报告',
          value: 2
        },
        {
          label: '邮件',
          value: 3
        }
      ],
      isShowPayDialog: false,
      bankId: null,
      orderId: null,
      isShowCheckOrder: false,
      isShowErrDialog: false
    }
  },
  methods: {
    onParamChange (attr, val) {
      this[attr] = val
      this.getPrice()
    },
    getPrice () {
      let reqParams = {
      }
      this.$http.post('/api/getPrice', reqParams)
      .then((res) => {
        this.price = res.data.amount
      })
    },
    showPayDialog () {
      this.isShowPayDialog = true
    },
    hidePayDialog () {
      this.isShowPayDialog = false
    },
    hideErrDialog () {
      this.isShowErrDialog = false
    },
    hideCheckOrder () {
      this.isShowCheckOrder = false
    },
    onChangeBanks (bankObj) {
      this.bankId = bankObj.id
    },
    confirmBuy () {
      let reqParams = {

      }
      this.$http.post('/api/createOrder', reqParams)
      .then((res) => {
        this.orderId = res.data.orderId
        this.isShowCheckOrder = true
        this.isShowPayDialog = false
      }, (err) => {
        this.isShowBuyDialog = false
        this.isShowErrDialog = true
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.buy-dialog-title {
  font-size: 16px;
  font-weight: bold;
}
.buy-dialog-btn {
  margin-top: 20px;
}
.buy-dialog-table {
  width: 100%;
  margin-bottom: 20px;
}
.buy-dialog-table td,
.buy-dialog-table th{
  border: 1px solid #e3e3e3;
  text-align: center;
  padding: 5px 0;
}
.buy-dialog-table th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}

</style>

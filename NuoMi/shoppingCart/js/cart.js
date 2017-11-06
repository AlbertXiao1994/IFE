var vm=new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productsList: [],
    checkAllFlag: false,
    delFlag: false,
  },
  filters: {
    formatMoney: function(value) {
      return "¥ "+value.toFixed(2);
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.cartView();
    });
  },
  methods: {
    cartView: function() {
      var _this=this;
      this.$http.get("data/cartData.json",{"id":123}).then(res=> {
        _this.productsList=res.body.result.list;
        // _this.totalMoney=res.body.result.totalMoney;
      });
    },
    changeQuantity: function(product,way) {
      if(way>0) {
        product.productQuantity++;
      }
      else if(product.productQuantity>1){
        product.productQuantity--;
      }
      //计算总金额
      this.calTotalMoney();
    },
    selectedProduct:function(item) {
      if(typeof item.checked == "undefined") {
        this.$set(item,"checked",true);
      }
      else {
        item.checked=!item.checked;
      }
      //计算总金额
      this.calTotalMoney();
    },
    checkAll: function(flag) {
      this.checkAllFlag=flag;
      var _this=this;
      this.productsList.forEach(function(item) {
        if(typeof item.checked == "undefined") {
          _this.$set(item,"checked",_this.checkAllFlag);
      }
      else {
        item.checked=_this.checkAllFlag;
      }
      //计算总金额
      _this.calTotalMoney();
      });
    },
    calTotalMoney: function() {
      var _this=this;
      this.totalMoney=0;
      this.productsList.forEach(function(item,index) {
        if(item.checked) {
          _this.totalMoney+=item.productQuantity*item.productPrice;
      }
      });
    },
    delConfirm: function(item) {
      this.delFlag=false;
      var index=this.productsList.indexOf(item);
      this.productsList.splice(index,1);
      this.calTotalMoney();
    },
    payMoney: function() {
      if(this.totalMoney > 0) {
        window.location.href="address.html";
      }
    }
  }
});


Vue.filter("money",function(value,type) {
  return value.toFixed(2)+type;
});
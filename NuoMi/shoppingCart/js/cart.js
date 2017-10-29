var vm=new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productsList: [],
    checkAllFlag: false
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
        _this.totalMoney=res.body.result.totalMoney;
      });
    },
    changeMoney: function(product,way) {
      if(way>0) {
        product.productQuantity++;
      }
      else if(product.productQuantity>1){
        product.productQuantity--;
      }
    },
    selectedProduct:function(item) {
      if(typeof item.checked == "undefined") {
        this.$set(item,"checked",true);
      }
      else {
        item.checked=!item.checked;
      }
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
      })
    }
  }
});


Vue.filter("money",function(value,type) {
  return value.toFixed(2)+type;
});
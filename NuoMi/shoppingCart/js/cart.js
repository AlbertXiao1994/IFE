var vm=new Vue({
  el: "#app",
  data: {
    totalMoney: 0,
    productsList: []
  },
  filters: {

  },
  mounted: function() {
    this.cartView();
  },
  methods: {
    cartView: function() {
      var _this=this;
      this.$http.get("data/cartData.json",{"id":123}).then(function(res) {
        _this.productsList=res.body.result.list;
        _this.totalMoney=res.body.result.totalMoney;
      });
    }
  }
});
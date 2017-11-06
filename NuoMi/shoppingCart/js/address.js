new Vue({
	el: ".container",
	data: {
		addressList: [],
		limitNum: 3,
		moreFlag: false,
		currentIndex: 0,
		shoppingMethod: 1
	},
	mounted: function() {
		this.$nextTick(function() {
			this.getAddressList();
		});
	},
	computed: {
		addressListFilter: function() {
			return this.addressList.slice(0,this.limitNum);
		}
	},
	methods: {
		getAddressList: function() {
			this.$http.get("data/address.json").then(res=> {
				if(res.status=="200")
					this.addressList=res.body.result;
			});
		},
		loadMore: function() {
			if(!this.moreFlag)
				this.limitNum=this.addressList.length;
			else
				this.limitNum=3;
			this.moreFlag=!this.moreFlag;
		},
		setDefault: function(addressId) {
			this.addressList.forEach(function(address) {
				if(addressId==address.addressId) {
					address.isDefault=true;
				}
				else {
					address.isDefault=false;
				}
			});
		},
		delAddress: function(item) {
			var index=this.addressList.indexOf(item);
			this.addressList.splice(index,1);
		}
	}
});
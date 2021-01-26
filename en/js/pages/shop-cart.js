new Vue({
	el: "#container",
	data: {
		isM: false,
		shopCartData: {},
		commodityList: [{
			id: "1",
			discount: 0,
			portraitUrl: "//r.tourboxtech.com/en/src/images/detail-banner-over02.png",
			title: "LOUPEDECK+",
			description: "Pro or beginner, achieving the perfect edit quickly becomes second nature with Loupedeck+'s intuitive buttons and dials.",
			qty: 1,
			amount: 1
		}],
		totalAmount: 0,
	},
	mounted: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getDatas();
	},
	methods: {
		getDatas: function () {
			var _this = this;
			$.getJSON("src/json/shop-cart.json", function (result) {
				_this.shopCartData = result;
			})
			_this.calculateAmount();
		},
		getCartList: function () {

		},
		deleteCartShop: function (index) {
			var _this = this;
			_this.commodityList.splice(index, 1);
			_this.calculateAmount();
		},
		reduceAmount: function (index) {
			var _this = this;
			_this.commodityList[index].qty--;
			if (_this.commodityList[index].qty <= 0) _this.commodityList.splice(index, 1);
			_this.calculateAmount();
		},
		addAmount: function (index) {
			var _this = this;
			_this.commodityList[index].qty++;
			_this.calculateAmount();
		},
		calculateAmount: function () {
			var _this = this;
			_this.totalAmount = 0;
			for (var i = 0; i < _this.commodityList.length; i++) {
				_this.totalAmount += _this.commodityList[i].qty * _this.commodityList[i].amount;
			}
		},
		// 提交购物车
		submitOrder: function () {
			var _this = this;
			if (!_this.commodityList.length) return
			_this.commodityList.timestamp = (new Date()).getTime();
			_this.setStorage('tourboxCartList_enUser', _this.commodityList)
			window.location.href = 'shop-order.html'
		},
		// 缓存购物车信息
		setStorage: function (name, value) {
			try {
				window.localStorage.setItem(name, JSON.stringify(value))
			} catch (error) {
				alert(error)
			}
		},
		getStorage: function (name) {
			try {
				var cartValue = window.localStorage.getItem(name)
				var date = new Date();
				if (!cartValue) return null
				if (cartValue.timestamp - date.getTime() > 30 * 24 * 60 * 60 * 1000) {
					window.localStorage.removeItem(name);
					return null
				} else {
					return cartValue
				}
			} catch (error) {
				alert(error)
			}
		},
		judgeIsMobile: function () {
			var _this = this;
			if (window.innerWidth < 768) {
				_this.isM = true;
			} else {
				_this.isM = false;
			}
			window.addEventListener('resize', function (e) {
				if (window.innerWidth < 768) {
					_this.isM = true;
				} else {
					_this.isM = false;
				}
			})
		},
	}
})
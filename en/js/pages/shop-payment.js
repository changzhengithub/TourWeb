new Vue({
	el: "#container",
	data: {
		isM: false,
		commodityList: [],
		orderInfo: {},
		totalAmount: '',
		labelShow: false,
		cardCheckShow: false,
	},

	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getCommodityCache('tourboxCartList_enUser');
		_this.getOrderCache('tourboxOrderInfo_enUser');
	},
	mounted: function () {},
	methods: {
		// 获取购物车商品信息
		getCommodityCache: function (name) {
			var _this = this;
			try {
				var cartValue = window.localStorage.getItem(name)
				if (cartValue) {
					_this.commodityList = JSON.parse(cartValue);
					_this.calculateAmount();
				} else {
					window.location.href = 'shop-cart.html'
				}
			} catch (error) {
				alert(error)
			}
		},
		// 获取订单信息
		getOrderCache: function (name) {
			var _this = this;
			try {
				var orderValue = window.localStorage.getItem(name)
				if (orderValue) {
					_this.orderInfo = JSON.parse(orderValue);
				} else {
					window.location.href = 'shop-order.html'
				}
			} catch (error) {
				alert(error)
			}
		},
		changeEmailInfo: function (value) {
			try {
				window.sessionStorage.setItem('tourboxChangeInfo_enUser', value);
				window.location.href = 'shop-order.html';
			} catch (error) {
				alert(error)
			}
		},
		selectPayWay: function (boolean) {
			var _this = this;
			_this.cardCheckShow = boolean;
		},
		// 提交订单跳转到支付页面
		confirmOrder: function () {
			var _this = this;
			var items = [];
			for (var i = 0; i < _this.commodityList.length; i++) {
				var itemsJson = {
					id: _this.commodityList[i].id,
					quantity: _this.commodityList[i].qty,
				}
				items.push(itemsJson)
			}
			var params = {
				items: items,
				email: _this.orderInfo.orderEmail,
				amount: _this.totalAmount,
				discount: _this.commodityList.discount,
				address: _this.orderInfo.orderCompany + _this.orderInfo.orderApartment + _this.orderInfo.orderAddress + _this.orderInfo.cityName + _this.orderInfo.stateName + _this.orderInfo.countryName,
				contact_person: _this.orderInfo.firstName + _this.orderInfo.lastName,
				contact_phone: _this.orderInfo.orderPhone,
				postcode: _this.orderInfo.postalCode,
				pay_method: _this.cardCheckShow ? 'paypal' : 'stripe',
				self_collection: false
			};
			$.ajax({
				url: "/shop-api/create-order",
				type: "post",
				dataType: "json",
				data: JSON.stringify(params),
				headers: {
					'Content-Type': "application/json"
				},
				success(res) {
					if (_this.cardCheckShow) {
						window.location.href = res.redirect
					} else {
						var stripe = Stripe(res.publicKey);
						stripe.redirectToCheckout({
							sessionId: res.sessionId
						}).then(function (result) {
							if (result.error) {
								alert(result.error.message);
							}
						});
					}
				},
				error(err) {
					console.log(err);
				}
			})
			// _this.setStorage('tourboxOrderInfo_enUser', _this.orderInputInfo)
		},
		calculateAmount: function () {
			var _this = this;
			_this.totalAmount = 0;
			for (var i = 0; i < _this.commodityList.length; i++) {
				_this.totalAmount += _this.commodityList[i].qty * _this.commodityList[i].amount;
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
new Vue({
	el: "#container",
	data: {
		phone: "",
		orderId: "",
		tipMsg: "",
		activeColor: "",
		isrRsubmit: false,
		aboutInfo: null,
		resultCode: "",
		resultList: [],
		resultShow: false
	},
	methods: {
		clearTipMessage () {
			if (!this.tipMsg) return
			this.tipMsg = ''
		},
		// 提交邮箱
		subscribeUs: function () {
			var _this = this;
			if (_this.isrRsubmit)  return
			_this.isrRsubmit = true
			_this.resultShow = false
			
			if (!_this.orderId) {
				_this.tipMsg = "注文IDを入力してください。";
				_this.activeColor = "#da4f49";
				_this.isrRsubmit = false
				return
			}
			if (!_this.phone) {
				_this.tipMsg = "電話番号を入力してください。";
				_this.activeColor = "#da4f49";
				_this.isrRsubmit = false
				return
			}

			if (!_this.isOrder(_this.orderId)) {
				_this.tipMsg = "ご注文IDは正しく入力せれておりません。";
				_this.activeColor = "#da4f49";
				_this.isrRsubmit = false
				return
			}

			if (!_this.isPhone(_this.phone)) {
				_this.tipMsg = "お電話番号は正しく入力せれておりません。";
				_this.activeColor = "#da4f49";
				_this.isrRsubmit = false
				return
			}

			$.ajax({
				type: "GET",
				url: `https://www.tourboxtech.com/shop-api/model/app/shipment_record?order_number=${_this.orderId}&contact_phone=${_this.phone}`,
				success: function (res) {
					if (res.items.length) {
						var codeArr = []
						for (var i = 0; i < res.items.length; i++) {
							codeArr.push(res.items[i].code)
						}
						_this.resultCode = codeArr.join(",")
						_this.resultList = _this.resultCode.split(",")
						_this.tipMsg = "送信成功";
						_this.activeColor = "#5bb75b";
						_this.resultShow = true
					} else {
						_this.tipMsg = "注文ID、または電話番号が間違っております。ご確認の上、もう一度入力してください。";
						_this.activeColor = "#da4f49";
					}
					_this.isrRsubmit = false
				},
				error: function () {
					_this.tipMsg = "送信失敗";
					_this.activeColor = "#da4f49";
					_this.isrRsubmit = false
					_this.resultShow = false
				}
			})
		},
		isOrder: function (str) {
			var re = /^\d{7}$/;
			if (re.test(str) != true) {
				return false;
			} else {
				return true;
			}
		},
		isPhone: function (number) {
			var re = /^\d{1,11}$/;
			if (re.test(number) != true) {
				return false;
			} else {
				return true;
			}
		},

	}
})
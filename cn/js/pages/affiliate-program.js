new Vue({
	el: "#container",
	data: {
		isM: false,
		firstName: '',
		lastName: '',
		email: '',
		country: '',
		website: '',
		facebook: '',
		youtube: '',
		instagram: '',
		twitter: '',
		aboutYou: '',
		tipMsg: '',
		tipColor: '',
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getBannerData();
	},
	methods: {
		getBannerData: function () {
			var _this = this;
			$.getJSON("src/json/news.json", function (result) {
				_this.newsList = result.news;
			})
		},
		submitInformation: function () {
			var _this = this;
			_this.isDisabled = true
			if (!_this.firstName) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please input the first name'
				return
			}
			if (!_this.lastName) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please input the last name'
				return
			}
			if (!_this.email) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please input the email address'
				return
			}
			if (!_this.isEmail(_this.email)) {
				_this.tipMsg = 'Email address is incorrect'
				_this.tipColor = "#da4f49"
				_this.isDisabled = false
				return
			}
			if (!_this.country) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please input country'
				return
			}
			$.ajax({
				url: "https://www.tourboxtech.cn/shop-api/email",
				type: "post",
				dataType: "json",
				data: {
					"email": _this.email,
					"source": "en"
				},
				success: function () {
					_this.tipMsg = 'Submitted successfully'
					_this.tipColor = "#5bb75b"
					_this.email = ""
					_this.isDisabled = false
				},
				error: function () {
					_this.tipMsg = 'Submission Failed'
					_this.tipColor = "#da4f49"
					_this.email = ""
					_this.isDisabled = false
				}
			})
		},

		isEmail: function (str) {
			var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			if (re.test(str) != true) {
				return false;
			} else {
				return true;
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
		}
	}
})
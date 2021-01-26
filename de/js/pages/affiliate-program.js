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
		tipColor: ''
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getBannerData();
		// _this.getCatalog();
	},
	methods: {
		getBannerData: function () {
			var _this = this;
			$.getJSON("src/json/news.json", function (result) {
				_this.newsList = result.news;
			})
		},
		clearTipMessage () {
			if (!this.tipMsg) return
			this.tipMsg = ''
		},
		submitInformation: function () {
			var _this = this;
			_this.isDisabled = true
			if (!_this.firstName) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please enter your first name'
				return
			}
			if (!_this.lastName) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please enter your last name'
				return
			}
			if (!_this.email) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please enter your Email'
				return
			}
			if (!_this.isEmail(_this.email)) {
				_this.tipMsg = 'the input is not an email address'
				_this.tipColor = "#da4f49"
				_this.isDisabled = false
				return
			}
			if (!_this.country) {
				_this.isDisabled = false
				_this.tipColor = "#da4f49"
				_this.tipMsg = 'Please enter your Country'
				return
			}
			var str = `First Name: ${_this.firstName}</br> Last Name: ${_this.lastName} </br> Email: ${_this.email} </br> Country: ${_this.country}</br> Website: ${_this.website}</br> Facebook: ${_this.facebook}</br> YouTube: ${_this.youtube}</br> Instagram: ${_this.instagram}</br> Twitter: ${_this.twitter}</br> More: ${_this.aboutYou};`
			$.ajax({
				url: "https://www.tourboxtech.com/shop-api/affiliate",
				type: "post",
				dataType: "json",
				data: {
					"content": str
				},
				success: function () {
					_this.tipMsg = 'Submitted successfully'
					_this.tipColor = "#5bb75b"
					_this.firstName = ""
					_this.lastName = ""
					_this.email = ""
					_this.country = ""
					_this.isDisabled = false
				},
				error: function () {
					_this.tipMsg = 'Submission Failed'
					_this.tipColor = "#da4f49"
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
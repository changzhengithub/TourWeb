new Vue({
	el: "#container",
	data: {
		isM: false,
		orderEmail: '',
		firstName: '',
		lastName: '',
		orderCompany: '',
		orderAddress: '',
		orderApartment: '',
		postalCode: '',
		orderPhone: '',
		discountCode: '',
		orderEmailError: false,
		firstNameError: false,
		lastNameError: false,
		orderCompanyError: false,
		orderAddressError: false,
		orderApartmentError: false,
		postalCodeError: false,
		orderPhoneError: false,
		discountCodeError: false,
		orderEmailActive: false,
		firstNameActive: false,
		lastNameActive: false,
		orderCompanyActive: false,
		orderAddressActive: false,
		orderApartmentActive: false,
		postalCodeActive: false,
		orderPhoneActive: false,
		discountCodeActive: false,
		emailInputAutoFocus: false,
		firstNameInputAutoFocus: false,
		orderInputInfo: {},
		addressArr: [],
		cityArr: [],
		areaArr: [],
		countryName: '中国',
		stateName: '北京',
		cityName: '东城',
		countryIndex: 0,
		cityIndex: 0,
		areaIndex: 0,
		countryToggle: false,
		cityToggle: false,
		areaToggle: false,
		cityIsSelect: false,
		areaIsSelect: false,
		commodityList: [],
		totalAmount: ''
	},
	watch: {
		orderEmail: function () {
			var _this = this;
			_this.orderEmailError = false;
			_this.orderEmailActive = true;
		},
		firstName: function () {
			var _this = this;
			_this.firstNameError = false;
			_this.firstNameActive = true;
		},
		lastName: function () {
			var _this = this;
			_this.lastNameError = false;
			_this.lastNameActive = true;
		},
		orderAddress: function () {
			var _this = this;
			_this.orderAddressError = false;
			_this.orderAddressActive = true;
		},
		postalCode: function () {
			var _this = this;
			_this.postalCodeError = false;
			_this.postalCodeActive = true;
		},
		orderPhone: function () {
			var _this = this;
			_this.orderPhoneError = false;
			_this.orderPhoneActive = true;
		}
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getAddress();
		_this.getCommodityCache('tourboxCartList_enUser');
		_this.getOrderCache('tourboxOrderInfo_enUser');
		_this.listenRoute();
	},
	mounted: function () {},
	methods: {
		getAddress: function () {
			var _this = this;
			$.getJSON("src/json/select.json", function (result) {
				_this.addressArr = result;
				_this.cityArr = _this.addressArr[0].stateArr;
				_this.areaArr = _this.cityArr[0].cityArr;
			})
		},
		// 获取购物车缓存
		getCommodityCache: function (name) {
			var _this = this;
			try {
				var cartValue = window.localStorage.getItem(name);
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
					var orderInfo = JSON.parse(orderValue);
					_this.orderEmail = orderInfo.orderEmail;
					_this.firstName = orderInfo.firstName;
					_this.lastName = orderInfo.lastName;
					_this.orderCompany = orderInfo.orderCompany;
					_this.orderAddress = orderInfo.orderAddress;
					_this.orderApartment = orderInfo.orderApartment;
					_this.postalCode = orderInfo.postalCode;
					_this.orderPhone = orderInfo.orderPhone;
					_this.countryName = orderInfo.countryName;
					_this.stateName = orderInfo.stateName;
					_this.cityName = orderInfo.cityName;
					_this.orderEmailActive = false;
					_this.firstNameActive = false;
					_this.lastNameActive = false;
					_this.orderAddressActive = false;
					_this.orderPhoneActive = false;
				}
			} catch (error) {
				alert(error)
			}
		},
		confirmOrder: function () {
			var _this = this;
			if (!_this.orderEmail || !_this.isEmail(_this.orderEmail)) {
				_this.orderEmailError = true;
			}
			if (!_this.firstName) {
				_this.firstNameError = true;
			}
			if (!_this.lastName) {
				_this.lastNameError = true;
			}
			if (!_this.orderAddress) {
				_this.orderAddressError = true;
			}
			// if (!_this.postalCode) {
			// 	_this.postalCodeError = true;
			// }
			if (_this.cityArr.length != 0 && !_this.stateName) {
				_this.cityIsSelect = true;
			}
			if (_this.areaArr.length != 0 && !_this.cityName) {
				_this.areaIsSelect = true;
			}
			if (!_this.checkPhone(_this.orderPhone)) {
				_this.orderPhoneError = true;
			}
			if (_this.orderEmailError || _this.firstNameError || _this.lastNameError || _this.orderAddressError || _this.cityIsSelect || _this.areaIsSelect || _this.orderPhoneError) {
				return
			}
			_this.orderInputInfo = {
				orderEmail: _this.orderEmail,
				firstName: _this.firstName,
				lastName: _this.lastName,
				orderCompany: _this.orderCompany,
				orderAddress: _this.orderAddress,
				orderApartment: _this.orderApartment,
				postalCode: _this.postalCode,
				orderPhone: _this.orderPhone,
				countryName: _this.countryName,
				stateName: _this.stateName,
				cityName: _this.cityName,
			}
			_this.setStorage('tourboxOrderInfo_enUser', _this.orderInputInfo);
			window.location.href = 'shop-payment.html';
		},
		// 设置缓存
		setStorage: function (name, value) {
			try {
				window.localStorage.setItem(name, JSON.stringify(value))
			} catch (error) {
				alert(error)
			}
		},
		toggleCountry: function () {
			var _this = this;
			_this.countryToggle = !_this.countryToggle;
			_this.cityToggle = false
			_this.areaToggle = false
		},
		toggleCity: function () {
			var _this = this;
			_this.cityToggle = !_this.cityToggle;
			_this.countryToggle = false
			_this.areaToggle = false
		},
		toggleArea: function () {
			var _this = this;
			_this.areaToggle = !_this.areaToggle;
			_this.countryToggle = false
			_this.cityToggle = false
		},
		selectCountry: function (country, index) {
			var _this = this;
			_this.countryName = country.countryName;
			_this.countryIndex = index;
			_this.cityIndex = null;
			_this.areaIndex = null;
			_this.areaArr = [];
			_this.stateName = ''
			_this.cityName = '';
			_this.cityIsSelect = false;
			_this.areaIsSelect = false;
			_this.cityArr = country.stateArr;
			if (!country.stateArr.length) {
				_this.stateName = ''
				_this.cityArr = [];
			}
		},
		selectCity: function (city, index) {
			var _this = this;
			_this.stateName = city.stateName;
			_this.cityIndex = index;
			_this.areaIndex = null;
			_this.cityIsSelect = false;
			_this.areaIsSelect = false;
			if (city.cityArr) {
				_this.cityName = ''
				_this.areaArr = city.cityArr;
			}
		},
		selectArea: function (area, index) {
			var _this = this;
			_this.cityName = area.cityName;
			_this.areaIndex = index;
			_this.areaIsSelect = false;
		},
		emailFocus: function () {
			var _this = this;
			if (_this.orderEmailError) return
			_this.orderEmailActive = true;
		},
		emailBlur: function () {
			var _this = this;
			if (_this.orderEmailError) return
			_this.orderEmailActive = false;
		},
		firstNameFocus: function () {
			var _this = this;
			if (_this.firstNameError) return
			_this.firstNameActive = true;
		},
		firstNameBlur: function () {
			var _this = this;
			if (_this.firstNameError) return
			_this.firstNameActive = false;
		},
		lastNameFocus: function () {
			var _this = this;
			if (_this.lastNameError) return
			_this.lastNameActive = true;
		},
		lastNameBlur: function () {
			var _this = this;
			if (_this.lastNameError) return
			_this.lastNameActive = false;
		},
		companyFocus: function () {
			var _this = this;
			_this.orderCompanyActive = true;
		},
		companyBlur: function () {
			var _this = this;
			_this.orderCompanyActive = false;
		},
		addressFocus: function () {
			var _this = this;
			if (_this.orderAddressError) return
			_this.orderAddressActive = true;
		},
		addressBlur: function () {
			var _this = this;
			if (_this.orderAddressError) return
			_this.orderAddressActive = false;
		},
		apartmentFocus: function () {
			var _this = this;
			_this.orderApartmentActive = true;
		},
		apartmentBlur: function () {
			var _this = this;
			_this.orderApartmentActive = false;
		},
		postalCodeFocus: function () {
			var _this = this;
			// if (_this.postalCodeError) return
			_this.postalCodeActive = true;
		},
		postalCodeBlur: function () {
			var _this = this;
			// if (_this.postalCodeError) return
			_this.postalCodeActive = false;
		},
		phoneFocus: function () {
			var _this = this;
			if (_this.orderPhoneError) return
			_this.orderPhoneActive = true;
		},
		phoneBlur: function () {
			var _this = this;
			if (_this.orderPhoneError) return
			_this.orderPhoneActive = false;
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
		// 监听路由来源
		listenRoute: function () {
			var _this = this;
			if (document.referrer.indexOf('shop-payment.html') != -1) {
				try {
					var changeInfo = window.sessionStorage.getItem('tourboxChangeInfo_enUser');
					if (changeInfo === 'order_email') _this.emailInputAutoFocus = true;
					if (changeInfo === 'order_firstName') _this.firstNameInputAutoFocus = true;
				} catch (error) {
					alert(error)
				}
			}
		},
		checkPhone: function (phone) {
			phone = phone ? phone.replace(/\s+/g, '') : phone
			if (!phone || phone.length < 11) {
				return false
			} else {
				var reg = new RegExp('^(?:13|14|15|16|17|18|19)[0-9]{9}$', 'i')
				if (!reg.test(phone)) {
					return false
				}
				return true
			}
		},
		isEmail: function (str) {
			var re = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
			if (re.test(str) != true) {
				return false;
			} else {
				return true;
			}
		},
	}
})
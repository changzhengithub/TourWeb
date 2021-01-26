new Vue({
	el: "#container",
	data: {
		isM: false,
		presetData: {},
		presetNav: [],
		presetSubnav: [],
		navActiveIndex: undefined,
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getData();
	},
	methods: {
		getData: function () {
			var _this = this;
			$.getJSON("src/json/preset-test.json", function (result) {
				_this.presetData = result;
				_this.presetNav = result.presetNav;
				_this.selectNav(0);
			})
		},
		// 选择导航栏
		selectNav: function (index) {
			var _this = this
			if (_this.navActiveIndex === index) return
			_this.presetSubnav = []
			_this.navActiveIndex = index
			for (var i = 0; i < _this.presetData.presetSubnav.length; i++) {
				if (_this.presetData.presetSubnav[i].status === index) {
					_this.presetSubnav.push(_this.presetData.presetSubnav[i])
				}
			}
		},
		// 选择子导航
		selectSubnav: function (index) {
			window.location.href = "presets-detail.html?sub_id=" + index
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
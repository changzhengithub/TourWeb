new Vue({
	el: "#container",
	data: {
		isM: false,
		presetList: [],
		presetSubnav: {},
		currentPreset: {},
		subId: undefined,
		subToastShow: false,
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getUrlParams();
	},
	methods: {
		getUrlParams:function() {
			var _this = this;
			var id = 'sub_id';
			var url = window.location.href;
			if (url.indexOf('?') == -1 || url.indexOf(id) == -1) {
				window.location.href='presets.html'
				return
			}
			var arr1=url.split("?");
			var arr2=arr1[1].split("&");
			var obj={};
			for(var i=0;i<arr2.length;i++){
				var arr3=arr2[i].split("=");
				obj[arr3[0]]=arr3[1];
			}
			_this.subId = obj[id];
			_this.getData();
		},
		getData: function () {
			var _this = this;
			$.getJSON("src/json/preset-test.json", function (result) {
				if (_this.subId < 0 || _this.subId > result.presetSubnav.length - 1) {
					window.location.href='presets.html'
					return
				}
				for (var i = 0; i < result.presetSubnav.length; i++) {
					if (result.presetSubnav[i].subnavIndex == _this.subId) {
						_this.presetSubnav = result.presetSubnav[i]
					}
				}
				for (var i = 0; i < result.presetList.length; i++) {
					if (result.presetList[i].status == _this.subId) {
						_this.presetList.push(result.presetList[i])
					}
				}
			})
		},
		openSubToast: function(index) {
			var _this = this;
			_this.subToastShow = true
			_this.currentPreset = _this.presetList[index]
			console.log(_this.currentPreset)
			$('body').css({
				overflow: 'hidden'
			})
		},
		closeSubToast: function() {
			var _this = this;
			_this.subToastShow = false
			_this.fifthToastIconShow = false
			$('body').css({
				overflow: 'auto'
			})
		},
		mouseEnter: function (dom) {
			$(dom).stop().slideDown('fast');
		},
		mouseLeave: function (dom) {
			$(dom).stop().slideUp('fast');
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
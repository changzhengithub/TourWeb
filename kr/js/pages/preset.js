new Vue({
	el: "#container",
	data: {
		isM: false,
		presetData: {},
		presetNav: [],
		presetSubnav: [],
		presetList: [],
		presetLan: [],
		resultList: [],
		presetSource: [],
		navActiveIndex: 0,
		subnavActiveIndex: null,
		subnavIndex: null,
		languageIndex: 0,
		sourceIndex: 0,
		languageText: '언어로 검색',
		sourceText: '소스로 검색',
		isSelectSubnav: false
	},
	created: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getData();
	},
	methods: {
		getData: function () {
			var _this = this;
			$.getJSON("src/json/preset.json", function (result) {
				_this.presetData = result;
				_this.presetNav = result.presetNav;
				_this.presetLan = result.presetLan;
				_this.presetList = result.presetList;
				_this.presetSource = result.presetSource;
				_this.getSubNavData(_this.navActiveIndex)
			})
		},
		// 选择导航栏
		selectNav: function (index) {
			var _this = this
			_this.navActiveIndex = index
			_this.subnavActiveIndex = null
			_this.isSelectSubnav = false
			_this.getSubNavData(_this.navActiveIndex)
		},
		// 选择子导航
		selectSubnav: function (index, activeIndex) {
			var _this = this;
			_this.isSelectSubnav = true
			_this.subnavIndex = index;
			_this.subnavActiveIndex = activeIndex;
			_this.resultList = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
			// _this.resultList = []
			// var result = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
			// if (result.subnavPresetList.length) _this.resultList[0] = result
		},
		// 语言选择
		selectLanguage: function (index) {
			var _this = this
			_this.languageIndex = index
			_this.languageText = _this.presetLan[index].language
			// 根据是否选择子导航筛选预设列表
			if (_this.isSelectSubnav) {
				_this.resultList = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
				// _this.resultList = []
				// var result = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
				// if (result.subnavPresetList.length) _this.resultList[0] = result
			} else {
				_this.getSubNavData(_this.navActiveIndex)
			}
		},
		// 来源选择
		selectSource: function (index) {
			var _this = this
			_this.sourceIndex = index
			_this.sourceText = _this.presetSource[index].source
			// 根据是否选择子导航筛选预设列表
			if (_this.isSelectSubnav) {
				_this.resultList = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
				// _this.resultList = []
				// var result = _this.getPresetList(_this.subnavIndex, _this.languageIndex, _this.sourceIndex)
				// if (result.subnavPresetList.length) _this.resultList[0] = result
			} else {
				_this.getSubNavData(_this.navActiveIndex)
			}
		},
		// 获取子导航和对应的所有预设列表
		getSubNavData: function (index) {
			var _this = this
			_this.presetSubnav = []
			// 获取对应的子导航
			if (index === 0) {
				_this.subnavIndex = -1
				_this.presetSubnav = _this.presetData.presetSubnav
			} else {
				for (var i = 0; i < _this.presetData.presetSubnav.length; i++) {
					if (_this.presetData.presetSubnav[i].status === index) {
						_this.presetSubnav.push(_this.presetData.presetSubnav[i])
					}
				}
			}
			_this.resultList = _this.getSubnavPresetList(_this.presetSubnav)
		},
		// 根据主导航筛选当前语言下子导航包含的全部预设列表
		getSubnavPresetList: function (subnavList) {
			var _this = this;
			var allSubnavPresetList = []
			for (var i = 0; i < subnavList.length; i++) {
				allSubnavPresetList.push.apply(allSubnavPresetList, _this.getPresetList(subnavList[i].subnavIndex, _this.languageIndex, _this.sourceIndex));
				// var allSubnavPreset = _this.getPresetList(subnavList[i].subnavIndex, _this.languageIndex, _this.sourceIndex)
				// if (allSubnavPreset.subnavPresetList.length) allSubnavPresetList.push(allSubnavPreset)
			}
			return allSubnavPresetList
		},

		// 根据当前子导航、语言和来源筛选预设列表
		getPresetList: function (subnavIndex, languageIndex, sourceIndex) {
			var _this = this
			var currentList = []
			var selectList = []
			// var subnavJson = {}
			// 获取当前子导航对应的预设列表
			for (var i = 0; i < _this.presetList.length; i++) {
				if (_this.presetList[i].status === subnavIndex) {
					currentList.push(_this.presetList[i])
				}
			}
			// 根据当前语言和来源筛选预设列表
			if (sourceIndex === 0 && languageIndex === 0) selectList = currentList
			if (sourceIndex !== 0 && languageIndex !== 0) {
				for (var i = 0; i < currentList.length; i++) {
					for(var j=0; j<currentList[i].languageStatus.length;j++) {
						if (currentList[i].sourceStatus === sourceIndex && currentList[i].languageStatus[j] === languageIndex) {
							selectList.push(currentList[i])
						}
					}
				}
			}
			if (sourceIndex === 0 && languageIndex !== 0) {
				for (var i = 0; i < currentList.length; i++) {
					for(var j=0; j<currentList[i].languageStatus.length;j++) {
						if (currentList[i].languageStatus[j] === languageIndex) {
							selectList.push(currentList[i])
						}
					}
				}
			}
			if (sourceIndex !== 0 && languageIndex === 0) {
				for (var i = 0; i < currentList.length; i++) {
					if (currentList[i].sourceStatus === sourceIndex) {
						selectList.push(currentList[i])
					}
				}
			}
			// subnavJson.title = _this.presetData.presetSubnav[subnavIndex].title
			// subnavJson.subnavPresetList = selectList
			return selectList
		},
		// 处理时间戳
		getFormatDate: function(timestamp) {
			// timestamp = parseInt(timestamp + '000');
			var newDate = new Date(timestamp);
			Date.prototype.format = function (format) {
				var date = {
					'M+': this.getMonth() + 1,
					'd+': this.getDate(),
					'h+': this.getHours(),
					'm+': this.getMinutes(),
					's+': this.getSeconds(),
					'q+': Math.floor((this.getMonth() + 3) / 3),
					'S+': this.getMilliseconds()
				};
				if (/(y+)/i.test(format)) {
					format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
				}
				for (var k in date) {
					if (new RegExp('(' + k + ')').test(format)) {
						format = format.replace(RegExp.$1, RegExp.$1.length == 1 ?
							date[k] : ('00' + date[k]).substr(('' + date[k]).length));
					}
				}
				return format;
			}
			return newDate.format('yyyy.MM.dd');
		},
		mouseEnter: function (dom) {
			$(dom).stop().slideDown('fast');
		},
		mouseLeave: function (dom) {
			$(dom).stop().slideUp('fast');
		},
		downloadPreset: function (url) {
			var presetName = url.slice(11);
			// 判断是否是IE、Edge浏览器，IE、Edge使用FileSaver.js下载，其他使用a标签下载
			if(window.navigator.msSaveBlob) {
				saveAs(url, presetName); // 使用FileSaver.js下载
			} else {
				// 谷歌浏览器 创建a标签 添加download属性下载
				var a = document.createElement('a');
				a.href = url;
				document.body.appendChild(a);
				a.download = presetName; // Edge必须加上下载文件的文件名
				a.click(); // 点击下载
				document.body.removeChild(a) // 下载完成移除a元素
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
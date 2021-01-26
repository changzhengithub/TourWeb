new Vue({
	el: "#index",
	data: {
		isM: false,
		openMenuShow: false,
		openLanguageShow: false,
		navList: [],
	},
	created: function() {
		var that = this;
		that.judgeIsMobile()
		that.getNavList();
	},
	methods: {
		getNavList: function () {
			var that = this;
			$.getJSON("src/json/bars.json", function (result) {
				that.navList = that.isM ? result.mobileList : result.deskList;
			})
		},
		openMenu: function(){
			var that = this;
			that.openMenuShow = !that.openMenuShow;
			that.openLanguageShow = false;
			$(".header-mobile .nav-list").slideToggle("fast");
		},
		openLanguage: function(){
			var that = this;
			that.openLanguageShow = !that.openLanguageShow;
			that.openMenuShow = false;
			$(".header-mobile .language-select").slideToggle("fast");
		},
		checkLanguage: function (lan) {
			// var localUrl = window.location.href;
			// if (localUrl.indexOf('cn/') == -1) return
			// var arr1 = localUrl.split('cn/');
			// if (arr1[1]) {
			// 	window.location.href = arr1[0] + lan + '/' + arr1[1];
			// } else {
			// 	window.location.href = arr1[0] + lan;
			// }
			window.location.href = '//www.tourboxtech.com/' + lan + window.location.pathname;
		},
		judgeIsMobile: function () {
			var that = this;
			if (window.innerWidth < 768) {
				that.isM = true;
			} else {
				that.isM = false;
			}
			window.addEventListener('resize', function (e) {
				if (window.innerWidth < 768) {
					that.isM = true;
				} else {
					that.isM = false;
				}
			})
		},
		

	}
})
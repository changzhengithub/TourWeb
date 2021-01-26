new Vue({
	el: "#index",
	data: {
		isM: false,
		openMenuShow: false,
		openLanguageShow: false,
		openBuyNowShow: false,
		navList: [],
	},
	created: function() {
		var that = this;
		that.judgeIsMobile()
		that.getNavList();
		that.listenerScroll();
	},
	mounted: function () {
		var that = this;
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

		openBuyNow: function(){
			var that = this;
			if(!that.isM) return
			that.openBuyNowShow = !that.openBuyNowShow;
			$(".header-buy .buy-list").toggleClass('list-active', that.openBuyNowShow)
		},
		checkLanguage: function (lan) {
			var _this = this;
			var localUrl = window.location.href;
			if (localUrl.indexOf('en/') == -1) return
			var arr1 = localUrl.split('en/');
			if (arr1[1]) {
				window.location.href = arr1[0] + lan + '/' + arr1[1];
			} else {
				window.location.href = arr1[0] + lan;
			}
		},
		listenerScroll: function() {
			var headerH = $('.header').innerHeight();
			window.addEventListener('scroll', function() {
				var scrollH = $('html').scrollTop();
				if (window.flag) {
					$('header .header-buy').toggleClass('buy-active', scrollH > headerH);
				}
			})
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
new Vue({
	el: "#container",
	data: {
		isM: false,
		bannerInfo: {},
	},
	mounted: function () {
		var _this = this;
		_this.judgeIsMobile();
		_this.getData();
		_this.navScroll();
	},
	methods: {

		getData: function () {
			var _this = this;
			$.getJSON("src/json/index-banner.json", function (result) {
				_this.bannerInfo = result.banner1;
			})
		},
		navScroll: function () {
			var aLi = $('.list-sub');
			var headerH = $('#container').offset().top
			//滚动条事件
			$(window).scroll(function () {
				//获取页面被卷曲高度
				var oTop = $(document).scrollTop();
				if (oTop >= $(".nav-third").offset().top - 100) {
					aLi.eq(1).addClass("current").siblings().removeClass("current");
				} else {
					aLi.eq(0).addClass("current").siblings().removeClass("current");
				}
			}).trigger("scroll");

			aLi.click(function () {
				var index = $(this).index();
				$("html,body").animate({
					scrollTop: $(".content-item").eq(index).offset().top - headerH
				}, 400)
			});
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
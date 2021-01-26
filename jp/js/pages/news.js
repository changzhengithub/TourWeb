new Vue({
	el: "#container",
	data: {
		news: [],
		isM: false,
		isJapan: false,
		bannerBg: ''
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
				_this.news = result.news;
			})
		},
		// 获取新闻列表
		getCatalog: function () {
			var _this = this;
			$.ajax({
				type: "GET",
				url: "/shop-api/model/cms/article?catalog=news",
				dataType: "json",
				success: function (res) {
					_this.newsList = res.items;
				},
				error: function (err) {
					console.log(err)
				}
			})
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
new Vue({
	el: "#container",
	data: {
		isM: false,
		isJapan: false,
		bannerBg: '',
		email: "444555255@qq.com",
		blogList: []
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
			$.getJSON("src/json/blog.json", function (result) {
				_this.blogList = result.blogList;
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
					_this.blogList = res.items;
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
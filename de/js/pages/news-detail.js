new Vue({
	el:"#container",
	data:{
		newsDetail: {},
		isM: false,
		isJapan: false,
		bannerBg: '',
		newsId: null,
		blogDetail: ""
	},
	created:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getUrlParams();
		// _this.getCatalog();
	},
	methods:{
		getUrlParams:function() {
			var _this = this;
			var id = 'news_id';
			var url = window.location.href;
			if (url.indexOf('?') == -1 || url.indexOf(id) == -1) return
			var arr1=url.split("?");
			var arr2=arr1[1].split("&");
			var obj={};
			for(var i=0;i<arr2.length;i++){
				var arr3=arr2[i].split("=");
				obj[arr3[0]]=arr3[1];
			}
			_this.newsId = obj[id];
			_this.getPageData();
		},
		getPageData: function() {
			var _this = this;
			$.getJSON("src/json/news-detail.json", function(result) {
				_this.blogDetail = result[_this.newsId];
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
					_this.blogDetail = res.items[_this.newsId].content;
				},
				error: function (err) {
					console.log(err)
				}
			})
		},
		judgeIsMobile:function(){
			var _this = this;
			if(window.innerWidth<768){
				_this.isM = true;
			}else{
				_this.isM = false;
			}
			window.addEventListener('resize',function(e){
				if(window.innerWidth<768){
					_this.isM = true;
				}else{
					_this.isM = false;
				}
			})
		}
	}
})
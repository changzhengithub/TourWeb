new Vue({
	el:"#container",
	data:{
		newsDetail: {},
		isM: false,
		isJapan: false,
		bannerBg: '',
		newsId: null
	},
	created:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getUrlParams();
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
				_this.newsDetail = result[_this.newsId];
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
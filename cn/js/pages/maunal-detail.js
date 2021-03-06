new Vue({
	el:"#container",
	data:{
		show:false,
		isM:false,
		text: true,
		pageData: [],
		rightPageData: {},
		navIndex: 0,
		listIndex: 0,
		titleText: '',
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getUrlParams();
	},
	methods:{
		getUrlParams:function() {
			var _this = this;
			var navIndex = 'nav';
			var listIndex = 'index';
			var url = window.location.href;
			if (url.indexOf('?') == -1 || url.indexOf(navIndex) == -1 || url.indexOf(listIndex) == -1) {
				window.location.href = 'manual.html'
				return
			}
			var arr1=url.split("?");
			var arr2=arr1[1].split("&");
			var obj={};
			for(var i=0;i<arr2.length;i++){
				var arr3=arr2[i].split("=");
				obj[arr3[0]]=arr3[1];
			}
			_this.navIndex = obj[navIndex];
			_this.listIndex = obj[listIndex];
			_this.getPageData();
		},
		getPageData:function() {
			var _this = this;
			$.getJSON('src/json/maunal.json',function(res){
				_this.pageData = res;
				_this.rightPageData = _this.pageData.pageList[_this.navIndex][_this.listIndex]
				if (_this.navIndex == 2) {
					_this.titleText = _this.pageData.pageList[_this.navIndex][_this.listIndex].titleFirst
				} else {
					_this.titleText = _this.pageData.navList[_this.navIndex].slideList[_this.listIndex].title
				}
			})
		},

		iframeLoad: function(index) {
			var _this = this;
			_this.rightPageData[index].videoError = false;
		},
		backNav:function() {
			var _this = this;
			window.location.href = 'manual.html?id='+_this.navIndex
		},
		prveItem:function() {
			var _this = this;
			if(_this.navIndex == 0 && _this.listIndex == 0) return
			_this.listIndex--;
			if(_this.listIndex < 0) {
				_this.navIndex--;
				_this.listIndex = _this.pageData.pageList[_this.navIndex].length - 1;
			}
			window.location.href = 'maunal-detail.html?nav='+_this.navIndex+'&index='+_this.listIndex;
		},
		nextItem:function() {
			var _this = this;
			if(_this.navIndex == 4 && _this.listIndex == 2) return
			_this.listIndex++;
			if(_this.listIndex > _this.pageData.pageList[_this.navIndex].length - 1) {
				_this.navIndex++;
				_this.listIndex = 0;
			}
			window.location.href = 'maunal-detail.html?nav='+_this.navIndex+'&index='+_this.listIndex;
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
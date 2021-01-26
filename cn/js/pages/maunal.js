new Vue({
	el:"#container",
	data:{
		show:false,
		isM:false,
		text: true,
		pageData:[],
		rightPageData: {},
		navIndex: null,
		listIndex: null,
		isPlayVideo: false,
		mainVideoLoad: false,
		palyVideoError: false,
		showVideo: true,
		player: null,
		mobileShow: false
	},
	created:function() {
		var _this = this;
		_this.judgeIsMobile();
		_this.getPageData();
	},
	methods:{
		getPageData:function() {
			var _this = this;
			$.getJSON('src/json/maunal.json',function(res){
				_this.pageData = res;
				_this.rightPageData = _this.pageData.pageList[0][0]
				if (!_this.isM) {
					_this.pageData.navList[0].slideList[0].activeShow = true
					_this.pageData.navList[0].show = true
				}
				if(_this.isM) {
					_this.getUrlParams();
					$('.banner2').css({
						'min-height': ($(document).innerHeight() - $('.banner1').innerHeight() - $('.footer').innerHeight()) + 'px'
					})
				}
			})
		},
		getUrlParams:function() {
			var _this = this;
			var navIndex = 'id';
			var url = window.location.href;
			if (url.indexOf('?') == -1 || url.indexOf(navIndex) == -1) return
			var arr1=url.split("?");
			var arr2=arr1[1].split("&");
			var obj={};
			for(var i=0;i<arr2.length;i++){
				var arr3=arr2[i].split("=");
				obj[arr3[0]]=arr3[1];
			}
			if(obj[navIndex] >= 5 || obj[navIndex] < 0 ) return
			for(var i = 0; i<	_this.pageData.navList.length; i++) {
				_this.pageData.navList[i].show = false
			}
			_this.pageData.navList[obj[navIndex]].show = true
		},
		openMore:function(index) {
			var _this=this;
			if (index === 2) {
				_this.loadRight(2, 0)
				return
			}
			if (_this.pageData.navList[index].slideList) {
				for(var i = 0; i<	_this.pageData.navList.length; i++) {
					if (i != index) {
						_this.pageData.navList[i].show = false
					}
				}
				_this.pageData.navList[index].show = !_this.pageData.navList[index].show
			}
		},
		// 加载右边内容
		loadRight:function(navIndex, index) {
			var _this=this;
			if(_this.navIndex == navIndex && _this.listIndex == index) return
			_this.navIndex = navIndex;
			_this.listIndex = index;
			if(_this.isM) {
				window.location.href = 'maunal-detail.html?nav='+_this.navIndex+'&index='+_this.listIndex
			}
			var scrollT = $(document).scrollTop();
			var banner1H = $('.banner1').outerHeight();
			if (scrollT > banner1H) {
				$('body,html').animate({scrollTop:banner1H},200);
			}
			setTimeout(function(){
				_this.rightPageData = _this.pageData.pageList[_this.navIndex][_this.listIndex];
			},200)
			for (var x = 0; x <  _this.pageData.navList.length; x++) {
				for (var i = 0; i < _this.pageData.navList[x].slideList.length; i++) {
					_this.pageData.navList[x].slideList[i].activeShow = i == _this.listIndex && x == _this.navIndex ? true : false;
					_this.pageData.pageList[x][i].videoError = true;
				}
			}
		},
		iframeLoad: function(index) {
			var _this = this;
			_this.rightPageData[index].videoError = false;
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
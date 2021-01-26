new Vue({
	el:"#container",
	data:{
		detailData: {},
		banner: {},
		isM:false,
		isJapan: false,
		videoLoad: false
	},
	mounted:function(){
		var _this = this;
		_this.getData();
		_this.judgeIsMobile();
		_this.listenerScroll();
		_this.$nextTick(function() {
			_this.computeMask();
		})
	},
	methods:{
		getData: function() {
			var _this = this;
			$.getJSON("src/json/intro.json", function(result) {
				_this.detailData = result;
				_this.banner = result.banner
				_this.addAnimation(document.querySelectorAll(".tourbox-animation-original"));
			})
		},
		computeMask:function() {
			var _this=this;
			$('.mask').css({
				height: $('.content').height()-$('.banner-bg').height() + 'px'
			})
		},
		// 监听滚动条
		listenerScroll:function () {
			var _this=this;
			if(_this.isM) return
			var banenrH = $('.banner').height();
			window.addEventListener('scroll',function(){
				if(!_this.isM) {
					var scrollT = $('html').scrollTop();
						if (scrollT > banenrH*0.3) {
							$('.mask').hide();
							$('.content').css({
								position: 'absolute',
								top: banenrH*0.3+'px',
								left: '0'
							})
						} else {
							$('.mask').show();
							$('.content').css({
								position: 'fixed',
								top: '0',
								left: '0'
							})
					}
				}
			})
		},
		touchStart: function(e) {
			console.log(e.changedTouches[0].pageX)
			console.log(e.changedTouches[0].pageY)
		},
		touchMove: function(e) {
			var _this=this;
			var banenrH = $('.banner').height();
			var scrollT = $('html').scrollTop();
			if(_this.isM) {
				if (scrollT > banenrH*0.2) {
					$('.mask').hide();
					$('.content').css({
						position: 'absolute',
						top: banenrH*0.2+'px',
						left: '0'
					})
				} else {
					$('.mask').show();
					$('.content').css({
						position: 'fixed',
						top: '0',
						left: '0'
					})
				}
			}
			console.log(e.changedTouches[0].pageX)
			console.log(e.changedTouches[0].pageY)
		},
		touchEnd: function(e) {
			console.log(e)
		},
		iframeLoad:function() {
			var _this=this;
			_this.videoLoad = true
		},
		addAnimation:function(objects){
			scrollSpy(objects,{
				scrollEle:window,
				beforeEnter:function(e,el){
					$(el).removeClass('tourbox-animation');
				},
				afterLeave:function(e,el){
					$(el).addClass('tourbox-animation');
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
		},
	}
})
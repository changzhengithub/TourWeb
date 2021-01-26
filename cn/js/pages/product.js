new Vue({
	el: "#index",
	data: {
		isM: false,
		isAndroid: false,
		isIOS: false,
		isWeixin: false,
		openMenuShow: false,
		openLanguageShow: false,
		navList: [],
		mySwiper: null,
		navActiveIndex: 1,
		playerShow: false,
		ytVideoId: '',
		subToastShow: false,
		fifthToastIconShow: false,
		subTitle: '',
		subText: '',
		toastVideoList: [
			{
				className: 'item-first',
				itemText: '笔刷控制',
				subTitle: '笔刷控制 高效准确',
				subText: '您可以通过旋钮去轻松控制<span>笔刷的大小，流量，不透明度和硬度</span>，不用中断您的工作流程，聚焦创作。',
				videoUrl: '//r.tourboxtech.cn/src/videos/product-second-more-01-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: '参数控制',
				subTitle: '参数控制 强大多样',
				subText: '不论是<span>滑条控制、数值控制、逐帧步进还是快速检索</span>等操作，TourBox的一个转盘可以精确控制所有参数，告别鼠标拖拽。',
				videoUrl: '//r.tourboxtech.cn/src/videos/product-second-more-02-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: '视频与音频剪辑',
				subTitle: '视频与音频剪辑',
				subText: '<span>转盘、旋钮和滚轮</span>，配合形态丰富的按键，更加直觉、高效的完成视频和音频的后期。',
				videoUrl: '//r.tourboxtech.cn/src/videos/product-second-more-03-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: '画面控制',
				subTitle: '导航类操作 流畅无缝',
				subText: '不论是<span>滚轮，还是旋钮亦或转盘，在缩放画面、旋转画布、时间线缩放</span>等一系列的导航类操作中，都以更加直觉化的方式去操控软件，更加高效、准确。并可以配合<span>TourBox侧键、长键、短键</span>等其他按键实现更加高阶的功能。',
				videoUrl: '//r.tourboxtech.cn/src/videos/product-second-more-04-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: '工具切换',
				subTitle: '工具切换 快捷方便',
				subText: '十字键可以实现多组工具的<span>准确、快速的切换</span>，并可以通过HUD功能去实时查看。',
				videoUrl: '//r.tourboxtech.cn/src/videos/product-second-more-05-2.0.2.mp4',
				posterUrl: ''
			}
		]
	},
	created: function () {
		var that = this;
		that.judgeIsMobile();
		that.judgeClient();
		that.getNavList();
	},
	mounted: function () {
		var that = this;
		that.$nextTick(function () {
			that.listenerMobileVideo();
			that.initSwiper();
		})
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


		// 加载头部swiper轮播图
		initSwiper: function () {
			var that = this;
			setTimeout(function() {
				that.mySwiper = new Swiper('.swiper-container', {
					autoplay: {
						delay: 2500,
						disableOnInteraction: true,
					},
					loop : that.isM,
					effect : that.isM ? 'bullets' : 'fade',
					fadeEffect: {
						crossFade: true,
					},
					noSwiping : true,
					pagination: {
						el: '.swiper-pagination',
						clickable: true,
						renderBullet: function (index, className) {
							if (that.isM) {
								return '<span class="' + className + '"></span>'
							} else {
								return '<span class="' + className + '">' + (index + 1) + '</span>';
							}
						},
					},
					observer: true,
					observeParents: true,
				});
			}, 1000)
		},

		openFixedVideo: function(url) {
			var that = this;
			$('body').css({
				overflow: 'hidden'
			});
			$('.main-player').show();
			that.loadIframeVideo(url)
			// that.loadVideo(url);
		},

		loadIframeVideo: function(url) {
			var iframeNode = document.createElement('iframe');
			iframeNode.width = '100%'
			iframeNode.height = '100%'
			iframeNode.src = url
			// iframeNode.src = 'https://www.youtube.com/embed/'+url+'?enablejsapi=1&autoplay=1&loop=1&playlist='+url
			$('.video-container').empty();
			$('.video-container').append(iframeNode);
		},

		loadVideo(url) {
			// var video = document.getElementById('float-video');
			var video = document.createElement('video');
			video.poster = '';
			video.src = url;
			video.autoplay = true;
			video.loop = true;
			video.muted = true;
			$('.video-container').empty();
			$('.video-container').append(video);
		},

		closePlayer: function() {
			$('.main-player').hide();
			$('.video-container').empty();
			$('body').css({
				overflow: 'auto'
			})
		},
		playCardVideo: function() {
			$(event.currentTarget).parent().hide().next()[0].play();
			$(event.currentTarget).parent().next().next().addClass('play-hide');
		},

		openSubToast: function(index) {
			var that = this;
			that.subToastShow = true
			$('body').css({
				overflow: 'hidden'
			})
			that.subText = that.toastVideoList[index].subText;
			that.subTitle = that.toastVideoList[index].subTitle;
			that.loadSubToadtVideo(index);
		},

		loadSubToadtVideo: function(index) {
			var that = this;
			var video = document.getElementById('subToastVideo')
			video.poster = that.toastVideoList[index].posterUrl;
			video.src = that.toastVideoList[index].videoUrl;
			video.loop = true;
		},
		playSubToastVideo: function() {
			var that = this;
			var video = document.getElementById('subToastVideo')
			that.fifthToastIconShow = true
			video.play();
		},
		closeSubToast: function() {
			var that = this;
			that.subToastShow = false
			that.fifthToastIconShow = false
			$('body').css({
				overflow: 'auto'
			})
		},
		listenerMobileVideo: function() {
			var that = this;
			if (that.isIOS) {
				that.playIOSVideo('second-first-video');
				that.playIOSVideo('second-fourth-video');
			}
			if (that.isAndroid) {
				var firstUrl = 'src/videos/product-second-01-mobile-2.0.2.ts'
				var fourthUrl = 'src/videos/product-second-04-mobile-2.0.2.ts'
				that.transVideo('#second-first-canvas', firstUrl)
				that.transVideo('#second-fourth-canvas', fourthUrl)
			}
		},
		playIOSVideo: function(dom) {
			var that = this;
			var videoDom = document.getElementById(dom);
			if (that.isWeixin) {
				document.addEventListener('WeixinJSBridgeReady', function() {
					videoDom.play();
				}, false);
			} else {
				videoDom.play();
			}
			videoDom.addEventListener('timeupdate', function() {
				if (videoDom.currentTime >= 0.1) {
					videoDom.parentNode.lastElementChild.classList.add('play-hide')
				}
			})
		},
		// 转化ts格式视频为canvas播放
		transVideo: function(id, url) {
			new JSMpeg.Player(url, {
				canvas: $(id)[0],
				autoplay: true,
				progressive: false,
				loop: true,
				onVideoDecode: function() {
					$(id).next().addClass('play-hide');
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
		/*判断客户端*/
		judgeClient: function() {
			var that = this;
			var u = navigator.userAgent;
			that.isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;   //判断是否是 android终端
			that.isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);     //判断是否是 iOS终端
			if (u.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') that.isWeixin = true; // 判断是否是微信
		},
	}
})
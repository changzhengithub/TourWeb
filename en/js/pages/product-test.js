new Vue({
	el: "#index",
	data: {
		isM: false,
		isAndroid: false,
		isIOS: false,
		isWeixin: false,
		playerFirst: null,
		playerFourth: null,
		openMenuShow: false,
		openLanguageShow: false,
		openBuyNowShow: false,
		navList: [],
		mySwiper: null,
		swiperActiveIndex: 0,
		swiperButtonList: ['Fine Manufacturing', 'One-Hand Operation', 'Solid and Reliable', 'Skin-friendly'],
		navActiveIndex: 1,
		playerShow: false,
		ytVideoId: '',
		subToastShow: false,
		fifthToastIconShow: false,
		subTitle: '',
		subText: '',
		toastActiveIndex: 0,
		toastVideoList: [
			{
				className: 'item-first',
				itemText: 'Brush control',
				icon: 'iconBrushcontrol',
				subTitle: 'Efficient and Accurate Brush Control',
				subText: 'A versatile knob enables you to easily control <span>the size, flow, transparency, and hardness of the brush</span> without interrupting your workflow, allowing you to focus on your creation.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-01-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: 'Parameter control',
				icon: 'iconParametercontrol',
				subTitle: 'Powerful and Versatile Parameter Control',
				subText: 'Whether it‘s <span>slider control, numeric control, frame-by-frame stepping, or a quick search, </span> the dial on TourBox gives you precise control over all parameters, so say goodbye to mouse dragging.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-02-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: 'Video and audio editing',
				icon: 'iconVideoandaudioediting',
				subTitle: 'Video and Audio Editing',
				subText: '<span>The dial, knob, and scroll,</span> along with buttons of different shapes, make video and audio editing more intuitive and efficient.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-03-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: 'Image control',
				icon: 'iconImagecontrol',
				subTitle: 'Smooth and Seamless Navigation Operations',
				subText: 'With <span>the scroll, knob, and dial,</span> TourBox can be used in software in a more intuitive, efficient, and accurate way to fulfill a series of navigation operations, like <span>image zooming in/out, canvas rotating, timeline zooming in/out,</span> and others. They can also be operated in combination with <span>the side button, tall button, short button,</span> and other buttons to achieve more advanced functions.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-04-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: 'Tool switching',
				icon: 'iconToolswitching',
				subTitle: 'Quick and Easy Tool Switching',
				subText: 'The Dpad buttons allow for <span>accurate and fast switching</span> between multiple sets of tools, and their corresponding functions can be checked in real time via the HUD.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-05-2.0.1.mp4',
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
			that.initSwiper();
			that.listenerMobileVideo();
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


		// 加载头部swiper轮播图
		initSwiper: function () {
			var that = this;
			that.mySwiper = new Swiper('.swiper-container', {
				autoplay: {
					delay: 2500,
					disableOnInteraction: true,
				},
				loop : true,
				effect : that.isM ? 'slide' : 'fade',
				// on:{
				// 	slideChangeTransitionStart: function(){
				// 		that.swiperActiveIndex = this.realIndex;
				// 	},
				// },
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
					renderBullet: function (index, className) {
						if (that.isM) {
							return '<span class="' + className + '"></span>'
						} else {
							return '<span class="' + className + '">' + that.swiperButtonList[index] + '</span>';
						}
					},
				},
				observer: true,
				observeParents: true,
			});
		},
		switchSwiper: function(index) {
			var that = this;
			if (that.swiperActiveIndex == index) return
			if (!that.mySwiper) return
			that.swiperActiveIndex = index;
			that.mySwiper.slideTo(index, 1000, false);
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
			// iframeNode.src = url
			iframeNode.src = 'https://www.youtube.com/embed/'+url+'?enablejsapi=1&autoplay=1&loop=1&playlist='+url
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

		switchToast: function(index) {
			var that = this;
			if (that.toastActiveIndex === index) return
			that.toastActiveIndex = index;
			that.fifthToastIconShow = false
		},

		openSubToast: function(index) {
			var that = this;
			if (that.isM) return
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
				// var firstVideo = document.getElementById('second-first-video');
				// var fourthVideo = document.getElementById('second-fourth-video');
				// if (that.isWeixin) {
				// 	document.addEventListener('WeixinJSBridgeReady', function() {
				// 		firstVideo.play();
				// 		fourthVideo.play();
				// 	}, false);
				// } else {
				// 	firstVideo.play();
				// 	fourthVideo.play();
				// }
				// $('#second-first-video').one('timeupdate',function() {
				// 	if ($(this)[0].currentTime > 0.1) {
				// 		$(this).next().addClass('play-hide');
				// 	}
				// })
				// $('#second-fourth-video').one('timeupdate',function() {
				// 	if ($(this)[0].currentTime > 0.1) {
				// 		$(this).next().addClass('play-hide');
				// 	}
				// })
			}
			if (that.isAndroid) {
				var firstUrl = 'src/videos/product-second-01-mobile-2.0.1.ts'
				var fourthUrl = 'src/videos/product-second-04-mobile-2.0.1.ts'
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
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
		swiperButtonList: ['정밀한 제조', '한 손으로 조작 가능', '안정적이고 믿을 만한 제품', '탁월한 촉감'],
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
				itemText: '브러시 제어',
				icon: 'iconBrushcontrol',
				subTitle: '정확하고 효율적인 브러시 제어',
				subText: '노브로 브러시 크기, 흐름, 불투명도, 강도를 손쉽게 제어할 수 있고 하던 작업을 중단시키지 않으며 창작에 집중할 수 있도록 합니다 .',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-01-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: '파라미터 조절',
				icon: 'iconParametercontrol',
				subTitle: '강력하고 다양한 파라미터 조절 ',
				subText: 'TourBox 다이얼 하나만으로  슬라이드 제어, 수치 조절, 프레임 속도 조정 또는 빠른 검색 등 작업들은 물론이고 모든 파라미터 값도 정밀하게 조절할 수 있습니다. 더 이상 ',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-02-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: '비디어 및 오디오 편집',
				icon: 'iconVideoandaudioediting',
				subTitle: '비디어 및 오디오 편집',
				subText: '다이얼, 노브 및 스크롤을 다양한 버튼 들과 함께 사용하시면 비디어 및 오디어 편집 작업은 보다 직관적이고 효율성도 크게 높일 수 있습니다.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-03-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: '화면 제어',
				icon: 'iconImagecontrol',
				subTitle: '유창하고 원활해지는 편집 작업',
				subText: '이미지 확대/축소, 캔버스 회전, 타임라인 확대/축소 등 일련의 편집 작업을 진행하실 때 TourBox의 스크롤, 노브, 다이얼, 이 3까지 버튼과 사이드 버튼, 톨 버튼, 쇼트.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-04-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: '도구 전환',
				icon: 'iconToolswitching',
				subTitle: '보다 빠르고 손쉬운 도구 전환',
				subText: '십자패드를 통하여 여러 세트 간의 호환은 빠르고 정확할 뿐만 아니라 HUD 기능으로 실시간 확인도 가능합니다 .',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-05-2.0.2.mp4',
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
		
    checkLanguage:function(lan) {
			var _this = this;
      var localUrl = window.location.href;
			if (localUrl.indexOf('kr/') == -1) return
			var arr1=localUrl.split('kr/');
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
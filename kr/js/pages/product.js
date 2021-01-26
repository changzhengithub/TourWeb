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
				itemText: '브러시 제어',
				subTitle: '효율적이고 정확한 브러시 제어',
				subText: '노브를 사용하여 <span>브러시의 크기, 흐름, 불투명도 및 경도를</span> 쉽게 제어 할 수 있으므로, 작업의 흐름을 중단하지 않고 창작에 집중할 수 있습니다.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-01-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: '파라미터 제어',
				subTitle: '강력하고 다양한 파라미터 제어',
				subText: '<span>슬라이더 제어, 수치 제어,프레임 별 스텝핑, 또는 빠른 검색</span> 등 조작에, TourBox의 다이얼을 사용하면 모든 파라미터를 정밀하게 제어 할 수 있으므로, 이제 마우스 드래그와  헤어질 때가 되었습니다.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-02-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: '비디오 및 오디오 편집',
				subTitle: '비디오 및 오디오 편집',
				subText: '<span>다이얼, 노브 및 스크롤은</span> 다양한 버튼들과 함께 사용하며, 보다 직관적이고 효율적인 비디오 및 오디오 편집을 구현할 수 있습니다.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-03-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: '이미지 제어',
				subTitle: '유창하고 원활한 탐색 작업',
				subText: '<span>이미지 확대 / 축소, 캔버스 회전, 타임 라인 확대 / 축소</span> 등과 같은 일련의 탐색 작업에서 <span>스크롤, 노브 혹은 다이얼</span>을 사용하면，소프트웨어를 보다 직관적이고 효율적이며 정확한 방식으로 컨트롤할 수 있고, 또한 <span>사이드 키 ,톨 버튼, 쇼트  버튼,</span> 및 기타 버튼을 함께 사용하여 보다 고급 기능을 수행 할 수 있습니다.',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-04-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: '도구 전환',
				subTitle: '빠르고 쉬운 도구 전환',
				subText: '십자패드를 사용하면 여러 도구 세트 간의 <span>빠르고 정확한 전환을 구현</span>할 수 있으며, HUD 기능을 통해 실시간으로 확인할 수 있습니다.',
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
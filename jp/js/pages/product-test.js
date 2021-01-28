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
		swiperButtonList: ['品質のこだわり', '片手デバイス', '安定感', '肌にやさしい'],
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
				itemText: 'ブラシコントロール',
				icon: 'iconBrushcontrol',
				subTitle: '効率的で正確なブラシコントロール機能',
				subText: 'TourBoxの「ノブ」でブラシのサイズ、流量、不透明度、硬さを楽々コントロールできますので、手を止めることなく創作に集中できます。',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-01-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: 'パラメータ調整',
				icon: 'iconParametercontrol',
				subTitle: 'パラメーター調節は強大かつ多種多様',
				subText: 'パラメーターバーや数値の調節、動画のコマ送りやスピーディーな検索など、TourBoxで正確に各パラメーターを調節します。時間のかかるマウスによるドラッグとはもうお別れしましょう。',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-02-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: '動画・音声編集',
				icon: 'iconVideoandaudioediting',
				subTitle: '動画・音声編集',
				subText: 'ダイヤル、ノブ、およびスクロールは、各種のボタンと合わせて、動画や音声の編集をより直感的かつ効率的に行うことをサポートします。',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-03-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: 'ナビゲーション機能',
				icon: 'iconImagecontrol',
				subTitle: 'シームレスなナビゲーション機能',
				subText: '「スクロール」や「ノブ」、「ダイヤル」で画面の縮小・拡大や回転、タイムラインのサイズ変更などの直感的なコントロールが可能で、効率も正確さもさらに向上します。また、正面と側面の各種ボタンを組み合わせれば、より高度なコマンドを設定することができます。',
				videoUrl: '//r.tourboxtech.com/kr/src/videos/product-second-more-04-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: 'ツールの切り替え',
				icon: 'iconToolswitching',
				subTitle: 'ツールのすばやい切替',
				subText: '「十字キー」によってより正確かつ即座に各ツールを切り替えられ、HUDでリアルタイムで確認できます。',
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
		checkLanguage: function (lan) {
			var _this = this;
			var localUrl = window.location.href;
			if (localUrl.indexOf('jp/') == -1) return
			var arr1 = localUrl.split('jp/');
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
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
				itemText: 'ブラシコントロール',
				subTitle: '効率的で正確なブラシコントロール機能',
				subText: 'TourBoxの「ノブ」でブラシのサイズ、<span>流量、不透明度、硬さ</span>を楽々コントロールできますので、手を止めることなく創作に集中できます。',
				videoUrl: '//r.tourboxtech.com/jp/src/videos/product-second-more-01-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: 'パラメータ調整',
				subTitle: 'パラメーター調節は強大かつ多種多様',
				subText: '<span>パラメーターバーや数値の調節、動画のコマ送りやスピーディーな検索</span>など、TourBoxで正確に各パラメーターを調節します。時間のかかるマウスによるドラッグとはもうお別れしましょう。',
				videoUrl: '//r.tourboxtech.com/jp/src/videos/product-second-more-02-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: '動画・音声編集',
				subTitle: '動画・音声編集',
				subText: '<span>ダイヤル、ノブ、およびスクロール</span>は、各種のボタンと合わせて、動画や音声の編集をより直感的かつ効率的に行うことをサポートします。',
				videoUrl: '//r.tourboxtech.com/jp/src/videos/product-second-more-03-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: 'ナビゲーション機能',
				subTitle: 'シームレスなナビゲーション機能',
				subText: '<span>「スクロール」や「ノブ」、「ダイヤル」</span>で<span>画面の縮小・拡大や回転、タイムラインのサイズ変更</span>などの直感的なコントロールが可能で、効率も正確さもさらに向上します。また、<span>正面と側面の各種ボタン</span>を組み合わせれば、より高度なコマンドを設定することができます。',
				videoUrl: '//r.tourboxtech.com/jp/src/videos/product-second-more-04-2.0.2.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: 'ツールの切り替え',
				subTitle: 'ツールのすばやい切替',
				subText: '「十字キー」によってより<span>正確かつ即座に各ツールを切り替えられ、</span>HUDでリアルタイムで確認できます。',
				videoUrl: '//r.tourboxtech.com/jp/src/videos/product-second-more-05-2.0.2.mp4',
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
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
				itemText: 'Bürstensteuerung',
				subTitle: 'Pinselsteuerung effizient und präzise',
				subText: 'Bestimmen Sie <span>Größe, Fluss, Deckkraft und Härte des Pinsels</span> einfach mit dem Drehknopf. Bleiben Sie ohne Unterbrechung auf Ihre Arbeit konzentriert.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-01-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-second',
				itemText: 'Parametersteuerung',
				subTitle: 'Mächtige, vielseitige Parametersteuerung',
				subText: 'Unabhängig davon, ob es sich um einen <span>Schieberegler, eine numerische Steuerung, schrittweise Auswahlen oder eine schnelle Suche handelt</span> – Sie können alle Parameter präzise über das TourBox-Einstellrad bestimmen – es ist keine Maus erforderlich.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-02-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-third',
				itemText: 'Video- und Audiobearbeitung',
				subTitle: 'Video- und Audiobearbeitung',
				subText: '<span>Einstellrad, Drehknopf und Scrollrad</span> machen die Nachbearbeitung von Video- und Audiomaterial gemeinsam mit den unterschiedlich geformten Tasten intuitiv und effizient.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-03-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fourth',
				itemText: 'Bildkontrolle',
				subTitle: 'Navigation einfach und schnell',
				subText: 'Ganz gleich, ob mit <span>Scrollrad, Drehknopf oder Einstellrad</span>: Ihre Software wird in einer Vielzahl von Funktionen wie Zoomen des Bildschirms, <span>Drehen der Leinwand und Zoomen der Zeitachse intuitiv, effizient und präzise gesteuert</span>. Darüber hinaus lassen sich diese für Zugriff auf weitere Funktionen mit den Tasten von TourBox (<span>Seitentaste, Große Taste, Kleine Taste usw</span>.) kombinieren.',
				videoUrl: '//r.tourboxtech.com/en/src/videos/product-second-more-04-2.0.1.mp4',
				posterUrl: ''
			},
			{
				className: 'item-fifth',
				itemText: 'Werkzeugwechseln',
				subTitle: 'Werkzeugwechsel einfach und schnell',
				subText: 'Die Kreuz-Tasten ermöglichen <span>Ihnen den schnellen Zugriff</span> auf mehrere Werkzeugsätze. Ihre Funktionen werden jederzeit im HUD angezeigt.',
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
			if (localUrl.indexOf('de/') == -1) return
			var arr1 = localUrl.split('de/');
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
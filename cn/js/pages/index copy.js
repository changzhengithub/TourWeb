new Vue({
	el: "#index",
	data: {
		isM: false,
	},
	created: function() {
		var _this = this;
		_this.judgeIsMobile();
		_this.listenScroll();

	},
	methods: {
		listenScroll: function() {
			var firstH = $('.main-banner').innerHeight();
			window.addEventListener('scroll', function() {
				var scrollH = $('html').scrollTop();
				$('.main-second').toggleClass('shade-static', scrollH >= firstH);
				$('.main-placeholder').toggleClass('placeholder-active', scrollH >= firstH);
			})
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
		closePlayer: function() {
			$('.main-player').hide();
			$('.video-container').empty();
			$('body').css({
				overflow: 'auto'
			})
		},

		judgeIsMobile: function () {
			var _this = this;
			if (window.innerWidth < 768) {
				_this.isM = true;
			} else {
				_this.isM = false;
			}
			window.addEventListener('resize', function (e) {
				if (window.innerWidth < 768) {
					_this.isM = true;
				} else {
					_this.isM = false;
				}
			})
		},
		

	}
})
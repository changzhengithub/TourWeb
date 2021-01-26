;(function () {
	setHtmlFontSize();
	initFooter();
	window.addEventListener('resize', debounce(resizeEvent, 500));
	function resizeEvent() {
		setHtmlFontSize();
		initFooter();
	}
	function setHtmlFontSize() {
		window.flag = isMobile();
		var win_width = window.innerWidth;
		var rem = window.flag ? 3.75 : 14.4;
		var fontSize = win_width / rem;
		document.documentElement.style.fontSize = fontSize.toFixed(2) + "px";
	}
	window.rem2px = function (num) {
		var fontSize = parseFloat($('html').css('font-size'));
		return Number((num * fontSize).toFixed(2));
	}
	window.px2rem = function (num) {
		var fontSize = parseFloat($('html').css('font-size'));
		return Number((num / fontSize).toFixed(2));
	}
	function initFooter() {
		if ($(window).innerWidth() >= 768) {
			$("#footer").load("components/footer.html");
		} else {
			$("#footer").load("components/m_footer.html");
		}
	}
	function debounce(func, wait) {
		var timeout;
		return function () {
			clearTimeout(timeout);
			timeout = setTimeout(func, wait);
		}
	}
	function isMobile() {
		var userAgentInfo = navigator.userAgent;
		var mobileAgents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
		var flag = false;
		for (var v = 0; v < mobileAgents.length; v++) {
			if (userAgentInfo.indexOf(mobileAgents[v]) > 0) {
				flag = true;
				break;
			}
		}
		return flag;
	}

	// function openMenu(){
	// 	var that = this;
	// 	that.openMenuShow = !that.openMenuShow;
	// 	that.openLanguageShow = false;
	// 	$(".header-mobile .nav-list").slideToggle(300);
	// }
	// function openLanguage(){
	// 	var that = this;
	// 	that.openLanguageShow = !that.openLanguageShow;
	// 	that.openMenuShow = false;
	// 	$(".header-mobile .language-select").slideToggle(300);
	// }
	// function checkLanguage(lan) {
	// 	var localUrl = window.location.href;
	// 	if (localUrl.indexOf('cn/') == -1) return
	// 	var arr1 = localUrl.split('cn/');
	// 	if (arr1[1]) {
	// 		window.location.href = arr1[0] + lan + '/' + arr1[1];
	// 	} else {
	// 		window.location.href = arr1[0] + lan;
	// 	}
	// }
})(window);

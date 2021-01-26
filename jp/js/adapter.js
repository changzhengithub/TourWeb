;(function () {
	window.flag = isMobile();
	setHtmlFontSize();
	window.addEventListener('resize', debounce(resizeEvent, 500));
	function resizeEvent() {
		setHtmlFontSize();
	}
	function setHtmlFontSize() {
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
})(window);


;(function(){
	setHtmlFontSize();
	window.addEventListener('resize',function(){
		setHtmlFontSize();
	})
	
	function setHtmlFontSize(){
		var win_width = window.innerWidth;
		var rem = 0;
		if(win_width>=768){
			rem = 14.4;
		}else{
			rem = 3.75;
		}
		var fontSize = win_width / rem;
		document.documentElement.style.fontSize = fontSize.toFixed(2) + "px";
		
	}
	
	window.rem2px = function(num){
		var fontSize = parseFloat($('html').css('font-size'));
		return Number((num*fontSize).toFixed(2));
	}
	
	window.px2rem = function(num){
		var fontSize = parseFloat($('html').css('font-size'));
		return Number((num/fontSize).toFixed(2));
	}
})(window)
;
(function() {
	"use strict"
	var ScrollSpy = function(obj, params) {
		this.$target = obj;
		this.$scrollEle = params.scrollEle;
		this.enter = params.enter;
		this.leave = params.leave;
		this.beforeEnter = params.beforeEnter;
		this.afterLeave = params.afterLeave;
	}

	ScrollSpy.prototype.init = function() {
		var _this = this;
		if (typeof(_this.beforeEnter) != "function") {
			_this.beforeEnter = function() {};
		}
		if (typeof(_this.enter) != "function") {
			_this.enter = function() {};
		}
		if (typeof(_this.leave) != "function") {
			_this.leave = function() {};
		}
		if (typeof(_this.afterLeave) != "function") {
			_this.afterLeave = function() {};
		}
		if (_this.$target.nodeType == 1) {
			set(_this.$target, _this.$scrollEle, _this.beforeEnter, _this.enter, _this.leave, _this.afterLeave);
		}

		// if (_this.$target instanceof HTMLCollection) {
		// 	var arry = new Array();
		// 	for (var i = 0; i < _this.$target.length; i++) {
		// 		arry.push(_this.$target[i]);
		// 	}
		// 	arry.forEach(function(item, index) {
		// 		set(item, _this.$scrollEle, _this.beforeEnter, _this.enter, _this.leave, _this.afterLeave);
		// 	})
		// }

		// if (_this.$target instanceof NodeList || _this.$target instanceof Array) {
		// 	_this.$target.forEach(function(item, index) {
		// 		set(item, _this.$scrollEle, _this.beforeEnter, _this.enter, _this.leave, _this.afterLeave);
		// 	});
		// }

		if (_this.$target instanceof HTMLCollection) {
			var arry = new Array();
			for (var i = 0; i < _this.$target.length; i++) {
				arry.push(_this.$target[i]);
			}
			for (var j = 0; j < arry.length; j++) {
				set(arry[j], _this.$scrollEle, _this.beforeEnter, _this.enter, _this.leave, _this.afterLeave);
			}
		}

		if (_this.$target instanceof NodeList || _this.$target instanceof Array) {
			for (var x = 0; x < _this.$target.length; x++) {
				set(_this.$target[x], _this.$scrollEle, _this.beforeEnter, _this.enter, _this.leave, _this.afterLeave);
			}
		}

		function set(element, scrollEle, beforeEnter, enter, leave, afterLeave) {
			set2(window.event, element, scrollEle, beforeEnter, enter, leave, afterLeave);
			scrollEle.addEventListener('scroll',function(e){
				set2(e, element, scrollEle, beforeEnter, enter, leave, afterLeave);
			})
		}

		function set2(e, element, scrollEle, beforeEnter, enter, leave, afterLeave) {
			if (scrollEle == window) {
				var clientTop1 = element.getBoundingClientRect().top;
				var clientTop2 = element.getBoundingClientRect().bottom;
				if (clientTop2 > 0 && clientTop1 < window.innerHeight) {
					if (!$(element).data("adapter-scrollspy-flag1")) {
						beforeEnter(e, element);
						$(element).data("adapter-scrollspy-flag1", true);
					}
				} else {
					if ($(element).data("adapter-scrollspy-flag1")) {
						afterLeave(e, element);
						$(element).data("adapter-scrollspy-flag1", null);
					}
				}

				if (clientTop1 > 0 && clientTop2 < window.innerHeight) {
					if (!$(element).data("adapter-scrollspy-flag2")) {
						enter(e, element);
						$(element).data("adapter-scrollspy-flag2", true);
					}
				} else {
					if ($(element).data("adapter-scrollspy-flag2")) {
						leave(e, element);
						$(element).data("adapter-scrollspy-flag2", null);
					}
				}
			} else {
				var offsetTop1 = element.getBoundingClientRect().top - scrollEle.getBoundingClientRect().top;
				var offsetTop2 = element.getBoundingClientRect().bottom - scrollEle.getBoundingClientRect().top;
				if (offsetTop2 > 0 && offsetTop1 < scrollEle.offsetHeight) {
					if (!$(element).data("adapter-scrollspy-flag1")) {
						beforeEnter(e, element);
						$(element).data("adapter-scrollspy-flag1", true);
					}
				} else {
					if ($(element).data("adapter-scrollspy-flag1")) {
						afterLeave(e, element);
						$(element).data("adapter-scrollspy-flag1", null);
					}
				}

				if (offsetTop1 > 0 && offsetTop2 < scrollEle.offsetHeight) {
					if (!$(element).data("adapter-scrollspy-flag2")) {
						enter(e, element);
						$(element).data("adapter-scrollspy-flag2", true);
					}
				} else {
					if ($(element).data("adapter-scrollspy-flag2")) {
						leave(e, element);
						$(element).data("adapter-scrollspy-flag2", null);
					}
				}
			}
		}
	}

	
	window.scrollSpy = function(obj, params) {
		if (typeof(params) != "object") {
			params = {};
		}
		var spy = new ScrollSpy(obj, params);
		spy.init();
	}
})(window)
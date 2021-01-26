;
(function() {
	var Router = function() {
		this.currentPath = '';
		this.routes = [
			{
				path:'/',
				callback:function(){
					console.log("hash:"+location.hash+" | href:"+location.href);
				}
			}
		]
	}
	//add route
	Router.prototype.add = function(r) {
		var _this = this;
		_this.routes.forEach(function(route, index) {
			if (route.path == r.path) {
				route.callback = r.callback;
				route.query = r.query;
				return;
			}
		})
		this.routes.push({
			path: r.path,
			callback: r.callback,
			query: r.query
		})
	}
	//when hash change
	Router.prototype.change = function() {
		var _this = this;
		var cp = location.hash.slice(1) || '/';
		var index = cp.lastIndexOf('?');
		if (index > -1) {
			cp = cp.substring(0, index);
		}
		_this.currentPath = cp;
		var flag = false;
		_this.routes.forEach(function(route, index) {
			if (route.path == _this.currentPath) {
				flag = true;
				route.query = _this.getUrlParams();
				if(typeof(route.callback) == "function"){
					route.callback();
				}
				return;
			}
		})
		if (flag == false) {
			throw new Error('path is undefined');
		}
	};
	//init 
	Router.prototype.init = function() {
		var _this = this;
		window.addEventListener('load', function() {
			_this.change();
		});
		window.addEventListener('hashchange', function() {
			_this.change();
		});
	};
	// trigger route change
	Router.prototype.push = function(route) {
		var query = route.query;
		var params = '?';
		for (var item in query) {
			var str = item + "=" + query[item] + "&";
			params += str;
		}
		params = params.substr(0, params.length - 1);
		location.hash = route.path + params;

	}

	//get url params
	Router.prototype.getUrlParams = function() {
		var _this = this;
		var obj = {};
		var index = location.hash.lastIndexOf('?');
		if(index>-1){
			var queryStr = location.hash.substring(index + 1);
			var arrStr = queryStr.split('&');
			arrStr.forEach(function(item, index) {
				var ps = item.split('=');
				obj[ps[0]] = decodeURI(ps[1]);
			})
		}
		return obj;
	}

	window.Router = new Router();
	window.Router.init();
})(window)

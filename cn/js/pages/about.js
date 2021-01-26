new Vue({
	el:"#container",
	data:{
		isM: false,
		aboutInfo: null
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getAbout();
	},
	methods:{
		getAbout:function(){
			var _this = this;
			$.getJSON('src/json/about.json',function(res){
				_this.aboutInfo = res;
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
		}
	}
})
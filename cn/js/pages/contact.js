new Vue({
	el:"#container",
	data:{
		isM: false,
		contactInfo: {},
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getInfo();
	},
	methods:{
		getInfo:function(){
			var _this = this;
			$.getJSON('src/json/contact.json',function(res){
				_this.contactInfo = res;
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
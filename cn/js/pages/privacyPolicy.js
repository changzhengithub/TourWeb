new Vue({
	el:"#container",
	data:{
		isM: false,
		policyData: {}
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getData();
	},
	methods:{
		getData:function(){
			var _this = this;
			$.getJSON('src/json/privacyPolicy.json',function(res){
				_this.policyData = res;
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
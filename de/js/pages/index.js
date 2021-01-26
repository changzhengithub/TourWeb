new Vue({
	el: "#index",
	data: {
		isM: false,
	},
	created: function() {
		var that = this;
		that.judgeIsMobile();
	},
	mounted: function () {
		var that = this;
	},
	methods: {
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
		

	}
})
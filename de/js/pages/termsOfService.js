new Vue({
	el:"#container",
	data:{
		serviceData: {}
	},
	mounted:function(){
		var _this = this;
		_this.getData();
	},
	methods:{
		getData:function(){
			var _this = this;
			$.getJSON('src/json/serviceData.json',function(res){
				_this.serviceData = res;
			})
		}
	}
})
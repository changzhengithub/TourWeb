new Vue({
	el:"#container",
	data:{
		policyData: {}
	},
	mounted:function(){
		var _this = this;
		_this.getData();
	},
	methods:{
		getData:function(){
			var _this = this;
			$.getJSON('src/json/privacyPolicy.json',function(res){
				_this.policyData = res;
			})
		}
	}
})
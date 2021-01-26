new Vue({
	el:"#container",
	data:{
		info:null
	},
	mounted:function(){
		var _this = this;
		_this.getInfo();
	},
	methods:{
		getInfo:function(){
			var _this = this;
			$.getJSON('src/json/contact.json',function(res){
				_this.info = res;
			})
		}
	}
})
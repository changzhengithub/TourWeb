new Vue({
	el:"#container",
	data:{
		aboutInfo:null
	},
	mounted:function(){
		var _this = this;
		_this.getAbout();
	},
	methods:{
		getAbout:function(){
			var _this = this;
			$.getJSON('src/json/about.json',function(res){
				_this.aboutInfo = res;
			})
		}
	}
})
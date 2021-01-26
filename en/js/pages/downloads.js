new Vue({
	el:"#container",
	data:{
		isM:false,
		versions: [],
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getData();
	},
	methods:{
		getData:function(){
			var _this = this;
			$.getJSON("src/json/downloads.json",function(result){
				_this.versions = result.versions;
			})
		},
		judgeIsMobile:function(){
			var _this = this;
			if(window.innerWidth<768){
				_this.isM = true;
			}else{
				_this.isM = false;
			}
			window.addEventListener('resize',function(e){
				if(window.innerWidth<768){
					_this.isM = true;
				}else{
					_this.isM = false;
				}
			})
		},
		
	}
})
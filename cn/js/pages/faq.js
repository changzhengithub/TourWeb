new Vue({
	el:"#container",
	data:{
		faqList:null,
		isM:false,
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getFaq();
	},
	methods:{
		getFaq:function(){
			var _this = this;
			$.getJSON('src/json/faq.json',function(res){
				_this.faqList = res;
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
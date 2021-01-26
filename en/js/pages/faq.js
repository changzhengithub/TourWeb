new Vue({
	el:"#container",
	data:{
		tab:null,
		faqList:null,
		isM:false
	},
	mounted:function(){
		var _this = this;
		_this.judgeIsMobile();
		_this.getTab();
		_this.getFaq();
	},
	methods:{
		getTab:function(){
			var _this = this;
			$.getJSON('src/json/faqPage.json',function(res){
				_this.tab = res;
			})
		},
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
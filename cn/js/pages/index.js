new Vue({
	el: "#index",
	data: {
		isM: false,
		openMenuShow: false,
		openLanguageShow: false,
		navList: [],
    mobileAuthShow: false,
    baseUrl: 'https://apimgr.hfyouzhi.com/mock/77',
    // baseUrl: 'http://localhost:8082',
    modalShow: false,
    loadShow: false,
    tipMsg: '',
    errorMsg: '',
    formType: '',
    formState: {},
    formStatus: new Map([
      ['login', {
        type: 'login',
        submitType: 'login',
        show: {
          email: true,
          keep: true,
          password: true,
          verify: false,
          slide: false,
          submit: true,
          skip: true
        },
        text: {
          title: '登录',
          submitText: '登录'
        },
        skip: {
          leftText: '注册TourBox账号',
          rightText: '找回密码'
        },
        skipType: {
          left: 'register',
          right: 'forgot'
        }
      }],
      ['register', {
        type: 'register',
        submitType: 'register',
        show: {
          email: true,
          password: true,
          confirm: true,
          slide: true,
          protocol: true,
          submit: true,
          skip: true
        },
        text: {
          title: '注册',
          submitText: '提交'
        },
        skip: {
          leftText: '已有账户',
          rightText: '找回密码'
        },
        skipType: {
          left: 'login',
          right: 'forgot'
        }
      }],
      ['register-activate', {
        type: 'register-activate',
        submitType: 'activateEmail',
        show: {
          tip: true,
          code: true,
          prev: true,
          submit: true
        },
        text: {
          title: '激活账户',
          tipText: '激活验证码已发送至您的邮箱，请登录邮箱查看',
          codeText: '',
          prevText: '上一步',
          submitText: '下一步'
        }
      }],
      ['register-complete', {
        type: 'register-complete',
        submitType: 'backRefreshPage',
        show: {
          tip: true,
          submit: true
        },
        text: {
          title: '账户已激活',
          tipText: '5秒后返回当前页',
          submitText: '立即返回'
        }
      }],
      ['forgot', {
        type: 'forgot',
        submitType: 'isExistEmail',
        show: {
          email: true,
          prev: true,
          submit: true
        },
        text: {
          title: '密码找回',
          prevText: '返回',
          submitText: '下一步'
        }
      }],
      ['forgot-reset', {
        type: 'forgot-reset',
        submitType: 'findPassword',
        show: {
          tip: true,
          code: true,
          password: true,
          confirm: true,
          prev: true,
          submit: true
        },
        text: {
          title: '密码找回',
          tipText: '验证码已发送至您的邮箱，请登录邮箱查看',
          codeText: '',
          prevText: '返回',
          submitText: '提交'
        }
      }],
      ['forgot-complete', {
        type: 'forgot-complete',
        submitType: 'loginAgain',
        show: {
          submit: true
        },
        text: {
          title: '密码修改成功',
          submitText: '重新登录'
        }
      }],
    ]),

    userInfo: null,
    registerInfo: null,
    isLogin: false,
    email: '87889978@qq.com',
    copyRegEmail: '', // 记录注册邮箱
    copyFindEmail: '', // 记录找回邮箱
    password: '123456789',
    confirm: '',
    verify: '',
    code: '',
    isSelectProtocol: true,
    isSelectUpdate: true,
    keepLogin: true,
    countDownTimer: null,
    refreshTimer: null,
    codeDisabled: true,
    countDownSec: 0,
    codeStatus: undefined, // 验证码类型 0 激活码 1 找回密码
    preStepType: 0, // 判断返回状态 0 登录 1 注册
    expireDate: 2 * 24 * 60 * 60,

    slideEl: null,
    slideBtn: null,
    slideProEle: null,
    slideSucMsgEle: null,
    slideFixTipsEle: null,
    touchX: 0,
    maxSlideWid: undefined,
    slideFinishState: false, // 滑块验证是否完成
	},
	created: function() {
		var that = this;
		that.judgeIsMobile()
		that.getNavList();
    that.getState('login');
    that.checkLogin();
    that.setGlobalSession();
	},
  updated: function () {
    var that = this;
    that.$nextTick(function () {
      that.initEle();
      that.initSlideEvent();
    })
  },
  computed: {
    allowSubmit: function () {
      var that = this;
      switch (that.formType) {
        case 'login':
          if (that.formState.show.code) {
            return that.verifyEmail(that.email) && that.verifyPassword(that.password) && that.verifyCode(that
              .verify)
          } else {
            return that.verifyEmail(that.email) && that.verifyPassword(that.password)
          }
          break;
        case 'register':
          return that.verifyEmail(that.email) && that.verifyPassword(that.password) && that.verifyConfirm(that
            .confirm) && that.slideFinishState && that.isSelectProtocol
          break;
        case 'register-activate':
          return that.verifyCode(that.code)
          break;
        case 'register-complete':
          return true
          break;
        case 'forgot':
          return that.verifyEmail(that.email)
          break;
        case 'forgot-reset':
          return that.verifyPassword(that.password) && that.verifyConfirm(that.confirm) && that.verifyCode(that
            .code)
          break;
        case 'forgot-complete':
          return true
          break;
      }
    }
  },
	methods: {
		getNavList: function () {
			var that = this;
			$.getJSON("src/json/bars.json", function (result) {
				that.navList = that.isM ? result.mobileList : result.deskList;
			})
		},
		openMenu: function(){
			var that = this;
			that.openMenuShow = !that.openMenuShow;
			that.openLanguageShow = false;
			$(".header-mobile .nav-list").slideToggle("fast");
		},
		openLanguage: function(){
			var that = this;
			that.openLanguageShow = !that.openLanguageShow;
			that.openMenuShow = false;
			$(".header-mobile .language-select").slideToggle("fast");
		},
		checkLanguage: function (lan) {
			// var localUrl = window.location.href;
			// if (localUrl.indexOf('cn/') == -1) return
			// var arr1 = localUrl.split('cn/');
			// if (arr1[1]) {
			// 	window.location.href = arr1[0] + lan + '/' + arr1[1];
			// } else {
			// 	window.location.href = arr1[0] + lan;
			// }
			window.location.href = '//www.tourboxtech.com/' + lan + window.location.pathname;
		},
    // 打开登录
    openLogin: function (type) {
      var that = this;
      that.getState(type);
      that.resetVerify();
    },
    // 打开注册
    openRegister: function (type) {
      var that = this;
      that.getState(type);
      that.resetVerify();
    },
    // 切换状态
    getState: function (type) {
      var that = this;
      that.clearFocus();
      that.formType = type
      that.formState = that.formStatus.get(that.formType)
      that.submitEvent = that[that.formState.submitType]
      // 清楚数据
      switch (type) {
        case 'login':
          // that.email = ''
          // that.password = ''
          break;
        case 'register':
          that.email = that.copyRegEmail
          that.slideFinishState = false
          that.resetVerify();
          break;
        case 'register-complete':
          that.copyRegEmail = ''
          break;
        case 'forgot':
          that.email = that.copyFindEmail
          break;
        case 'forgot-complete':
          that.copyFindEmail = ''
          break;
        default:
          // that.copyRegEmail = ''
          // that.copyFindEmail = ''
          break;
      }
    },
    // 检查是否登录
    checkLogin: function() {
      var that = this;
      var storage = window.localStorage;
      var session = window.sessionStorage;
      var currentStamp = Date.now();

      var cacheType = storage.getItem('cacheType');
      if (cacheType == 1) {
        session.clear();
        var expire = storage.getItem('expire_in');
        if (currentStamp < expire && storage.getItem('userInfo')) {
          that.isLogin = true
          that.userInfo = JSON.parse(storage.getItem('userInfo'))
        } else {
          that.isLogin = false
        }
      }
      if (cacheType == 2 && session.getItem('userInfo')) {
        that.isLogin = true
        that.userInfo = JSON.parse(session.getItem('userInfo'))
      }
      console.log(that.isLogin)
    },
    // 给新打开页面设置sessionStorage
    setGlobalSession: function() {
      var that = this;
      var storage = window.localStorage;
      var session = window.sessionStorage;
      // 新页面随便设置一个localStorage来启动storage事件
      if (!session.getItem('userInfo')) storage.setItem('trigger_before_storage', Date.now());
      // 所有页面都监听storage事件
      window.addEventListener('storage', function(event) {
        if (storage.getItem('cacheType') == 1) return
        // 判断storage事件来自哪里
        if (event.key == 'trigger_before_storage') {
          // 当新页面打开时设置localStorage触发storage事件，在原页面监听到
          // 设置localStorage，把原页面sessionStorage传进去，然后再把此localStorage删除
          storage.setItem('trigger_after_storage', session.getItem('userInfo'));
          storage.removeItem('trigger_after_storage');
        } else if (event.key == 'trigger_after_storage') {
          // 监听原页面设置localStorage的storage事件，通过event获取其设置的值
          // 设置sessionStorage
          session.setItem('userInfo', event.oldValue);
          that.checkLogin();
        }
      });
    },

    // 登录
    login: function () {
      var that = this;
      if (!that.verifyEmail(that.email) || !that.verifyPassword(that.password)) return
      if (that.formState.show.code && !that.verifyCode(that.verify)) return
      that.loadShow = true
      that.loginRequest();
    },
    loginRequest: function() {
      var that = this;
      that.loadShow = true
      $.ajax({
        url: `${that.baseUrl}/shop-api/user-auth`,
        type: "post",
        dataType: "json",
        data: {
          email: that.email,
          password: that.password,
          expire_in: that.keepLogin ? that.expireDate : 0
        },
        success: function (data) {
          console.log(data)
          that.loadShow = false
          that.modalShow = false
          that.loginSuccess(data);
        },
        error: function (err) {
          console.log(err)
          that.loadShow = false
          that.errorMsg = '邮箱或密码错误'
        }
      })
    },
    loginSuccess: function(data) {
      var that = this;
      // 缓存登录信息
      // cacheType 缓存类型 1 storage 2 session
      var userInfo = JSON.stringify(data);
      var expire = data.creation_time * 1000 + that.expireDate * 1000
      var storage = window.localStorage;
      var session = window.sessionStorage;
      storage.clear();
      session.clear();
      if (that.keepLogin) {
        storage.setItem('cacheType', 1);
        storage.setItem('userInfo', userInfo);
        storage.setItem('expire_in', expire);
      } else {
        storage.setItem('cacheType', 2);
        session.setItem('userInfo', userInfo);
      }
      that.checkLogin();
      that.closeModal();
    },
    // 登出
    logout: function(event) {
      event.preventDefault();
      // 请求退出
      var storage = window.localStorage;
      var session = window.sessionStorage;
      storage.clear();
      session.clear();
      window.location.reload();
    },

    // 注册
    register: function () {
      var that = this;
      if (!that.verifyEmail(that.email) || !that.verifyPassword(that.password) || !that.verifyConfirm(that.confirm) || !that.slideFinishState || !that.isSelectProtocol) return

      if (that.copyRegEmail === that.email && that.countDownTimer && that.codeStatus === 0) {
        that.getState('register-activate');
      } else {
        that.resetVerify();
        that.registerRequest()
      }
    },
    // 注册请求
    registerRequest: function() {
      var that = this;
      that.loadShow = true
      $.ajax({
        url: `${that.baseUrl}/shop-api/user-register`,
        type: "post",
        dataType: "json",
        data: {
          email: that.email,
          password: that.password
        },
        success: function (data) {
          console.log(data)
          that.loadShow = false
          that.registerInfo = data
          // 是否激活
          if (data.is_activated) {
            alert('邮箱已存在');
          } else {
            that.copyRegEmail = that.email
            that.preStepType = 1
            that.codeStatus = 0
            that.getState('register-activate');
            clearInterval(that.countDownTimer);
            that.countDownTimer = null
            that.countDown(that.codeStatus);
          }
        },
        error: function (err) {
          alert(err)
        }
      })
    },
    // 激活邮箱
    activateEmail: function () {
      var that = this;
      if (!that.verifyCode(that.code) || !that.verifyEmail(that.email)) return
      that.loadShow = true
      $.ajax({
        url: `${that.baseUrl}/shop-api/user-activate`,
        type: "post",
        dataType: "json",
        data: {
          email: that.email,
          code: that.code
        },
        success: function (data) {
          console.log(data)
          console.log('激活成功');
          that.loadShow = false
          that.getState('register-complete');
          // 倒计时刷新页面
          that.countDownBack();
        },
        error: function (err) {
          alert(err)
        }
      })

    },
    // 注册完成倒计时刷新页面
    countDownBack: function () {
      var that = this;
      that.formState.text.tipText = '5秒后刷新页面'
      var time = 5;
      that.refreshTimer = setInterval(() => {
        time--
        if (time >= 0) {
          that.formState.text.tipText = `${time}秒后刷新页面`;
        } else {
          that.backRefreshPage();
        }
      }, 1000)
    },
    // 状态刷新
    backRefreshPage: function () {
      var that = this;
      clearInterval(that.refreshTimer);
      that.keepLogin = true
      that.loginSuccess(that.registerInfo);
      window.location.reload();
    },

    // 验证邮箱是否存在
    isExistEmail: function () {
      var that = this;
      if (!that.verifyEmail(that.email)) return
      if (that.copyFindEmail === that.email && that.countDownTimer && that.codeStatus === 1) {
        that.getState('forgot-reset');
      } else {
        // 验证邮箱
        that.existEmailRequest();
      }
    },
    // 验证邮箱请求
    existEmailRequest: function() {
      var that = this;
      that.loadShow = true
      $.ajax({
        url: `${that.baseUrl}/shop-api/forgot-password/${that.email}`,
        type: "get",
        success: function (data) {
          that.loadShow = false
          that.copyFindEmail = that.email
          that.codeStatus = 1
          that.getState('forgot-reset');
          clearInterval(that.countDownTimer);
          that.countDownTimer = null
          that.countDown(that.codeStatus)
        },
        error: function (err) {
          alert(err)
        }
      })
    },
    // 找回密码
    findPassword: function () {
      var that = this;
      if (!that.verifyCode(that.code) || !that.verifyPassword(that.password) || !that.verifyConfirm(that
          .confirm)) return
      // 找回密码
      that.loadShow = true
      $.ajax({
        url: `${that.baseUrl}/shop-api/reset-password`,
        type: "post",
        dataType: "json",
        data: {
          code: that.code,
          password: that.password
        },
        success: function (data) {
          that.loadShow = false
          console.log(data)
          console.log('找回密码成功');
          that.getState('forgot-complete');
        },
        error: function (err) {
          alert(err)
        }
      })
    },
    // 找回密码后重新登录
    loginAgain: function () {
      var that = this;
      that.getState('login');
    },

    // 返回上一状态
    backPrev: function () {
      var that = this;
      if (that.formType === 'forgot-reset') {
        that.getState('forgot')
      } else {
        if (that.preStepType === 0) that.getState('login')
        if (that.preStepType === 1) that.getState('register')
      }
    },

    // 底部状态跳转
    skipStep: function (type) {
      var that = this;
      if (that.formType === 'login') that.preStepType = 0
      if (that.formType === 'register') that.preStepType = 1
      that.getState(type)
    },

    // 重新倒计时
    resetSendCode: function () {
      var that = this;
      if (that.codeStatus === 0) that.registerRequest();
      if (that.codeStatus === 1) that.existEmailRequest();
    },
    // 倒计时
    countDown: function (type) {
      var that = this;
      that.codeDisabled = true;

      if (type === 0) that.countDownSec = 30
      if (type === 1) that.countDownSec = 45
      that.formState.text.codeText = `重新发送邮件(${that.countDownSec})S`;

      that.countDownTimer = setInterval(() => {
        that.countDownSec--
        if (that.countDownSec > 0) {
          that.formState.text.codeText = `重新发送邮件(${that.countDownSec})S`;
        } else {
          that.formState.text.codeText = `发送邮件`;
          clearInterval(that.countDownTimer);
          that.countDownTimer = null;
          that.codeDisabled = false;
        }
      }, 1000)
    },
    
    getFocus(e) {
      var that = this;
      that.tipMsg = ''
      $(e.currentTarget).parent().removeClass('item-active').next().hide().text();
    },
    blurFocus(e, fn, value) {
      var that = this;
      if (!that[fn](value)) {
        $(e.currentTarget).parent().addClass('item-active').next().show().text(that.tipMsg);
        return
      }
      // 注册邮箱失焦验证
      if (that.formType === 'register' && $(e.currentTarget).attr('class') === 'input-email') {
        $.ajax({
          url: `${that.baseUrl}/shop-api/email-reg-check/${that.email}`,
          type: "get",
          success: function (data) {
            console.log(data)
          },
          error: function (err) {
            // $(e.currentTarget).parent().addClass('item-active').next().show().text(err);
            console.log(err)
          }
        })
      }
    },
    clearFocus: function() {
      var that = this;
      that.tipMsg = ''
      $('.item-input input').each(function() {
        $(this).parent().removeClass('item-active').next().hide().text();
      })
    },
    openModal: function () {
      var that = this;
      that.modalShow = true
      that.copyRegEmail = ''
      that.copyFindEmail = ''
      $('body').css({
        overflow: 'hidden'
      })
    },
    closeModal: function () {
      var that = this;
      that.modalShow = false
      if (that.isM) that.openMobileAuth();
      $('body').css({
        overflow: 'auto'
      })
    },

    // 重置滑块验证
    resetVerify: function () {
      var that = this;
      that.slideSucMsgEle.hide();
      that.slideBtn.removeClass('suc-drag-btn');
      that.slideFinishState = false;
      that.slideProEle.css({
        'width': 0
      });
      that.slideBtn.css({
        'left': '-1px'
      })
      that.touchMove();
    },
    openMenu: function () {
      var that = this;
      that.openMenuShow = !that.openMenuShow;
      that.openLanguageShow = false;
      $(".header-mobile .nav-list").slideToggle("fast");
    },
    openLanguage: function () {
      var that = this;
      that.openLanguageShow = !that.openLanguageShow;
      that.openMenuShow = false;
      $(".header-mobile .language-select").slideToggle("fast");
    },
    checkLanguage: function (lan) {
      window.location.href = '//www.tourboxtech.com/' + lan + window.location.pathname;
    },
    openMobileAuth: function() {
      var that = this;
      that.mobileAuthShow = !that.mobileAuthShow;
      that.openMenuShow = false;
      $(".mobile-auth .user-menu").slideToggle("fast");
    },
    // 初始化滑块
    initEle: function () {
      var that = this;
      that.slideEl = $('#verify-wrap')
      that.slideBtn = that.slideEl.find('.dragBtn');
      that.slideProEle = that.slideEl.find('.dragProgress');
      that.slideSucMsgEle = that.slideEl.find('.sucMsg');
      that.slideFixTipsEle = that.slideEl.find('.fixTips');
      that.maxSlideWid = that.calSlideWidth();
    },
    initSlideEvent: function () {
      var that = this;
      that.mouseDown();
      that.touchStart();
      that.touchMove();
      that.touchEnd();
    },
    mouseDown: function () {
      var that = this;
      var ifThisMousedown = false;
      that.slideBtn.on('mousedown', function (e) {
        $('.item-input input').blur();
        var distenceX = e.pageX;
        e.preventDefault();
        if (that.slideFinishState || that.ifAnimated()) {
          return false;
        }
        ifThisMousedown = true;
        $(document).mousemove(function (e) {
          if (!ifThisMousedown) {
            return false;
          }
          that.ifAnimated()
          var curX = e.pageX - distenceX;
          if (curX >= that.maxSlideWid) {
            that.setDragBtnSty(that.maxSlideWid);
            that.setDragProgressSty(that.maxSlideWid);
            that.cancelMouseMove();
            that.successSty();
            that.slideFinishState = true;
          } else if (curX <= 0) {
            that.setDragBtnSty('0');
            that.setDragProgressSty('0');
          } else {
            that.setDragBtnSty(curX);
            that.setDragProgressSty(curX);
          }
        })
        $(document).mouseup(function () {
          if (!ifThisMousedown) {
            return false;
          }
          ifThisMousedown = false;
          if (that.slideFinishState) {
            that.cancelMouseMove();
            return false;
          } else {
            that.failAnimate();
            that.cancelMouseMove();
          }
        });
      })
    },
    touchStart: function () {
      var that = this;
      that.slideBtn.on('touchstart', function (e) {
        that.touchX = e.originalEvent.targetTouches[0].pageX;
        if (that.slideFinishState || that.ifAnimated()) {
          return false;
        }
      })
    },
    touchMove: function () {
      var that = this;
      that.slideBtn.on('touchmove', function (e) {
        e.preventDefault();
        var curX = e.originalEvent.targetTouches[0].pageX - that.touchX;
        if (curX >= that.maxSlideWid) {
          that.setDragBtnSty(that.maxSlideWid);
          that.setDragProgressSty(that.maxSlideWid);
          that.cancelTouchmove();
          that.successSty();
          that.slideFinishState = true;
        } else if (curX <= 0) {
          that.setDragBtnSty('0');
          that.setDragProgressSty('0');
        } else {
          that.setDragBtnSty(curX);
          that.setDragProgressSty(curX);
        }
      })
    },
    touchEnd: function () {
      var that = this;
      that.slideBtn.on('touchend', function () {
        if (that.slideFinishState) {
          that.cancelTouchmove();
          return false;
        } else {
          that.failAnimate();
        }
      })
    },
    setDragBtnSty: function (left) {
      var that = this;
      that.slideBtn.css({
        'left': left
      })
    },
    setDragProgressSty: function (wid) {
      var that = this;
      that.slideProEle.css({
        'width': wid
      })
    },
    cancelMouseMove: function () {
      $(document).off('mousemove');
    },
    cancelTouchmove: function () {
      var that = this;
      that.slideBtn.off('touchmove');
    },
    successSty: function () {
      var that = this;
      that.slideSucMsgEle.show();
      that.slideBtn.addClass('suc-drag-btn');
    },
    ifAnimated: function () { //判断 是否动画状态
      var that = this;
      return that.slideBtn.is(":animated")
    },
    failAnimate: function () {
      var that = this;
      that.slideBtn.animate({
        'left': '-1px'
      }, 200);
      that.slideProEle.animate({
        'width': 0
      }, 200)
    },
    getDragBtnWid: function () { //获取滑块的宽度，
      var that = this;
      return parseInt(this.slideBtn.width());
    },
    getDragWrapWid: function () { //获取  本容器的的宽度，以防万一
      var that = this;
      return parseFloat(that.slideEl.outerWidth());
    },
    calSlideWidth: function () {
      var that = this;
      return that.getDragWrapWid() - that.getDragBtnWid()
    },
    verifyEmail: function (email) {
      var that = this;
      email = email ? email.replace(/\s+/g, '') : email
      if (!email) {
        that.tipMsg = '邮箱不能为空'
        return false
      } else {
        const pat = new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          )
        if (!pat.test(email)) {
          that.tipMsg = '邮箱格式错误'
          return false
        }
      }
      return true
    },
    verifyPassword: function (password) {
      var that = this;
      password = password ? password.replace(/\s+/g, '') : password
      if (!password) {
        that.tipMsg = '密码不能为空'
        return false
      } else {
        const pat = new RegExp(/^[a-zA-Z0-9]{8,20}$/)
        if (!pat.test(password)) {
          that.tipMsg = '密码格式错误'
          return false
        }
      }
      return true
    },
    verifyConfirm: function (confirm) {
      var that = this;
      confirm = confirm ? confirm.replace(/\s+/g, '') : confirm
      if (!confirm) {
        that.tipMsg = '确认密码不能为空'
        return false
      } else {
        const pat = new RegExp(/^[a-zA-Z0-9]{8,20}$/)
        if (!pat.test(confirm) || confirm !== that.password) {
          that.tipMsg = '确认密码与新密码不一致，请重新输入'
          return false
        }
      }
      return true
    },
    verifyCode: function (code) {
      var that = this;
      code = code ? code.replace(/\s+/g, '') : code
      if (!code) {
        that.tipMsg = '请输入验证码'
        return false
      } else {
        const pat = new RegExp(/^[0-9]{6}$/)
        if (!pat.test(code)) {
          that.tipMsg = '验证码格式错误'
          return false
        }
      }
      return true
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
		},
		

	}
})
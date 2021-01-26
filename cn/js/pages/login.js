new Vue({
	el: "#login",
	data: {
    isM: false,
    titleText: '登录',
		tavNavActive: false,
		tipMsg: '',
		
    loginEmailOrName: '',
    loginPassword: '',
    registerName: '',
    registerEmail: '',
    registerPassword: '',
		registerConfirm: '',
		registerCode: '',
    isSelectProtocol: false,
	},
	created: function() {
		var that = this;
		that.judgeIsMobile();
	},
	computed: {
		allowLogin: function() {
			return this.verifyEmailOrName(this.loginEmailOrName) && this.verifyPassword(this.loginPassword)
		},
		allowRegister: function() {
			return this.verifyUserName(this.registerName) && this.verifyEmail(this.registerEmail) && this.verifyPassword(this.registerPassword) && this.verifyConfirm(this.registerConfirm) && this.verifyCode(this.registerCode) && this.isSelectProtocol
		}
	},
	methods: {
    switchLogin: function() {
      this.tavNavActive = false
    },
    switchRegister: function() {
      this.tavNavActive = true
		},
		
		getFocus(e) {
			this.tipMsg = ''
			$(e.currentTarget).parent().removeClass('item-active');
			$(e.currentTarget).parent().next().hide().text()
		},
		blurFocus(e, fn, value) {
			if (!this[fn](value)) {
				$(e.currentTarget).parent().next().show().text(this.tipMsg)
				$(e.currentTarget).parent().addClass('item-active')
			}
		},
		selectProtocol: function() {
			this.isSelectProtocol = !this.isSelectProtocol
		},
		// 登录
		login: function() {
			if (!this.verifyEmailOrName(this.loginEmailOrName) || !this.verifyPassword(this.loginPassword)) return
			console.log('登录成功')
		},
		// 注册
		register: function() {
			if (!this.verifyUserName(this.registerName) || !this.verifyEmail(this.registerEmail) || !this.verifyPassword(this.registerPassword) || !this.verifyConfirm(this.registerConfirm) || !this.verifyCode(this.registerCode) || !this.isSelectProtocol) return
			console.log('注册成功');
		},

		verifyEmailOrName: function(emailAndName) {
			emailAndName = emailAndName ? emailAndName.replace(/\s+/g, '') : emailAndName
			if (!emailAndName) {
				this.tipMsg = '邮箱/用户名不能为空'
				return false
			} else {
				if (!this.verifyEmail(emailAndName) && !this.verifyUserName(emailAndName)) {
					this.tipMsg = '邮箱/用户名格式错误'
					return false
				}
				return true
			}
		},
		verifyUserName: function(name) {
			name = name ? name.replace(/\s+/g, '') : name
			if (!name) {
				this.tipMsg = '名称不能为空'
				return false
			} else {
				var pat = new RegExp(/^[a-zA-Z0-9_\u4e00-\u9fa5]{2,16}$/)
				if (!pat.test(name)) {
					this.tipMsg = '名称格式错误'
					return false
				}
			}
			return true
		},
		verifyPassword: function(password) {
			password = password ? password.replace(/\s+/g, '') : password
			if (!password) {
				this.tipMsg = '密码不能为空'
				return false
			} else {
				const pat = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
				if (!pat.test(password)) {
					this.tipMsg = '密码格式错误'
					return false
				}
			}
			return true
		},
		verifyConfirm: function(confirm) {
			confirm = confirm ? confirm.replace(/\s+/g, '') : confirm
			if (!confirm) {
				this.tipMsg = '确认密码不能为空'
				return false
			} else {
				const pat = new RegExp(/^[a-zA-Z0-9]{6,16}$/)
				if (!pat.test(confirm) && confirm !== this.registerPassword) {
					this.tipMsg = '确认密码与新密码不一致，请重新输入'
					return false
				}
			}
			return true
		},
		verifyEmail: function(email) {
			email = email ? email.replace(/\s+/g, '') : email
			if (!email) {
				this.tipMsg = '邮箱不能为空'
				return false
			} else {
				const pat = new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)
				if (!pat.test(email)) {
					this.tipMsg = '邮箱格式错误'
					return false
				}
			}
			return true
		},
		verifyPhone: function(phone) {
			phone = phone ? phone.replace(/\s+/g, '') : phone
			if (!phone) {
				this.tipMsg = '请输入手机号'
				return false
			} else {
				const pat = new RegExp('^(?:13|14|15|17|18)[0-9]{9}$', 'i')
				if (!pat.test(phone)) {
					this.tipMsg = '手机号格式错误'
					return false
				}
			}
			return true
		},
		verifyCode: function(code) {
			code = code ? code.replace(/\s+/g, '') : code
			if (!code) {
				this.tipMsg = '请输入验证码'
				return false
			} else {
				const pat = new RegExp('^[0-9]{6}$', 'i')
				if (!pat.test(code)) {
					this.tipMsg = '验证码格式错误'
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
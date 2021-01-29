// 滑动验证组件

var SlideVerify = {
  data: function () {
    return {
      slideEl: null,
      slideBtn: null,
      slideProEle: null,
      slideSucMsgEle: null,
      slideFixTipsEle: null,
      slideFinishState: false,
      touchX: 0,
      maxSlideWid: undefined,
    }
  },
  created: function () {
    var _this = this;
  },
  mounted: function() {
    var that = this;
    that.$nextTick(function () {
      that.initEle();
      that.initSlideEvent();
    })
  },
  methods: {
    initEle: function () {
      var that = this;
      that.slideEl = $('#verify-wrap')
      that.slideBtn = that.slideEl.find('.dragBtn');
      that.slideProEle = that.slideEl.find('.dragProgress');
      that.slideSucMsgEle = that.slideEl.find('.sucMsg');
      that.slideFixTipsEle = that.slideEl.find('.fixTips');
      that.maxSlideWid = that.calSlideWidth();
      console.log(that.maxSlideWid)
    },
    initSlideEvent: function () {
      var that = this;
      that._mousedown();
      that._touchstart();
      that._touchmove();
      that._touchend();
    },
    mouseDown: function (e) {
      var _this = this;
      var distenceX = e.pageX;
      e.preventDefault();
      if (_this.slideFinishState || _this.ifAnimated()) {
        return false;
      }
      _this.ifThisMousedown = true;
      $(document).mousemove(function (e) {
        if (!_this.ifThisMousedown) {
          return false;
        }
        var curX = e.pageX - distenceX;
        if (curX >= _this.maxSlideWid) {
          _this.setDragBtnSty(_this.maxSlideWid);
          _this.setDragProgressSty(_this.maxSlideWid);
          _this.cancelMouseMove();
          _this.slideFinishState = true;
          _this.successSty();
          // 验证完成
          _this.getSuccessState();
        } else if (curX <= 0) {
          _this.setDragBtnSty('0');
          _this.setDragProgressSty('0');
        } else {
          _this.setDragBtnSty(curX);
          _this.setDragProgressSty(curX);
        }
      })
      $(document).mouseup(function () {
        if (!_this.ifThisMousedown) {
          return false;
        }
        _this.ifThisMousedown = false;
        if (_this.slideFinishState) {
          _this.cancelMouseMove();
          return false;
        } else {
          _this.failAnimate();
          _this.cancelMouseMove();
        }
      });
    },

    _mousedown: function () {
      var _this = this;
      var ifThisMousedown = false;
      _this.slideBtn.on('mousedown', function (e) {
        var distenceX = e.pageX;
        e.preventDefault();
        if (_this.slideFinishState || _this.ifAnimated()) {
          return false;
        }
        ifThisMousedown = true;
        $(document).mousemove(function (e) {
          if (!ifThisMousedown) {
            return false;
          }
          var curX = e.pageX - distenceX;
          if (curX >= _this.maxSlideWid) {
            _this.setDragBtnSty(_this.maxSlideWid);
            _this.setDragProgressSty(_this.maxSlideWid);
            _this.cancelMouseMove();
            _this.slideFinishState = true;
            _this.successSty();
            _this.getSuccessState();
          } else if (curX <= 0) {
            _this.setDragBtnSty('0');
            _this.setDragProgressSty('0');
          } else {
            _this.setDragBtnSty(curX);
            _this.setDragProgressSty(curX);
          }
        })
        $(document).mouseup(function () {
          if (!ifThisMousedown) {
            return false;
          }
          ifThisMousedown = false;
          if (_this.slideFinishState) {
            _this.cancelMouseMove();
            return false;
          } else {
            _this.failAnimate();
            _this.cancelMouseMove();
          }
        });
      })

    },
    _touchstart: function () {
      var _this = this;
      _this.slideBtn.on('touchstart', function (e) {
        _this.touchX = e.originalEvent.targetTouches[0].pageX;
        if (_this.slideFinishState || _this.ifAnimated()) {
          return false;
        }
      })
    },
    _touchmove: function () {
      var _this = this;
      _this.slideBtn.on('touchmove', function (e) {
        e.preventDefault();
        var curX = e.originalEvent.targetTouches[0].pageX - _this.touchX;
        if (curX >= _this.maxSlideWid) {
          _this.setDragBtnSty(_this.maxSlideWid);
          _this.setDragProgressSty(_this.maxSlideWid);
          _this.cancelTouchmove();
          _this.successSty();
          _this.slideFinishState = true;
          _this.getSuccessState();
        } else if (curX <= 0) {
          _this.setDragBtnSty('0');
          _this.setDragProgressSty('0');
        } else {
          _this.setDragBtnSty(curX);
          _this.setDragProgressSty(curX);
        }
      })
    },
    _touchend: function () {
      var _this = this;
      _this.slideBtn.on('touchend', function () {
        if (_this.slideFinishState) {
          _this.cancelTouchmove();
          return false;
        } else {
          _this.failAnimate();
        }
      })
    },

    getSuccessState: function () {
      console.log('验证完成')
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
  },
  template: `
  <div class="verify-wrap" id="verify-wrap">
    <div class="drag-progress dragProgress"></div>
    <span class="drag-btn dragBtn"></span>
    <span class="fix-tips fixTips">请向右滑动滑块</span>
    <span class="verify-msg sucMsg">验证通过</span>
  </div>
  `
}
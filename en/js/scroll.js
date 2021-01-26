$(document).ready(function () {
  var screenH = $(window).height();
  var screenW = $(window).width();
  var headerH = $('.header').innerHeight();
  var wrapperFirstTop = $('.wrapper-first').offset().top;
  // var wrapperFirstTitleH = window.flag ? $('.wrapper-first .first-title').innerHeight() : 0;
  var wrapperFirstStickyTop = wrapperFirstTop;
  var wrapperSecondTop = $('.wrapper-second').offset().top;
  var wrapperFourthTop = $('.wrapper-fourth').offset().top;
  var wrapperFourthTitleH = $('.wrapper-fourth .full-title').innerHeight();
  var wrapperFourthStickyTop = wrapperFourthTop + wrapperFourthTitleH;
  var wrapperFirstHeight = $('.wrapper-first').innerHeight();
  var sixthVideoW = $('#sixth-video').innerWidth();
  var sixthVideoH = $('#sixth-video').innerHeight();
  var sixthDetailTop = $('.section-sixth .sixth-detail').offset().top;
  var sixthDetailH = $('.section-sixth .sixth-detail').innerHeight();
  var secondTop = $('.section-second').offset().top;
  var thirdTop = $('.section-third').offset().top;
  var fourthTop = $('.section-fourth').offset().top;
  var fifthTop = $('.section-fifth').offset().top;
  var sixthTop = $('.section-sixth').offset().top;
  var sevenTop = $('.section-seventh').offset().top;
  var sixVideoRate = null;
  var currentTop = $('html').scrollTop();
  var ticking = false; // rAF 触发锁
  initPage();
  function initPage() {
    refreshPage();
    initScroll();
  }
  function refreshPage() {
    initEnterAnimate();
    headerNavGradient(currentTop);
    bannerImgMove(currentTop);
    bannerTitleGradient(currentTop);
    // firstNextTitleShow(currentTop);
    // firstNextTitleMove(currentTop);
    // bannerBgGradient(currentTop);
    secondVideoEffect(currentTop);
    wrapperFourthTitle(currentTop);
    wrapperFourthTitleMove(currentTop);
    fifthTitleShow(currentTop);
    sixthAnimate(currentTop);
  }
  function initEnterAnimate() {
    $('.main-banner .headline-name').addClass('top-animate');
    $('.main-banner .headline-title').addClass('middle-animate');
    $('.main-banner .headline-price').addClass('bottom-animate');
  }
  function initScroll() {
    // 滚动事件监听
    window.addEventListener('scroll', onScroll, false);
  }
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(scrollEvent);
      ticking = true;
    }
  }
  function scrollEvent() {
    var scrollH = $('html').scrollTop();
    headerNavGradient(scrollH);
    bannerImgMove(scrollH);
    bannerTitleGradient(scrollH);
    // bannerBgGradient(scrollH);
    // firstNextTitleShow(scrollH);
    // firstNextTitleMove(scrollH);
    secondVideoEffect(scrollH);
    wrapperFourthTitle(scrollH);
    wrapperFourthTitleMove(scrollH);
    fifthTitleShow(scrollH);
    sixthAnimate(scrollH);
    ticking = false;
  }
  function headerNavGradient(scrollH) {
    if (window.flag) {
      $('header .header-buy').toggleClass('buy-active', scrollH > headerH);
    } else {
      if (scrollH >= wrapperFirstStickyTop && scrollH <= wrapperSecondTop || scrollH > wrapperFourthStickyTop && scrollH < fourthTop || sixthVideoH * sixVideoRate > screenH - headerH * 2 && scrollH <= sevenTop) {
        if (!$('.header').hasClass('header-black')) $('.header').addClass('header-black');
      } else {
        if ($('.header').hasClass('header-black')) $('.header').removeClass('header-black');
      }
    }
  }
  function bannerImgMove(scrollH) {
    if (window.flag) return
    var moveSize = screenH * 0.8;
    var scrollStart = 0;
    var scrollEnd = screenH * 1.5;
    var scrollSize = screenH * 1.5
    if (scrollH >= scrollStart && scrollH <= scrollEnd) {
      var tranY = (scrollH - scrollStart) / scrollSize * moveSize;
    }
    if (scrollH < scrollStart) tranY = 0;
    if (scrollH > scrollEnd) tranY = moveSize;
    $('.main-banner .move-img').css({
      transform: 'matrix(1, 0, 0, 1, 0, ' + -tranY + ')'
    })
  }
  function bannerTitleGradient(scrollH) {
    if (window.flag) return
    var scrollStart = 0;
    var scrollEnd = screenH * 0.5;
    var scrollSize = screenH * 0.5;
    if (scrollH >= scrollStart && scrollH <= scrollEnd) {
      var aph = (scrollH - scrollStart) / scrollSize;
    }
    if (scrollH < scrollStart) aph = 0;
    if (scrollH > scrollEnd) aph = 1;
    requestAnimationFrame(function () {
      $('.main-banner .banner-detail').css({
        opacity: aph,
      });
    })
  }
  function bannerBgGradient(scrollH) {
    if (window.flag) return
    var enterStart = screenH;
    var enterEnd = screenH * 1.8;
    var enterSize = screenH * 0.8;
    var leaveStart = screenH * 3;
    var leaveEnd = screenH * 4;
    var leaveSize = screenH * 1;
    if (scrollH >= enterStart && scrollH <= enterEnd) {
      var bgAph = 0.8 - (scrollH - enterStart) / enterSize * 0.8;
    }
    if (scrollH >= leaveStart && scrollH <= leaveEnd) {
      bgAph = (scrollH - leaveStart) / leaveSize;
    }
    if (scrollH < enterStart) bgAph = 0.8;
    if (scrollH > enterEnd && scrollH < leaveStart) bgAph = 0;
    if (scrollH > leaveEnd) bgAph = 1;
    $('.main-banner .container-content').css({
      'background-color': 'rgba(255, 255, 255, ' + bgAph + ')'
    });
  }
  function firstNextTitleShow(scrollH) {
    var scrollStart = screenH * 3.6;
    var scrollEnd = screenH * 4;
    var scrollSize = screenH * 0.4;
    var leaveStart = secondTop - screenH;
    var leaveEnd = secondTop - screenH * 0.3;
    var leaveSize = screenH * 0.7;
    if (scrollH >= scrollStart && scrollH <= scrollEnd) {
      var aph = (scrollH - scrollStart) / scrollSize;
    }
    if (scrollH >= leaveStart && scrollH <= leaveEnd) {
      aph = 1 - (scrollH - leaveStart) / leaveSize;
    }
    if (scrollH > leaveEnd || scrollH < scrollStart) aph = 0;
    if (scrollH > scrollEnd && scrollH < leaveStart) aph = 1;
    $('.main-banner .content-next').css({
      opacity: aph,
    })
  }
  function firstNextTitleMove(scrollH) {
    var moveSize = screenH * 0.3;
    var scrollStart = secondTop - screenH;
    var scrollEnd = secondTop - screenH * 0.3;
    var scrollSize = screenH * 0.7
    if (scrollH >= scrollStart && scrollH <= scrollEnd) {
      var tranY = (scrollH - scrollStart) / scrollSize * moveSize;
    }
    if (scrollH < scrollStart) tranY = 0;
    if (scrollH > scrollEnd) tranY = moveSize;
    $('.main-banner .content-next').css({
      transform: 'matrix(1, 0, 0, 1, 0, ' + tranY + ')'
    })
  }
  function secondVideoEffect(scrollH) {
    videoCanPlay('#second-first-video', scrollH, wrapperFirstStickyTop);
    videoCanPlay('#second-fourth-video', scrollH, wrapperFourthStickyTop);
    if (window.flag) {
      $('.wrapper-first .sticky-element').toggleClass('element-active-scale', scrollH >= wrapperFirstStickyTop);
      $('.wrapper-fourth .sticky-element').toggleClass('element-active-scale', scrollH >= wrapperFourthStickyTop);
      $('.wrapper-first .sticky-element').toggleClass('element-active-bg', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
      $('.wrapper-fourth .sticky-element').toggleClass('element-active-bg', scrollH >= wrapperFourthStickyTop + screenH * 0.3);
      $('.wrapper-first .sticky-element').toggleClass('element-active-title', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
      $('.wrapper-first .sticky-element').toggleClass('element-active-text', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
    } else {
      $('.wrapper-first .sticky-element').toggleClass('element-active-scale', scrollH >= wrapperFirstStickyTop);
      $('.wrapper-fourth .sticky-element').toggleClass('element-active-scale', scrollH >= wrapperFourthStickyTop);
      $('.wrapper-first .sticky-element').toggleClass('element-active-bg', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
      $('.wrapper-fourth .sticky-element').toggleClass('element-active-bg', scrollH >= wrapperFourthStickyTop + screenH * 0.3);
      $('.wrapper-first .sticky-element').toggleClass('element-active-title', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
      $('.wrapper-first .sticky-element').toggleClass('element-active-text', scrollH >= wrapperFirstStickyTop + screenH * 0.3);
      $('.wrapper-first .element-text').toggleClass('element-text-hide', scrollH >= secondTop + wrapperFirstHeight - screenH * 0.9);
    }
  }
  function videoCanPlay(videoId, scrollH, start) {
    if (!window.flag && $(videoId)[0].readyState === 4) {
      $(videoId).next().addClass('play-hide');
      if (scrollH >= start) {
        $(videoId).trigger('play')
      } else {
        $(videoId).trigger('pause')
      }
    }
  }
  function wrapperFourthTitle(scrollH) {
    var enterStart = wrapperFourthTop - screenH * 0.5;
    var enterEnd = wrapperFourthTop - screenH * 0.2;
    var enterSize = screenH * 0.3
    if (scrollH >= enterStart && scrollH <= enterEnd) {
      var aph = (scrollH - enterStart) / enterSize;
    }
    if (scrollH < enterStart) aph = 0;
    if (scrollH > enterEnd) aph = 1;
    $('.wrapper-fourth .title-desk').css({
      opacity: aph,
    });
  }
  function wrapperFourthTitleMove(scrollH) {
    var moveSize = screenH * 0.15;
    var enterStart = wrapperFourthTop - screenH * 0.5;
    var enterEnd = wrapperFourthTop - screenH * 0.2;
    var enterSize = screenH * 0.3;
    if (scrollH >= enterStart && scrollH <= enterEnd) {
      var tranY = (scrollH - enterStart) / enterSize * moveSize;
    }
    if (scrollH < enterStart) tranY = 0;
    if (scrollH > enterEnd) tranY = moveSize;
    $('.wrapper-fourth .title-desk').css({
      transform: 'matrix(1, 0, 0, 1, 0, ' + -tranY + ')'
    });
  }
  function fifthTitleShow(scrollH) {
    if(window.flag) return
    $('.section-fifth .title').stop().toggleClass('title-active', scrollH >= fifthTop - screenH * 0.6);
    $('.section-fifth .text').stop().toggleClass('text-active', scrollH >= fifthTop - screenH * 0.5);
    // $('.section-fifth .nav-item').stop().toggleClass('item-transform', scrollH >= fifthTop - screenH * 0.2);
  }
  function sixthAnimate(scrollH) {
    sixthGradient('.float-first', scrollH, sixthDetailTop + screenH * 0.4, sixthDetailTop + screenH * 0.6, sixthDetailTop + screenH * 1.4, sixthDetailTop + screenH * 1.6);
    if (window.flag) {
      sixthMobileBannerShow(scrollH);
      $('.section-fifth').toggleClass('section-fifth-active', scrollH > sixthTop - screenH * 0.3);
      $('.section-sixth .sixth-title').toggleClass('title-active', scrollH > sixthTop - screenH * 0.3);
      $('.section-sixth .sixth-sticky').toggleClass('sticky-active', scrollH > sixthTop - screenH * 0.3);
      sixthGradient('.float-second', scrollH, sixthDetailTop - screenH * 0.8, sixthDetailTop, sixthDetailTop + screenH, sixthDetailTop + screenH * 1.2);
      sixthGradient('.float-third', scrollH, sixthDetailTop + screenH * 1.2, sixthDetailTop + screenH * 1.4, sixthDetailTop + screenH * 2.4, sixthDetailTop + screenH * 2.6);
      sixthGradient('.float-fourth', scrollH, sixthDetailTop + screenH * 2.6, sixthDetailTop + screenH * 2.8, sixthDetailTop + screenH * 3.8, sixthDetailTop + screenH * 4);
    } else {
      sixthVideoScale(scrollH);
      sixthBgGradient(scrollH);
      sixthBannerShow(scrollH);
      sixthGradient('.float-second', scrollH, sixthDetailTop + screenH * 1.6, sixthDetailTop + screenH * 1.8, sixthDetailTop + screenH * 2.6, sixthDetailTop + screenH * 2.8);
      sixthGradient('.float-second', scrollH, sixthDetailTop + screenH * 1.6, sixthDetailTop + screenH * 1.8, sixthDetailTop + screenH * 2.6, sixthDetailTop + screenH * 2.8);
      sixthGradient('.float-third', scrollH, sixthDetailTop + screenH * 2.8, sixthDetailTop + screenH * 3, sixthDetailTop + screenH * 3.8, sixthDetailTop + screenH * 4);
      sixthGradient('.float-fourth', scrollH, sixthDetailTop + screenH * 4, sixthDetailTop + screenH * 4.2, sixthDetailTop + screenH * 5, sixthDetailTop + screenH * 5.2);
    }
  }
  // sixth 视频缩放
  function sixthVideoScale(scrollH) {
    var enterStart = sixthTop;
    var scrollSize = screenH * 0.5;
    if (scrollH >= enterStart) {
      sixVideoRate = (scrollH - enterStart) / scrollSize + 1;
      if (sixthVideoW * sixVideoRate >= screenW) sixVideoRate = screenW / sixthVideoW;
    } else {
      sixVideoRate = 1
      $('#sixth-video').trigger('pause');
    }
    videoCanPlay('#sixth-video', scrollH, sixthTop);
    $('.section-sixth .sticky-element').css({
      transform: 'matrix(' + sixVideoRate + ', 0, 0, ' + sixVideoRate + ', 0, 0)'
    });
  }
  function sixthBgGradient(scrollH) {
    var enterStart = sixthDetailTop;
    var enterEnd = sixthDetailTop + screenH * 1.2;
    var enterSize = screenH * 1.2;
    var leaveStart = sixthDetailTop + screenH * 1.4;
    var leaveEnd = sixthDetailTop + screenH * 1.9;
    var leaveSize = screenH * 0.5;
    if (scrollH >= enterStart && scrollH <= enterEnd) {
      var bgAph = (scrollH - enterStart) / enterSize;
    }
    if (scrollH >= leaveStart && scrollH <= leaveEnd) {
      bgAph = 1 - (scrollH - leaveStart) / leaveSize;
    }
    if (scrollH < enterStart || scrollH > leaveEnd) bgAph = 0;
    if (scrollH > enterEnd && scrollH < leaveStart) bgAph = 1;
    $('.section-sixth .sticky-float').css({
      'background-color': 'rgba(0, 0, 0, ' + bgAph + ')'
    });
  }
  function sixthBannerShow(scrollH) {
    if (scrollH >= sixthDetailTop + screenH * 1.2) {
      $('.section-sixth .banner-bg').show();
      $('.sixth-youtube').show();
    } else {
      $('.section-sixth .banner-bg').hide();
      $('.sixth-youtube').hide();
    }
  }

  function sixthMobileBannerShow(scrollH) {
    if (scrollH >= sixthDetailTop + sixthDetailH - screenH * 1.5) {
      $('.sixth-youtube').show();
    } else {
      $('.sixth-youtube').hide();
    }
  }
  
  
  function sixthGradient(element, scrollH, enterStart, enterEnd, leaveStart, leaveEnd) {
    var aph, tranY;
    var tranYSize = screenH * 0.6;
    var enterSize = Math.abs(enterEnd - enterStart);
    var leaveSize = Math.abs(leaveEnd - leaveStart);
    var tranYScroll = Math.abs(leaveEnd - enterStart)
    if (scrollH >= enterStart && scrollH <= enterEnd) {
      aph = (scrollH - enterStart) / enterSize;
    }
    if (scrollH >= leaveStart && scrollH <= leaveEnd) {
      aph = 1 - (scrollH - leaveStart) / leaveSize;
    }
    if (scrollH > leaveEnd || scrollH < enterStart) aph = 0;
    if (scrollH > enterEnd && scrollH < leaveStart) aph = 1;

    if (scrollH > enterStart && scrollH < leaveEnd) {
      tranY = (scrollH - enterStart) / tranYScroll * tranYSize;
    }
    $('.section-sixth ' + element).css({
      opacity: aph,
      transform: 'matrix(1, 0, 0, 1, 0, ' + -tranY + ')'
    });
  }
});
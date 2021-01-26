// load compoments
initHeader();
initFooter();
window.addEventListener('resize', debounce(resizeEvent, 500));
function resizeEvent() {
  initFooter();
}
function initFooter() {
  if ($(window).innerWidth() >= 768) {
    $("#footer").load("components/footer.html");
  } else {
    $("#footer").load("components/m_footer.html");
  }
}
function initHeader() {
  $("#header").load("components/header.html");
}
function debounce(func, wait) {
  var timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  }
}
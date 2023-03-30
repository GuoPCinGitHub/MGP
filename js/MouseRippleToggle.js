// Mouse-ripple 开关，基于 [[Mediawiki:Gadget-heimu-toggle.js]]
$(function () {
	if (!$('.mouse-ripple')[0]) {
		return;
	}
	var mouseRippleToggleBtn = insertToBottomRightCorner(wgULS('隐藏ＭＲ', '隱藏ＭＲ')).attr('id', 'mouse-ripple-toggle').css('user-select', 'none');
	mouseRippleToggleBtn.on('click', function () {
		mouseRippleToggleBtn.text($('body.mouse-ripple-toggle-on')[0] ? wgULS('隐藏ＭＲ', '隱藏ＭＲ') : wgULS('显示ＭＲ', '顯示ＭＲ'));
		$('body').toggleClass('mouse-ripple-toggle-on');
		$('body .mouse-ripple').css('display', 'initial');
		$('body.mouse-ripple-toggle-on .mouse-ripple').css('display', 'none');
	});
});
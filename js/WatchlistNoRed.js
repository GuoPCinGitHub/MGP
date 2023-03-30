$(function () {
	if (mw.config.get('wgCanonicalSpecialPageName') == 'EditWatchlist' && $('.mw-htmlform').length > 0) {
		$('#mw-content-text').prepend('<input type="button" value="移除红链（不包括提案页面）" style="margin: 5px 0;" onclick="removeRedLinks()">');
	}
});

function removeRedLinks() {
	var selectedNum = 0;
	$('.mw-htmlform-flatlist-item').each(function () {
		var title = $(this).children('label').children(':first');
		if (title.attr('class') == 'new' && title.text().substr(0, 8) != '萌娘百科:提案/') {
			$(this).children('input').attr('checked', true);
			selectedNum += 1;
		}
	});
	if (selectedNum !== 0) {
		mw.notify('已选中 ' + selectedNum + ' 个标题，即将移除……', {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: '移除红链', type: 'warn'});
		let notifyTimeout = setTimeout(() => {
			$('input.mw-htmlform-submit').trigger('click');
			clearTimeout(notifyTimeout);
		}, 5000);
	} else {
		mw.notify('列表中无红链！溜了溜了……', {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: '移除红链', type: 'error'});
	}
}
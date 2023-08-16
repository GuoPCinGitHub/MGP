$(function () {
	if (mw.config.get('wgTitle') == '编辑监视列表' && $('.mw-htmlform').length > 0) {
		$('#mw-content-text').prepend('<input type="button" value="' + wgULS('移除红链（不包括提案页面）', '移除紅連（不包括提案頁面）') +'" style="margin: 5px 0;" onclick="removeRedLinks()">');
	}
});

function removeRedLinks() {
	let selectedNum = 0;
	$('.mw-htmlform-flatlist-item').each(function () {
		const title = $(this).children('label').children(':first');
		if (title.attr('class') == 'new' && title.text().substr(0, 8) != '萌娘百科:提案/') {
			$(this).children('input').attr('checked', true);
			selectedNum += 1;
		}
	});
	if (selectedNum !== 0) {
		mw.notify(wgULS('已选中', '已選中') + ' ' + selectedNum + ' ' + wgULS('个标题，即将移除……', '個標題，即將移除……'), {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: wgULS('移除红链', '移除紅連'), type: 'warn'});
		let notifyTimeout = setTimeout(() => {
			$('input.mw-htmlform-submit').trigger('click');
			clearTimeout(notifyTimeout);
		}, 5000);
	} else {
		mw.notify(wgULS('列表中无红链！溜了溜了……', '列表中無紅連！溜了溜了……'), {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: wgULS('移除红链', '移除紅連'), type: 'error'});
	}
}
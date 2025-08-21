$(function () {
	if (mw.config.get('wgCanonicalSpecialPageName') == 'EditWatchlist' && mw.config.get('wgPageName').indexOf('/') == -1 && $('.mw-htmlform').length > 0) {
		$('#mw-content-text').prepend('<input type="button" value="' + wgULS('移除红链（不包括提案页面）', '移除紅連（不包括提案頁面）') +'" id="watchlistNoRed" class="cdx-button" style="margin: 5px 0;" on' + 'click="removeRedLinks()">');
	}
});

function removeRedLinks() {
	let selectedNum = 0;
	$('label.oo-ui-checkboxMultioptionWidget:has(> span.oo-ui-labelElement-label > a.new').each(function () {
		const title = $(this).children('span.oo-ui-labelElement-label').children('a');
		if (title.text().substr(0, 8) != '萌娘百科:提案/') {
			$(this).children('span.oo-ui-checkboxInputWidget').children('input').prop('checked', true);
			selectedNum += 1;
		}
	});
	if (selectedNum !== 0) {
		mw.notify(wgULS('已选中', '已選中') + ' ' + selectedNum + ' ' + wgULS('个标题，即将移除……', '個標題，即將移除……'), {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: wgULS('移除红链', '移除紅連'), type: 'warn'});
		let notifyTimeout = window['setTimeout'](() => {
			$('.mw-htmlform-submit-buttons button').trigger('click');
			window['clearTimeout'](notifyTimeout);
		}, 5000);
	} else {
		mw.notify(wgULS('列表中无红链！溜了溜了……', '列表中無紅連！溜了溜了……'), {autoHide: true, autoHideSeconds: 10, tag: 'SRL', title: wgULS('移除红链', '移除紅連'), type: 'error'});
		let removeTimeout = window['setTimeout'](() => {
			$('input#watchlistNoRed').remove();
			window['clearTimeout'](removeTimeout);
		}, 3000);
	}

}

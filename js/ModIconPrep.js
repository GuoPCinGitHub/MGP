if ($('.mw-collapsible.mw-enhanced-rc').length > 0) {
	mw.loader.addStyleTag(`
	.pc-mip-count {
		position: absolute;
		bottom: -.4em;
		right: -.4em;
		display: inline-block;
		backdrop-filter: blur(5px);
		background: #FFF5;
		border: #AAA 1px dashed;
		border-radius: 50%;
		color: #222;
		font-size: 9px;
		font-style: normal;
		line-height: 1.2em;
		text-align: center;
		width: 1.2em;
		height: 1.2em;
		user-select: none;
	}
	`);
	let epath = '.mw-collapsible.mw-enhanced-rc.mw-changeslist-edit .mw-changeslist-line-inner';
	let lpath = '.mw-collapsible.mw-enhanced-rc.mw-changeslist-log .mw-changeslist-line-inner';
	let sflag = false;
	// 处理页面被嵌入的情形
	if ($('.mw-collapsible.mw-enhanced-rc .mw-changeslist-line-inner > p').length > 0) {
		sflag = true;
		epath += '> p';
		lpath += '> p';
	}
	// 在合并更改前方添加图标
	$('.mw-collapsible.mw-enhanced-rc').each(function() {
		const ico = $(this).find('i.mod-status-icon').first().clone();
		const num = $(this).find('i.mod-status-icon').length - 1;
		ico.css('position', 'relative');
		ico.append($('<span>').text(num).addClass('pc-mip-count'));
		$(this).find('td.mw-changeslist-line-inner').first().prepend(ico);
	});
	// 隐藏合并编辑的后置图标
	$(epath).each(function() {
		let con = $(this).contents();
		const ico = con.filter('span.mw-title ~ i.mod-status-icon');
		const pos = con.index(ico);
		if (con.filter('span.mw-title').has('a.new').length > 0) {
			con.eq(pos - 1).get(0).replaceWith(con.eq(pos - 1).get(0).textContent.replace('历史 | ', '历史'));
		} else {
			con.eq(pos - 1).remove();
		}
		con.eq(pos).remove();
		if (sflag) {
			$(this).css('display', 'contents');
			$('.mw-enhanced-rc-nested p').css('display', 'contents');
		}
	});
	// 隐藏合并日志的后置图标
	$(lpath).each(function() {
		let con = $(this).contents();
		const ico = con.filter('span.mw-rc-unwatched ~ i.mod-status-icon');
		if (ico.length > 0) {
			const pos = con.index(ico);
			con.eq(pos - 1).remove();
			con.eq(pos).remove();
			con.eq(pos + 1).remove();
		}
		if (sflag) {
			$(this).css('display', 'contents');
			$('.mw-enhanced-rc-nested p').css('display', 'contents');
		}
	});
}
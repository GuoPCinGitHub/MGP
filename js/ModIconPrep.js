if ($('.mw-rcfilters-ui-highlights-enhanced-toplevel').length > 0) {
	mw.loader.addStyleTag(`
	.pc-mip-count {
		position: absolute;
		bottom: -.4em;
		right: -.4em;
		display: inline-block;
		background: #FFFD;
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
	let epath = '.mw-rcfilters-ui-highlights-enhanced-toplevel.mw-changeslist-src-mw-edit .mw-changeslist-line-inner';
	let lpath = '.mw-rcfilters-ui-highlights-enhanced-toplevel.mw-changeslist-src-mw-log .mw-changeslist-line-inner';
	// 在合并更改前方添加图标
	$('.mw-rcfilters-ui-highlights-enhanced-toplevel').each(function() {
		const ico = $(this).next().find('i.mod-status-icon').first().clone();
		const num = $(this).nextAll().find('i.mod-status-icon').length;
		ico.css({'position': 'relative', 'contain': 'none'});
		ico.append($('<span>').text(num).addClass('pc-mip-count'));
		$(this).find('td.mw-changeslist-line-inner').first().prepend(ico);
	});
	// 隐藏合并编辑的后置图标
	$(epath).each(function() {
		let con = $(this).contents();
		const ico = con.filter('span.mw-changeslist-links').find('i.mod-status-icon');
		const prevNode = ico[0].previousSibling;
		prevNode.remove();
		ico.remove();
	});
	// 隐藏合并日志的后置图标
	$(lpath).each(function() {
		let con = $(this).contents();
		const ico = con.filter('span.mw-changeslist-links').find('i.mod-status-icon');
		if (ico.length > 0) {
			ico.parent()[0].remove();
		}
	});
}

mw.loader.addStyleTag(`
.pc-bg-info {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 21;
	background: #FFFA;
	backdrop-filter: blur(5px);
	border-top-left-radius: 2px;
	line-height: 24px;
	width: 24px;
	height: 24px;
}

.pc-bg-info-icon {
	display: inline-block;
	background: #1A2947;
	clip-path: path("M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM11 7H13V9H11V7ZM11 11H13V17H11V11Z");
	width: 24px;
	height: 24px;
	transform: scale(.6);
	transform-origin: center;
}

.pc-bg-info-link {
	font-family: Roboto, Arial, sans-serif;
	font-size: 12px;
	width: 0;
	overflow-x: hidden;
}

.pc-bg-info-link a {
	display: inline-block;
	color: #525252;
	width: max-content;
}

.pc-bg-info-link a:hover {
	text-decoration: none;
}

.pc-bg-info:hover {
	width: max-content;
}

.pc-bg-info:hover .pc-bg-info-link {
	width: max-content;
	padding-right: 4px;
}
`);

var timer = setTimeout($(function() {
	if ($('.sidebar-character > img').length > 0 && $('.sidebar-character').attr('data-displaylogo')) {
		var src = $('.sidebar-character[data-displaylogo] > img').attr('data-src');
		var txt = '背景：' + src;
		if (/img.moegirl/g.test(src)) {
			var ls = src.split('/');
			var file = ls[ls.length - 1];
			src = mw.config.get("wgServer") + '/cm:File:' + file;
			txt = '背景：萌娘共享上的File:' + decodeURIComponent(file);
		}
		var pos = $('#mw-navigation').length > 0 ? '#mw-navigation' : 'main.moe-flexible-container';
		$(pos).append($('<div>').addClass('pc-bg-info'));
		$('.pc-bg-info').append($('<span>').addClass('pc-bg-info-icon')).append($('<span>').addClass('pc-bg-info-link'));
		$('.pc-bg-info-link').append($('<a>').text(txt).attr({
			'href': src,
			'target': '_blank',
			'rel': 'noopener noreferrer'
		}));
	} else {
		return;
	}
	clearTimeout(timer);
}), 5000);
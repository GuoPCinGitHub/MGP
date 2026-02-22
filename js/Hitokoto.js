mw.loader.addStyleTag(`
#hitokoto {
	display: flex;
	justify-content: center;
	gap: 5px;
	margin-bottom: 0.9em;
}

#hitokoto_text {
	color: #333;
}

#hitokoto_logo {
	color: #8921FF;
	user-select: none;
}

#hitokoto_logo:hover {
	text-decoration: none;
}
`);

$(function () {
	var pos = '';
	if (mw.config.get('skin') == 'moeskin') {
		if ($(window).width() <= 768) {
			pos = '#moe-article-header-title';
		} else {
			pos = '#moe-sitenotice-container';
		}
	} else {
		pos = '#siteNotice';
	}
	$(pos)
		.append($('<div id="hitokoto"><a id="hitokoto_text">正在获取一言……</a></div>'));
	$('#hitokoto_text')
		.attr('target', '_blank')
		.before($('<a id="hitokoto_logo"></a>'));
	$('#hitokoto_logo')
		.attr({href: 'https://hitokoto.cn', target: '_blank'})
		.text('㋪');
	
	// https://developer.hitokoto.cn/sentence/demo/
	fetch('https://v1.hitokoto.cn')
		.then(response => response.json())
		.then(data => {
			const hitokoto = $('#hitokoto_text');
			hitokoto.attr('href', 'https://hitokoto.cn/?uuid=' + data.uuid).text(data.hitokoto);
		})
		.catch(console.error);
});

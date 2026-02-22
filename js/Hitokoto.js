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

$(() => {
	let pos = '';
	if (mw.config.get('skin') == 'moeskin') {
		pos = $(window).width() <= 768 ? '#moe-article-header-title' : '#moe-sitenotice-container';
	} else {
		pos = '#siteNotice';
	}

	let container = $('<div>').attr('id', 'hitokoto').append(
		$('<a>').attr({id: 'hitokoto_logo', target: '_blank', href: 'https://hitokoto.cn'}).text('㋪'),
		$('<a>').attr({id: 'hitokoto_text', target: '_blank'}).text('正在获取一言……')
	);

	$(pos).append(container);

	// https://developer.hitokoto.cn/sentence/demo/
	fetch('https://v1.hitokoto.cn')
		.then(response => response.json())
		.then(data => {
			const hitokoto = $('#hitokoto_text');
			hitokoto.attr('href', 'https://hitokoto.cn/?uuid=' + data.uuid).text(data.hitokoto);
		})
		.catch(console.error);
});

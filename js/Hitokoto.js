mw.loader.addStyleTag(`
#hitokoto {
	display: flex;
	justify-content: center;
	gap: 5px;
	margin-bottom: 0.9em;
}

#hitokoto_logo {
	color: #8921FF;
	user-select: none;
}

#hitokoto_logo:hover {
	text-decoration: none;
}

#hitokoto_text {
	color: #333;
}

#hitokoto_refresh {
	width: 12px;
	cursor: pointer;
	color: #666;
	transition: color 0.2s, transform 0.2s;
}

#hitokoto_refresh:hover {
	color: #8921FF;
}

#hitokoto_refresh svg {
	width: 100%;
	height: 100%;
}

#hitokoto_refresh.loading {
	animation: spin 1s linear infinite;
}

@keyframes spin {
	from { transform: rotate(0deg); }
	to { transform: rotate(360deg); }
}

#hitokoto_refresh.loading svg {
	display: block;
}
`);

$(() => {
	let pos = '';
	if (mw.config.get('skin') == 'moeskin') {
		pos = $(window).width() <= 768 ? '#moe-article-header-title' : '#moe-sitenotice-container';
	} else {
		pos = '#siteNotice';
	}

	// Icon from Remix Icon
	const refreshIcon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"></path></svg>`;

	let container = $('<div>').attr('id', 'hitokoto').append(
		$('<a>').attr({id: 'hitokoto_logo', target: '_blank', href: 'https://hitokoto.cn'}).text('㋪'),
		$('<a>').attr({id: 'hitokoto_text', target: '_blank'}).text('正在获取一言……'),
		$('<span>').attr({id: 'hitokoto_refresh', title: '换一个'}).html(refreshIcon)
	);

	$(pos).append(container);

	const hitokoto_cache_key = 'hitokoto_cache';
	const hitokoto_cache_duration = 60 * 1000;

	function fetchHitokoto() {
		const hitokoto_text = $('#hitokoto_text');
		const hitokoto_refresh = $('#hitokoto_refresh');

		hitokoto_text.text('正在获取一言……');
		hitokoto_refresh.addClass('loading');

		// https://developer.hitokoto.cn/sentence/demo/
		fetch('https://v1.hitokoto.cn')
			.then(response => response.json())
			.then(data => {
				const url = 'https://hitokoto.cn/?uuid=' + data.uuid;
				hitokoto_text.attr('href', url).text(data.hitokoto);

				localStorage.setItem(hitokoto_cache_key, JSON.stringify({
					text: data.hitokoto,
					url: url,
					timestamp: Date.now()
				}));
			})
			.catch(e => {
				console.error(e);
				hitokoto_text.text('获取一言失败，请稍后重试');
			})
			.finally(() => {
				hitokoto_refresh.removeClass('loading');
			});
	}

	function loadHitokoto() {
		const hitokoto_cached = localStorage.getItem(hitokoto_cache_key);

		if (hitokoto_cached) {
			const { text, url, timestamp } = JSON.parse(hitokoto_cached);
			if (Date.now() - timestamp < hitokoto_cache_duration) {
				$('#hitokoto_text').attr('href', url).text(text);
				return;
			}
		}

		fetchHitokoto();
	}

	$('#hitokoto_refresh').on('click', () => {
		localStorage.removeItem(hitokoto_cache_key);
		fetchHitokoto();
	});

	loadHitokoto();
});

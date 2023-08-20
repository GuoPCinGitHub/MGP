$(() => (async () => {
	if ($('.mw-parser-output style').length > 0) {
		await mw.loader.using(["mediawiki.api", "oojs-ui"]);

		let list = $('<ol>').attr('style', 'font-size: 0.9em; margin-left: 2em; list-style: decimal;');
		let tsrevs = [];
		$('.mw-parser-output style').each(function () {
			let revid = $(this).attr('data-mw-deduplicate');
			if (revid) {
				tsrevs.push(revid.slice(16));
			}

		});

		const TITLES = await getPageTitleByDiff(tsrevs.join('|'));

		for (let i = 0; i < tsrevs.length; i++) {
			let line = $('<li>')
				.append($('<a>').text(TITLES[i]).attr({
					href: '/' + TITLES[i],
					target: '_blank',
					rel: 'noopener noreferrer'
				}))
				.append($('<span>').text('，使用的版本为'))
				.append($('<a>').text(tsrevs[i]).attr({
					href: '/_?oldid=' + tsrevs[i],
					target: '_blank',
					rel: 'noopener noreferrer'
				}));
			list.append(line);
		}

		insertTSI(list);
	} else {
		return;
	}

	// 通过API查询修订版本ID对应的页面标题
	async function getPageTitleByDiff(revids) {
		const API = new mw.Api();
		let revtitles = [];

		return await API.get({
			action: "query",
			format: "json",
			prop: "info",
			revids: revids
		}).then((res) => {
			for (const PAGE of Object.values(res.query.pages)) {
				revtitles.push(PAGE.title);
			};
			return revtitles;
		});
	}

	// 构造并插入PopupButton
	function insertTSI(content) {
		const TSI = new OO.ui.PopupButtonWidget({
			icon: 'puzzle',
			iconTitle: wgULS('模板样式表', '模板樣式表'),
			flags: 'progressive',
			framed: false,
			id: "pc-templatestyles-button",
			popup: {
				head: true,
				label: $(`<strong>${wgULS('此页面使用的模板样式表', '此頁面使用的模板樣式表')}</strong>`),
				$content: $('<div>').addClass('pc-templatestyles-list').append(content),
				padded: true,
				align: mw.config.get('skin') == 'moeskin' ? 'backwards' : 'center',
				autoFlip: false
			}
		});

		let pos = '';
		switch (mw.config.get('skin')) {
			case 'moeskin':
				pos = $('.moe-indicators').length > 0 ? '.moe-indicators' : '0';
				break;
			case 'vector':
			default:
				pos = $('.mw-indicators');
		}

		if (pos == '0') {
			mw.loader.addStyleTag(`
			.pc-templatestyles {
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
				height: 42px;
				margin: 10px 5px 5px 5px;
			}
			@media (max-width: 768px) {
				.pc-templatestyles {
					float: none;
					margin: 0 0 5px 0;
					height: auto;
					order: 5;
				}
				.header-title-extra {
					order: 6;
				}
				#moe-article-header-title {
					display: flex;
					flex-direction: column;
				}
			}
			`);
			const ELE = $('<div>').addClass('pc-templatestyles').append(TSI.$element);
			$('#moe-article-header-title').prepend(ELE);
		} else {
			$(pos).append(TSI.$element);
		}
	}
})());
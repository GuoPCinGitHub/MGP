$(() => (async () => {
	if (mw.config.get("wgNamespaceNumber") != -1 && $('.mw-parser-output style[data-mw-deduplicate]').length > 0) {
		await mw.loader.using(["mediawiki.api", "oojs-ui"]);

		let list = $('<ol>').attr('style', 'font-size: 0.9em; margin-left: 2em; list-style: decimal;');
		let tsrevs = [];
		$('.mw-parser-output style[data-mw-deduplicate]').each(function () {
			let revid = $(this).attr('data-mw-deduplicate');
			if (revid) {
				tsrevs.push(revid.slice(16));
			}
		});

		insertTSI();

		$('#pc-templatestyles-button > .oo-ui-buttonElement-button').on('click', async () => {
			if (list.children().length > 0) {
				return;
			} else {
				const TITLES = await getPageTitleByDiff(tsrevs.join('|'));

				for (let i = 0; i < tsrevs.length; i++) {
					let line = $('<li>')
						.append($('<a>').text(TITLES[i]).attr({
							href: '/' + TITLES[i],
							target: '_blank',
							rel: 'noopener noreferrer'
						}));
					list.append(line);
				}

				$('#pc-templatestyles-list-loading').hide();
				$('#pc-templatestyles-list').append(list);
			}
		});
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
			}
			return revtitles;
		});
	}

	// 构造并插入PopupButton
	function insertTSI() {
		const TSILoading = new OO.ui.ProgressBarWidget({
			id: "pc-templatestyles-list-loading",
			progress: false
		})

		const TSIMain = new OO.ui.PopupButtonWidget({
			icon: 'puzzle',
			iconTitle: wgULS('模板样式表', '模板樣式表'),
			flags: 'progressive',
			framed: false,
			id: "pc-templatestyles-button",
			popup: {
				head: true,
				label: $(`<strong>${wgULS('此页面使用的模板样式表', '此頁面使用的模板樣式表')}</strong>`),
				$content: $('<div>').attr('id', 'pc-templatestyles-list').append(TSILoading.$element),
				padded: true,
				align: mw.config.get('skin') == 'moeskin' ? ($(window).width() > 768 ? 'backwards' : 'center') : 'center',
				autoFlip: false
			}
		});

		let pos = '';
		switch (mw.config.get('skin')) {
			case 'moeskin':
				pos = $('.moe-indicators').length > 0 ? '.moe-indicators' : '0';
				break;
			case 'vector':
			case 'vector-2022':
			default:
				pos = $('.mw-indicators');
		}

		if (pos == '0') {
			mw.loader.addStyleTag(`
			#pc-templatestyles {
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
				height: 42px;
				margin: 10px 5px 5px 5px;
			}
			@media (max-width: 768px) {
				#pc-templatestyles {
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
			const ELE = $('<div>').attr('id', 'pc-templatestyles').append(TSIMain.$element);
			$('#moe-article-header-title').prepend(ELE);
		} else {
			mw.loader.addStyleTag(`
			.vector-body-before-content {
				overflow: visible !important;
				min-height: 40px;
			}
			#mw-indicator-mw-helplink {
				display: inline-flex;
			}
			`);
			$(pos).append(TSIMain.$element);
		}
	}

})());

/* Icon path originated from Remix Icon */

$(() => (async () => {
	await mw.loader.using("ext.gadget.SideBarPic");
	if ($('.sidebar-character > img').length > 0 && $('.sidebar-character > img').is(':visible')) {
		$('.sidebar-character').each(function () {
			if ($(this).attr('data-displaylogo')) {
				mw.loader.addStyleTag(`
				.pc-bg-info {
					display: flex;
					flex-direction: row-reverse;
					align-items: center;
					position: fixed;
					bottom: .6em;
					right: .6em;
					z-index: 21;
					background: #FFFA;
					backdrop-filter: blur(5px);
					border-radius: 2px;
					line-height: 24px;
					width: 24px;
					height: 24px;
					cursor: pointer;
				}

				.pc-bg-info-icon {
					display: inline-block;
					background: #1A2947;
					clip-path: path("M20 5H4V19L13.2923 9.70649C13.6828 9.31595 14.3159 9.31591 14.7065 9.70641L20 15.0104V5ZM2 3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918C2.44405 21 2 20.5551 2 20.0066V3.9934ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z");
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
					padding: 0 2px 0 5px;
				}

				main.moe-flexible-container .pc-bg-info {
					bottom: 0;
					right: 0;
				}
				`);
				let src = $(this).children('img').attr('src').replace(/[<>\\]/g, '');
				let txt = '背景：' + src;
				if (/img.moegirl/g.test(src) || /storage.moegirl.org.cn\/moegirl\/commons/g.test(src)) {
					const ls = src.split('/');
					const file = ls[ls.length - 1];
					src = mw.config.get("wgServer") + '/cm:File:' + file;
					txt = '背景：萌娘共享上的File:' + window['decodeURIComponent'](file);
				}
				const pos = $('#mw-navigation').length > 0 ? '#mw-navigation' : 'main.moe-flexible-container';
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
		});
	} else {
		return;
	}
})());

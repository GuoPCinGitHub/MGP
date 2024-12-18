$(() => {
	if (mw.config.get("wgNamespaceNumber") != -1
		&& !["submit", "edit"].includes(mw.config.get("wgAction"))
		&& $('.moderation-notice').length > 0) {
		mw.loader.addStyleTag(`
		.pc-mod-icon {
			display: inline-flex;
			align-items: center;
			justify-content: center;
			width: 21px;
			height: 31px;
			margin-right: .5em;
			padding: 0 5px;
			vertical-align: middle;
		}
		`);
		
		const MOD_TEXT = $('.moderation-notice').text();
		const MOD_SITU_LIST = {
			'self': '自己的编辑',
			'skpd': '被跳过',
			'prev': '不是页面的最新版本'
		};
		const MOD_NAME_LIST = {
			'self': '可查看自己当前的编辑但等待审核',
			'skpd': '较新版本通过审核而被跳过',
			'prev': '当前阅读的不是最新版本'
		};
		const MOD_PATH_LIST = {
			'self': 'M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5ZM7.52746 17H16.4725C16.2238 14.75 14.3163 13 12 13C9.68372 13 7.77619 14.75 7.52746 17Z',
			'skpd': 'M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM15 11V10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10V11H8V16H16V11H15ZM13 11H11V10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V11Z',
			'prev': 'M16 2L21 6.999V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM13 9H11V15H16V13H13V9Z'
		};

		// 构造并插入ModIcon
		let setModIcon = (title, d) => '<span class="pc-mod-icon" title="' + title + '"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="var(--theme-warn-color,green)"><path d="' + d + '"></path></svg></span>';

		let pos = '';
		switch (mw.config.get('skin')) {
			case 'moeskin':
				pos = $('.moe-indicators').length > 0 ? '.moe-indicators' : '0';
				break;
			case 'vector':
			default:
				pos = $('.mw-indicators');
		}

		$.each(MOD_SITU_LIST, function (k, v) {
			let modSituReg = new RegExp(v);
			if (modSituReg.test(MOD_TEXT)) {
				if (pos == '0') {
					mw.loader.addStyleTag(`
					#pc-mod {
						display: flex;
						justify-content: center;
						align-items: center;
						float: right;
						height: 42px;
						margin: 10px 5px 5px 5px;
					}
					.pc-mod-icon {
						padding: 0 !important;
					}
					@media (max-width: 768px) {
						#pc-mod {
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
					$('#moe-article-header-title').prepend($('<div>').attr('id', 'pc-mod').append(setModIcon(MOD_NAME_LIST[k], MOD_PATH_LIST[k])));
				} else {
					$(pos).append(setModIcon(MOD_NAME_LIST[k], MOD_PATH_LIST[k]));
				}
				return false;
			}
		});

		// 恢复编辑按钮为最后版本
		if (!window.location.search) {
			$('#ca-edit a').attr('href', $('#ca-edit a').attr('href').replace(/&oldid=\d+/g, ''));
		}
	}
});
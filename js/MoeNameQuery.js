$(() => (async () => {
	if (mw.config.get('wgCanonicalSpecialPageName') !== 'Contributions') return;

	await mw.loader.using(['mediawiki.api', 'oojs-ui']);
	const api = new mw.Api();
	const $targetInputWidget = $('#mw-target-user-or-ip');
	const targetWidget = OO.ui.infuse($targetInputWidget[0]);

	// 构造OOUI
	const moenameFieldLayout = new OO.ui.FieldLayout(
		new OO.ui.Widget(null), {
			label: wgULS(undefined, undefined,
				'按昵称查询用户名：',
				'按暱稱查詢使用者名稱：',
				'按暱稱查詢用戶名：'
			),
			align: 'top',
			classes: ['pc-moename-query-field']
		}
	);

	const moenameInput = new OO.ui.TextInputWidget({
		placeholder: wgULS(undefined, undefined,
			'请输入用户昵称（无需后缀）',
			'請輸入使用者暱稱（無需後綴）',
			'請輸入用戶暱稱（無需後綴）'
		),
		minLength: 2,
		maxLength: 32,
		classes: ['pc-moename-query-input']
	});

	const moenameButton = new OO.ui.ButtonWidget({
		label: wgULS('查询', '查詢'),
		classes: ['pc-moename-query-button']
	});

	const moenameLabel = new OO.ui.LabelWidget({
		label: '',
		classes: ['pc-moename-query-status']
	});

	const moenameActionLayout = new OO.ui.ActionFieldLayout(
		moenameInput, moenameButton, {
			align: 'top',
			classes: ['pc-moename-query-action']
		}
	);

	const moenamePanelLayout = new OO.ui.PanelLayout({
		expanded: false,
		classes: ['pc-moename-query-panel']
	});

	moenamePanelLayout.$element.append(moenameActionLayout.$element, moenameLabel.$element);
	moenameFieldLayout.$element.find('.oo-ui-fieldLayout-field').replaceWith(
		$('<span class="oo-ui-fieldLayout-field"></span>').append(moenamePanelLayout.$element)
	);
	$targetInputWidget.after(moenameFieldLayout.$element);

	// API：查询用户ID
	const getUserIdsByMoeName = async (moename) => {
		return api.get({
			action: 'moedisplayname',
			op: 'get',
			displayname: moename,
			format: 'json'
		}).then(function (data) {
			if (data && data.displaynames) {
				return data.displaynames;
			} else {
				return [];
			}
		}).catch(function (error) {
			moenameLabel.setLabel(wgULS(undefined, undefined,
				'API：查询用户ID出错：',
				'API：查詢使用者ID出錯：',
				'API：查詢用戶ID出錯：',
			) + error);
		});
	};

	// API：查询单一用户名
	const getUserNameByUserId = async (userid) => {
		return api.get({
			action: 'query',
			list: 'users',
			usprop: 'name',
			ususerids: userid,
			format: 'json'
		}).then(function (data) {
			if (data && data.query && data.query.users && data.query.users.length > 0) {
				return data.query.users[0].name;
			} else {
				moenameLabel.setLabel(wgULS(undefined, undefined,
					'未找到指定用户ID对应的用户名',
					'未找到指定使用者ID對應的使用者名稱',
					'未找到指定用戶ID對應的用戶名'
				));
			}
		}).catch(function (error) {
			moenameLabel.setLabel(wgULS(undefined, undefined,
				'API：查询单一用户名出错：',
				'API：查詢單一使用者名稱出錯：',
				'API：查詢單一用戶名出錯：'
			) + error);
		});
	};

	// API：批量查询用户名
	const getUserNamesByUserIds = async (userids) => {
		return api.get({
			action: 'query',
			list: 'users',
			usprop: 'name',
			ususerids: userids.join('|'),
			format: 'json'
		}).then(function (data) {
			if (data && data.query && data.query.users) {
				const userMap = {};
				data.query.users.forEach(function (user) {
					if (user.name) userMap[user.userid] = user.name;
				});
				return userMap;
			} else {
				return {};
			}
		}).catch(function (error) {
			moenameLabel.setLabel(wgULS(undefined, undefined,
				'API：批量查询用户名出错：',
				'API：批量查詢使用者名稱出錯：',
				'API：批量查詢用戶名出錯：'
			) + error);
			return {};
		});
	};

	// 显示分页选择对话框
	async function showPagedSelectDialog(allItems) {
		moenameLabel.setLabel(wgULS(undefined, undefined,
			'正在加载所有用户信息…',
			'正在載入所有使用者資訊…',
			'正在載入所有用戶資訊…'
		));

		const allUserIds = allItems.map(c => c.userid);
		const allUserMap = await getUserNamesByUserIds(allUserIds);
		const pageSize = 10;
		let currentPage = 0;
		const totalPages = Math.ceil(allItems.length / pageSize);
		let selectedData = null;
		let dialogInstance = null;
		let isLoading = false;

		// 构建对话框
		function createDialog() {
			const menu = new OO.ui.SelectWidget({
				classes: ['pc-moename-query-select']
			});

			const prevButton = new OO.ui.ButtonWidget({
				label: wgULS('上一页', '上一頁'),
				icon: 'previous',
				disabled: true
			});

			const pageInfoLabel = new OO.ui.LabelWidget({
				label: '第1/' + totalPages + wgULS('页', '頁')
			});

			const nextButton = new OO.ui.ButtonWidget({
				label: wgULS('下一页', '下一頁'),
				icon: 'next',
				disabled: true
			});

			const paginationLayout = new OO.ui.HorizontalLayout({
				items: [prevButton, pageInfoLabel, nextButton],
				classes: ['pc-moename-select-pagination']
			});

			const titleLabel = new OO.ui.LabelWidget({
				label: wgULS(undefined, undefined,
					'请在下方点击选择一个用户，然后点击右上角的“确认”按钮：',
					'請在下方點擊選擇一個使用者，然後點擊右上角的「確認」按鈕：',
					'請在下方點擊選擇一個用戶，然後點擊右上角的「確認」按鈕：'
				),
				classes: ['pc-moename-select-title']
			});

			const loadingLabel = new OO.ui.LabelWidget({
				label: wgULS(undefined, undefined,
					'正在加载用户信息…',
					'正在載入使用者資訊…',
					'正在載入用戶資訊…'
				),
				classes: ['pc-moename-select-loading']
			});

			const contentPanel = new OO.ui.PanelLayout({
				padded: true,
				expanded: false
			});

			contentPanel.$element.append(
				titleLabel.$element,
				loadingLabel.$element,
				menu.$element,
				paginationLayout.$element
			);

			// 更新确认按钮状态
			function updateConfirmButton(disabled) {
				if (dialogInstance && dialogInstance.actions) {
					const actions = dialogInstance.actions;
					const selectAction = actions.get({actions: 'select'})[0];
					if (selectAction) selectAction.setDisabled(disabled);
				}
			}

			// 加载页面数据
			function loadPage() {
				if (isLoading) return;
				isLoading = true;

				const start = currentPage * pageSize;
				const end = Math.min(start + pageSize, allItems.length);
				const pageItems = allItems.slice(start, end);

				menu.clearItems();
				menu.setDisabled(false);
				loadingLabel.setLabel('');

				const items = pageItems.map(function (item) {
					const username = allUserMap[item.userid]
						|| wgULS(undefined, undefined, '未知用户（ID：', '未知使用者（ID：', '未知用戶（ID：') + item.userid + '）';
					return new OO.ui.MenuOptionWidget({
						data: item,
						label: username + wgULS('（昵称：', '（暱稱：') + item.displayname + '#' + item.displaytag + '）',
						description: wgULS(undefined, undefined, '用户ID：', '使用者ID：', '用戶ID：') + item.userid
					});
				});

				menu.clearItems();
				items.forEach(function (item) {
					menu.addItems([item]);
				});

				pageInfoLabel.setLabel('第' + (currentPage + 1) + '/' + totalPages + wgULS('页', '頁'));
				prevButton.setDisabled(currentPage === 0);
				nextButton.setDisabled(currentPage >= totalPages - 1);

				selectedData = null;
				updateConfirmButton(true);
				isLoading = false;
			}

			// 监听菜单选择
			menu.on('select', function (item) {
				if (item) {
					selectedData = item.getData();
					updateConfirmButton(false);
				} else {
					selectedData = null;
					updateConfirmButton(true);
				}
			});

			// 分页按钮交互
			prevButton.on('click', function () {
				if (currentPage > 0 && !isLoading) {
					currentPage--;
					loadPage(false);
					menu.selectItem(null);
					selectedData = null;
					updateConfirmButton(true);
				}
			});

			nextButton.on('click', function () {
				if (currentPage < totalPages - 1 && !isLoading) {
					currentPage++;
					loadPage(false);
					menu.selectItem(null);
					selectedData = null;
					updateConfirmButton(true);
				}
			});

			// 对话框类
			function SelectionDialog(config) {
				SelectionDialog.super.call(this, config);
			}
			OO.inheritClass(SelectionDialog, OO.ui.ProcessDialog);
			SelectionDialog.static.name = 'selectionDialog';
			SelectionDialog.static.title = wgULS(undefined, undefined,
				'请选择用户 - 找到',
				'請選擇使用者 - 找到',
				'請選擇用戶 - 找到'
			) + allItems.length + wgULS(undefined, undefined,
				'个匹配用户', '個匹配使用者', '個匹配用戶'
			);
			SelectionDialog.static.actions = [
				{
					action: 'select',
					label: wgULS('确认', '確認'),
					flags: ['primary', 'progressive'],
					disabled: true
				},
				{
					action: 'cancel',
					label: '取消',
					flags: ['safe', 'close']
				}
			];

			SelectionDialog.prototype.initialize = function () {
				SelectionDialog.super.prototype.initialize.call(this);
				this.$body.append(contentPanel.$element);
				dialogInstance = this;
				loadPage();
			};

			SelectionDialog.prototype.getActionProcess = function (action) {
				if (action === 'select') {
					if (selectedData) {
						const data = selectedData;
						return new OO.ui.Process(function () {
							this.close().closed.then(function () {
								moenameLabel.setLabel(wgULS(undefined, undefined,
									'正在获取用户信息…',
									'正在取得使用者資訊…',
									'正在取得用戶資訊…'
								));
								const username = allUserMap[data.userid];
								if (username) {
									targetWidget.setValue(username);
									moenameLabel.setLabel(wgULS('已选择：', '已選擇：') + username
										+ wgULS('（昵称：', '（暱稱：')
										+ data.displayname + '#' + data.displaytag + '）'
									);
								} else {
									getUserNameByUserId(data.userid).then(function (username) {
										targetWidget.setValue(username);
										moenameLabel.setLabel(wgULS('已选择：', '已選擇：') + username
											+ wgULS('（昵称：', '（暱稱：')
											+ data.displayname + '#' + data.displaytag + '）'
										);
									}).catch(function (error) {
										moenameLabel.setLabel(wgULS(undefined, undefined,
											'获取用户名失败：',
											'取得使用者名稱失敗：',
											'取得用戶名失敗：'
										) + error.message);
									});
								}
							});
						}, this);
					} else {
						moenameLabel.setLabel(wgULS(undefined, undefined,
							'请先选择一个用户',
							'請先選擇一個使用者',
							'請先選擇一個用戶'
						));
						return new OO.ui.Process(function () {});
					}
				} else if (action === 'cancel') {
					return new OO.ui.Process(function () {
						this.close().closed.then(function () {
							moenameLabel.setLabel(wgULS('已取消选择', '已取消選擇'));
						});
					}, this);
				}
				return SelectionDialog.super.prototype.getActionProcess.call(this, action);
			};

			return SelectionDialog;
		}

		// 创建对话框实例
		const DialogClass = createDialog();
		const windowManager = new OO.ui.WindowManager();
		$(document.body).append(windowManager.$element);

		const dialog = new DialogClass({
			size: 'large',
			classes: ['pc-moename-select-dialog']
		});
		windowManager.addWindows([dialog]);
		windowManager.openWindow(dialog);
	}

	// 处理查询
	function handleQuery() {
		const moename = moenameInput.getValue().trim();
		if (!moename) {
			moenameLabel.setLabel(wgULS('请输入昵称', '請輸入暱稱'));
			return;
		}

		moenameLabel.setLabel(wgULS('正在查询…', '正在查詢…'));
		moenameButton.setDisabled(true);

		getUserIdsByMoeName(moename).then(function (displaynames) {
			moenameButton.setDisabled(false);
			if (!displaynames || displaynames.length === 0) {
				moenameLabel.setLabel(wgULS('未找到匹配的昵称，请检查输入', '未找到匹配的暱稱，請檢查輸入'));
				return;
			}

			if (displaynames.length === 1) {
				const userId = displaynames[0].userid;
				moenameLabel.setLabel(wgULS(undefined, undefined,
					'找到1个用户，正在获取用户名…',
					'找到1個使用者，正在取得使用者名稱…',
					'找到1個用戶，正在取得用戶名…'
				));
				getUserNameByUserId(userId).then(function (username) {
					targetWidget.setValue(username);
					moenameLabel.setLabel('已填入：' + username
						+ wgULS('（昵称：', '（暱稱：') + displaynames[0].displayname
						+ '#' + displaynames[0].displaytag + '）'
					);
				}).catch(function(error) {
					moenameLabel.setLabel(wgULS(undefined, undefined,
						'获取用户名失败：',
						'取得使用者名稱失敗：',
						'取得用戶名失敗：'
					) + error.message);
				});
			} else {
				showPagedSelectDialog(displaynames);
				moenameLabel.setLabel('找到' + displaynames.length
					+ wgULS(undefined, undefined,
						'个匹配用户，请等待API查询完成后在弹出的对话框中选择',
						'個匹配使用者，請等待API查詢完成後在彈出的對話框中選擇',
						'個匹配用戶，請等待API查詢完成後在彈出的對話框中選擇'
					)
				);
			}
		}).catch(function (error) {
			moenameButton.setDisabled(false);
			moenameLabel.setLabel(wgULS('查询出错：', '查詢出錯：') + error.message);
		});
	}

	moenameButton.on('click', handleQuery);
	moenameInput.on('enter', handleQuery);

	// 样式
	mw.loader.addStyleTag(`
		.pc-moename-query-status {
			display: inline-block;
			font-style: italic;
			margin-left: 8px;
			padding: 4px 0;
			opacity: 0.8;
		}
		.pc-moename-query-status:empty {
			display: none;
		}
		.pc-moename-query-select {
			margin-top: 0.5em;
		}
		.pc-moename-query-select .oo-ui-menuOptionWidget {
			cursor: pointer;
		}
		.pc-moename-select-pagination {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 1em;
			margin-top: 0.5em;
		}
		.pc-moename-select-pagination > .oo-ui-buttonElement > .oo-ui-buttonElement-button > .oo-ui-labelElement-label {
			line-height: normal;
		}
		.pc-moename-select-loading {
			display: block;
			text-align: center;
			padding: 20px;
			opacity: 0.8;
		}
		.pc-moename-select-loading:empty {
			display: none;
		}
		.pc-moename-select-dialog .oo-ui-window-frame {
			min-height: fit-content;
		}
		.pc-moename-select-dialog .oo-ui-window-content,
		.pc-moename-select-dialog .oo-ui-window-head,
		.pc-moename-select-dialog .oo-ui-window-body {
			position: unset;
		}
	`);
})());

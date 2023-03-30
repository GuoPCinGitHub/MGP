var timer = setInterval(function () {
	if ($('#Wikiplus-Edit-TopBtn').length > 0) { // 检测Wikiplus窄屏顶部编辑按钮
		clearInterval(timer);
		var pageToolIcon = $('#ca-view .xicon svg').clone();
		if ($('#Wikiplus-Edit-TopBtn a').css('clip-path')) { // 检测MoeSkinPlus
			pageToolIcon.children().attr('d', $('#Wikiplus-Edit-TopBtn a').css('clip-path').slice(6, -2));
		} else {
			pageToolIcon = '<span style="align-self:center;font:0.7em bold;">W+</span>';
		}
		mw.hook("moeskin.pagetools").add(function (_ref) {
			var addPageToolsButton = _ref.addPageToolsButton;
			var wikiplusSideBtn = addPageToolsButton(pageToolIcon, 'Wikiplus快速编辑');
			wikiplusSideBtn.on('click', function () {
				$('#Wikiplus-Edit-TopBtn').trigger('click');
			});
		});
	} else {
		return;
	}
}, 3000);
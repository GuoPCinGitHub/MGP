// 添加 Vector 皮肤下的快捷键
$(function() {
	if ($(".dropdown-link").length > 0) {
		$(".links-group:eq(0) .dropdown-list-item:eq(0) a").attr("accesskey", "z"); // 访问首页
		$(".links-group:eq(0) .dropdown-list-item:eq(1) a").attr("accesskey", "x"); // 随机页面
		$(".links-group:eq(0) .dropdown-list-item:eq(2) a").attr("accesskey", "r"); // 最近更改
	}
});

// 显示快捷键
mw.loader.addStyleTag(`
.dropdown-key::after {
	content: attr(accesskey);
	display: block;
	position: absolute;
	bottom: 5px;
	right: 10px;
	background: var(--theme-accent-color);
	border-radius: 3px;
	color: #FFF;
	font-family: monospace;
	font-size: 0.8em;
	font-weight: bold;
	line-height: 1.1rem;
	text-transform: capitalize;
	padding: 0px 2px;
	user-select: none;
}

.toolbar-key::after {
	content: attr(accesskey);
	position: absolute;
	right: -8px;
	bottom: -2px;
	display: inline-block;
	background: #FFF;
	border-radius: 2px;
	box-shadow: var(--theme-card-box-shadow);
	color: var(--theme-accent-color);
	font-family: monospace;
	font-size: xx-small;
	font-weight: bold;
	text-shadow: none;
	text-transform: capitalize;
	margin: 0px 2px;
	padding: 2px;
	user-select: none;
	z-index: 3;
}
`);

$(function() {
	if ($(".dropdown-link").length > 0 && $(".toolbar-link").length > 0 && $(".dropdown-content").length > 0) {
		$(".dropdown-link, .dropdown-content a").each(function () {
			if ($(this).attr("accesskey")) {
				$(this).css('position', 'relative');
				$(this).addClass('dropdown-key');
			}
		});
		$(".toolbar-link a").each(function () {
			if ($(this).attr("accesskey")) {
				$(this).css('position', 'relative');
				$(this).addClass('toolbar-key');
			}
		});
	}
});
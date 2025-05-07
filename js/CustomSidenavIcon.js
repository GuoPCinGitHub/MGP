const iconSet = (ele, name, paths) => $(ele).prev().children().children().attr('class', 'tabler-icon tabler-icon-' + name).html(paths);

$('#moe-full-container').on('click touchend', '.sidenav-toggler button, .n-menu-item-content', function () {
	if ($('#moe-global-header-sidenav.is-show').length > 0) {
		$('.n-menu-item-content-header').each(function () {
			switch ($(this).text()) {
				case ('导航'):
					iconSet(this, 'compass', '<path d="M8 16l2 -6l6 -2l-2 6l-6 2" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 3l0 2" /><path d="M12 19l0 2" /><path d="M3 12l2 0" /><path d="M19 12l2 0" />');
					break;
				case ('讨论版'):
					iconSet(this, 'messages', '<path d="M21 14l-3 -3h-7a1 1 0 0 1 -1 -1v-6a1 1 0 0 1 1 -1h9a1 1 0 0 1 1 1v10" /><path d="M14 15v2a1 1 0 0 1 -1 1h-7l-3 3v-10a1 1 0 0 1 1 -1h2" />');
					break;
				case ('分类索引'):
					iconSet(this, 'folders', '<path d="M9 4h3l2 2h5a2 2 0 0 1 2 2v7a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M17 17v2a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2h2" />');
					break;
				case ('帮助'):
					iconSet(this, 'help', '<path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 17l0 .01" /><path d="M12 13.5a1.5 1.5 0 0 1 1 -1.5a2.6 2.6 0 1 0 -3 -4" />');
					break;
				case ('关注我们'):
					iconSet(this, 'sunglasses', '<path d="M8 4h-2l-3 10" /><path d="M16 4h2l3 10" /><path d="M10 16h4" /><path d="M21 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5" /><path d="M10 16.5a3.5 3.5 0 0 1 -7 0v-2.5h7v2.5" /><path d="M4 14l4.5 4.5" /><path d="M15 14l4.5 4.5" />');
					break;
				default:
					break;
			}
		});
	}
});

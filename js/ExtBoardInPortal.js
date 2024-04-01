mw.loader.addStyleTag(`
a#n-sidebar-discussionboard-new {
	position: absolute;
	top: 4px;
	right: 3px;
	background: #E2F4FD;
	border-radius: 2px;
	color: #0D77AC !important;
	font-size: 12px;
	font-weight: bold;
	line-height: 12px;
	text-align: center;
	text-shadow: none;
	transition: background .1s ease-in;
	width: 15px;
	height: 15px;
	user-select: none;
}
a#n-sidebar-discussionboard-new:hover {
	background: #1AA7EE;
	color: #FFF !important;
	text-decoration: none;
}
`);
var discussionBoard = $('#n-sidebar-discussionboard').clone();
var discussionBoardNames = [wgULS('技术实现', '技術實現'), wgULS('权限变更', '權限變更'), wgULS('操作申请', '操作申請'), wgULS('方针政策', '方針政策'), wgULS('页面相关', '頁面相關'), wgULS('提问求助', '提問求助'), wgULS('群组信息', '群組資訊')];
var discussionBoardAbbrs = ['tec', 'rgt', 'act', 'pol', 'pge', 'que', 'grp'];
var discussionBoardPortalObj = $('<div>').attr({
		'id': 'p-discussionboard',
		'class': 'portal',
		'role': 'navigation',
		'aria-labelledby': 'p-discussionboard-label'
	})
	.append($('<h3>').attr('id', 'p-discussionboard-label').text(wgULS('讨论版', '討論版')))
	.append($('<div>').addClass('body').append($('<ul>')));
$('#p-navigation').after(discussionBoardPortalObj);
$('#n-sidebar-discussionboard').hide();
for (var i = 0; i < discussionBoardNames.length; i++) {
	var discussionBoardNewBtn = $('<a>').text('+')
		.attr({
			'href': '/index.php?title=萌娘百科_talk:讨论版/' + discussionBoardNames[i] + '&action=edit&section=new',
			'title': '在' + discussionBoardNames[i] + '版下' + wgULS('添加话题', '添加話題'),
			'target': '_blank',
			'rel': 'noopener noreferrer',
			'id': 'n-sidebar-discussionboard-new'
		});
	var discussionBoardLiObj = $('<li>').attr('id', 'n-sidebar-discussionboard' + discussionBoardAbbrs[i])
		.append($('<a>').attr('href', '/萌娘百科_talk:讨论版/' + discussionBoardNames[i]).text(discussionBoardNames[i]))
		.append(discussionBoardNewBtn)
		.css('position', 'relative');
	$('#p-discussionboard ul').append(discussionBoardLiObj);
}
$('#p-discussionboard ul').prepend(discussionBoard);
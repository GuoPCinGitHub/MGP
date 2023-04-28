mw.loader.addStyleTag(`
a#n-sidebar-discussionboard-new {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	position: absolute;
	top: 4px;
	right: 3px;
	background: #E2F4FD;
	border-radius: 2px;
	color: #0D77AC !important;
	font-weight: bold;
	text-shadow: none;
	transition: all .1s ease-in;
	width: 15px;
	height: 15px;
}
a#n-sidebar-discussionboard-new:hover {
	background: #1AA7EE;
	color: #FFF !important;
	text-decoration: none;
}
`);
var discussionBoard = $('#n-sidebar-discussionboard').clone();
var discussionBoardNames = ['技术实现', '权限变更', '操作申请', '方针政策', '页面相关', '提问求助', '群组信息'];
var discussionBoardAbbrs = ['tec', 'rgt', 'act', 'pol', 'pge', 'que', 'grp'];
var discussionBoardPortalObj = $('<div>').attr({
		'id': 'p-discussionboard',
		'class': 'portal',
		'role': 'navigation',
		'aria-labelledby': 'p-discussionboard-label'
	})
	.append($('<h3>').attr('id', 'p-discussionboard-label').text('讨论版'))
	.append($('<div>').addClass('body').append($('<ul>')));
$('#p-navigation').after(discussionBoardPortalObj);
$('#n-sidebar-discussionboard').hide();
for (var i = 0; i < discussionBoardNames.length; i++) {
	var discussionBoardNewBtn = $('<a>').text('+')
		.attr({
			'href': '/index.php?title=萌娘百科_talk:讨论版/' + discussionBoardNames[i] + '&action=edit&section=new',
			'target': '_blank',
			'id': 'n-sidebar-discussionboard-new',
			'title': '在' + discussionBoardNames[i] + '版下添加话题'
		});
	var discussionBoardLiObj = $('<li>').attr('id', 'n-sidebar-discussionboard' + discussionBoardAbbrs[i])
		.append($('<a>').attr('href', '/萌娘百科_talk:讨论版/' + discussionBoardNames[i]).text(discussionBoardNames[i]))
		.append(discussionBoardNewBtn)
		.css('position', 'relative');
	$('#p-discussionboard ul').append(discussionBoardLiObj);
}
$('#p-discussionboard ul').prepend(discussionBoard);
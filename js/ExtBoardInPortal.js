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
	transition: all .1s ease-in;
	width: 15px;
	height: 15px;
	overflow: hidden;
	user-select: none;
}
a#n-sidebar-discussionboard-new:hover {
	background: #1AA7EE;
	color: #FFF !important;
	text-decoration: none;
	transition: all .1s ease-in;
	width: 5.5em;
}
a#n-sidebar-discussionboard-new:hover::before {
	content: '${wgULS('添加话题', '添加話題')}';
	font-weight: normal;
	font-size: 0.85em;
	margin: 0 .65em 0 .25em;
	vertical-align: middle;
}
a#n-sidebar-discussionboard-new:focus {
	text-decoration: none;
}
`);
const discussionBoard = $('#n-sidebar-discussionboard').clone();
const discussionBoardNames = [wgULS('技术实现', '技術實現'), wgULS('权限变更', '權限變更'), wgULS('操作申请', '操作申請'), wgULS('方针政策', '方針政策'), wgULS('页面相关', '頁面相關'), wgULS('提问求助', '提問求助'), wgULS('群组信息', '群組資訊')];
const discussionBoardNamesRaw = ['技术实现', '权限变更', '操作申请', '方针政策', '页面相关', '提问求助', '群组信息'];
const discussionBoardAbbrs = ['tec', 'rgt', 'act', 'pol', 'pge', 'que', 'grp'];
const discussionBoardPortalObj = $('<div>').attr({
		'id': 'p-discussionboard',
		'class': 'portal',
		'role': 'navigation',
		'aria-labelledby': 'p-discussionboard-label'
	})
	.append($('<h3>').attr('id', 'p-discussionboard-label').text(wgULS('讨论版', '討論版')))
	.append($('<div>').addClass('body').append($('<ul>')));
$('#p-navigation').after(discussionBoardPortalObj);
$('#n-sidebar-discussionboard').hide();
for (let i = 0; i < discussionBoardNames.length; i++) {
	const discussionBoardNewBtn = $('<a>').text('+')
		.attr({
			'href': '/index.php?title=萌娘百科_talk:讨论版/' + discussionBoardNamesRaw[i] + '&action=edit&section=new',
			'title': '在' + discussionBoardNames[i] + '版下' + wgULS('添加话题', '添加話題'),
			'target': '_blank',
			'rel': 'noopener noreferrer',
			'id': 'n-sidebar-discussionboard-new'
		});
	const discussionBoardLiObj = $('<li>').attr('id', 'n-sidebar-discussionboard' + discussionBoardAbbrs[i])
		.append($('<a>').attr('href', '/萌娘百科_talk:讨论版/' + discussionBoardNamesRaw[i]).text(discussionBoardNames[i]))
		.append(discussionBoardNewBtn)
		.css('position', 'relative');
	$('#p-discussionboard ul').append(discussionBoardLiObj);
}
$('#p-discussionboard ul').prepend(discussionBoard);
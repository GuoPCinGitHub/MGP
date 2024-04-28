// Mainpage
$('.mw-wiki-logo, #n-mainpage-description a').attr('href', '/User:GuoPC/M');

// 侧边栏添加“萌娘百科论述”“以MoeSkin查看”
$('#n-sidebar-policy').after('<li id="n-sidebar-essay"><a href="/Category:萌娘百科论述">萌娘百科论述</a></li>');
if (window.location.search) {
	$('#p-tb .body ul').append('<li id="pc-usemoeskin"><a target="_blank" href="/index.php' + window.location.search + '&useskin=moeskin">以MoeSkin查看</a></li>');
} else {
	$('#p-tb .body ul').append('<li id="pc-usemoeskin"><a target="_blank" href="/index.php?title=' + mw.config.get('wgPageName') + '&useskin=moeskin">以MoeSkin查看</a></li>');
}

// 右侧导航区域下拉框添加“清除缓存”
if (mw.config.get('wgNamespaceNumber') != -1) {
	$('#right-navigation .menu ul').append('<li id="pc-purge"><a href="/index.php?title=' + mw.config.get('wgPageName') + '&action=purge" style="color: #D4A039;">清除缓存</a></li>');
}

// Mod
if (mw.config.get("wgNamespaceNumber") != -1
	&& !["submit", "edit"].includes(mw.config.get("wgAction"))
	&& $('.moderation-notice').length > 0) {
	var setModIcon = function (title, d) {
		return '<span class="pc-mod-icon" title="' + title + '" style="display:inline-flex;align-items:center;justify-content:center;width:21px;height:31px;margin-right:.5em;padding:0 5px;vertical-align:middle;"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#800040"><path d="' + d + '"></path></svg></span>';
	};
	var modText = $('.moderation-notice').text();
	var modSituList = {
		'self': '自己的编辑',
		'skpd': '被跳过',
		'prev': '不是页面的最新版本'
	};
	var modNameList = {
		'self': '可查看自己当前的编辑但等待审核',
		'skpd': '较新版本通过审核而被跳过',
		'prev': '当前阅读的不是最新版本'
	};
	var modPathList = {
		'self': 'M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM12 11.5C13.3807 11.5 14.5 10.3807 14.5 9C14.5 7.61929 13.3807 6.5 12 6.5C10.6193 6.5 9.5 7.61929 9.5 9C9.5 10.3807 10.6193 11.5 12 11.5ZM7.52746 17H16.4725C16.2238 14.75 14.3163 13 12 13C9.68372 13 7.77619 14.75 7.52746 17Z',
		'skpd': 'M16 2L21 7V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM15 11V10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10V11H8V16H16V11H15ZM13 11H11V10C11 9.44772 11.4477 9 12 9C12.5523 9 13 9.44772 13 10V11Z',
		'prev': 'M16 2L21 6.999V21.0082C21 21.556 20.5551 22 20.0066 22H3.9934C3.44476 22 3 21.5447 3 21.0082V2.9918C3 2.44405 3.44495 2 3.9934 2H16ZM13 9H11V15H16V13H13V9Z'
	};
	$.each(modSituList, function (k, v) {
		var modSituReg = new RegExp(v);
		if (modSituReg.test(modText)) {
			$('.mw-indicators').append(setModIcon(modNameList[k], modPathList[k]));
			return false;
		}
	});
	$('#ca-edit a').attr('href', $('#ca-edit a').attr('href').replace(/&oldid=\d+/g, ''));
}

// Inspector小工具自定义，见[[User:Bhsd/Inspector#偏好设置]]
window.inspector = {
	summary: '// Edit via Inspector',
	variants: true,
	replace: true,
	resizable: true,
	entity: true,
	diff: true
};

// UserStatus
mw.loader.load('/index.php?title=User:AnnAngela/js/userStatus.js&action=raw&ctype=text/javascript');

// PersonalLabel，基于[[U:AnnAngela/js/PersonalLabel.js]]
$('#pt-watchlist').after(
	'<li id="pt-overstock"><a href="' + '/分类:积压工作" title="归类为积压工作的内容[Alt+Shift+o]" accesskey="o">积压工作</a></li>' +
	'<li id="pt-datareport"><a href="' + '/分类:萌娘百科数据报告" title="展示统计报告[Alt+Shift+d]" accesskey="d">数据报告</a></li>' +
	'<li id="pt-mysandbox"><a href="' + '/User:' + mw.config.get("wgUserName") + '/Sandbox" title="您的个人沙盒页面[Alt+Shift+s]" accesskey="s">我的沙盒</a></li>' +
	'<li id="pt-mylog"><a href="' + '/Special:log/' + mw.config.get("wgUserName") + '" title="您执行的所有公开日志[Alt+Shift+g]" accesskey="g">我的日志</a></li>'
);

// Inspector
if (mw.config.get( 'wgIsArticle' )) {
	mw.loader.using( 'mediawiki.util' ).then(function() {
		$(mw.util.addPortletLink('p-cactions', '#', 'Inspector', 'bhsd-inspector')).click(function(e) {
			e.preventDefault();
			this.remove();
			mw.loader.load('/index.php?title=User:Bhsd/js/inspect.js&action=raw&ctype=text/javascript');
		});
	});
}

// HideToggle
mw.loader.load('/index.php?title=User:Leranjun/js/HideToggle.js&action=raw&ctype=text/javascript');

// RedirectContribsToggle
mw.loader.load('/index.php?title=User:Leranjun/js/RedirectContribsToggle.js&action=raw&ctype=text/javascript');

// RefToggle
mw.loader.load('/index.php?title=User:Leranjun/js/RefToggle.js&action=raw&ctype=text/javascript');

// AccesskeyVec
mw.loader.load('/index.php?title=User:GuoPC/js/AccesskeyVec.js&action=raw&ctype=text/javascript');

// ExtBoardInPortal
mw.loader.load('/index.php?title=User:GuoPC/js/ExtBoardInPortal.js&action=raw&ctype=text/javascript');

// MakeItGray
mw.loader.load('/index.php?title=User:GuoPC/js/MakeItGray.js&action=raw&ctype=text/javascript');
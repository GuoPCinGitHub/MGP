// Mainpage
$('.mw-wiki-logo, #n-mainpage-description a').attr('href', '/User:GuoPC/M');

// 侧边栏添加“萌娘百科论述”“以MoeSkin查看”
$(function () {
	$('#n-sidebar-policy').after('<li id="n-sidebar-essay"><a href="/Category:萌娘百科论述">萌娘百科论述</a></li>');
	if (window.location.search) {
		$('#p-tb .body ul').append('<li id="pc-usemoeskin"><a target="_blank" href="/index.php' + window.location.search + '&useskin=moeskin">以MoeSkin查看</a></li>');
	} else {
		$('#p-tb .body ul').append('<li id="pc-usemoeskin"><a target="_blank" href="/index.php?title=' + mw.config.get('wgPageName') + '&useskin=moeskin">以MoeSkin查看</a></li>');
	}
});

// 右侧导航区域下拉框添加“清除缓存”
$(function () {
	if (mw.config.get('wgNamespaceNumber') != -1) {
		$('#right-navigation .menu ul').append('<li id="pc-purge"><a href="/index.php?title=' + mw.config.get('wgPageName') + '&action=purge" style="color: #D4A039;">清除缓存</a></li>');
    }
});

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
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:AnnAngela/js/userStatus.js&action=raw&ctype=text/javascript');

// PersonalLabel，基于[[U:AnnAngela/js/PersonalLabel.js]]
$(function() {
	$('#pt-watchlist').after(
		'<li id="pt-overstock"><a href="' + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/分类:积压工作" title="归类为积压工作的内容[Alt+Shift+o]" accesskey="o">积压工作</a></li>\
		<li id="pt-datareport"><a href="' + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/分类:萌娘百科数据报告" title="展示统计报告[Alt+Shift+d]" accesskey="d">数据报告</a></li>\
		<li id="pt-mysandbox"><a href="' + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/User:' + mw.config.get("wgUserName") + '/Sandbox" title="您的个人沙盒页面[Alt+Shift+s]" accesskey="s">我的沙盒</a></li>\
		<li id="pt-mylog"><a href="' + mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/Special:log/' + mw.config.get("wgUserName") + '" title="您执行的所有公开日志[Alt+Shift+g]" accesskey="g">我的日志</a></li>');
});

// Inspector
if (mw.config.get( 'wgIsArticle' )) {
	mw.loader.using( 'mediawiki.util' ).then(function() {
		$(mw.util.addPortletLink('p-cactions', '#', 'Inspector', 'bhsd-inspector')).click(function(e) {
			e.preventDefault();
			this.remove();
			mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:Bhsd/js/inspect.js&action=raw&ctype=text/javascript');
		});
	});
}

// HideToggle
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:Leranjun/js/HideToggle.js&action=raw&ctype=text/javascript');

// RedirectContribsToggle
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:Leranjun/js/RedirectContribsToggle.js&action=raw&ctype=text/javascript');

// RefToggle
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:Leranjun/js/RefToggle.js&action=raw&ctype=text/javascript');

// AccesskeyVec
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:GuoPC/js/AccesskeyVec.js&action=raw&ctype=text/javascript');
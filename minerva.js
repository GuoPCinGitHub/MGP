// 在页面最下方添加更多按钮
if (mw.config.get('wgNamespaceNumber') != -1 && $('#page-secondary-actions').length > 0) {
	$(function() {
		$('#page-secondary-actions').append('<a class="wlh-minerva mw-ui-button button" href="/Special:链入页面/' + mw.config.get('wgPageName') + '">链入页面</a><a class="rcl-minerva mw-ui-button button" href="/Special:链出更改/' + mw.config.get('wgPageName') + '">相关更改</a><a class="pml-minerva mw-ui-button button" href="/Special:固定链接/' + mw.config.get('wgRevisionId') + '">固定链接</a>');
	});
}

// disambigHelper
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:Iehcni/js/disambigHelper.js&action=raw&ctype=text/javascript');

// MobileNav
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=User:一位史蒂夫/JS/MobileNav.js&action=raw&ctype=text/javascript');

// 预装JS：Syntax highlighter
mw.loader.load(mw.config.get("wgServer").replace("zh.moegirl", "mzh.moegirl") + mw.config.get("wgScriptPath") + '/index.php?title=MediaWiki:Gadget-DotsSyntaxHighlighter.js&action=raw&ctype=text/javascript');

// 预装JS：Wikiplus
mw.loader.load('https://wikiplus-app.com/Main.js');
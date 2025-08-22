// No lang="zh" for translation in LyricsKai
if ($('.Lyrics-translated > span').attr('lang') == 'zh') {
	$('.Lyrics-translated > span').removeAttr('lang');
}
$('.Lyrics-column-zh > span').removeAttr('lang');

// Popups小工具
window.popupStructure = 'menus';
window.popupShortcutKeys = true;
window.popupFixRedirs = true;
window.popupFixDabs = true;
window.popupRedlinkRemoval = true;
window.popupThumbAction = "sizetoggle";
window.popupCategoryMembers = false;

// 未巡查
if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Watchlist', 'Recentchanges', 'Recentchangeslinked']) >= 0) {
	$('.unpatrolled').each(function() {
		$(this).text("喵");
	});
}

// mwPanel
mw.loader.load('/index.php?title=User:AnnAngela/js/mwPanel.js&action=raw&ctype=text/javascript');

// watchlist-toggle
mw.loader.load('/index.php?title=User:AnnAngela/js/watchlist-toggle.js&action=raw&ctype=text/javascript');

// upload-log-toggle
mw.loader.load('/index.php?title=User:AnnAngela/js/upload-log-toggle.js&action=raw&ctype=text/javascript');

// watchlist-log
mw.loader.load('/index.php?title=User:AnnAngela/js/watchlist-log.js&action=raw&ctype=text/javascript');

// JSONViewer
window.jsonViewTheme = "atom";
mw.loader.load("/index.php?title=User:BearBin/js/JSONViewer.js&action=raw&ctype=text/javascript");

// code-prettify
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.js');
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.css', 'text/css');

// PreLangMark
mw.loader.load('/index.php?title=User:Bhsd/js/PreLangMark.js&action=raw&ctype=text/javascript');

// WikiplusSP
mw.loader.load('/index.php?title=User:Dreammu/WikiplusSP.js&action=raw&ctype=text/javascript');

// disambigHelper
mw.loader.load('/index.php?title=User:Iehcni/js/disambigHelper.js&action=raw&ctype=text/javascript');

// Wordcount
mw.loader.load('/index.php?title=User:星海子/js/Wordcount.js&action=raw&ctype=text/javascript');

// BgInfo
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/BgInfo.min.js');

// ModIcon
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/ModIcon.min.js');

// ModIconPrep
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/ModIconPrep.min.js');

// NavboxNotLinked
if (mw.config.get("wgNamespaceNumber") == 10 && $(".navbox:not(.template-documentation .navbox)").length > 0) {
	mw.loader.using('mediawiki.util').then(function() {
		$(mw.util.addPortletLink('p-cactions', '#', '未嵌入链入', 'pc-navbox-not-linked')).click(function(e) {
			e.preventDefault();
			this.remove();
			mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/NavboxNotLinked.min.js');
		});
	});
}

// TSIndicator
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/TSIndicator.min.js');

// ULCount
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/ULCount.min.js');

// WatchlistNoRed
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/WatchlistNoRed.min.js');

// Yaku Han JP
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanmp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanrp.min.css', 'text/css');
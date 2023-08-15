// Sharp sign underline, based on [[User:Lihaohong/common.js]] & [[User:BearBin/common.js]]
if (!["submit", "edit"].includes(mw.config.get("wgAction"))) {
	$('#content *').each(function () {
		if ($(this).clone().children().remove().end().text().includes("\u266f")) {
			$(this).html($(this).html().replace(/(\u266f{2,})/g, '<span style="background:#6640FF27;box-shadow:inset 0 -1.5px 0 #6640FF;color:#6640FF;font-family:Segoe UI;">$1</span>'));
		}
	});
}

// 监视列表时段选项自定义
if (mw.config.get('wgCanonicalSpecialPageName') == 'Watchlist') {
	var days = ['1', '3', '7', '14', '30'];
	var limits = ['50', '100', '250', '500'];
	var dayLinks = '';
	var limitLinks = '';
	for (var i = 0; i < days.length; i++) {
		dayLinks += '<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=' + days[i] + '&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:' + days[i] + ',&quot;from&quot;:&quot;&quot;}" data-keys="days,from">' + days[i] + '</a>';
		dayLinks += i == days.length - 1 ? '天的最后' : ' | ';
	}
	for (var j = 0; j < limits.length; j++) {
		limitLinks += '<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;limit=' + limits[j] + '" title="Special:监视列表" data-params="{&quot;limit&quot;:' + limits[j] + '}" data-keys="limit">' + limits[j] + '</a>';
		limitLinks += j == limits.length - 1 ? '个更改' : ' | ';
	}
	$('.wlinfo').after('<br><span class="wllinks">显示过去' + dayLinks + limitLinks +  '</span>');
	$('.cldays.cloption').hide();
}

// No lang="zh" for translation in LyricsKai
if ($('.Lyrics-translated > span').attr('lang') == 'zh') {
	$('.Lyrics-translated > span').removeAttr('lang');
}

// Popups小工具自定义，见[[Help:Popups小工具#用户配置]]
window.popupStructure = 'menus';
window.popupShortcutKeys = true;
window.popupFixRedirs = true;
window.popupFixDabs = true;
window.popupRedlinkRemoval = true;
window.popupThumbAction = "sizetoggle";

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

// OneKeyPurge
mw.loader.load('/index.php?title=User:BearBin/js/OneKeyPurge.js&action=raw&ctype=text/javascript');

// code-prettify
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.js');
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.css', 'text/css');

// PreLangMark
mw.loader.load('/index.php?title=User:Bhsd/js/PreLangMark.js&action=raw&ctype=text/javascript');

// Wikiplus-replace
mw.loader.load('/index.php?title=User:東東君/js/Wikiplus-replace.js&action=raw&ctype=text/javascript');

// disambigHelper
mw.loader.load('/index.php?title=User:Iehcni/js/disambigHelper.js&action=raw&ctype=text/javascript');

// MarkAsResolved
mw.loader.load('/index.php?title=User:Leranjun/js/MarkAsResolved.js&action=raw&ctype=text/javascript');

// Wordcount
mw.loader.load('/index.php?title=User:星海子/js/Wordcount.js&action=raw&ctype=text/javascript');

// BgInfo
mw.loader.load('/index.php?title=User:GuoPC/js/BgInfo.js&action=raw&ctype=text/javascript');

// MouseRippleToggle
mw.loader.load('/index.php?title=User:GuoPC/js/MouseRippleToggle.js&action=raw&ctype=text/javascript');

// ULCount
mw.loader.load('/index.php?title=User:GuoPC/js/ULCount.js&action=raw&ctype=text/javascript');

// WatchlistNoRed
mw.loader.load('/index.php?title=User:GuoPC/js/WatchlistNoRed.js&action=raw&ctype=text/javascript');

// Yaku Han JP
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanmp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanrp.min.css', 'text/css');
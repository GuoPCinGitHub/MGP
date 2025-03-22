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
	$('.wlinfo').after('<br><span class="wllinks">显示过去' + dayLinks + limitLinks + '</span>');
	$('.cldays.cloption').hide();
}

// [[User:GuoPC/js#ModIconPrep]]
if ($('.mw-collapsible.mw-enhanced-rc').length > 0) {
	mw.loader.addStyleTag('.pc-mip-count{position:absolute;bottom:-.4em;right:-.4em;display:inline-block;backdrop-filter:blur(5px);background:#FFF5;border:#AAA 1px dashed;border-radius:50%;color:#222;font-size:9px;font-style:normal;line-height:1.2em;text-align:center;width:1.2em;height:1.2em;user-select:none;}');
	var epath = '.mw-collapsible.mw-enhanced-rc.mw-changeslist-edit .mw-changeslist-line-inner';
	var lpath = '.mw-collapsible.mw-enhanced-rc.mw-changeslist-log .mw-changeslist-line-inner';
	var sflag = false;
	if ($('.mw-collapsible.mw-enhanced-rc .mw-changeslist-line-inner > p').length > 0) {
		sflag = true;
		epath += '> p';
		lpath += '> p';
	}
	$('.mw-collapsible.mw-enhanced-rc').each(function() {
		var ico = $(this).find('i.mod-status-icon').first().clone();
		var num = $(this).find('i.mod-status-icon').length - 1;
		ico.css('position', 'relative');
		ico.append($('<span>').text(num).addClass('pc-mip-count'));
		$(this).find('td.mw-changeslist-line-inner').first().prepend(ico);
	});
	$(epath).each(function() {
		var con = $(this).contents();
		var ico = con.filter('span.mw-title ~ i.mod-status-icon');
		var pos = con.index(ico);
		if (con.filter('span.mw-title').has('a.new').length > 0) {
			con.eq(pos - 1).get(0).replaceWith(con.eq(pos - 1).get(0).textContent.replace('历史 | ', '历史'));
		} else {
			con.eq(pos - 1).remove();
		}
		con.eq(pos).remove();
		if (sflag) {
			$(this).css('display', 'contents');
			$('.mw-enhanced-rc-nested p').css('display', 'contents');
		}
	});
	$(lpath).each(function() {
		var con = $(this).contents();
		var ico = con.filter('span.mw-rc-unwatched ~ i.mod-status-icon');
		if (ico.length > 0) {
			var pos = con.index(ico);
			con.eq(pos - 1).remove();
			con.eq(pos).remove();
			con.eq(pos + 1).remove();
		}
		if (sflag) {
			$(this).css('display', 'contents');
			$('.mw-enhanced-rc-nested p').css('display', 'contents');
		}
	});
}

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
mw.loader.load('/index.php?title=User:GuoPC/js/BgInfo.js&action=raw&ctype=text/javascript');

// ModIcon
mw.loader.load('/index.php?title=User:GuoPC/js/ModIcon.js&action=raw&ctype=text/javascript');

// TSIndicator
mw.loader.load('/index.php?title=User:GuoPC/js/TSIndicator.js&action=raw&ctype=text/javascript');

// ULCount
mw.loader.load('/index.php?title=User:GuoPC/js/ULCount.js&action=raw&ctype=text/javascript');

// WatchlistNoRed
mw.loader.load('/index.php?title=User:GuoPC/js/WatchlistNoRed.js&action=raw&ctype=text/javascript');

// Yaku Han JP
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanmp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanrp.min.css', 'text/css');
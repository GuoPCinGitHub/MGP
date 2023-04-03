mw.loader.load('https://cdn.jsdelivr.net/gh/MoegirlPediaInterfaceAdmins/MoegirlPediaInterfaceCodes@master/src/gadgets/HotCat/MediaWiki:Gadget-HotCat.js');
mw.loader.load('https://cdn.jsdelivr.net/gh/MoegirlPediaInterfaceAdmins/MoegirlPediaInterfaceCodes@master/src/gadgets/Navigation_popups/MediaWiki:Gadget-popups.js');

// Sharp sign underline, based on [[User:Lihaohong/common.js]]
mw.loader.addStyleTag(`
#sharp {
	background: #6640FF27;
	border-radius: 2px;
	box-shadow: inset 0 -1.5px 0 #6640FF;
	color: #6640FF;
	font-family: 'Segoe UI';
}
`);
$('#content *').each(function () {
	if ($(this).clone().children().remove().end().text().includes("\u266f")) {
		$(this).html($(this).html().replace(/(\u266f{2,})/g,'<span id="sharp">$1</span>'));
	}
});

// 监视列表时段选项自定义
if (mw.config.get('wgCanonicalSpecialPageName') == 'Watchlist') {
	$(function() {
		$('.wlinfo').after(
			'<br> \
			<span class="rclinks">显示过去 \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=1&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:1,&quot;from&quot;:&quot;&quot;}" data-keys="days,from">1</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=3&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:3,&quot;from&quot;:&quot;&quot;}" data-keys="days,from">3</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=7&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:7,&quot;from&quot;:&quot;&quot;}" data-keys="days,from">7</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=14&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:14,&quot;from&quot;:&quot;&quot;}" data-keys="days,from">14</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;days=30&amp;from=" title="Special:监视列表" data-params="{&quot;days&quot;:30,&quot;from&quot;:&quot;&quot;}" data-keys="days,from">30</a>天的最后 \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;limit=50" title="Special:监视列表" data-params="{&quot;limit&quot;:50}" data-keys="limit">50</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;limit=100" title="Special:监视列表" data-params="{&quot;limit&quot;:100}" data-keys="limit">100</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;limit=250" title="Special:监视列表" data-params="{&quot;limit&quot;:250}" data-keys="limit">250</a> | \
				<a href="/index.php?title=Special:%E7%9B%91%E8%A7%86%E5%88%97%E8%A1%A8&amp;limit=500" title="Special:监视列表" data-params="{&quot;limit&quot;:500}" data-keys="limit">500</a>个更改 \
			</span>'
		);
		$('.cldays.cloption').hide();
	});
}

// Popups小工具自定义，见[[Help:Popups小工具#用户配置]]
window.popupShortcutKeys = true;
window.popupFixRedirs = true;
window.popupFixDabs = true;
window.popupThumbAction = "sizetoggle";

// 未巡查
if ($.inArray(mw.config.get('wgCanonicalSpecialPageName'), ['Watchlist', 'Recentchanges', 'Recentchangeslinked']) >= 0) {
	$(function() {
		$('.unpatrolled').each(function() {
			$(this).text("喵");
		});
	});
}

// mwPanel
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:AnnAngela/js/mwPanel.js&action=raw&ctype=text/javascript');

// watchlist-toggle
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:AnnAngela/js/watchlist-toggle.js&action=raw&ctype=text/javascript');

// upload-log-toggle
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:AnnAngela/js/upload-log-toggle.js&action=raw&ctype=text/javascript');

// watchlist-log
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:AnnAngela/js/watchlist-log.js&action=raw&ctype=text/javascript');

// code-prettify
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.js');
mw.loader.load('https://cdn.jsdelivr.net/gh/bhsd-harry/LLWiki@2.5/otherwiki/gadget-code-prettify.min.css', 'text/css');

// PreLangMark
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:Bhsd/js/PreLangMark.js&action=raw&ctype=text/javascript');

// Wikiplus-replace
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:東東君/js/Wikiplus-replace.js&action=raw&ctype=text/javascript');

// disambigHelper
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:Iehcni/js/disambigHelper.js&action=raw&ctype=text/javascript');

// MarkAsResolved
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:Leranjun/js/MarkAsResolved.js&action=raw&ctype=text/javascript');

// Wordcount
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:星海子/js/Wordcount.js&action=raw&ctype=text/javascript');

// MouseRippleToggle
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:GuoPC/js/MouseRippleToggle.js&action=raw&ctype=text/javascript');

// WatchlistNoRed
mw.loader.load('https://mzh.moegirl.org.cn/index.php?title=User:GuoPC/js/WatchlistNoRed.js&action=raw&ctype=text/javascript');

// Yaku Han JP
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanjp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanmp.min.css', 'text/css');
mw.loader.load('https://cdn.jsdelivr.net/npm/yakuhanjp@3.4.1/dist/css/yakuhanrp.min.css', 'text/css');

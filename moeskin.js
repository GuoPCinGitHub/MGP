// Add entries to user link area
var texts = ['沙盒', '积压', '数据', '搜索'];
var hrefs = ['/User:GuoPC/Sandbox', '/Category:积压工作', '/Category:萌娘百科数据报告', '/Special:Search'];
var names = ['tabler-icon-sandbox', 'tabler-icon-file-stack', 'tabler-icon-report-analysis', 'tabler-icon-input-search'];
var paths = ['<path d="M19.953 8.017l1.047 6.983v2a3 3 0 0 1 -3 3h-12a3 3 0 0 1 -3 -3v-2l1.245 -8.297a2 2 0 0 1 1.977 -1.703h3.778" /><path d="M3 15h18" /><path d="M13 3l5.5 1.5" /><path d="M15.75 3.75l-2 7" /><path d="M7 10.5c1.667 -.667 3.333 -.667 5 0c1.667 .667 3.333 .667 5 0" />', '<path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4" /><path d="M5 21h14" /><path d="M5 18h14" /><path d="M5 15h14" />', '<path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 17v-5" /><path d="M12 17v-1" /><path d="M15 17v-3" />', '<path d="M20 11v-2a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v5a2 2 0 0 0 2 2h5" /><path d="M18 18m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M20.2 20.2l1.8 1.8" />'];

for (var i = 0; i < texts.length; i++) {
	var nulg = $('.nav-user-link:last').clone();
	nulg.children('div').children('a').attr('href', hrefs[i]).children().children().toggleClass('tabler-icon-clock-edit ' + names[i]).html(paths[i]);
	nulg.children('a').attr('href', hrefs[i]).text(texts[i]);
	nulg.appendTo('.user-links');
}

// Mainpage
$('.site-logo-area > a').attr('href', '/User:GuoPC/M');

// Better MGP logo
$('.site-logo, #footer-copyright-text img').attr('src', $('.site-logo').attr('src').replace('9/95/MoegirlPedia-Title.png', '3/33/MoegirlPedia-Title.svg'));

// CustomSidenavIcon
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/CustomSidenavIcon.min.js');

// MoeIndicators
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/MoeIndicators.min.js');
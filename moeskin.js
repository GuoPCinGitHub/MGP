// 向自定义工具中加链
mw.util.addPortletLink('p-personal', '/分类:积压工作', '积压工作', 'pt-overstock', '归类为积压工作的内容[Alt+Shift+o]', 'o');
mw.util.addPortletLink('p-personal', '/分类:萌娘百科数据报告', '数据报告', 'pt-datareport', '展示统计报告[Alt+Shift+d]', 'd');
mw.util.addPortletLink('p-personal', '/User:' + mw.config.get("wgUserName") + '/Sandbox', '我的沙盒', 'pt-mysandbox', '您的个人沙盒页面[Alt+Shift+s]', 's');
mw.util.addPortletLink('p-personal', '/Special:log/' + mw.config.get("wgUserName"), '我的日志', 'pt-mylog', '您执行的所有公开日志[Alt+Shift+g]', 'g');

// Mainpage
$('.site-logo-area > a').attr('href', '/User:GuoPC/M');

// Better MGP logo
$('.site-logo, #footer-copyright-text img').attr('src', $('.site-logo').attr('src').replace('9/95/MoegirlPedia-Title.png', '3/33/MoegirlPedia-Title.svg'));

// CustomSidenavIcon
mw.loader.load(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/index.php?title=User:GuoPC/js/CustomSidenavIcon.js&action=raw&ctype=text/javascript');

// MoeIndicators
mw.loader.load(mw.config.get("wgServer") + mw.config.get("wgScriptPath") + '/index.php?title=User:GuoPC/js/MoeIndicators.js&action=raw&ctype=text/javascript');
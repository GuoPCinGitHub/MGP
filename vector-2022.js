// Mainpage
$('.mw-logo').attr('href', '/User:GuoPC/M');

// 侧边栏与右侧导航区域下拉框
$('#n-sidebar-policy').after('<li id="n-sidebar-essay" class="mw-list-item"><a href="/Category:萌娘百科论述">萌娘百科论述</a></li>');
if (mw.config.get('wgNamespaceNumber') != -1) {
	$('#right-navigation #p-cactions ul').append('<li id="pc-purge" class="mw-list-item"><a href="/index.php?title=' + mw.config.get('wgPageName') + '&action=purge" style="color: #D4A039;">清除缓存</a></li>');
}

// PersonalLabel，基于[[User:AnnAngela/js/PersonalLabel.js]]
// Icons originated from Remix Icon
const IDS = ['overstock', 'datareport', 'mysandbox', 'mylog'];
const TEXTS = ['积压工作', '数据报告', '我的沙盒', '我的日志'];
const LINKS = ['/分类:积压工作', '/分类:萌娘百科数据报告', '/User:' + mw.config.get("wgUserName") + '/Sandbox', '/Special:log/' + mw.config.get("wgUserName")];
const TITLES = ['归类为积压工作的内容', '展示统计报告', '您的个人沙盒页面', '您执行的所有公开日志'];
const KEYS = ['o', 'd', 's', 'g'];
const ICONS = ['archive-stack-fill', 'bar-chart-fill', 'quill-pen-fill', 'file-list-3-fill'];
const PATHS = [
	'M4 5H20V3H4V5ZM20 9H4V7H20V9ZM9 13H15V11H21V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V11H9V13Z',
	'M3 12H7V21H3V12ZM17 8H21V21H17V8ZM10 2H14V21H10V2Z',
	'M21 1.99669C6 1.99669 4 15.9967 3 21.9967C3.66667 21.9967 4.33275 21.9967 4.99824 21.9967C5.66421 18.6636 7.33146 16.8303 10 16.4967C14 15.9967 17 12.4967 18 9.49669L16.5 8.49669C16.8333 8.16336 17.1667 7.83002 17.5 7.49669C18.5 6.49669 19.5042 4.99669 21 1.99669Z',
	'M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM6 7V9H14V7H6ZM6 11V13H14V11H6ZM6 15V17H11V15H6Z'];
const MASK_IMAGE_GEN = (icon, path) => 'mask-image:url(&apos;data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2220%22 height=%2220%22 viewBox=%220 0 24 24%22%3E%3Ctitle%3E' + icon + '%3C/title%3E%3Cpath d=%22' + path + '%22/%3E%3C/svg%3E&apos;);';
let menu_items = '';
let dropdown_items = '';
for (let i = 0; i < IDS.length; i++) {
	let icon_ele = '<span class="vector-icon remix-icon-' + ICONS[i] + '" style="-webkit-' + MASK_IMAGE_GEN(ICONS[i], PATHS[i]) + MASK_IMAGE_GEN(ICONS[i], PATHS[i]) + ');"></span>';
	let menu_link_ele = '<a data-mw="interface" href="' + LINKS[i] + '" title="' + TITLES[i] + '" accesskey="' + KEYS[i] + '" class="cdx-button cdx-button--fake-button cdx-button--fake-button--enabled cdx-button--weight-quiet cdx-button--icon-only">' + icon_ele + '</span><span>' + TEXTS[i] + '</span></a>';
	let menu_item = '<li id="pt-' + IDS[i] + '" class="user-links-collapsible-item mw-list-item">' + menu_link_ele + '</li>';
	let dropdown_link_ele = '<a href="' + LINKS[i] + '" title="' + TITLES[i] + '" accesskey="' + KEYS[i] + '">' + icon_ele + ' <span>' + TEXTS[i] + '</span></a>';
	let dropdown_item = '<li id="pt-' + IDS[i] + '" class="user-links-collapsible-item mw-list-item">' + dropdown_link_ele + '</li>';
	menu_items += menu_item;
	dropdown_items += dropdown_item;
}
$('#p-vector-user-menu-notifications .vector-menu-content-list').prepend(menu_items).attr('style', 'flex-wrap:wrap;height:44px;overflow-y:auto;');
$('#vector-user-links-dropdown #p-personal .vector-menu-content-list').append(dropdown_items);

// Inspector小工具自定义，见[[User:Bhsd/Inspector#偏好设置]]
window.inspector = {
	summary: '// Edit via Inspector',
	variants: true,
	replace: true,
	resizable: true,
	entity: true,
	diff: true
};

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

// ExtBoardInPortal
mw.loader.load('//fastly.jsdelivr.net/gh/GuoPCinGitHub/MGP@master/js/ExtBoardInPortal.min.js');
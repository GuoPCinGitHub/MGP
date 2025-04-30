$(function() {
	if (!["submit", "edit"].includes(mw.config.get("wgAction")) && $('#mw-content-text ul:not(.redirectText)').length > 0) {
		mw.loader.addStyleTag(`
		.pc-list-count {
			position: relative;
			height: 0;
		}
		.pc-list-count-main {
			display: none;
			position: absolute;
			top: -1.6em;
			left: 0;
			border-radius: 2px;
			background: #D4DFF6;
			color: #2B5FC6;
			font-family: Roboto, sans-serif;
			font-size: .85em;
			font-weight: bold;
			line-height: 1.6em;
			width: max-content;
			padding: 0 .4em;
			user-select: none;
			z-index: 1000000;
		}
		.pc-list-count-main:after {
			content: "${wgULS('个无序列表条目元素', '個無序列表條目元素')}";
		}
		#mw-content-text ul ul > .pc-list-count .pc-list-count-main {
			background: #F6EBD4;
			color: #C8952A;
		}
		#mw-content-text ul ul ul > .pc-list-count .pc-list-count-main {
			background: #F6D4DF;
			color: #C82A5D;
		}
		#mw-content-text ul:hover > .pc-list-count .pc-list-count-main {
			display: revert;
		}
		#mw-content-text ul:hover > .pc-list-count .pc-list-count-main:hover {
			display: none;
		}
		#mw-content-text #toc ul:hover > .pc-list-count .pc-list-count-main {
			display: none;
		}
		`);
		
		$('#mw-content-text ul:not(.redirectText)').each(function() {
			var n = $(this).children('li').length;
			$(this).prepend($('<div>').addClass('pc-list-count').append($('<div>').addClass('pc-list-count-main').text(n)));
		});
	} else {
		return;
	}
});

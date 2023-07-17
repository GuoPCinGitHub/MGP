$(function() {
	mw.loader.addStyleTag(`
	#moe-mobile-float-toolbar-trigger {
		position: fixed;
		left: -12px;
		top: 50%;
		background: var(--theme-background-color);
		border-radius: 50%;
		font-size: 14px;
		padding: 5px;
		transform: scale(1.6) translateY(-50%);
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
		opacity: .8;
		z-index: 721;
		cursor: pointer;
	}
	#moe-mobile-float-toolbar-trigger:hover {
		left: 10px;
		opacity: 1;
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
	}
	#moe-mobile-float-toolbar-trigger.triggered {
		left: 2em;
		opacity: 1;
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
	}
	#moe-mobile-float-toolbar-back #moe-mobile-float-toolbar-backdrop {
		position: fixed;
		top: 0;
		left: 0;
		background: transparent;
		width: 100%;
		height: 100%;
		transition: background .3s ease-in;
		z-index: 1;
	}
	#moe-mobile-float-toolbar-back.covered #moe-mobile-float-toolbar-backdrop {
		background: #0005;
		transition: background .3s ease-in;
	}
	#moe-mobile-float-toolbar-back.uncovered #moe-mobile-float-toolbar-backdrop {
		background: transparent;
		transition: background .3s ease-in;
	}
	#moe-mobile-float-toolbar-main {
		position: fixed;
		left: -10em;
		top: 50%;
		background: var(--theme-background-color);
		border-top: 4px solid var(--theme-accent-color);
		border-radius: .4rem;
		padding: .4rem;
		transform: translateY(-50%);
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
		opacity: 0;
		z-index: 722;
	}
	#moe-mobile-float-toolbar-main.shown {
		left: 1em;
		opacity: 1;
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
	}
	#moe-mobile-float-toolbar-main-label {
		margin: .5em;
		user-select: none;
	}
	#moe-mobile-float-toolbar-main li {
		border-radius: .4rem;
		padding: .2em .5em;
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
	}
	#moe-mobile-float-toolbar-main li:hover {
		background: #0001;
		transition: all .3s cubic-bezier(.22, .61, .36, 1);
	}
	`);

	var toolbarIcon = $('#moe-mobile-toolbar .xicon').clone();
	var toolbarList = $('#moe-mobile-toolbar ul').clone();

	$('#moe-full-container')
		.append($('<div>').addClass('mobile-only').attr('id', 'moe-mobile-float-toolbar-container'));
	$('#moe-mobile-float-toolbar-container')
		.append($('<div>').attr('id', 'moe-mobile-float-toolbar-trigger').append(toolbarIcon))
		.append($('<div>').attr('id', 'moe-mobile-float-toolbar-main'));
	$('#moe-mobile-float-toolbar-main')
		.append($('<div>').attr('id', 'moe-mobile-float-toolbar-main-label').text('工具'))
		.append(toolbarList);
	$('#moe-mobile-float-toolbar-container')
		.append($('<div>').attr('id', 'moe-mobile-float-toolbar-back'));

	$('#moe-mobile-float-toolbar-container').on('click', '#moe-mobile-float-toolbar-trigger', function() {
		$('#moe-mobile-float-toolbar-back')
			.append($('<div>').attr('id', 'moe-mobile-float-toolbar-backdrop'));
		$('#moe-mobile-float-toolbar-back').attr('class', 'covered');
		$('#moe-mobile-float-toolbar-trigger').addClass('triggered');
		$('#moe-mobile-float-toolbar-main').addClass('shown');
	});
	$('#moe-full-container').on('click', '#moe-mobile-float-toolbar-backdrop, #moe-global-header, #moe-float-toc-trigger', function() {
		$('#moe-mobile-float-toolbar-back').attr('class', 'uncovered');
		$('#moe-mobile-float-toolbar-trigger').removeClass('triggered');
		$('#moe-mobile-float-toolbar-main').removeClass('shown');
		setTimeout(function() {
			$('#moe-mobile-float-toolbar-backdrop').remove();
		}, 300);
	});
	$('#moe-mobile-toolbar').hide();
});
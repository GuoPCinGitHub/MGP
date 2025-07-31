mw.loader.addStyleTag(`
.portal-key::after {
	content: attr(accesskey);
	display: block;
	position: absolute;
	top: 50%;
	right: 5px;
	background: var(--background-color-interactive, rgba(255, 255, 255, 0.8));
	border-radius: 2px;
	color: #222;
	font-family: monospace;
	font-size: small;
	font-weight: bold;
	text-shadow: none;
	text-transform: capitalize;
	transform: translateY(-50%);
	padding: 0px 2px;
	user-select: none;
}

.personal-key::after {
	content: attr(accesskey);
	display: inline-block;
	background: var(--background-color-interactive, rgba(255, 255, 255, 0.8));
	border-radius: 2px;
	color: #222;
	font-family: monospace;
	font-size: x-small;
	font-weight: bold;
	text-transform: capitalize;
	margin: 0px 1px;
	padding: 0px 2px;
	user-select: none;
	vertical-align: ${mw.config.get('skin') == 'vector-2022' ? 'middle' : 'sub'};
}

.sticky-key::after {
	content: attr(thekey) !important;
}
`);

$(function() {
	const NEW_SKIN = mw.config.get('skin') == 'vector-2022' ? true : false;
	const PORTAL_ELE = NEW_SKIN ? '#vector-main-menu li' : '.portal li';
	const PERSONAL_ELE = NEW_SKIN ? '.vector-user-links-main li' : '#p-personal li';
	const STICKY_ELE = NEW_SKIN ? '.vector-sticky-header-icons a' : 'body';
	if ($(PORTAL_ELE).length > 0 && $(PERSONAL_ELE).length > 0 && $(STICKY_ELE).length > 0) {
		$(PORTAL_ELE).each(function() {
			if ($(this).children('a').attr('accesskey')) {
				$(this).css('position', 'relative');
				$(this).children('a').addClass('portal-key');
			}
		});
		$(PERSONAL_ELE).each(function() {
			if ($(this).children('a').attr('accesskey')) { $(this).children('a').addClass('personal-key');}
		});
		$(STICKY_ELE).each(function() {
			if (/\[*\]/g.test($(this).attr('title'))) {
				$(this).attr('thekey', $(this).attr('title').substr(-2, 1));
				$(this).addClass('personal-key sticky-key');
			}
		});
	}
});
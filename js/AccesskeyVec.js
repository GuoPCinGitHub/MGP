mw.loader.addStyleTag(`
.portal-key::after {
	content: attr(accesskey);
	display: block;
	position: absolute;
	top: 5px;
	right: 5px;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 2px;
	color: #222;
	font-family: monospace;
	font-size: small;
	font-weight: bold;
	text-shadow: none;
	text-transform: capitalize;
	padding: 0px 2px;
	user-select: none;
}

.personal-key::after {
	content: attr(accesskey);
	display: inline-block;
	background: rgba(255, 255, 255, 0.8);
	border-radius: 2px;
	color: #222;
	font-family: monospace;
	font-size: x-small;
	font-weight: bold;
	text-transform: capitalize;
	margin: 0px 1px;
	padding: 0px 2px;
	user-select: none;
	vertical-align: sub;
}
`);

$(function() {
	if ($('.portal li').length > 0 && $('#p-personal li').length > 0) {
		$('.portal li').each(function() {
			if ($(this).children('a').attr('accesskey')) {
				$(this).css('position', 'relative');
				$(this).children('a').addClass('portal-key');
			}
		});
		$('#p-personal li').each(function() {
			if ($(this).children('a').attr('accesskey')) { $(this).children('a').addClass('personal-key'); }
		});
	}
});
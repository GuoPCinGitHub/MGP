$(function () {
	mw.loader.addStyleTag(`
	html[gray="on"] {
		filter: grayscale(1);
		transition: filter ease-in .5s;
	}
	
	html[gray="off"] {
		transition: filter ease-in .5s;
	}
	
	#grayBox {
		display: block;
		width: 16px;
		height: 16px;
		cursor: pointer;
		transition: transform ease-in-out .5s;
	}
	`);

	$('html').attr('gray', 'off');
	const icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgba(173,184,194,1)"><path d="M16.5717 8.02749C16.8469 7.4078 16.9998 6.72176 16.9998 6C16.9998 3.23858 14.7612 1 11.9998 1C9.23839 1 6.99981 3.23858 6.99981 6C6.99981 8.58261 8.95785 10.7079 11.4704 10.9723C12.6858 9.24029 14.576 8.20785 16.5717 8.02749ZM13.1542 17.9462C13.996 16.1276 14.047 13.9741 13.1547 12.0554C14.6399 10.0118 17.4591 9.37883 19.6956 10.6701L19.6957 10.67C22.0871 12.0508 22.9064 15.1086 21.5257 17.5C20.145 19.8915 17.087 20.7109 14.6956 19.3302C14.0707 18.9694 13.5532 18.4942 13.1542 17.9462ZM6.27311 10.0269C7.42726 11.6652 9.26672 12.786 11.3746 12.9726C12.4016 15.2807 11.5401 18.0388 9.30357 19.3301C6.91211 20.7108 3.85415 19.8914 2.47344 17.5C1.09273 15.1085 1.91211 12.0505 4.30357 10.6698C4.92851 10.309 5.59897 10.0984 6.27311 10.0269Z"></path></svg>';

	let grayBox = $('<li>').attr('id', 'pt-makeitgray')
		.append(
			$('<div>').attr({ 'id': 'grayBox', 'title': '灰度化' }).html(icon)
		).on('click', function () {
			let isGray = $('html').attr('gray') == 'on';
			$('html').attr('gray', isGray ? 'off' : 'on');
		});
	$('#p-personal > ul').append(grayBox);

	let deg = 0;
	$('#grayBox').on('click', function () {
		deg += 360;
		$(this).css('transform', 'rotate(' + deg + 'deg)');
	});
});

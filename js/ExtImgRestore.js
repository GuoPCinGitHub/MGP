$(() => {
	if (mw.config.get("wgNamespaceNumber") != -1
		&& !["submit", "edit"].includes(mw.config.get("wgAction"))
		&& $('.moe-img-blocked').length > 0) {

		mw.loader.addStyleTag(`
		.pc-img-restored {
			background: var(--background-color-disabled-subtle, rgb(var(--theme-card-background-color--rgb)));
			border-radius: .2em;
			box-shadow: 0 0 .15em rgba(0, 0, 0, .2);
			width: fit-content;
			height: auto;
			margin: .3em 0;
			padding: .3em;
			max-width: min(500px, 95%);
		}

		.pc-img-restored > img {
			display: inline-block;
			max-width: 100%;
			height: auto;
		}
		`);

		$('.moe-img-blocked').each(function() {
			const src = $(this).attr('href');
			const $this = $(this);
			const img = new Image();

			img.onload = function() {
				let container = $('<div>').addClass('pc-img-restored');
				container.append(this);
				$this.after(container);
			};
			img.src = src;
			img.alt = src;
		});
	}
});

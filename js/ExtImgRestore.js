$(() => {
	if (mw.config.get("wgNamespaceNumber") != -1
		&& !["submit", "edit"].includes(mw.config.get("wgAction"))
		&& $('.moe-img-error').length > 0) {

		mw.loader.addStyleTag(`
		.pc-img-restored {
			background: var(--background-color-disabled-subtle, rgb(var(--theme-card-background-color--rgb)));
			border-radius: .2em;
			box-shadow: 0 0 .15em rgba(0, 0, 0, .2);
			height: auto;
			margin: .3em 0;
			padding: .3em;
		}

		.pc-img-restored > img {
			object-fit: contain;
			width: 100%;
			height: 100%;
		}

		span.error.moe-img-error {
			background: var(--background-color-disabled-subtle, rgb(var(--theme-card-background-color--rgb)));
			border-radius: .2em;
			color: var(--color-base, rgb(var(--theme-text-color--rgb))) !important;
			font-size: small !important;
			padding: .1em .3em;
		}

		span.error.moe-img-error::before {
			content: '${wgULS('▼此外部图像被站点阻止显示，因', '▼此外部圖像被站點阻止顯示，因')}';
		}

		span.error.moe-img-error > code {
			background: none;
			border: none;
			padding: 0;
		}
		`);

		$('.moe-img-error').each(function() {
			$(this).parent().css('width', 'min(500px, 95%)');
			const src = $(this).attr('data-src-input');
			const img = new Image();

			img.onload = function() {
				let width = this.naturalWidth;
				if (width < 500) {
					$(this).parent().css('width', 'min(' + width + 'px, 95%)');
				}
			};
			img.src = src;
			img.alt = src;

			$(this).after($('<div>').addClass('pc-img-restored').append(img));
		});
	}
});

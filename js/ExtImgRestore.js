$(() => {
	if (mw.config.get("wgNamespaceNumber") != -1
		&& !["submit", "edit"].includes(mw.config.get("wgAction"))
		&& $('.moe-img-error').length > 0) {

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
			const src = $(this).attr('data-src-input');
			const $this = $(this);
			const img = new Image();

			img.onload = function() {
				const nwidth = this.naturalWidth;
				let container = $('<div>').addClass('pc-img-restored');
				if (nwidth < 500) {
					container.css('width', 'min(' + nwidth + 'px, 95%);');
				}
				container.append(this);
				$this.after(container);
			};
			img.src = src;
			img.alt = src;
		});
	}
});

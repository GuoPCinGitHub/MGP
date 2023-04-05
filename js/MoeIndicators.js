if (MOE_SKIN_GLOBAL_DATA.indicators) {
	var indicators = MOE_SKIN_GLOBAL_DATA.indicators;
	delete indicators["noteTA-0"];
	if (!$.isEmptyObject(indicators)) {
		$('h1#firstHeading').append('<div class="moe-indicators"><div class="moe-indicator"></div></div>');
		mw.loader.addStyleTag(`
		.moe-indicators {
			float: right;
			line-height: 1.6;
			font-size: 0.875em;
			position: relative;
			z-index: 1;
		}
		.moe-indicator {
			display: inline-block;
		}
		@media (max-width: 768px) {
			.moe-indicators {
				float: none;
				font-size: 0.75em;
				line-height: 1.2em;
				text-align: center;
			}
		}
		`);
		if (indicators["mw-helplink"]) {
			mw.loader.addStyleTag(`
			a.mw-helplink {
				background-image: linear-gradient(transparent,transparent),url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2224%22 height=%2224%22 viewBox=%220 0 24 24%22%3E %3Cpath d=%22M12.001 2.085c-5.478 0-9.916 4.438-9.916 9.916 0 5.476 4.438 9.914 9.916 9.914 5.476 0 9.914-4.438 9.914-9.914 0-5.478-4.438-9.916-9.914-9.916zm.001 18c-4.465 0-8.084-3.619-8.084-8.083 0-4.465 3.619-8.084 8.084-8.084 4.464 0 8.083 3.619 8.083 8.084 0 4.464-3.619 8.083-8.083 8.083z%22/%3E %3Cpath d=%22M11.766 6.688c-2.5 0-3.219 2.188-3.219 2.188l1.411.854s.298-.791.901-1.229c.516-.375 1.625-.625 2.219.125.701.885-.17 1.587-1.078 2.719-.953 1.186-1 3.655-1 3.655h1.969s.135-2.318 1.041-3.381c.603-.707 1.443-1.338 1.443-2.494s-1.187-2.437-3.687-2.437zM11 16h2v2h-2z%22/%3E %3C/svg%3E");
				background-repeat: no-repeat;
				background-position: left center;
				padding-left: 28px;
				display: inline-block;
				height: 24px;
				line-height: 24px;
			}
			`);
		}
		for (var key in indicators) {
			$('.moe-indicator').append(indicators[key]);
		}
	}
}

/* Thought maker: [[User:UCHIHAWJ]] */

$(() => (async () => {
	if (mw.config.get("wgNamespaceNumber") == 10 && $(".navbox:not(.template-documentation .navbox)").length > 0) {
		await mw.loader.using(["mediawiki.api"]);

		const API = new mw.Api();
		const TITLE = mw.config.get("wgPageName");

		const [EMBEDDED_IN, LINKED] = await Promise.all([whatEmbeddedIn(API, TITLE), whatLinked(API, TITLE)]);
		const UNLINKED = [...EMBEDDED_IN].filter(title => !LINKED.has(title));

		const REPORT = $('<span>').text(`共有 ${EMBEDDED_IN.size} ${wgULS('个条目', '個條目')}嵌入本模板，${UNLINKED.length > 0 ? `其中 ${UNLINKED.length} ${wgULS('个条目', '個條目')}未被模板${wgULS('链接', '連結')}：` : `所有${wgULS('条目', '條目')}均已被模板${wgULS('链接', '連結')}`}`);

		const ARTICLES_UL = $('<ul>').attr('id', 'not-linked-articles-list');
		for (const ARTICLE of UNLINKED) {
			const ARTCLE_LINK = $('<a>').text(ARTICLE).attr({
				'href': `/${encodeURIComponent(ARTICLE)}`,
				'title': ARTICLE
			});
			const ARTCLE_LI = $('<li>').append(ARTCLE_LINK);
			ARTICLES_UL.append(ARTCLE_LI);
		}
		const ARTICLES_ELE = $('<div>')
			.attr('id', 'not-linked-articles')
			.append('<hr>').append(REPORT).append(ARTICLES_UL);
		$('#catlinks').append(ARTICLES_ELE);
	} else {
		return;
	}

	async function whatEmbeddedIn(api, title) {
		const EMBEDDED_IN = new Set();

		let eicontinue;
		do {
			const res = await api.get({
				action: 'query',
				format: 'json',
				list: 'embeddedin',
				einamespace: '0',
				eititle: title,
				eilimit: 'max',
				eicontinue
			});

			(res.query.embeddedin || []).forEach(item => EMBEDDED_IN.add(item.title));
			eicontinue = res?.continue?.eicontinue;
		} while (eicontinue);

		return EMBEDDED_IN;
	}

	async function whatLinked(api, title) {
		const LINKED = new Set();

		let plcontinue;
		do {
			const res = await api.get({
				action: 'query',
				format: 'json',
				prop: 'links',
				titles: title,
				plnamespace: '0',
				pllimit: 'max',
				plcontinue
			});

			const PAGE = Object.values(res.query.pages)[0];
			(PAGE.links || []).forEach(link => LINKED.add(link.title));
			plcontinue = res?.continue?.plcontinue;
		} while (plcontinue);

		return LINKED;
	}
})());
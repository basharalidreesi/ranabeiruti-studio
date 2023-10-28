const embedConfig = {
	supportedHosts: [
		{
			name: "youtube.com",
			title: "YouTube",
			oEmbedURIComponents: [
				"https://youtube.com/oembed?url=",
				"${uri}",
				"&format=json",
			],
		},
		{
			name: "youtu.be",
			title: "YouTube",
			oEmbedURIComponents: [
				"https://youtube.com/oembed?url=",
				"${uri}",
				"&format=json",
			],
		},
		{
			name: "vimeo.com",
			title: "Vimeo",
			oEmbedURIComponents: [
				"https://vimeo.com/api/oembed.json?url=",
				"${uri}",
			],
		},
		{
			name: "open.spotify.com",
			title: "Spotify",
			oEmbedURIComponents: [
				"https://open.spotify.com/oembed?url=",
				"${uri}",
			],
		},
		{
			name: "soundcloud.com",
			title: "SoundCloud",
			oEmbedURIComponents: [
				"https://soundcloud.com/oembed?url=",
				"${uri}",
				"&format=json",
			],
		},
	],
	listOfSupportedHosts: () => new Intl.ListFormat("en", { style: "long", type: "disjunction" }).format([...new Set(embedConfig.supportedHosts.map((host) => host.title))]?.sort()),
	encodeOEmbedQuery: (url) => {
		if (!url) { return null; };
		try {
			const uri = encodeURIComponent(url);
			const hostname = new URL(url)?.hostname?.replace("www.", "");
			const hostConfig = embedConfig.supportedHosts.find((host) => host.name === hostname);
			const uriIndexInHostOEmbedURIComponents = hostConfig?.oEmbedURIComponents?.indexOf("${uri}");
			if (!hostConfig || uriIndexInHostOEmbedURIComponents === -1) { return null; };
			return hostConfig.oEmbedURIComponents?.toSpliced(uriIndexInHostOEmbedURIComponents, 1, uri)?.join("");
		} catch {
			return false;
		};
	},
	performOEmbedQuery: async (encodedOEmbedQuery) => {
		if (!encodedOEmbedQuery) { return; };
		return await fetch(encodedOEmbedQuery)?.then((res) => res?.json()).then(console.info("Fetching oEmbed"));
	},
	getOEmbed: async (url) => {
		try {
			const data = await embedConfig.performOEmbedQuery(embedConfig.encodeOEmbedQuery(url));
			return data ? data : null;
		} catch {
			return null;
		}
	},
	validateOEmbed: async (url) => {
		if (!url) { return true; };
		const data = await embedConfig.getOEmbed(url);
		if (data) { return true; };
		return (`Not a valid ${embedConfig.listOfSupportedHosts()} link`);
	},
};

export default embedConfig;
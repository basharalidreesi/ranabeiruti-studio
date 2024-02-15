import slugify from "@sindresorhus/slugify";

const slugConfig = {
	customSlugify: function(value: string) {
		if (!value) { return ""; };
		return slugify(value, {
			customReplacements: [
				["×", "x"],
			],
		});
	},
	requireSlug: function(value: { current?: string; } | undefined) {
		if (!value || !value?.current || value?.current?.trim()?.length === 0) { return "Required"; };
		if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/g.test(value?.current)) { return "Invalid slug"; };
		return true;
	},
};

export default slugConfig;
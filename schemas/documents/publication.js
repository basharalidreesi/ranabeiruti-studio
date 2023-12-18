import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { slugConfig, stringConfig } from "../../util";

export const PUBLICATION_ICON = BookIcon;
export const PUBLICATION_TITLE = "Publication";

export default defineType({
	name: "publication",
	type: "document",
	title: PUBLICATION_TITLE,
	icon: PUBLICATION_ICON,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: "",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
		}),
	],
	// initialValue config
	// orderings config
	// preview config
});
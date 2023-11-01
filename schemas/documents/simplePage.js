import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { slugConfig, stringConfig } from "../../util";

export default defineType({
	name: "simplePage",
	type: "document",
	title: "Page",
	icon: DocumentIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
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
	orderings: [
		{
			title: "Title",
			name: "titleAsc",
			by: [
				{ field: "title", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			title: "title",
		},
		prepare(selection) {
			const { title } = selection;
			return {
				title: title,
			}
		},
	},
});
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { slugConfig, stringConfig } from "../../util";

const RESERVED_SLUGS = [
	"projects",
	"press",
	"search",
];

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
				// isUnique config
			},
			validation: (Rule) => Rule.custom((value) => {
				if (value && value.current && RESERVED_SLUGS.includes(value.current.toLowerCase()?.trim())) {
					return "This slug is reserved";
				};
				return slugConfig.requireSlug(value);
			}),
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
			// slug: "slug",
		},
		prepare(selection) {
			const {
				title,
				// slug,
			} = selection;
			return {
				title: title,
				// subtitle: slug && slug.current ? `/${slug.current}/` : null,
			}
		},
	},
});
import { DocumentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { slugConfig, stringConfig } from "../../util";

const RESERVED_SLUGS = [
	"projects",
	"press",
	"search",
];

const INITIAL_PAGE_BUILDER_VALUE = {
	body: [
		{
			_type: "row",
			doesBreakout: false,
			isEnabled: true,
			columns: [
				{
					_type: "column",
					ratio: 1,
					verticalAlignment: "top",
					content: [],
				},
			],
		},
	],
};

export default defineType({
	name: "page",
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
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
		}),
		defineField({
			name: "page",
			type: "pageBuilder",
			title: "Page",
			description: "",
		}),
	],
	initialValue: {
		page: INITIAL_PAGE_BUILDER_VALUE,
	},
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
			const {
				title,
			} = selection;
			return {
				title: title,
			}
		},
	},
});
import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
import { INITIAL_PAGE_BUILDER_VALUE } from "./project";

export const PUBLICATION_ICON = BookIcon;
export const PUBLICATION_TITLE = "Publication";

export default defineType({
	name: "publication",
	type: "document",
	title: PUBLICATION_TITLE,
	icon: PUBLICATION_ICON,
	groups: [
		{
			name: "basicInformation",
			title: "Basic Information",
		},
		{
			name: "tags",
			title: "Tags",
		},
		{
			name: "relations",
			title: "Relations",
		},
		{
			name: "content",
			title: "Content",
		},
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
			group: "basicInformation",
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: "",
			group: "basicInformation",
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
			group: "basicInformation",
		}),
		defineField({
			name: "profiles",
			type: "array",
			title: "Profiles",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Profile",
					description: "",
					to: [{ type: "profile", }],
					options: {
						disableNew: true,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1),
			group: "basicInformation",
		}),
		defineField({
			name: "clients",
			type: "array",
			title: "Clients",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Client",
					description: "",
					to: [{ type: "client", }],
				}),
			],
			group: "basicInformation",
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: "",
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
			group: "basicInformation",
		}),
		defineField({
			name: "locations",
			type: "array",
			title: "Locations",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Location",
					description: "",
					to: [{ type: "location", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "types",
			type: "array",
			title: "Types",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Type",
					description: "",
					to: [{ type: "type_", }],
					options: {
						// filter: `"publication" in applicableToDocumentTypes`,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1),
			group: "tags",
		}),
		defineField({
			name: "subjects",
			type: "array",
			title: "Subjects",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Subject",
					description: "",
					to: [{ type: "subject", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "collections",
			type: "array",
			title: "Collections",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Collection",
					description: "",
					to: [{ type: "collection", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "image",
			type: "mainImage",
			title: "Main Image",
			description: "",
			group: "content",
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
			group: "content",
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: "",
			group: "content",
		}),
		defineField({
			name: "relatedProjects",
			type: "array",
			title: "Related Projects",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Project",
					description: "",
					to: [{ type: "project", }],
					options: {
						disableNew: true,
					},
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "relatedPublications",
			type: "array",
			title: "Related Publications",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Publication",
					description: "",
					to: [{ type: "publication", }],
					options: {
						disableNew: true,
					},
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "relatedNews",
			type: "array",
			title: "Related News",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "News Item",
					description: "",
					to: [{ type: "news", }],
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "relatedPress",
			type: "array",
			title: "Related Press",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Press Item",
					description: "",
					to: [{ type: "press", }],
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "page",
			type: "pageBuilder",
			title: "Page",
			description: "",
			group: "content",
		}),
	],
	initialValue: {
		page: INITIAL_PAGE_BUILDER_VALUE,
	},
	orderings: [
		{
			title: "Date, newest first",
			name: "dateDesc",
			by: [
				{ field: "date", direction: "desc" },
			],
		},
		{
			title: "Date, oldest first",
			name: "dateAsc",
			by: [
				{ field: "date", direction: "asc" },
			],
		},
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
			subtitle: "subtitle",
			description: "description",
			date: "date",
			types: "types",
			type0: "types.0.name",
			image: "image",
		},
		prepare(selection) {
			const {
				title,
				subtitle,
				description,
				date,
				types,
				type0,
				image,
			} = selection;
			return {
				title: [title, title && subtitle ? subtitle : null]?.filter(Boolean)?.join(": "),
				subtitle: [type0 && `${type0}${Object.keys(types)?.length > 1 ? `+${Object.keys(types)?.length - 1}` : ""}`, date && date.startDate ? dateConfig.renderComplexDate(date, "short") : null]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});
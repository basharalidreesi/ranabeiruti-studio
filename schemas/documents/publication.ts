import { BookIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";
import { dateConfig, descriptionConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
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
		{
			name: "display",
			title: "Display",
		},
	],
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: descriptionConfig.title("Publication", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
			group: "basicInformation",
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: descriptionConfig.subtitle("Publication", "optional"),
			group: "basicInformation",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: descriptionConfig.slug("Publication", "required"),
			options: {
				source: "title",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
			group: "basicInformation",
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: descriptionConfig.date("Publication", "Publications Listing", "required", "Will appear in year-only format."),
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
			group: "basicInformation",
		}),
		defineField({
			name: "profiles",
			type: "array",
			title: "Profiles",
			description: descriptionConfig.profiles("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Profile",
					to: [{ type: "profile", }],
					options: {
						disableNew: true,
					},
				}),
			],
			hidden: true,
			group: "basicInformation",
		}),
		defineField({
			name: "clients",
			type: "array",
			title: "Clients",
			description: descriptionConfig.clients("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Client",
					to: [{ type: "client", }],
				}),
			],
			group: "basicInformation",
		}),
		defineField({
			name: "locations",
			type: "array",
			title: "Locations",
			description: descriptionConfig.locations("Publication", "Publications Listing", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Location",
					to: [{ type: "location", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "types",
			type: "array",
			title: "Types",
			description: descriptionConfig.locations("Publication", "Publications Listing", "required"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Type",
					to: [{ type: "type_", }],
					options: {
						filter: `"publication" in applicableToDocumentTypes`,
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
			description: descriptionConfig.subjects("Publication", "Publications Listing", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Subject",
					to: [{ type: "subject", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "collections",
			type: "array",
			title: "Collections",
			description: descriptionConfig.collections("Publication", "Publications Listing", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Collection",
					to: [{ type: "collection", }],
				}),
			],
			group: "tags",
		}),
		defineField({
			name: "image",
			type: "mainImage",
			title: "Main Image",
			description: descriptionConfig.mainImage("Publication", "Publications Listing", "required, whereas adding a caption is optional", "Will be displayed in ISO 216 aspect ratio (e.g. A4, A3, ...) in portrait orientation."),
			group: "content",
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: descriptionConfig.description("Publication", "Publications Listing", "optional, but its completion is highly encouraged"),
			group: "content",
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: descriptionConfig.credits("Publication", "optional"),
			group: "content",
		}),
		defineField({
			name: "relatedProjects",
			type: "array",
			title: "Related Projects",
			description: descriptionConfig.relatedProjects("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Project",
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
			description: descriptionConfig.relatedPublications("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Publication",
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
			description: descriptionConfig.relatedNews("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "News Item",
					to: [{ type: "news", }],
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "relatedPress",
			type: "array",
			title: "Related Press",
			description: descriptionConfig.relatedPress("Publication", "optional"),
			of: [
				defineArrayMember({
					type: "reference",
					title: "Press Item",
					to: [{ type: "press", }],
				}),
			],
			group: "relations",
		}),
		defineField({
			name: "page",
			type: "complexPageBuilder",
			title: "Page",
			description: descriptionConfig.page("Publication"),
			group: "content",
		}),
		defineField({
			name: "isListed",
			type: "boolean",
			title: "Include publication in listing?",
			description: descriptionConfig.isListed("Publication", "Publications Listing", "required", "True"),
			options: {
				layout: "checkbox",
			},
			initialValue: true,
			group: "display",
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
			description: "description",
			date: "date",
			types: "types",
			type0: "types.0.name",
			image: "image",
		},
		prepare(selection) {
			const {
				title,
				description,
				date,
				types,
				type0,
				image,
			} = selection;
			return {
				title: title,
				subtitle: [type0 && `${type0}${Object.keys(types)?.length > 1 ? ` +${Object.keys(types)?.length - 1}` : ""}`, date ? date.split("-")?.[0] : null]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});
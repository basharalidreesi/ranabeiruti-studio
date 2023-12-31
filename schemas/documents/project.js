import { defineArrayMember, defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
import { DatabaseIcon } from "@sanity/icons";

export const PROJECT_ICON = DatabaseIcon;
export const PROJECT_TITLE = "Project";

export const INITIAL_PAGE_BUILDER_VALUE = {
	body: [
		{
			_type: "row",
			doesBreakout: false,
			columns: [
				{
					_type: "column",
					ratio: 2,
					verticalAlignment: "top",
					content: [
						{
							_type: "block",
							markDefs: [],
							children: [
								{
									_type: "span",
									text: "",
								},
							],
						},
						{
							_type: "title",
						},
						{
							_type: "description",
							doesInclude: ["projectDescription", "collectionDescriptions"],
						},
					],
				},
				{
					_type: "column",
					ratio: 3,
					verticalAlignment: "top",
					content: [
						{
							_type: "block",
							markDefs: [],
							children: [
								{
									_type: "span",
									text: "",
								},
							],
						},
						{
							_type: "image",
							captionPlacement: "bottom",
							imageRatio: 1,
							captionRatio: 1,
							captionVerticalAlignment: "top",
							isUsedAsPlaceholder: true,
						},
					],
				},
			],
		},
	],
};

export default defineType({
	name: "project",
	type: "document",
	title: PROJECT_TITLE,
	icon: PROJECT_ICON,
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
		}),
		defineField({
			name: "date",
			type: "complexDate",
			title: "Date",
			description: "",
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
						// filter: `"project" in applicableToDocumentTypes`,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1),
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
		}),
		defineField({
			name: "image",
			type: "mainImage",
			title: "Main Image",
			description: "",
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: "",
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
			title: "Start Date, newest first",
			name: "startDateDesc",
			by: [
				{ field: "date.startDate", direction: "desc" },
			],
		},
		{
			title: "Start Date, oldest first",
			name: "startDateAsc",
			by: [
				{ field: "date.startDate", direction: "asc" },
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
			type: "types.0.name",
			image: "image",
		},
		prepare(selection) {
			const {
				title,
				subtitle,
				description,
				date,
				type,
				image,
			} = selection;
			return {
				title: [title, title && subtitle ? subtitle : null]?.filter(Boolean)?.join(": "),
				subtitle: [type, date && date.startDate ? dateConfig.renderComplexDate(date, "short") : null]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});
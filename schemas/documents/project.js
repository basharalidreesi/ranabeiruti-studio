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
			isEnabled: true,
			columns: [
				{
					_type: "column",
					ratio: 1,
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
					ratio: 1,
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
			description: "The title of this Project. This field is required.",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
			group: "basicInformation",
		}),
		defineField({
			name: "subtitle",
			type: "string",
			title: "Subtitle",
			description: "The subtitle of this Project. This field is optional.",
			group: "basicInformation",
		}),
		defineField({
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "The URL-friendly identifier for this Project, generated from its title. Click on \"Generate\" to create a slug from the title. Changing the slug after the project is published and circulated could lead to broken links and cause accessibility issues for users who have bookmarked or shared the previous URL. This field is required.",
			options: {
				source: "title",
				slugify: slugConfig.customSlugify,
			},
			validation: (Rule) => Rule.custom(slugConfig.requireSlug),
			group: "basicInformation",
		}),
		defineField({
			name: "date",
			type: "complexDate",
			title: "Date",
			description: "",
			group: "basicInformation",
		}),
		defineField({
			name: "profiles",
			type: "array",
			title: "Profiles",
			description: "Profiles associated with this Project. This field is optional.",
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
			description: "Clients associated with this Project. This field is optional, and is currently not displayed anywhere on the website.",
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
			description: "Locations associated with this Project. Will appear as tags in various places and be used for filtering within the Projects Listing. This field is optional.",
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
			description: "Types associated with this Project. Will appear as tags in various places and be used for filtering within the Projects Listing. This field is required. At least one type must be selected.",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Type",
					to: [{ type: "type_", }],
					options: {
						filter: `"project" in applicableToDocumentTypes`,
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
			description: "Subjects associated with this Project. Will appear as tags in various places and be used for filtering within the Projects Listing. This field is optional.",
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
			description: "Collections associated with this Project. Will appear as tags in various places and be used for filtering within the Projects Listing. This field is optional.",
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
			description: "The main image associated with this Project. Will appear in the card generated for this Project in the Projects Listing, in callouts, and in social media shares. Selecting an image is required, whereas adding a caption is optional. Click on the crop icon located in the top right corner of the image to adjust its composition or define its focal point.",
			group: "content",
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "A brief description or summary of this Project. Will appear in the card generated for this Project in the Projects Listing, in callouts, and in social media shares and Google results. This field is optional, but its completion is highly encouraged. A good blurb is typically concise yet informative. Aim for around 1 to 2 sentences, providing enough information to give readers a brief overview of the project without overwhelming them with details.",
			group: "content",
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: "Credits associated with this Project. This field is optional.",
			group: "content",
		}),
		defineField({
			name: "relatedProjects",
			type: "array",
			title: "Related Projects",
			description: "Other Projects related to this Project. This field is optional.",
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
			description: "Publications related to this Project. This field is optional.",
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
			description: "News items related to this Project. This field is optional.",
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
			description: "Press items related to this Project. This field is optional.",
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
			description: "The page builder for this Project.",
			group: "content",
		}),
		defineField({
			name: "isListed",
			type: "boolean",
			title: "Include project in listing?",
			description: "Specifies whether this Project can appear in the Projects Listing. This field is required. Default state: True",
			options: {
				layout: "checkbox",
			},
			initialValue: true,
			group: "display",
		}),
		defineField({
			name: "listingDisplaySize",
			type: "string",
			title: "Display Size",
			description: "The size of the card generated for this Project in the Projects Listing. This field is required. Default value: Medium.",
			options: {
				list: [
					{
						value: "small",
						title: "Small",
					},
					{
						value: "medium",
						title: "Medium",
					},
					{
						value: "large",
						title: "Large",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "medium",
			validation: (Rule) => Rule.required(),
			group: "display",
		}),
		defineField({
			name: "listingAlignment",
			type: "string",
			title: "Display Alignment",
			description: "The alignment of the card generated for this Project in the Projects Listing. This field is required. Default value: Auto.",
			options: {
				list: [
					{
						value: "auto",
						title: "Auto",
					},
					{
						value: "left",
						title: "Left",
					},
					{
						value: "middle",
						title: "Middle",
					},
					{
						value: "right",
						title: "Right",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "auto",
			validation: (Rule) => Rule.required(),
			group: "display",
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
				subtitle: [type0 && `${type0}${Object.keys(types)?.length > 1 ? ` +${Object.keys(types)?.length - 1}` : ""}`, date && date.startDate ? dateConfig.renderComplexDate(date, "short") : null]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});
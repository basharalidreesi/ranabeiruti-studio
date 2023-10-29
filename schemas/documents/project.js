import { defineArrayMember, defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
import { DatabaseIcon } from "@sanity/icons";

const INITIAL_COLUMN_VALUE = [{
	_type: "column",
	ratio: 1,
	verticalAlignment: "top",
}];
const INITIAL_MULTIMEDIA_PORTABLE_TEXT_VALUE = [{
	_type: "block",
	markDefs: [],
	children: [
		{
			_type: "span",
			text: "",
			marks: [],
		},
	],
}];
const INITIAL_PAGE_BUILDER_VALUE = [
	{
		_type: "row",
		columns: [
			...INITIAL_COLUMN_VALUE,
			{
				_type: "column",
				ratio: 3,
				verticalAlignment: "top",
				content: [
					...INITIAL_MULTIMEDIA_PORTABLE_TEXT_VALUE,
					{
						_type: "image",
						captionPlacement: "bottom",
						captionVerticalAlignment: "top",
						isUsedAsPlaceholder: true,
					},
				],
			},
			...INITIAL_COLUMN_VALUE,
		],
	},
	{
		_type: "row",
		columns: [
			...INITIAL_COLUMN_VALUE,
			{
				_type: "column",
				ratio: 3,
				verticalAlignment: "top",
				content: [
					...INITIAL_MULTIMEDIA_PORTABLE_TEXT_VALUE,
					{
						_type: "title",
						isUsedAsPlaceholder: true,
					},
				],
			},
			...INITIAL_COLUMN_VALUE,
		],
	},
];

export default defineType({
	name: "project",
	type: "document",
	title: "Project",
	icon: DatabaseIcon,
	fields: [
		defineField({
			name: "title", // `multimediaPortableText` will break if `name` is changed
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "subtitle", // `multimediaPortableText` will break if `name` is changed
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
			name: "date", // `dateConfig.renderComplexDate` will break if `name` is changed
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
						// disableNew: true,
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
					options: {
						// disableNew: true,
					},
				}),
			],
			validation: (Rule) => Rule.required().min(1),
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
					options: {
						// disableNew: true,
					},
				}),
			],
		}),
		defineField({
			name: "news",
			type: "array",
			title: "News",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "News",
					description: "",
					to: [{ type: "news", }],
				}),
			],
		}),
		defineField({
			name: "press",
			type: "array",
			title: "Press",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Press",
					description: "",
					to: [{ type: "press", }],
				}),
			],
		}),
		defineField({
			name: "image", // `multimediaPortableText` will break if `name` is changed
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
			name: "body",
			type: "pageBuilder",
			title: "Body",
			description: "",
		}),
		defineField({
			name: "credits",
			type: "simplePortableText",
			title: "Credits",
			description: "",
		}),
	],
	initialValue: {
		body: INITIAL_PAGE_BUILDER_VALUE,
	},
	// orderings config
	preview: {
		select: {
			title: "title",
			description: "description",
			date: "date",
			image: "image",
		},
		prepare(selection) {
			const {
				title,
				description,
				date,
				image,
			} = selection;
			return {
				title: title,
				subtitle: dateConfig.renderComplexDate(date, "short"),
				description: portableTextConfig.renderAsPlainText(description),
				media: image,
			};
		},
	},
});
import { defineArrayMember, defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, slugConfig, stringConfig } from "../../util";
import { DatabaseIcon } from "@sanity/icons";

const INITIAL_COLUMN_VALUE = [{
	_type: "column",
	ratio: 1,
	verticalAlignment: "top",
}];
const INITIAL_PAGE_BUILDER_VALUE = {
	header: [
		{
			_type: "row",
			columns: [
				...INITIAL_COLUMN_VALUE,
				{
					_type: "title",
					ratio: 3,
					verticalAlignment: "top",
				},
				...INITIAL_COLUMN_VALUE,
			],
		},
		{
			_type: "row",
			columns: [
				...INITIAL_COLUMN_VALUE,
				{
					_type: "image_",
					ratio: 3,
					verticalAlignment: "top",
					captionPlacement: "bottom",
					imageRatio: 1,
					captionRatio: 1,
					captionVerticalAlignment: "top",
				},
				...INITIAL_COLUMN_VALUE,
			],
		},
	],
	body: [
		{
			_type: "row",
			columns: [
				...INITIAL_COLUMN_VALUE,
				...INITIAL_COLUMN_VALUE,
				...INITIAL_COLUMN_VALUE,
			],
		},
	],
	footer: [
		{
			_type: "row",
			columns: [
				...INITIAL_COLUMN_VALUE,
				{
					_type: "credits",
					ratio: 3,
					verticalAlignment: "top",
				},
				...INITIAL_COLUMN_VALUE,
			],
		},
	],
};

export default defineType({
	name: "project",
	type: "document",
	title: "Project",
	icon: DatabaseIcon,
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
			name: "page",
			type: "pageBuilder",
			title: "Page",
			description: "",
		}),
	],
	initialValue: {
		page: INITIAL_PAGE_BUILDER_VALUE,
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
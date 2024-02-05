import { defineArrayMember, defineField, defineType } from "sanity";
import { stringConfig } from "../../util";
import { CogIcon } from "@sanity/icons";

export default defineType({
	name: "settings",
	type: "document",
	title: "Settings",
	icon: CogIcon,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Website Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Website Description",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
			rows: 5,
		}),
		defineField({
			name: "navigationItems",
			type: "array",
			title: "Global Navigation Menu",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Navigation Item",
					to: [
						{ type: "listing", },
					],
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Website Image",
			description: "",
			options: {
				sources: [],
				storeOriginalFilename: false,
				accept: ".svg",
			},
			fields: [
				defineField({
					name: "transformationQuery",
					type: "string",
					title: "Image Transformation Query",
					description: "",
				}),
			],
			validation: Rule => Rule.custom((value) => value && value.asset ? true : "Required"),
		}),
		defineField({
			name: "keywords",
			type: "array",
			title: "Website Keywords",
			description: "",
			of: [{ type: "string", }],
			options: { layout: "tags", },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "analytics",
			type: "string",
			title: "Analytics Snippet",
			description: "",
		}),
	],
	preview: {
		title: "title",
		media: null,
	},
});
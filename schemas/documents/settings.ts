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
			description: "The title of this Website. This field is required.",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Website Description",
			description: "A brief description or summary of this Website for SEO purposes. Will appear in social media shares and Google Search results. This field is required.",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
			rows: 5,
		}),
		defineField({
			name: "navigationItems",
			type: "array",
			title: "Global Navigation Menu",
			description: "Items to be displayed in the global navigation menu of this Website. This field is required. At least one item must be specified.",
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
			description: "The image representing this Website. Will appear in social media shares. This field is required, and accepts SVG files only.",
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
					description: "An optional query to transform the image using the Sanity Content Delivery Network (CDN). This field is required. Please consult https://www.sanity.io/docs/image-urls before making any changes to this field.",
				}),
			],
			validation: Rule => Rule.custom((value) => value && value.asset ? true : "Required"),
		}),
		defineField({
			name: "keywords",
			type: "array",
			title: "Website Keywords",
			description: "Keywords that best describe this Website and its content for SEO purposes. This field is required. To add a keyword, select the field, start typing, and then press enter.",
			of: [{ type: "string", }],
			options: { layout: "tags", },
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "analytics",
			type: "string",
			title: "Analytics Snippet",
			description: "The code snippet supplied by your analytics provider. This field is optional.",
		}),
	],
	preview: {
		/** @ts-ignore */
		title: "title",
		media: null,
	},
});
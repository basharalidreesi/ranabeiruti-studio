import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { dateConfig, imageConfig, stringConfig } from "../../util";

export default defineType({
	name: "press",
	type: "document",
	title: "Press",
	icon: BillIcon,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "url",
			type: "url",
			title: "URL",
			description: "",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "publisher",
			type: "string",
			title: "Publisher",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
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
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: "",
		}),
		// defineField({
		// 	name: "image",
		// 	type: "image",
		// 	title: "Main Image",
		// 	description: "",
		// 	options: imageConfig.options,
		// 	// validation: (Rule) => Rule.custom((value) => {
		// 	// 	if (!value?.asset) { return "Required"; };
		// 	// 	return true;
		// 	// }),
		// }),
	],
	// orderings config
	preview: {
		select: {
			title: "title",
			// date
			// description
			// image
		},
		prepare(selection) {
			const {
				title,
				// date
				// description
				// image
			} = selection;
			return {
				title: title,
				// subtitle
				// media
				// description
			};
		},
	},
});
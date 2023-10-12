import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { imageConfig, requireString } from "../../util";

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
			validation: (Rule) => Rule.custom(requireString),
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
			validation: (Rule) => Rule.custom(requireString),
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: "",
			options: {
				// dateFormat: "D MMMM YYYY",
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Short Description",
			description: "",
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Main Image",
			description: "",
			options: imageConfig.options,
			// validation: (Rule) => Rule.custom((value) => {
			// 	if (!value?.asset) { return "Required"; };
			// 	return true;
			// }),
		}),
	],
	// orderings config
	preview: {
		select: {
			title: "title",
			// date
			// image
		},
		prepare(selection) {
			const {
				title,
				// date
				// image
			} = selection;
			return {
				title: title,
				// subtitle
				// media
			};
		},
	},
});
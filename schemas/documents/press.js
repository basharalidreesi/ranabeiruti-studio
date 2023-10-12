import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

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
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
		defineField({
			name: "url",
			type: "url",
			title: "URL",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
		defineField({
			name: "publisher",
			type: "string",
			title: "Publisher",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: "",
			// date config
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
		defineField({
			name: "description",
			type: "text",
			title: "Short Description",
			description: "",
			// text config
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Main Image",
			description: "",
			// image config
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
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
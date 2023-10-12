import { defineField, defineType } from "sanity";
import { customSlugify } from "../../util";
import { BellIcon } from "@sanity/icons";

export default defineType({
	name: "news",
	type: "document",
	title: "News",
	icon: BellIcon,
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
			name: "slug",
			type: "slug",
			title: "Slug",
			description: "",
			options: {
				source: "title",
				slugify: customSlugify,
				// isUnique config
			},
			// initalValue config
			// hidden config
			// readOnly config
			validation: (Rule) => Rule.required(),
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
		defineField({
			name: "body",
			type: "multimediaPortableText",
			title: "Body",
			description: "",
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
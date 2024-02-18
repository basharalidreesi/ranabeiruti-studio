import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { dateConfig, descriptionConfig, imageConfig, portableTextConfig, stringConfig } from "../../util";

export const PRESS_ICON = BillIcon;
export const PRESS_TITLE = "Press";

export default defineType({
	name: "press",
	type: "document",
	title: PRESS_TITLE,
	icon: PRESS_ICON,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Title",
			description: descriptionConfig.title("Press item", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "url",
			type: "url",
			title: "URL",
			description: descriptionConfig.slug("Press item", "required"),
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "publisher",
			type: "string",
			title: "Publisher",
			description: descriptionConfig.publisher("Press item", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "date",
			type: "date",
			title: "Date",
			description: descriptionConfig.date("Press item", "Press Listing", "required"),
			options: {
				dateFormat: dateConfig.dateFormat,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "image",
			type: "image",
			title: "Image",
			description: descriptionConfig.mainImage("Press item", "Press Listing", "optional", false),
			options: imageConfig.options,
		}),
		defineField({
			name: "description",
			type: "simplePortableText",
			title: "Blurb",
			description: descriptionConfig.description("Press item", "Press Listing", "optional", false),
		}),
	],
	orderings: [
		{
			title: "Date, newest first",
			name: "dateDesc",
			by: [
				{ field: "date", direction: "desc" },
			],
		},
		{
			title: "Date, oldest first",
			name: "dateAsc",
			by: [
				{ field: "date", direction: "asc" },
			],
		},
		{
			title: "Title",
			name: "titleAsc",
			by: [
				{ field: "title", direction: "asc" },
			],
		},
		{
			title: "Publisher",
			name: "publisherAsc",
			by: [
				{ field: "publisher", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			title: "title",
			publisher: "publisher",
			date: "date",
			image: "image",
			description: "description",
		},
		prepare(selection) {
			const {
				title,
				publisher,
				date,
				image,
				description,
			} = selection;
			return {
				title: title,
				subtitle: [publisher, date ? dateConfig.renderAsString(date, "short") : null]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
				media: image && image.asset ? image : null,
			};
		},
	},
});
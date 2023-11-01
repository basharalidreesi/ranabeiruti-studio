import { BillIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, stringConfig } from "../../util";

export const PRESS_ICON = BillIcon;

export default defineType({
	name: "press",
	type: "document",
	title: "Press",
	icon: PRESS_ICON,
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
			description: "description",
		},
		prepare(selection) {
			const {
				title,
				publisher,
				date,
				description,
			} = selection;
			return {
				title: title,
				subtitle: [date ? dateConfig.renderAsString(date, "short") : "No date", publisher || "no publisher"]?.filter(Boolean)?.join(", "),
				description: portableTextConfig.renderAsPlainText(description),
			};
		},
	},
});
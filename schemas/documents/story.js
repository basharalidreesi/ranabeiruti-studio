import { IceCreamIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { dateConfig, portableTextConfig, stringConfig } from "../../util";

export const STORY_ICON = IceCreamIcon;

export default defineType({
	name: "story",
	type: "document",
	title: "Story",
	icon: STORY_ICON,
	fields: [
		// defineField({
		// 	name: "title",
		// 	type: "string",
		// 	title: "Title",
		// 	description: "",
		// 	validation: (Rule) => Rule.custom(stringConfig.requireString),
		// }),
		defineField({
			name: "date",
			type: "complexDate",
			title: "Date",
			description: "",
		}),
		defineField({
			name: "body",
			type: "simplePortableText",
			title: "Body",
			description: "",
			validation: (Rule) => Rule.required(),
		}),
	],
	orderings: [
		{
			title: "Start Date, newest first",
			name: "startDateDesc",
			by: [
				{ field: "date.startDate", direction: "desc" },
			],
		},
		{
			title: "Start Date, oldest first",
			name: "startDateAsc",
			by: [
				{ field: "date.startDate", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			date: "date",
			body: "body",
		},
		prepare(selection) {
			const {
				date,
				body,
			} = selection;
			return {
				title: portableTextConfig.renderAsPlainText(body)?.substring(0, 75) + (portableTextConfig.renderAsPlainText(body)?.length > 75 ? "..." : ""),
				subtitle: dateConfig.renderComplexDate(date, "short"),
			};
		},
	},
});
import { CommentIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { dateConfig, descriptionConfig, portableTextConfig } from "../../util";

export const STORY_ICON = CommentIcon;

export default defineType({
	name: "story",
	type: "document",
	title: "Story",
	icon: STORY_ICON,
	fields: [
		defineField({
			name: "date",
			type: "complexDate",
			title: "Date",
			description: descriptionConfig.date("Story", "Projects Listing", "required"),
		}),
		defineField({
			name: "body",
			type: "simplePortableText",
			title: "Body",
			description: descriptionConfig.body("Story", "required", "Aim for around 1 to 2 sentences."),
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
				title: portableTextConfig.renderAsPlainText(body)?.substring(0, 75) + (portableTextConfig.renderAsPlainText(body)?.length > 75 ? "..." : "") || undefined,
				subtitle: dateConfig.renderComplexDate(date, "short") || undefined,
			};
		},
	},
});
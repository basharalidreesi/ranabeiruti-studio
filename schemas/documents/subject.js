import { BulbOutlineIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const SUBJECT_ICON = BulbOutlineIcon;

export default defineType({
	name: "subject",
	type: "document",
	title: "Subject",
	icon: SUBJECT_ICON,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: "",
			// initalValue config
			// hidden config
			// readOnly config
			// validation config
		}),
	],
	orderings: [
		{
			title: "Name",
			name: "nameAsc",
			by: [
				{ field: "name", direction: "asc" },
			],
		},
	],
	preview: {
		select: {
			name: "name",
		},
		prepare(selection) {
			const {
				name,
			} = selection;
			return {
				title: name,
			};
		},
	},
});
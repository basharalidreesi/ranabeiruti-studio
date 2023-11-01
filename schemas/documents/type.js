import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const TYPE_ICON = TagIcon;

export default defineType({
	name: "type_",
	type: "document",
	title: "Type",
	icon: TYPE_ICON,
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
import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";
import { descriptionConfig, stringConfig } from "../../util";

export const PROFILE_ICON = UserIcon;

export default defineType({
	name: "profile",
	type: "document",
	title: "Profile",
	icon: PROFILE_ICON,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "name",
			type: "string",
			title: "Name",
			description: descriptionConfig.name("Profile", "required"),
			validation: (Rule) => Rule.custom(stringConfig.requireString),
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
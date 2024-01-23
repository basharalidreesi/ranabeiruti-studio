import { defineArrayMember, defineField, defineType } from "sanity";
import { stringConfig } from "../../util";
import { CogIcon, SearchIcon } from "@sanity/icons";

export default defineType({
	name: "settings",
	type: "document",
	title: "Settings",
	icon: CogIcon,
	__experimental_formPreviewTitle: false,
	fields: [
		defineField({
			name: "title",
			type: "string",
			title: "Website Title",
			description: "",
			validation: (Rule) => Rule.custom(stringConfig.requireString),
		}),
		defineField({
			name: "navigationItems",
			type: "array",
			title: "Global Navigation Menu",
			description: "",
			of: [
				defineArrayMember({
					type: "reference",
					title: "Navigation Item",
					to: [
						{ type: "page", },
						{ type: "listing", },
					],
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
	],
});
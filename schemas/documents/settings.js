import { defineArrayMember, defineField, defineType } from "sanity";
import { stringConfig } from "../../util";
import { CogIcon, SearchIcon } from "@sanity/icons";

export default defineType({
	name: "settings",
	type: "document",
	title: "Settings",
	icon: CogIcon,
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
					name: "simplePage",
					type: "reference",
					title: "Page",
					to: [{ type: "simplePage", }],
				}),
				defineArrayMember({
					name: "listing",
					type: "reference",
					title: "Listing",
					to: [{ type: "listing", }],
				}),
				// defineArrayMember({
				// 	name: "searchFunction",
				// 	type: "object",
				// 	title: "Search",
				// 	icon: SearchIcon,
				// 	fields: [
				// 		defineField({
				// 			name: "title",
				// 			type: "string",
				// 			title: "Label",
				// 			description: "",
				// 			initialValue: "Search",
				// 			validation: (Rule) => Rule.custom(stringConfig.requireString),
				// 		}),
				// 	],
				// 	preview: {
				// 		select: {
				// 			title: "title",
				// 		},
				// 		prepare(selection) {
				// 			const { title } = selection;
				// 			return {
				// 				title: title,
				// 				subtitle: "Search Function",
				// 			}
				// 		},
				// 	},
				// }),
			],
		}),
	],
});
import { defineField, defineType } from "sanity";

export default defineType({
	name: "link",
	type: "object",
	title: "Link",
	fields: [
		defineField({
			name: "type",
			type: "string",
			title: "Type",
			description: "",
			options: {
				list: [
					{
						value: "external",
						title: "External",
					},
					{
						value: "internal",
						title: "Internal",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "external",
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: "externalTarget",
			type: "url",
			title: "Target",
			description: "",
			hidden: ({ parent }) => parent?.type !== "external",
			validation: (Rule) => Rule.custom((value, context) => {
				if (!value && context?.parent?.type === "external") { return "Required"; };
				return true;
			}).uri({
				scheme: ["http", "https", "mailto", "tel"],
			}),
		}),
		defineField({
			name: "internalTarget",
			type: "reference",
			title: "Target",
			description: "",
			to: [
				{
					type: "project",
				},
				// other types
			],
			weak: true,
			options: {
				disableNew: true,
			},
			hidden: ({ parent }) => parent?.type !== "internal",
			validation: (Rule) => Rule.custom((value, context) => {
				if (!value && context?.parent?.type === "internal") { return "Required"; };
				return true;
			}),
		}),
	],
});
import { ValidationContext, defineField, defineType } from "sanity";

export const linkBase = [
	defineField({
		name: "type",
		type: "string",
		title: "Type",
		description: "Specifies whether the target of this link is internal or external. This field is required.",
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
		description: "The external target of this link. This field is required.",
		hidden: ({ parent }) => parent?.type !== "external",
		validation: (Rule) => Rule.custom((value, context: ValidationContext & { parent?: any; }) => {
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
		description: "The internal target of this link. This field is required.",
		to: [
			{ type: "project", },
			{ type: "publication", },
			{ type: "news", },
			{ type: "press", },
			{ type: "listing", },
		],
		weak: true,
		options: {
			disableNew: true,
		},
		hidden: ({ parent }) => parent?.type !== "internal",
		validation: (Rule) => Rule.custom((value, context: ValidationContext & { parent?: any; }) => {
			if (!value && context?.parent?.type === "internal") { return "Required"; };
			return true;
		}),
	}),
];

export default defineType({
	name: "link",
	type: "object",
	title: "Link",
	fields: [
		...linkBase,
	],
});
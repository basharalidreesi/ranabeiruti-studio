import { defineField, defineType } from "sanity";
import { imageConfig } from "../../util";

export default defineType({
	name: "mainImage",
	type: "image",
	title: "Main Image",
	description: "",
	fields: [
		defineField({
			name: "isUsedAsHero",
			type: "boolean",
			title: "Use as Hero?",
			options: {
				layout: "checkbox",
			},
			initialValue: false,
			hidden: ({ parent }) => !parent?.asset,
			validation: (Rule) => Rule.custom((value, context) => {
				if (!context?.parent?.asset) { return true; };
				if (context?.parent?.asset && typeof value !== "boolean") { return "Required"; };
				return true;
			}),
		}),
		defineField({
			name: "displaySize",
			type: "string",
			title: "Display Size",
			options: {
				list: [
					{
						value: "small",
						title: "Small",
					},
					{
						value: "medium",
						title: "Medium",
					},
					{
						value: "large",
						title: "Large",
					},
				],
				layout: "radio",
				direction: "horizontal",
			},
			initialValue: "medium",
			hidden: ({ parent }) => !parent?.asset || !parent?.isUsedAsHero,
			validation: (Rule) => Rule.custom((value, context) => {
				if (!context?.parent?.asset) { return true; };
				if (context?.parent?.asset && !value) { return "Required"; };
				return true;
			}),
		}),
		defineField({
			name: "caption",
			type: "simplePortableText",
			title: "Caption",
			hidden: ({ parent }) => !parent?.asset || !parent?.isUsedAsHero,
		}),
	],
	options: imageConfig.options,
	// validation: (Rule) => Rule.custom((value) => {
	// 	if (!value?.asset) { return "Required"; };
	// 	return true;
	// }),
});
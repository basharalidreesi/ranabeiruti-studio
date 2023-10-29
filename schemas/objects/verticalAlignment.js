import { defineField } from "sanity";

export default defineField({
	name: "verticalAlignment",
	type: "string",
	title: "Vertical Alignment",
	description: "",
	options: {
		list: [
			{
				value: "top",
				title: "Align to top",
			},
			{
				value: "middle",
				title: "Align with middle",
			},
			{
				value: "bottom",
				title: "Align to bottom",
			},
		],
		layout: "radio",
		direction: "horizontal",
	},
	initialValue: "top",
	validation: (Rule) => Rule.required(),
});
import { defineField } from "sanity";

export default defineField({
	name: "placement",
	type: "string",
	title: "Placement",
	options: {
		list: [
			{
				value: "left",
				title: "Place left",
			},
			{
				value: "top",
				title: "Place above",
			},
			{
				value: "right",
				title: "Place right",
			},
			{
				value: "bottom",
				title: "Place below",
			},
		],
		layout: "radio",
		direction: "horizontal",
	},
	initialValue: "bottom",
	validation: (Rule) => Rule.required(),
});
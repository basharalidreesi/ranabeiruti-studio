import { defineField } from "sanity";

export default defineField({
	name: "ratio",
	type: "number",
	title: "Ratio",
	initialValue: 1,
	validation: (Rule) => Rule.custom((value) => {
		if (value && value < 1) { return "Must be greater than one"; };
		if (!value) { return "Required"; };
		return true;
	}),
});
import { defineField } from "sanity";

export default defineField({
	name: "ratio",
	type: "number",
	title: "Ratio",
	description: "",
	initialValue: 1,
	validation: (Rule) => Rule.custom((value) => {
		if (value && value < 0) { return "Must be a positive number"; };
		if (value === 0) { return "Must be greater than zero"; };
		if (!value) { return "Required"; };
		return true;
	}),
});
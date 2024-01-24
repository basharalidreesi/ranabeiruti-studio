import { defineField } from "sanity";
import { basicFields } from "./complexPortableText";

export default defineField({
	name: "lessComplexPortableText",
	type: "array",
	title: "Less Complex Portable Text",
	description: "",
	of: [
		...basicFields,
	],
});
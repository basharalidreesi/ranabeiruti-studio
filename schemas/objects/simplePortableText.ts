import { defineArrayMember, defineField } from "sanity";
import { portableTextConfig } from "../../util";

const styles = [
	portableTextConfig.styles.normal,
	// portableTextConfig.styles.blockquote,
];

const lists = [
	// portableTextConfig.lists.bullets,
	// portableTextConfig.lists.numbers,
];

const decorators = [
	portableTextConfig.decorators.strong,
	portableTextConfig.decorators.em,
	portableTextConfig.decorators.underline,
	portableTextConfig.decorators.strikeThrough,
	portableTextConfig.decorators.sup,
];

const annotations = [
	portableTextConfig.annotations.link,
];

export default defineField({
	name: "simplePortableText",
	type: "array",
	title: "Simple Portable Text",
	of: [
		defineArrayMember({
			type: "block",
			styles: styles,
			lists: lists,
			marks: {
				decorators: decorators,
				annotations: annotations,
			},
		}),
	],
});
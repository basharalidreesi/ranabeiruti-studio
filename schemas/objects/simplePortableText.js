import { defineArrayMember, defineType } from "sanity";
import { portableTextConfig } from "../../util";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.blockquote,
	portableTextConfig.styles.hidden,
];

const lists = [];

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

export default defineType({
	name: "simplePortableText",
	type: "array",
	title: "Simple Portable Text",
	description: "",
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
	// initialValue config
	// hidden config
	// readOnly config
	// validation config
	components: {
		field: portableTextConfig.components.field,
	}
});
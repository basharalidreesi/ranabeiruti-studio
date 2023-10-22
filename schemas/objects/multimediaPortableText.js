import { defineArrayMember, defineField, defineType } from "sanity";
import { embedObjectConfig, imageConfig, portableTextConfig } from "../../util";
import { CubeIcon, ImageIcon } from "@sanity/icons";
import { EmbedObjectPreview, LimitedFileInput } from "../../components";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.h3,
	portableTextConfig.styles.blockquote,
	portableTextConfig.styles.note,
	portableTextConfig.styles.hidden,
];

const lists = [
	portableTextConfig.lists.bullets,
	portableTextConfig.lists.numbers,
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

export default defineType({
	name: "multimediaPortableText",
	type: "array",
	title: "Multimedia Portable Text",
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
		defineArrayMember({
			name: "image",
			type: "image",
			title: "Image",
			icon: ImageIcon,
			fields: [
				defineField({
					name: "caption",
					type: "simplePortableText",
					title: "Caption",
					description: "",
				}),
			],
			options: imageConfig.options,
			validation: (Rule) => Rule.custom((value) => {
				if (!value?.asset) { return "Required"; };
				return true;
			}),
			preview: {
				select: {
					asset: "asset",
					caption: "caption",
				},
				prepare(selection) {
					const {
						asset,
						caption
					} = selection;
					return {
						title: portableTextConfig.renderAsPlainText(caption) || null,
						subtitle: "Image",
						media: asset || null,
					};
				},
			},
			components: {
				preview: (props) => props.renderDefault({
					...props,
					layout: "block",
				}),
				input: LimitedFileInput,
			},
		}),
		defineArrayMember({
			name: "embedObject",
			type: "object",
			title: "Object",
			icon: CubeIcon,
			fields: [
				defineField({
					name: "type",
					type: "string",
					title: "Type",
					description: "",
					options: {
						list: [
							{
								value: "url",
								title: "URL",
							},
							{
								value: "code",
								title: "Code",
							},
						],
						layout: "radio",
						direction: "horizontal",
					},
					initialValue: "url",
					validation: (Rule) => Rule.required(),
				}),
				defineField({
					name: "url",
					type: "url",
					title: "URL",
					description: "",
					placeholder: `Valid ${embedObjectConfig.listOfSupportedHosts()} link`,
					hidden: ({ parent }) => parent?.type !== "url",
					validation: (Rule) => Rule.custom((value, context) => {
						if (!value && context?.parent?.type === "url") { return "Required"; };
						// return embedObjectConfig.validateOEmbed(value);
						return true;
					}),
					// components config
				}),
				defineField({
					name: "code",
					type: "text",
					title: "Code",
					description: "",
					hidden: ({ parent }) => parent?.type !== "code",
					// components config
				}),
			],
			preview: {
				select: {
					type: "type",
					url: "url",
					code: "code",
				},
			},
			components: {
				preview: EmbedObjectPreview,
			},
		}),
	],
	components: {
		field: portableTextConfig.components.field,
	},
});
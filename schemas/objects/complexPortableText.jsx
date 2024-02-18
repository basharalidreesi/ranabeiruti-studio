import { BlockElementIcon, InfoOutlineIcon, PlugIcon, SparklesIcon } from "@sanity/icons";
import { Card, Flex, Text } from "@sanity/ui";
import { defineArrayMember, defineField } from "sanity";
import { imageConfig, portableTextConfig } from "../../util";
import { BoltIcon, CubeIcon, HeartIcon, ImageIcon, StarIcon } from "@sanity/icons";
import { linkBase } from "./link";

const styles = [
	portableTextConfig.styles.normal,
	portableTextConfig.styles.h2,
	portableTextConfig.styles.blockquote,
	portableTextConfig.styles.note,
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

export const basicFields = [
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
		fieldsets: [
			{
				name: "caption",
				title: "Caption",
				hidden: ({ parent }) => !parent?.asset && !parent?.isUsedAsPlaceholder,
			},
		],
		fields: [
			defineField({
				name: "caption",
				type: "simplePortableText",
				title: "Text",
				description: "The caption for the image. This field is optional.",
				hidden: ({ parent }) => parent?.isUsedAsPlaceholder,
				readOnly: ({ parent }) => parent?.isUsedAsPlaceholder,
				fieldset: "caption",
			}),
			defineField({
				name: "captionPlacement",
				type: "placement",
				title: "Placement",
				description: "The placement of the caption relative to the image. Default value: Place below.",
				fieldset: "caption",
			}),
			defineField({
				name: "imageRatio",
				type: "ratio",
				title: "Image Ratio",
				description: "The width ratio of the image relative to the caption. This field is required and has a minimum value of 1. Fraction values are allowed.",
				hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
				fieldset: "caption",
			}),
			defineField({
				name: "captionRatio",
				type: "ratio",
				title: "Caption Ratio",
				description: "The width ratio of the caption relative to the image. This field is required and has a minimum value of 1. Fraction values are allowed.",
				hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
				fieldset: "caption",
			}),
			defineField({
				name: "captionVerticalAlignment",
				type: "verticalAlignment",
				title: "Vertical Alignment",
				description: "The vertical alignment of the caption relative to the image. This field is required. Default value: Align to top.",
				hidden: ({ parent }) => !["left", "right"].includes(parent?.captionPlacement),
				fieldset: "caption",
			}),
			defineField({
				name: "isUsedAsPlaceholder",
				type: "boolean",
				title: "Use document main image and caption?",
				description: "Specifies whether to use the main image and caption of this document. Default value: False.",
				options: {
					layout: "checkbox",
				},
				initialValue: false,
			}),
		],
		options: imageConfig.options,
		validation: (Rule) => Rule.custom((value) => {
			if (value?.isUsedAsPlaceholder === true) { return true; };
			if (!value?.asset) { return "Required"; };
			return true;
		}),
		preview: {
			select: {
				asset: "asset",
				caption: "caption",
				isUsedAsPlaceholder: "isUsedAsPlaceholder",
			},
			// `prepare()` removed for `components.preview`
		},
		components: {
			input: (props) => {
				const isUsedAsPlaceholder = props.value?.isUsedAsPlaceholder || false;
				return isUsedAsPlaceholder ? (<>
					<Card
						padding={3}
						radius={2}
						shadow={1}
						tone="primary"
						style={{
							marginBottom: "1rem",
						}}
					>
						<Flex gap={2} align={"center"} justify={"center"}>
							<Text align={"center"} size={2}>
								<InfoOutlineIcon />
							</Text>
							<Text align={"center"} size={2}>
								This is a placeholder.
							</Text>
						</Flex>
					</Card>
					{props.renderDefault({
						...props,
						readOnly: true,
						members: [...props.members?.filter((member) => member.name !== "asset")],
					})}
				</>) : props.renderDefault(props);
			},
			preview: (props) => {
				const {
					asset,
					caption,
					isUsedAsPlaceholder = false,
				} = props;
				return props.renderDefault({
					...props,
					title: isUsedAsPlaceholder ? "[Document Image]" : portableTextConfig.renderAsPlainText(caption),
					subtitle: isUsedAsPlaceholder ? "Placeholder" : "Image",
					media: isUsedAsPlaceholder ? HeartIcon : (asset ? asset : ImageIcon),
					layout: "block",
				});
			},
		},
	}),
	defineArrayMember({
		name: "embed",
		type: "object",
		title: "Object",
		icon: CubeIcon,
		fields: [
			defineField({
				name: "code",
				type: "string",
				title: "Code",
				description: "",
				validation: (Rule) => Rule.required(),
			}),
			defineField({
				name: "doesConstrainAspectRatio",
				type: "boolean",
				title: "Constrain aspect ratio?",
				description: "",
				options: {
					layout: "checkbox",
				},
				initialValue: true,
			}),
			defineField({
				name: "aspectRatio",
				type: "string",
				title: "Aspect Ratio",
				description: "",
				initialValue: "16/9",
				hidden: ({ parent }) => !parent.doesConstrainAspectRatio,
			}),
		],
		preview: {
			select: {
				code: "code",
				doesConstrainAspectRatio: "doesConstrainAspectRatio",
				aspectRatio: "aspectRatio",
			},
			prepare(selection) {
				const {
					code,
					doesConstrainAspectRatio,
					aspectRatio,
				} = selection;
				return {
					title: code,
					subtitle: ["Object", doesConstrainAspectRatio && aspectRatio ? `(${aspectRatio})` : null]?.filter(Boolean)?.join(" "),
				};
			},
		},
	}),
	defineArrayMember({
		name: "documentReference",
		type: "object",
		title: "Reference",
		icon: PlugIcon,
		fields: [
			defineField({
				name: "reference",
				type: "reference",
				title: "Reference",
				description: "",
				to: [
					{ type: "project", },
					{ type: "publication", },
					{ type: "news", },
					{ type: "press", },
				],
				options: {
					disableNew: true,
				},
			}),
		],
		preview: {
			select: {
				referenceTitle: "reference.title",
				referenceImage: "reference.image",
			},
			prepare(selection) {
				const {
					referenceTitle,
					referenceImage,
				} = selection;
				return {
					title: referenceTitle,
					subtitle: "Reference",
					media: referenceImage,
				};
			},
		},
	}),
	defineArrayMember({
		name: "cta",
		type: "object",
		title: "Call to Action",
		icon: SparklesIcon,
		fields: [
			defineField({
				name: "label",
				type: "string",
				title: "Label",
			}),
			...linkBase,
		],
		preview: {
			select: {
				label: "label",
				type: "type",
				internalTitle: "internalTarget.title",
				internalImage: "internalTarget.image",
				externalTarget: "externalTarget",
			},
			prepare(selection) {
				const {
					label,
					type,
					internalTitle = "",
					internalImage,
					externalTarget = "",
				} = selection;
				return {
					title: type === "internal" && label ? `${label}${label && internalTitle ? ": " : ""}${internalTitle}` : type === "external" && label ? `${label}${label && externalTarget ? ": " : ""}${externalTarget}` : null,
					subtitle: "Call to Action",
					media: type === "internal" && internalImage ? internalImage : null,
				};
			},
		},
	}),
	defineArrayMember({
		name: "spacer",
		type: "object",
		title: "Spacer",
		icon: BlockElementIcon,
		fields: [
			defineField({
				name: "lineCount",
				type: "number",
				title: "Lines",
				description: "",
				validation: (Rule) => Rule.required().integer().min(1),
				initialValue: 1,
			}),
		],
		preview: {
			select: {
				lineCount: "lineCount",
			},
			prepare(selection) {
				const {
					lineCount = 0,
				} = selection;
				return {
					title: `${lineCount} ${lineCount === 1 ? "Line" : "Lines"}`,
					subtitle: "Spacer",
				};
			},
		},
	}),
];

export const extraFields = [
	defineArrayMember({
		name: "title",
		type: "object",
		title: "Title Placeholder",
		icon: StarIcon,
		fields: [
			defineField({
				name: "temp",
				type: "string",
				title: "Temp",
			}),
		],
		preview: {
			prepare() {
				return {
					title: "[Document Title]",
					subtitle: "Placeholder",
				};
			},
		},
		components: {
			input: () => (
				<Card
					padding={3}
					radius={2}
					shadow={1}
					tone="primary"
				>
					<Flex gap={2} align={"center"} justify={"center"}>
						<Text align={"center"} size={2}>
							<InfoOutlineIcon />
						</Text>
						<Text align={"center"} size={2}>
							This is a placeholder.
						</Text>
					</Flex>
				</Card>
			),
		},
	}),
	defineArrayMember({
		name: "description",
		type: "object",
		title: "Blurb Placeholder",
		icon: BoltIcon,
		fields: [
			defineField({
				name: "doesInclude",
				type: "array",
				title: "Include",
				description: "",
				of: [
					{ type: "string", },
				],
				options: {
					list: [
						{
							title: "Project blurb?",
							value: "projectDescription",
						},
						{
							title: "Collection blurbs (if applicable)?",
							value: "collectionDescriptions",
						},
					],
				},
				hidden: ({ document }) => !["project", "publication"].includes(document._type),
				initialValue: ["projectDescription", "collectionDescriptions"],
				validation: (Rule) => Rule.required(),
			}),
		],
		preview: {
			select: {
				doesInclude: "doesInclude",
			},
			prepare(selection) {
				const {
					doesInclude,
				} = selection;
				const doesIncludeMultipleDescription = doesInclude && doesInclude.length > 1 || false;
				return {
					title: doesIncludeMultipleDescription ? "[Document Blurbs]" : "[Document Blurb]",
					subtitle: "Placeholder",
				};
			},
		},
		components: {
			input: (props) => (<>
				<Card
					padding={3}
					radius={2}
					shadow={1}
					tone="primary"
				>
					<Flex gap={2} align={"center"} justify={"center"}>
						<Text align={"center"} size={2}>
							<InfoOutlineIcon />
						</Text>
						<Text align={"center"} size={2}>
							This is a placeholder.
						</Text>
					</Flex>
				</Card>
				{props.renderDefault(props)}
			</>),
		},
	}),
];

export default defineField({
	name: "complexPortableText",
	type: "array",
	title: "Complex Portable Text",
	description: "",
	of: [
		...basicFields,
		...extraFields,
	],
});
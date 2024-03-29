import { defineArrayMember, defineField } from "sanity";
import { Text } from "@sanity/ui";
import React from "react";
import { EnvelopeIcon } from "@sanity/icons";
import stringConfig from "./stringConfig";

const portableTextConfig = {
	styles: {
		normal: {
			value: "normal",
			title: "Normal",
		},
		h2: {
			value: "h2",
			title: "Heading",
		},
		blockquote: {
			value: "blockquote",
			title: "Blockquote",
			component: (props) => (<>
				<Text>
					<blockquote
						style={{
							fontFamily: `"Times", "Times New Roman", serif`,
							paddingInlineStart: "calc(0.75rem - 3px)",
							borderInlineStart: "3px solid var(--card-border-color)",
							margin: "0",
						}}
					>
						{props.children}
					</blockquote>
				</Text>
			</>),
		},
		note: {
			value: "note",
			title: "Note",
			component: (props) => (<>
				<Text muted size={1}>
					{props.children}
				</Text>
			</>),
		},
	},
	lists: {
		bullets: {
			value: "bullet",
			title: "Bullets",
		},
		numbers: {
			value: "number",
			title: "Numbers",
		},
	},
	decorators: {
		strong: {
			value: "strong",
			title: "Bold",
		},
		em: {
			value: "em",
			title: "Italic",
		},
		underline: {
			value: "underline",
			title: "Underline",
		},
		strikeThrough: {
			value: "strike-through",
			title: "Strikethrough",
		},
		sup: {
			value: "sup",
			title: "Superscript",
			icon: () => (<>
				<span>
					x<sup style={{ fontSize: "0.6em" }}>2</sup>
				</span>
			</>),
			component: (props) => (<>
				<span style={{ fontSize: "0.8em" }}>
					<sup>{props.children}</sup>
				</span>
			</>),
		},
	},
	annotations: {
		link: defineField({
			name: "link",
			type: "link",
			title: "Link",
		}),
	},
	of: [
		defineArrayMember({
			name: "emailAddress",
			type: "object",
			title: "E-Mail",
			icon: EnvelopeIcon,
			fields: [
				defineField({
					name: "emailAddress",
					type: "string",
					title: "E-Mail",
					description: "",
					validation: (Rule) => Rule.custom(stringConfig.requireString),
				}),
			],
			preview: {
				select: {
					emailAddress: "emailAddress",
				},
				prepare(selection) {
					const {
						emailAddress,
					} = selection;
					return {
						title: emailAddress,
					};
				},
			},
		}),
	],
	renderAsPlainText: (blocks) => {
		if (typeof blocks === "string") { return blocks; };
		const isValidTextBlock = (source) => {
			if (source._type === "block" && source.children && source.children?.filter((child) => child.text?.replace(/\s+/g, ""))?.length !== 0) {
				return true;
			}
			return false;
		};
		const block = (blocks || [])?.find((block) =>
			(block._type === "block" && isValidTextBlock(block))
			|| block._type === "image"
			|| block._type === "embed"
			|| block._type === "documentReference"
			|| block._type === "cta"
			// || block._type === "spacer"
			|| block._type === "title"
			|| (block._type === "description" && block.doesInclude && block.doesInclude.length !== 0)
		);
		if (block?._type === "block") {
			return block.children.filter((child) => child._type === "span" || child._type === "emailAddress")?.map((child) => child.text || child.emailAddress)?.join("");
		};
		if (block?._type === "image") {
			const isUsedAsPlaceholder = block.isUsedAsPlaceholder || false;
			if (isUsedAsPlaceholder) {
				return "[Document Image]";
			};
			return block.caption ? `[Image] ${portableTextConfig.renderAsPlainText(block.caption)}` : "[Untitled Image]";
		};
		if (block?._type === "embed") {
			return block.code ? `[Object] ${block.code}` : "[Untitled Object]";
		};
		if (block?._type === "documentReference") {
			return block.reference && block.reference._ref ? `[Reference] ${block.reference._ref}` : "[Untitled Reference]";
		};
		if (block?._type === "cta") {
			const label = block.label || null;
			return block.label ? `[Call to Action] ${label}` : "[Untitled Call to Action]";
		};
		// if (block?._type === "spacer") {
		// 	const lineCount = block.lineCount || 0;
		// 	return `[Spacer] ${lineCount === 1 ? `1 Line` : `${lineCount} Lines`}`;
		// };
		if (block?._type === "title") {
			return "[Document Title]";
		};
		if (block?._type === "description") {
			const doesIncludeMultipleDescription = block.doesInclude && block.doesInclude.length > 1 || false;
			if (doesIncludeMultipleDescription) {
				return "[Document Blurbs]";
			};
			return "[Document Blurb]";
		};
		return "";
	},
};

export default portableTextConfig;
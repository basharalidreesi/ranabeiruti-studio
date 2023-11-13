import { Text } from "@sanity/ui"
import { defineField } from "sanity";
import imageConfig from "./imageConfig";
import { PortableText } from "@portabletext/react";

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
	renderAsPlainText: (blocks) => {
		if (typeof blocks === "string") { return blocks; };
		const isValidTextBlock = (source) => {
			if (source._type === "block" && source.children && source.children?.[0]?.text) {
				return true;
			}
			return false;
		};
		const block = (blocks || [])?.find((block) =>
			(block._type === "block" && isValidTextBlock(block))
			|| block._type === "image"
			|| block._type === "embed"
		);
		if (block?._type === "block") {
			return block.children.filter((child) => child._type === "span").map((span) => span.text).join("");
		};
		if (block?._type === "image") {
			const isUsedAsPlaceholder = block.isUsedAsPlaceholder || false;
			if (isUsedAsPlaceholder) {
				return "[Document Image]";
			};
			return block.caption ? `[Image] ${portableTextConfig.renderAsPlainText(block.caption)}` : "[Untitled Image]";
		}
		if (block?._type === "embed") {
			const resolveEmbedType = (source) => {
				if (source.type === "url") {
					return {
						type: "URL",
						text: source.url ? source.url : null,
					};
				};
				if (source.type === "code") {
					return {
						type: "Code",
						text: source.code ? source.code : null,
					};
				};
			};
			return resolveEmbedType(block)?.type ? `[${resolveEmbedType(block).type} Object]${resolveEmbedType(block)?.text ? ` ${resolveEmbedType(block)?.text}` : ""}` : "[Object]";
		};
		return "";
	},
};

export default portableTextConfig;
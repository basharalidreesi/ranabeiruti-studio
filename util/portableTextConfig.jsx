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
		h3: {
			value: "h3",
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
	serializers: {
		types: {
			image: ({ value }) => (<>
				{value.asset
					? (<>
						<figure>
							<img src={imageConfig.buildImage(value)} />
							{value.caption && value.caption?.length !== 0
								? (<>
									<figcaption>
										<PortableText value={value.caption} components={portableTextConfig.serializers} />
									</figcaption>
								</>)
								: null
							}
						</figure>
					</>)
					: null
				}
			</>),
			// object TODO
		},
		marks: {
			// strong (default)
			// em (default)
			// underline (default)
			// strike-through (default)
			sup: ({ children }) => (<sup>{children}</sup>),
			link: ({ children, value }) => {
				const type = value?.type;
				const ref = type === "internal" ? null : (type === "external" ? value?.externalTarget : null) || null;
				const target = ref?.startsWith("http") ? "_blank" : null;
				const rel = target && target === "_blank" ? "noindex nofollow" : null;
				return (
					<a href={ref} target={target} rel={rel}>
						{children}
					</a>
				);
			},
		},
		block: {
			// normal (default)
			// h3 (default)
			// blockquote (default)
			note: ({ children }) => (<div className="note">{children}</div>),
		},
		list: {
			// bullet (default)
			// number (default)
		},
	},
	renderAsPlainText: (blocks) => {
		if (typeof block === "string") { return blocks; };
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
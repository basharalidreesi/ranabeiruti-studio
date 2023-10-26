import { KBD, Text } from "@sanity/ui"
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
			component: (props) => (
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
			),
		},
		note: {
			value: "note",
			title: "Note",
			component: (props) => (
				<Text muted size={1}>
					{props.children}
				</Text>
			),
		},
		hidden: {
			value: "hidden",
			title: "Hidden",
			component: (props) => (
				<KBD
					padding={3}
					size={1}
				>
					{props.children}
				</KBD>
			),
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
			icon: () => (
				<span>
					x<sup style={{ fontSize: "0.6em" }}>2</sup>
				</span>
			),
			component: (props) => (
				<span style={{ fontSize: "0.8em" }}>
					<sup>{props.children}</sup>
				</span>
			),
		},
	},
	annotations: {
		link: defineField({
			name: "link",
			type: "link",
			title: "Link",
		}),
	},
	components: {},
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
			// object
		},
		marks: {
			// strong
			// em
			// underline
			// strike-through
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
			// normal
			// h3
			// blockquote
			note: ({ children }) => (<div className="note">{children}</div>),
			hidden: ({ children }) => null,
		},
		list: {
			// bullet
			// number
		},
	},
	renderAsPlainText: (blocks, opts = {}) => {
		// const block = (portableText || []).find((block) => block._type === "block");
		// const references = [];
		// return block ? block.children.filter((child) => 
		// 	(child._type === "span" && child.text)
		// 	|| references.includes(child._type)
		// ).map((child) => {
		// 	if (child._type === "span") {
		// 		return child.text;
		// 	};
		// 	if (references.includes(child._type)) {
		// 		return "[REF]";
		// 	};
		// }).join("") : "";
		const defaults = {
			nonTextBehavior: "remove",
		};
		const options = Object.assign({}, defaults, opts)
		if (typeof blocks === "string") { return blocks; };
		return blocks?.map((block) => {
			if (block._type !== "block" || !block.children) {
				return options.nonTextBehavior === "remove" ? "" : (`[${block._type} block]`);
			};
			return block.children.map((child) => child.text).join("");
		}).join("\n\n");
	},
};

export default portableTextConfig;
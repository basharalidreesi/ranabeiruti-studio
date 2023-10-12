import { KBD, Text } from "@sanity/ui"
import { defineField } from "sanity";

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
		footnote: {
			value: "footnote",
			title: "Footnote",
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
	components: {
		field: (props) => {
			return (<>
				<style>{`
					.pt-text-block[dir="rtl"] [data-testid="change-bar-wrapper"] {
						--change-bar-offset: -4px !important;
					}
					.pt-text-block-style-h3.pt-list-item [data-list-prefix] {
						margin-top: 0.5rem;
					}
					.pt-text-block-style-hidden.pt-list-item [data-list-prefix] {
						margin-top: 0.75rem;
						font-size: 0.8125rem;
						color: var(--card-code-fg-color);
					}
					.pt-text-block-style-footnote.pt-list-item [data-list-prefix] {
						margin-top: 0.1rem;
						font-size: 0.8125rem;
						color: var(--card-muted-fg-color);
					}
					${Array.from(Array(10)).map((_, i) => (`
						.pt-list-item.pt-list-item-level-${i + 1} [data-testid="text-block__text"][data-list-item] > *:first-child {
							padding: 0 !important;
							padding-inline-start: ${32 * (i + 1)}px !important;
						}
					`)).join("")}
					.pt-list-item [data-list-prefix] {
						margin-left: 0 !important;
						margin-inline-start: -4.5rem !important;
						text-align: end !important;
					}
					.pt-object-block [data-testid="pte-block-object"][data-image-preview] {
						padding: 0.25rem !important;
					}
				`}</style>
				{props.renderDefault(props)}
			</>);
		},
	},
};

export default portableTextConfig;
import React from "react";

export const GlobalCss = () => (
	<style>{`
		html,
				body {
					position: relative;
					top: 0;
					left: 0;
					width: 100%;
					min-height: 100%;
					font-size: 18px;
					font-family: var(--font-family-sans);
					font-weight: var(--font-weight-medium);
					font-style: normal;
					line-height: 1.0;
					color: var(--color-text-normal);
					scroll-behavior: smooth;
					scroll-padding-block-start: calc(2.875rem + 1.5rem);
					background: var(--color-background-normal);
				}
				@media (max-width: 384px) {
					html, body {
						font-size: 16px;
					}
				}
				*,
				*::before,
				*::after {
					margin: 0;
					padding: 0;
					font-size: inherit;
					font-family: inherit;
					font-weight: inherit;
					font-style: inherit;
					line-height: inherit;
					color: inherit;
					font-synthesis: none;
					text-align: inherit;
					text-decoration: inherit;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					text-rendering: optimizeLegibility;
					-webkit-text-size-adjust: 100%;
					-moz-text-size-adjust: 100%;
					-ms-text-size-adjust: 100%;
					text-size-adjust: 100%;
					-webkit-font-smoothing: antialiased;
					-moz-osx-font-smoothing: grayscale;
					word-wrap: break-word;
					overflow-wrap: break-word;
					touch-action: manipulation;
				}
				:root {
					/* color palette */
					--color-1: navy; /* was: #002741 */ /* was: #101010 */
					--color-2: #ffffff;
					--color-3: #767676; /* was: #999999 */
					--color-4: #cccccc;
					--color-5: #f5f5f5;
					--color-6: lightyellow;
					/* color-text */
					--color-text-normal: var(--color-1);
					--color-text-light: var(--color-3);
					--color-text-x-light: var(--color-4);
					--color-text-xx-light: var(--color-5);
					/* color-background */
					--color-background-normal: var(--color-2);
					--color-background-distinct: var(--color-5);
					--color-background-special: var(--color-6);
					/* color-link */
					--color-link-hover: var(--color-text-light);
					--color-link-normal: var(--color-text-normal);
					--color-link-underline: var(--color-text-x-light);
					/* font-family */
					--font-family-sans: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
					--font-family-serif: "Times", "Times New Roman", serif;
					/* font-weight */
					--font-weight-bold: 700;
					--font-weight-medium: 400;
					--font-weight-light: 300;
					/* font-size */
					--font-size-x-large: 2rem;
					--font-size-large: 1.25rem;
					--font-size-medium: 1rem;
					--font-size-small: 0.875rem;
					--font-size-x-small: 0.75rem;
				}
				@media (max-width: 384px) {
					:root {
						--font-size-x-small: var(--font-size-small);
					}
				}
				/* color */
				.cn { color: var(--color-text-normal); }
				.clt { color: var(--color-text-light); }
				.cxlt { color: var(--color-text-x-light); }
				.cxxlt { color: var(--color-text-xx-light); }
				/* background */
				.bgn { background: var(--color-background-normal); }
				.bgd { background: var(--color-background-distinct); }
				.bgs { background: var(--color-background-special); }
				/* font-family */
				.ffsans { font-family: var(--font-family-sans); }
				.ffserif { font-family: var(--font-family-serif); }
				/* font-weight */
				.fwb { font-weight: var(--font-weight-bold); }
				.fwm { font-weight: var(--font-weight-medium); }
				.fwl { font-weight: var(--font-weight-light); }
				/* font-style */
				.fsi { font-style: italic; }
				/* text-decoration */
				.tdlt { text-decoration: line-through; }
				.tdul { text-decoration: underline; }
				/* font-size */
				.fsxl { font-size: var(--font-size-x-large); }
				.fsl { font-size: var(--font-size-large); }
				.fsm { font-size: var(--font-size-medium); }
				.fss { font-size: var(--font-size-small); }
				.fsxs { font-size: var(--font-size-x-small); }
				/* line-height */
				.lhn { line-height: 1; }
				.lhl { line-height: 1.15; }
				.lhxl { line-height: 1.3; }
				/* letter-spacing */
				.lss { letter-spacing: -0.015em; }
				.lsn { letter-spacing: normal; }
				.lsl { letter-spacing: 0.015em;}
				/* border */
				.bbsn { border-block-start: 1px solid var(--color-text-normal); }
				.bben { border-block-end: 1px solid var(--color-text-normal); }
				.bisn { border-inline-start: 1px solid var(--color-text-normal); }
				.bien { border-inline-end: 1px solid var(--color-text-normal); }
				.bbslt { border-block-start: 1px solid var(--color-text-light); }
				.bbelt { border-block-end: 1px solid var(--color-text-light); }
				.bislt { border-inline-start: 1px solid var(--color-text-light); }
				.bielt { border-inline-end: 1px solid var(--color-text-light); }
				.bbsxlt { border-block-start: 1px solid var(--color-text-x-light); }
				.bbexlt { border-block-end: 1px solid var(--color-text-x-light); }
				.bisxlt { border-inline-start: 1px solid var(--color-text-x-light); }
				.biexlt { border-inline-end: 1px solid var(--color-text-x-light); }
				.bbsxxlt { border-block-start: 1px solid var(--color-text-xx-light); }
				.bbexxlt { border-block-end: 1px solid var(--color-text-xx-light); }
				.bisxxlt { border-inline-start: 1px solid var(--color-text-xx-light); }
				.biexxlt { border-inline-end: 1px solid var(--color-text-xx-light); }
				/* misc */
				[hidden] { display: none; }
				.vh { clip: rect(0 0 0 0);  clip-path: inset(50%); height: 1px; overflow: hidden; position: absolute; white-space: nowrap;  width: 1px; }
				.ht { transition: color 0.125s; }
				@media (any-hover: hover) { .ht:hover { color: var(--color-link-hover); } }
				.hi img { filter: grayscale(1); transition: filter 0.125s; }
				@media (any-hover: hover) { .hi:hover img { filter: grayscale(0); } }
				.link { background-image: linear-gradient(to bottom, var(--color-link-underline), var(--color-link-underline)); background-size: 1px 2px; background-repeat: repeat-x; background-position: 0 100%; }
				.sbn { scrollbar-width: none; /* Firefox */ -ms-overflow-style: none;  /* Internet Explorer 10+ */ }
				.sbn::-webkit-scrollbar { width: 0; height: 0; } /* WebKit */
				.ln { list-style: none; }
				/* universal */
				a[aria-current], input:checked + label { text-decoration: underline; text-decoration-thickness: 2px; text-decoration-color: var(--color-text-x-light); }
				img { display: block; width: 100%; height: auto; }
	`}</style>
);

export const MainCss = () => (
	<style>{`
		body {
			display: flex;
			flex-flow: column nowrap;
			min-height: 100vh;
		}
		body > * {
			width: 100%;
			padding-inline: calc(1.5rem + env(safe-area-inset-left, 0px));
		}
		body > main {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			padding-block: 1.5rem;
		}
	`}</style>
);

export const SlugCss = () => (
	<style>{`
		.wrapper {
			flex: 1;
			display: flex;
			flex-flow: row nowrap;
		}
		.project,
		.body {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
		}
		.header, .body {
			&[data-has-border="true"] {
				margin-block-end: 1.5rem;
				border-block-end: 1px solid var(--color-text-x-light);
			}
		}
		.header {}
		.footer {
			margin-inline: -1.5rem;
			margin-block-end: -1.5rem;
			padding-inline: 1.5rem;
			padding-block-start: 1.5rem;
			background: var(--color-text-normal);
		}
	`}</style>
);

export const PageBuilderCss = () => (
	<style>{`
		.title + .subtitle {
			margin-block-start: 1.5rem;
		}
		.row {
			display: flex;
			flex-flow: row nowrap;
			margin-block-end: 1.5rem;
			gap: 1.5rem;
		}
		@media (max-width: 768px) {
			.row {
				flex-direction: column;
				margin-inline: auto;
				width: 60%;
			}
			.column:empty {
				display: none;
			}
		}
		@media (max-width: 640px) {
			.row {
				width: 80%;
			}
		}
		@media (max-width: 512px) {
			.row {
				width: 100%;
			}
		}
	`}</style>
);

export const FigureCss = () => (
	<style>{`
		figure {
			display: flex;
		}
		figure:where([data-caption-placement="left"]) {
			flex-flow: row-reverse nowrap;
			gap: 0.75rem;
		}
		figure:where([data-caption-placement="top"]) {
			flex-flow: column-reverse nowrap;
			gap: 0.5rem;
		}
		figure:where([data-caption-placement="right"]) {
			flex-flow: row nowrap;
			gap: 0.75rem;
		}
		figure:where([data-caption-placement="bottom"]) {
			flex-flow: column nowrap;
			gap: 0.5rem;
		}
		@media (max-width: 768px) {
			figure {
				flex-flow: column nowrap;
				gap: 0.5rem;
			}
		}
	`}</style>
);

export const PortableTextCss = () => (
	<style>{`
		.rich-text blockquote {
			padding-inline: 1.5rem;
			border-inline-start: 1px solid var(--color-text-x-light);
		}
		.rich-text .note {}
		.rich-text strong {}
		.rich-text em {}
		.rich-text del {}
		.rich-text mark {}
		.rich-text sup {
			font-size: 0.61875em;
		}
		.rich-text li {
			padding-inline-start: 0.5rem;
			margin-inline-start: 1rem;
		}
		.rich-text a {
			background-image: linear-gradient(to bottom, var(--color-link-underline), var(--color-link-underline));
			background-size: 1px 2px;
			background-repeat: repeat-x;
			background-position: 0 100%;
		}
		.rich-text :is(p, h3, blockquote, .note, ul, ol, figure):empty {
			display: none;
		}
		.rich-text :is(p, h3, blockquote, .note, ul, ol, figure):not(:empty)
		+ :is(p, h3, .note, ul, ol, figure):not(:empty) {
			margin-block-start: 0.5rem;
		}
		.rich-text blockquote + blockquote {
			padding-block-start: 0.5rem;
		}
	`}</style>
);
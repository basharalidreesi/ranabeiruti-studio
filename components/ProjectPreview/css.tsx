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
			font-size: max(18px, 100%);
			font-family: var(--font-family-sans);
			font-weight: var(--font-weight-medium);
			font-style: normal;
			line-height: 1.0;
			color: var(--color-1);
			scroll-behavior: smooth;
			background: var(--color-7);
			@media (max-width: 384px) {
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
			--color-1: #000000;
			--color-2: #5f6368;
			--color-3: #94979b;
			--color-4: #dadce0;
			--color-5: #e8e9eb;
			--color-6: #f8f8f8;
			--color-7: #ffffff;
			--font-family-sans: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
			--font-family-serif: "Times", "Times New Roman", serif;
			--font-family-mono: monospace;
			--font-weight-bold: 700;
			--font-weight-medium: 400;
			--font-weight-light: 300;
			--font-size-x-large: 1.2222222222rem;
			--font-size-large: 1rem;
			--font-size-medium: 0.8888888889rem;
			--font-size-small: 0.7777777778rem;
			--line-height-large: 1.3;
			--line-height-medium: 1.15;
			--line-height-small: 1;
			--letter-spacing-large: 0.015em;
			--letter-spacing-medium: normal;
			--letter-spacing-small: -0.015em;
		}
		.display-none, [hidden] {
			display: none;
		}
		.display-hidden {
			clip: rect(0 0 0 0);
			clip-path: inset(50%);
			height: 1px;
			overflow: hidden;
			position: absolute;
			white-space: nowrap;
			width: 1px;
		}
		.hover-text {
			transition: color 0.125s;
		}
		@media (any-hover: hover) {
			.hover-text:hover {
				color: var(--color-3);
			}
		}
		.hover-image img {
			filter: grayscale(1);
			transition: filter 0.125s;
		}
		@media (any-hover: hover) {
			.hover-image:hover img {
				filter: grayscale(0);
			}
		}
		a[aria-current] {
			background-image: linear-gradient(to bottom, var(--color-4), var(--color-4));
			background-size: 1px 2px;
			background-repeat: repeat-x;
			background-position: 0 100%;
		}
		a:focus-visible,
		button:focus-visible,
		input:focus-visible + label {
			outline: red auto 5px;
			outline-offset: 0.175em;
			z-index: 1;
		}
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
		.project {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			line-height: var(--line-height-large);
		}
		.project-body {
			flex: 1;
			display: grid;
			grid-template-columns: [all-start] 10% [content-start] 1fr [content-end] 10% [all-end];
			column-gap: 1.5rem;
		}
		.project-body * {
			min-width: 0;
			min-height: 0;
		}
		.project-body  > * {
			grid-column: content;
		}
		.project-body  > *.breakout {
			grid-column: all;
		}
		@media (max-width: 1024px) {
			.project-body {
				display: flex;
				flex-direction: column;
				column-gap: 0;
				grid-template-columns: unset;
			}
		}
	`}</style>
);

export const PageBuilderCss = () => (
	<style>{`
		.row {
			display: flex;
			flex-flow: row nowrap;
			margin-block-end: 1.5rem;
			gap: 1.5rem;
		}
		@media (max-width: 768px) {
			.row {
				flex-direction: column;
			}
			.row * {
				flex: unset !important;
			}
		}
		@media (max-width: 896px) {
			.column:empty {
				display: none;
			}
		}
	`}</style>
);

export const FigureCss = () => (
	<style>{`
		figure {
			display: flex;
		}
		figcaption {
			font-size: var(--font-size-small);
			color: var(--color-2)
		}
		figure:where([data-caption-placement="left"]) {
			flex-flow: row-reverse nowrap;
			gap: 0.75rem;
		}
		figure:where([data-caption-placement="top"]) {
			flex-flow: column-reverse nowrap;
			gap: calc(0.5rem + 0.15em);
		}
		figure:where([data-caption-placement="right"]) {
			flex-flow: row nowrap;
			gap: 0.75rem;
		}
		figure:where([data-caption-placement="bottom"]) {
			flex-flow: column nowrap;
			gap: calc(0.5rem + 0.15em);
		}
		@media (max-width: 768px) {
			figure {
				flex-flow: column nowrap;
				gap: calc(0.5rem + 0.15em);
			}
		}
		img {
			display: block;
			width: 100%;
			height: auto;
			object-fit: cover;
			object-position: calc(var(--hotspot-x) * 100%) calc(var(--hotspot-y) * 100%);
			font-style: italic;
		}
	`}</style>
);

export const PortableTextCss = () => (
	<style>{`
		.rich-text {
			line-height: 1.3;
		}
		.rich-text + .rich-text {
			margin-block-start: 0.5rem;
		}
		.rich-text h3 {
			font-weight: var(--font-weight-bold);
		}
		.rich-text blockquote {
			font-family: var(--font-family-serif);
			font-size: var(--font-size-medium);
			padding-inline: 1.5rem;
			border-inline-start: 1px solid var(--color-4);
		}
		.rich-text .note {
			font-size: var(--font-size-small);
			color: var(--color-2);
		}
		.rich-text strong {
			font-weight: var(--font-weight-bold);
		}
		.rich-text em {
			font-style: italic;
		}
		.rich-text del {
			text-decoration: line-through;
		}
		.rich-text sup {
			font-size: 0.61875em;
		}
		.rich-text li {
			padding-inline-start: 0.5rem;
			margin-inline-start: 1rem;
		}
		.rich-text .link {
			background-image: linear-gradient(to bottom, var(--color-4), var(--color-4));
			background-size: 1px 2px;
			background-repeat: repeat-x;
			background-position: 0 100%;
			color: var(--color-1);
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
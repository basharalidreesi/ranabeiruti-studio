import React from "react";

export const ResetCss = () => (
	<style>{`
		html,
		body {
			position: relative;
			top: 0;
			left: 0;
			width: 100%;
			min-height: 100%;
			font-size: max(16px, 100%);
			font-family: var(--font-family-sans);
			font-weight: 400;
			font-style: normal;
			line-height: 1.0;
			color: var(--color-1);
			scroll-behavior: smooth;
			background: var(--color-7);
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
	`}</style>
);

export const GlobalCss = () => (
	<style>{`
		:root {
			--color-1: #000000;
			--color-2: #5f6368;
			--color-3: #94979b;
			--color-4: #dadce0;
			--color-5: #e8e9eb;
			--color-6: #f8f8f8;
			--color-7: #ffffff;
			--spacer-700: 2rem;
			--spacer-400: 1.5rem;
			--spacer-350: 1.25rem;
			--spacer-300: 1rem;
			--spacer-200: 0.75rem;
			--spacer-100: 0.5rem;
			--spacer-50: 0.25rem;
			--font-family-sans: "Helvetica Neue", "Helvetica", "Arial", sans-serif;
			--font-family-serif: "Times", "Times New Roman", serif;
			--font-family-mono: monospace;
			--font-size-700: 1.618rem;
			--font-size-400: 1rem;
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
		.boxed-area {
			border: 1px solid var(--color-4);
			box-shadow:
				calc(var(--spacer-100) * -1) var(--spacer-100) 0px -1px var(--color-7),
				calc(var(--spacer-100) * -1) var(--spacer-100) var(--color-4),
				calc(var(--spacer-100) * -2) calc(var(--spacer-100) * 2) 0px -1px var(--color-7),
				calc(var(--spacer-100) * -2) calc(var(--spacer-100) * 2) var(--color-4);
			margin-left: calc(var(--spacer-100) * 2);
			margin-bottom: calc(var(--spacer-100) * 2);
		}
		.hoverable-area {
			background: var(--color-7);
			transition: background-color 0.125s;
		}
		@media (any-hover: hover) {
			.hoverable-area:hover {
				background: var(--color-6);
			}
		}
		.ellipsis {
			overflow: hidden;
			overflow: clip;
			white-space: nowrap;
			text-overflow: ellipsis;
		}
		.ellipsis-multiline {
			display: -webkit-box;
			-webkit-line-clamp: 3;
			-webkit-box-orient: vertical;
			overflow: hidden;
			overflow: clip;
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
			padding-inline: calc(var(--spacer-400) + env(safe-area-inset-left, 0px));
		}
		body > main {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			padding-block: var(--spacer-400);
			padding-block-end: 0;
		}
	`}</style>
);

export const SlugCss = () => (
	<style>{`
		.document {
			flex: 1;
			display: flex;
			flex-flow: column nowrap;
			line-height: 1.3;
		}
		.document-body {
			flex: 1;
			display: grid;
			grid-template-columns: [all-start] 10% [content-start] 1fr [content-end] 10% [all-end];
			column-gap: var(--spacer-400);
		}
		.document-body * {
			min-width: 0;
			min-height: 0;
		}
		.document-body  > * {
			grid-column: content;
		}
		.document-body  > *.breakout {
			grid-column: all;
		}
		.document-credits {
			margin-inline: calc(10% + var(--spacer-400));
			margin-block-end: var(--spacer-400);
			padding-block-start: var(--spacer-400);
			border-block-start: 1px solid var(--color-4);
		}
		.document-credits .rich-text {
			text-wrap: pretty;
		}
		@media (max-width: 1024px) {
			.document-body {
				display: flex;
				flex-direction: column;
				column-gap: 0;
				grid-template-columns: unset;
			}
			.document-credits {
				margin-inline: 0;
			}
		}
	`}</style>
);

export const PageBuilderCss = () => (
	<style>{`
		.row {
			display: flex;
			flex-flow: row nowrap;
			margin-block-end: var(--spacer-400);
			gap: var(--spacer-400);
		}
		@media (max-width: 896px) {
			.column:empty {
				display: none;
			}
		}
		@media (max-width: 768px) {
			.row {
				flex-direction: column;
			}
			.column {
				flex: unset !important;
				align-self: unset !important;
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
			color: var(--color-2)
		}
		figure:where([data-caption-placement="left"]) {
			flex-flow: row-reverse nowrap;
			gap: var(--spacer-200);
		}
		figure:where([data-caption-placement="top"]) {
			flex-flow: column-reverse nowrap;
			gap: calc(var(--spacer-100) + 0.15em);
		}
		figure:where([data-caption-placement="right"]) {
			flex-flow: row nowrap;
			gap: var(--spacer-200);
		}
		figure:where([data-caption-placement="bottom"]) {
			flex-flow: column nowrap;
			gap: calc(var(--spacer-100) + 0.15em);
		}
		@media (max-width: 768px) {
			figure {
				flex-flow: column nowrap;
				gap: calc(var(--spacer-100) + 0.15em);
			}
			figcaption {
				flex: unset !important;
				align-self: unset !important;
			}
		}
		picture {
			display: block;
			background-size: cover;
			background-repeat: no-repeat;
			background-position: calc(var(--hotspot-x) * 100%) calc(var(--hotspot-y) * 100%);
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

export const PortableTextBaseCss = () => (
	<style>{`
		.rich-text {
			line-height: 1.3;
			text-wrap: pretty;
		}
		.rich-text + .rich-text {
			margin-block-start: var(--spacer-100);
		}
		.rich-text h3 {
			font-weight: 700;
		}
		.rich-text blockquote {
			font-family: var(--font-family-serif);
			padding-inline: var(--spacer-400);
			border-inline-start: 1px solid var(--color-4);
		}
		.rich-text .note {
			color: var(--color-2);
		}
		.rich-text strong {
			font-weight: 700;
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
			padding-inline-start: calc(var(--spacer-400) - 1rem);
			margin-inline-start: calc(var(--spacer-400) - 0.5rem);
		}
		.rich-text .link {
			background-image: linear-gradient(to bottom, var(--color-4), var(--color-4));
			background-size: 1px 2px;
			background-repeat: repeat-x;
			background-position: 0 100%;
		}
		.rich-text .embed-object {
			aspect-ratio: var(--aspect-ratio);
			position: relative;
			overflow: hidden;
		}
		.rich-text .embed-object iframe {
			position: absolute;
			inset: 0;
			width: 100%;
			height: 100%;
		}
		.rich-text .spacer {
			height: calc(1em * 1.3 * var(--line-count));
		}
		@media (max-width: 768px) {
			.rich-text .spacer {
				display: none;
			}
		}
		.rich-text .document-header {
			display: flex;
			flex-direction: column;
			row-gap: var(--spacer-200);
			text-wrap: balance;
		}
		.rich-text .document-header .record-title-baseline {
			font-weight: 700;
		}
		.rich-text .document-header .record-subtitle {
			display: block;
			margin-block-start: var(--spacer-200);
		}
		.rich-text .document-header .record-title-separator {
			position: absolute;
			opacity: 0;
			font-size: 0px;
		}
		.rich-text .record-tags ul {
			list-style: none;
		}
		.rich-text .record-tags li {
			display: inline;
			margin: 0;
			padding: 0;
		}
		.rich-text .record-tags li:not(:last-of-type)::after {
			content: " - ";
			margin-inline: var(--spacer-50);
		}
		.rich-text .document-reference {
			position: relative;
			display: flex;
			flex-direction: column;
			row-gap: var(--spacer-100);
			padding: var(--spacer-200);
		}
		.rich-text .document-reference .record-image {
			order: 1;
		}
		.rich-text .document-reference .record-title {
			order: 2;
			text-wrap: balance;
		}
		.rich-text .document-reference .record-title a::after {
			content: "";
			position: absolute;
			inset: 0;
		}
		.rich-text .document-reference .record-date {
			order: 3;
		}
		.rich-text .document-reference .record-description {
			order: 4;
		}
		.rich-text .document-reference .record-tags {
			order: 5;
		}
		.cta {
			position: relative;
			width: fit-content;
			padding: var(--spacer-200);
			font-weight: 700;
		}
		.cta a::after {
			content: "";
			position: absolute;
			inset: 0;
		}
	`}</style>
);

export const PortableTextSpacingCss = () => (
	<style>{`
		.rich-text :is(p, h3, blockquote, .note, ul, ol, figure, .embed-object, .document-header, .document-description, .boxed-area):empty {
			display: none;
		}
		.rich-text :is(p, h3, blockquote, .note, ul, ol, .document-description) + :is(p, h3, blockquote, .note, ul, ol, .document-description) {
			margin-block-start: var(--spacer-100);
		}
		.rich-text :is(figure, .embed-object, .document-header, .boxed-area) + :is(figure, .embed-object, .document-header, .boxed-area),
		.rich-text :is(p, h3, blockquote, .note, ul, ol, .document-description) + :is(figure, .embed-object, .document-header, .boxed-area),
		.rich-text :is(figure, .embed-object, .document-header, .boxed-area) + :is(p, h3, blockquote, .note, ul, ol, .document-description) {
			margin-block-start: var(--spacer-400);
		}
		@media (max-width: 768px) {
			.rich-text .spacer + :is(p, h3, blockquote, .note, ul, ol, .document-description) {
				margin-block-start: var(--spacer-100);
			}
			.rich-text .spacer + :is(figure, .embed-object, .document-header, .boxed-area),
			.rich-text :is(p, h3, blockquote, .note, ul, ol, .document-description) + .spacer + :is(figure, .embed-object, .document-header, .boxed-area),
			.rich-text :is(figure, .embed-object, .document-header, .boxed-area) + .spacer + :is(p, h3, blockquote, .note, ul, ol, .document-description) {
				margin-block-start: var(--spacer-400);
			}
			.rich-text .boxed-area + .spacer + .boxed-area {
				margin-block-start: calc(var(--spacer-400) + (var(--spacer-100) * 2)) !important;
			}
		}
		blockquote + blockquote {
			margin-block-start: 0 !important;
			padding-block-start: var(--spacer-100);
		}
		.boxed-area + .boxed-area {
			margin-block-start: calc(var(--spacer-400) + (var(--spacer-100) * 2)) !important;
		}
	`}</style>
);
import { PortableText } from "@portabletext/react";
import { dateConfig, imageConfig, portableTextConfig, referenceConfig } from "../util";

// add fallback profile
// add fallback title

export default function ProjectPreview(props) {
	const { data } = props;
	const Profile = () => {
		return (<>
			<div className="project-profile">
				{data.profiles && data.profiles?.length !== 0
					? (<>
						<h1>
							{[...data.profiles?.map((profile) => referenceConfig.buildReference(profile?._ref)?.name)]?.sort()?.map((name, index) => (<p key={index}>{name}</p>))}
						</h1>
					</>)
					: (<>
						<h1>
							<p>Working Title</p>
						</h1>
					</>)
				}
			</div>
		</>);
	};
	const Header = () => {
		return (
			<header className="project-header">
				<div className="project-header-title">
					<h2>
						{data.title || "The Working Title"}
					</h2>
				</div>
				{data.subtitle
					? (
						<div className="project-header-subtitle">
							<p>
								{data.subtitle}
							</p>
						</div>
					)
					: null
				}
				{data.image?.asset && data.image?.isUsedAsHero === true
					? (
						<figure
							className={`project-header-hero project-header-${data.image.displaySize || "medium"}Hero`}
						>
							<div className="project-header-hero-image">
								<img src={imageConfig.buildImage(data.image)} />
							</div>
							{data.image?.caption && data.image?.caption?.length !== 0
								? (
									<figcaption className="project-header-hero-caption portableText">
										<PortableText value={data.image.caption} components={portableTextConfig.serializers} />
									</figcaption>
								)
								: null
							}
						</figure>
					)
					: null
				}
				{(data.description && data.description?.length !== 0) || (data.credits && data.credits?.length !== 0)
					? (<>
						{data.description && data.description?.length !== 0
							? (
								<div className="project-header-description portableText">
									<PortableText value={data.description} components={portableTextConfig.serializers} />
								</div>
							)
							: null
						}
					</>)
					: null
				}
			</header>
		);
	};
	const Body = () => {
		return (<>
			<section className="project-body">
				{data.body?.map((segment, index) => {
					const columnCount = Math.max(segment.columnCount, 1) || 1;
					const columnArray = Array.from({ length: columnCount }, (_, index) => 1 + index);
					return (<>
						<div className="project-body-segment" data-index={index + 1} data-subsegments={columnArray?.length} key={index + 1}>
							{columnArray?.map((column) => {
								const correspondingRatio = Math.max(segment[`col${column}Ratio`], 1) || 1;
								const correspondingBody = segment[`col${column}Body`] || null;
								const correspondingVerticalAlignment = segment[`col${column}VerticalAlignment`] || null;
								return (<>
									<div
										className="project-body-subsegment portableText"
										data-index={column}
										key={column}
										style={{
											flex: correspondingRatio,
											alignSelf: {
													"top": "flex-start",
													"middle": "center",
													"bottom": "flex-end",
											}[correspondingVerticalAlignment] || null,
										}}
									>
										{correspondingBody && correspondingBody.length !== 0 ? <PortableText value={correspondingBody} components={portableTextConfig.serializers} /> : null}
									</div>
								</>);
							})}
						</div>
					</>);
				})}
			</section>
		</>);
	};
	const Footer = () => {
		return (<>
			<footer className="project-footer">
				{/* <div className="project-footer-info">
					<dl>
						{data.clients && data.clients?.length !== 0
							? (<>
								<dt>{data.clients.length > 1 ? "Clients" : "Client"}</dt>
								{[...data.clients?.map((client) => referenceConfig.buildReference(client?._ref)?.name)]?.sort()?.map((name, index) => (<dd key={index}><a className="link" >{name}</a></dd>))}
							</>)
							: null
						}
						{data.types && data.types?.length !== 0
							? (<>
								<dt>{data.types.length > 1 ? "Types" : "Type"}</dt>
								{[...data.types?.map((type) => referenceConfig.buildReference(type?._ref)?.name)]?.sort()?.map((name, index) => (<dd key={index}><a className="link" >{name}</a></dd>))}
							</>)
							: null
						}
						{data.subjects && data.subjects?.length !== 0
							? (<>
								<dt>{data.subjects.length > 1 ? "Subjects" : "Subject"}</dt>
								{[...data.subjects?.map((subject) => referenceConfig.buildReference(subject?._ref)?.name)]?.sort()?.map((name, index) => (<dd key={index}><a className="link" >{name}</a></dd>))}
							</>)
							: null
						}
						{data.locations && data.locations?.length !== 0
							? (<>
								<dt>{data.locations.length > 1 ? "Locations" : "Location"}</dt>
								{[...data.locations?.map((location) => {
									const locationObject = referenceConfig.buildReference(location?._ref);
									return [locationObject?.name, locationObject?.locale]?.filter(Boolean)?.join(", ");
								})]?.sort()?.map((name, index) => (<dd key={index}><a className="link" >{name}</a></dd>))}
							</>)
							: null
						}
						{data.date && data.date?.startDate
							? (<>
								<dt>{data.date.dateFormat === "yearOnly" ? `Year` : `Date`}</dt>
								<dd><a className="link" >{dateConfig.renderComplexDate(data?.date)}</a></dd>
							</>)
							: null
						}
					</dl>
				</div> */}
				{data.credits && data.credits?.length !== 0
					? (
						<div className="project-footer-credits portableText">
							<PortableText value={data.credits} components={portableTextConfig.serializers} />
						</div>
					)
					: null
				}
				<div className="project-footer-related"></div>
			</footer>
		</>);
	};
	return (<>
		<style>{`
			html,
			body {
				position: relative;
				top: 0;
				left: 0;
				width: 100%;
				min-height: 100%;
				font-size: 20px;
				font-family: var(--font-family-sans);
				font-weight: var(--font-weight-normal);
				font-style: normal;
				line-height: 1.0;
				letter-spacing: 0.3;
				background: var(--color-background);
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
				color: var(--color-text);
				font-synthesis: none;
				text-align: inherit;
				text-decoration: inherit;
				-webkit-box-sizing: border-box;
				-moz-box-sizing: border-box;
				box-sizing: border-box;
				// text-rendering: geometricPrecision;
				-webkit-text-size-adjust: 100%;
				-moz-text-size-adjust: 100%;
				-ms-text-size-adjust: 100%;
				text-size-adjust: 100%;
				-webkit-font-smoothing: antialiased;
				-moz-osx-font-smoothing: grayscale;
				word-wrap: break-word;
				// overflow-wrap: break-word;
				// touch-action: manipulation;
			}
			:root {
				--color-1: #101010;
				--color-2: #fff;
				--color-3: #999;
				--color-4: #ccc;
				--color-text: var(--color-1);
				--color-background: var(--color-2);
				--font-family-sans: "Neue Haas Grotesk Display Pro", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
				--font-family-serif: "Times", "Times New Roman", serif;
				--font-weight-normal: 400;
				--font-weight-bold: 600;
				--font-size-large: 2.5rem;
				--font-size-big: 1.25rem;
				--font-size-normal: 1rem;
				--font-size-small: 0.75rem;
			}
			img {}
			.portableText {
				line-height: 1.3;
			}
			.portableText h3 {
				font-size: var(--font-size-big);
				line-height: 1;
				font-weight: var(--font-weight-bold);
			}
			.portableText blockquote {
				font-size: var(--font-size-small);
				margin-inline: 1.5rem;
				font-family: var(--font-family-serif);
			}
			.portableText .note {
				font-size: var(--font-size-small);
				--color-text: var(--color-3);
			}
			.portableText figure {}
			.portableText figure img {
				display: block;
				width: 100%;
				height: auto;
			}
			.portableText figure figcaption {
				padding-block-start: 0.5rem;
				font-size: var(--font-size-small);
				--color-text: var(--color-3);
			}
			.portableText p + p,
			.portableText h3 + p,
			.portableText blockquote + p,
			.portableText .note + p,
			.portableText figure + p,
			.portableText ul + p,
			.portableText ol + p,
			.portableText p + blockquote,
			.portableText h3 + blockquote,
			.portableText blockquote + blockquote,
			.portableText .note + blockquote,
			.portableText figure + blockquote,
			.portableText ul + blockquote,
			.portableText ol + blockquote,
			.portableText p + h3,
			.portableText h3 + h3,
			.portableText blockquote + h3,
			.portableText .note + h3,
			.portableText figure + h3,
			.portableText ul + h3,
			.portableText ol + h3,
			.portableText p + .note,
			.portableText h3 + .note,
			.portableText blockquote + .note,
			.portableText .note + .note,
			.portableText figure + .note,
			.portableText ul + .note,
			.portableText ol + .note,
			.portableText p + figure,
			.portableText h3 + figure,
			.portableText blockquote + figure,
			.portableText .note + figure,
			.portableText figure + figure,
			.portableText ul + figure,
			.portableText ol + figure,
			.portableText p + ul,
			.portableText h3 + ul,
			.portableText blockquote + ul,
			.portableText .note + ul,
			.portableText figure + ul,
			.portableText ul + ul,
			.portableText ol + ul,
			.portableText p + ol,
			.portableText h3 + ol,
			.portableText blockquote + ol,
			.portableText .note + ol,
			.portableText figure + ol,
			.portableText ul + ol,
			.portableText ol + ol {
				padding-block-start: 0.5rem;
			}
			.portableText strong {
				font-weight: var(--font-weight-bold);
			}
			.portableText em {
				font-style: italic;
			}
			.portableText del {
				text-decoration: line-through;
			}
			.portableText sup {
				font-size: 0.61875em;
			}
			.portableText li {
				padding-inline-start: 0.5rem;
				margin-inline-start: 1rem;
			}
			.link,
			.portableText a {
				cursor: pointer;
				--color-text: var(--color-1);
				transition: color 0.125s;
			}
			.portableText a {
				background-image: linear-gradient(to bottom, var(--color-4), var(--color-4));
				background-size: 1px 1px;
				background-repeat: repeat-x;
				background-position: 0 97.5%;
			}
			@media (any-hover: hover) {
				.link:hover,
				.portableText a:hover {
					--color-text: var(--color-3);
				}
			}
			.portableText:not(.project-body-subsegment):empty {
				display: none;
			}
			.mother {
				padding-inline: 1.5rem;
			}
			.mother > header {
				position: sticky;
				top: 0;
				padding-block: 1.5rem;
			}
			.project-profile {
				font-size: var(--font-size-big);
			}
			.project-profile p + p {
				padding-block-start: 0.5rem;
			}
			.project-header {}
			.project-header-title {
				font-size: var(--font-size-large);
				padding-block-end: 1.25rem;
			}
			.project-header-subtitle {
				font-size: var(--font-size-big);
				padding-block-end: 1.5rem;
			}
			.project-header-title,
			.project-header-subtitle {
				width: 60%;
				margin-inline: auto;
			}
			.project-header-title + .project-header-hero {
				padding-block-start: 0.25rem;
			}
			.project-header-hero {
				margin-inline: auto;
				padding-block-end: 1.5rem;
			}
			.project-header-smallHero {
				width: 60%;
			}
			.project-header-mediumHero {
				width: 80%;
			}
			.project-header-largeHero {
				width: 100%;
			}
			.project-header-hero-image img {
				display: block;
				width: 100%;
				height: auto;
			}
			.project-header-hero-caption {
				padding-block-start: 0.5rem;
				font-size: var(--font-size-small);
				--color-text: var(--color-3);
			}
			.project-header-description {
				width: 60%;
				margin-inline: auto;
				padding-block-end: 1.5rem;
				font-size: var(--font-size-small);
			}
			.project-body {}
			.project-body-segment {
				display: flex;
				flex-flow: row nowrap;
				// gap: 1.5rem;
			}
			.project-body-subsegment {
				padding-block-end: 1.5rem;
			}
			@media (max-width: 768px) {
				.project-body-segment {
					flex-direction: column;
					width: 60%;
					margin-inline: auto;
				}
				.project-body-segment[data-subsegments="1"] {
					width: 100%;
				}
				.project-body-subsegment:empty {
					display: none;
				}
			}
			.project-footer {
				margin-inline: -1.5rem;
				padding: 1.5rem;
				background: var(--color-1);
				--color-text: var(--color-2);
			}
			.project-footer-info {
				font-size: var(--font-size-small);
				width: calc(20% - 0.75rem);
			}
			.project-footer-info dt {
				font-weight: var(--font-weight-bold);
			}
			.project-footer-info dt + dd {
				margin-block-start: 0.25rem;
			}
			.project-footer-info dd + dt {
				margin-block-start: 0.5rem;
			}
			.project-footer-credits {
				width: 60%;
				font-size: var(--font-size-small);
				margin-inline: auto;
				// padding-block-end: 1.5rem;
				--color-text: var(--color-3);
			}
			.project-footer-related {}
			@media (max-width: 640px) {
				.project-header-title,
				.project-header-subtitle,
				.project-header-smallHero,
				.project-header-mediumHero,
				.project-header-description,
				.project-body-segment,
				.project-footer-credits {
					width: 80%;
				}
			}
			@media (max-width: 512px) {
				.project-header-title,
				.project-header-subtitle,
				.project-header-smallHero,
				.project-header-mediumHero,
				.project-header-description,
				.project-body-segment,
				.project-footer-credits {
					width: 100%;
				}
			}
			@media (max-width: 384px) {
				html,
				body {
					font-size: 16px;
					--font-size-small: var(--font-size-normal);
				}
			}
		`}</style>
		<div className="mother">
			<header>
				<Profile />
			</header>
			<main>
				<article>
					<Header />
					<Body />
					<Footer />
				</article>
			</main>
			{/* <footer>Footer</footer> */}
		</div>
	</>);
};
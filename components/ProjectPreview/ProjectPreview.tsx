import React from "react";
import { PortableText as SanityPortableText } from "@portabletext/react";
import { dateConfig, imageConfig, portableTextConfig, referenceConfig } from "../../util";
import { FigureCss, GlobalCss, MainCss, PageBuilderCss, PortableTextCss, SlugCss } from "./css";

// add fallback profile
// add fallback title

export const PortableText = (props) => {
	const serializers = {
		types: {
			image: ({ value }) => value.isUsedAsPlaceholder ? (<Figure source={props.document.image} />) : (<Figure source={value} />),
			// object TODO
		},
		marks: {
			// strong (default)
			// em (default)
			// underline (default)
			// strike-through (default)
			sup: ({ children }) => (<sup>{children}</sup>),
			link: ({ children }) => {
				return (
					<a className="hover-text" href="#">
						{children}
					</a>
				);
			},
		},
		block: {
			normal: ({ children }) => children && children?.length !== 0 && (children?.filter((child) => !child)?.length !== children?.length) && (<p>{children}</p>),
			h2: ({ children }) => (<h3>{children}</h3>),
			// blockquote (default)
			note: ({ children }) => (<div className="note">{children}</div>),
		},
		list: {
			// bullet (default)
			// number (default)
		},
	};
	return props.source && props.source?.length !== 0 && (
		<div className="rich-text">
			<SanityPortableText value={props.source} components={serializers} document={props.document} />
		</div>
	);
};

export const Image = (props) => {
	const id = props.source.asset._ref;
	const dimensions = id.split("-")?.[2]?.split("x");
	const width = dimensions[0];
	const height = dimensions[1];
	return (
		<picture style={props.style} >
			<img loading="lazy" width={width} height={height} src={imageConfig.buildImage(props.source) || ""} alt=""/>
		</picture>
	);
};

export const Figure = (props) => props.source && props.source.asset && (
	<figure data-caption-placement={props.source.captionPlacement || "bottom"}>
		<Image source={props.source} style={{
			flex: Math.max(props.source.imageRatio, 1) || 1,
		}} />
		{props.source.caption && props.source.caption?.length !== 0 && (
			<figcaption style={{
				flex: Math.max(props.source.captionRatio, 1) || 1,
				alignSelf: {
						"top": "flex-start",
						"middle": "center",
						"bottom": "flex-end",
				}[props.source.captionVerticalAlignment] || null,
			}}>
				<PortableText source={props.source.caption} muted={true} small={true} />
			</figcaption>
		)}
	</figure>
);

const PageBuilder = (props) => {
	const {
		source,
		document,
	} = props;
	const Row = (props) => (
		<div className={`row ${props.doesBreakout === true ? "breakout" : ""}`} data-index={props.index}>
			{props.children}
		</div>
	);
	const Column = (props) => (
		<div className="column" data-index={props.index} style={{
			flex: props.ratio,
			alignSelf: {
				"top": "flex-start",
				"middle": "center",
				"bottom": "flex-end",
			}[props.verticalAlignment] || null,
		}}>
			{props.children}
		</div>
	);
	return source?.map((row, index) => {
		if (row.columns?.filter((column) => {
			switch (column._type) {
				case "column": return (!column.content || column.content?.length === 0) ? true : false;
				default: return true;
			};
		})?.length === row.columns?.length) {
			return null;
		};
		return (
			<Row index={index + 1} doesBreakout={row.doesBreakout}>
				{row.columns?.map((column, index) => {
					const ratio = Math.max(column.ratio, 1) || 1;
					const verticalAlignment = column.verticalAlignment;
					switch (column._type) {
						case "column": {
							if (column.content && column.content?.length !== 0) {
								return (
									<Column ratio={ratio} verticalAlignment={verticalAlignment} index={index + 1}>
										<PortableText source={column.content} document={document} />
									</Column>
								);
							};
							return (
								<Column ratio={ratio} verticalAlignment={verticalAlignment} index={index + 1} />
							);
						};
						default: return null;
					};
				})}
			</Row>
		);
	});
};

export default function ProjectPreview(props) {
	const { data } = props;
	return (
		<main>
			<GlobalCss />
			<MainCss />
			<SlugCss />
			<PageBuilderCss />
			<FigureCss />
			<PortableTextCss />
			<article className="project">
				<div className="project-body">
					<PageBuilder source={data.page?.body} document={data} />
				</div>
			</article>
		</main>
	);
};
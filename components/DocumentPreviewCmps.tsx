import React from "react";
import { PortableText as SanityPortableText } from "@portabletext/react";
import { dateConfig, imageConfig, referenceConfig } from "../util";
import { COUNTRIES } from "../lib/countries";

const PortableText = (props) => {
	const serializers = {
		types: {
			image: ({ value }) => value.isUsedAsPlaceholder
				? (<Figure source={props.document.image} />)
				: (<Figure source={value} />),
			embed: ({value}) => value.code && (
				<div className="embed-object" data-type="code" dangerouslySetInnerHTML={{ __html: value.code }} style={{ "--aspect-ratio": value.doesConstrainAspectRatio && value.aspectRatio } as React.CSSProperties} />
			),
			title: () => props.document.title && (
				<div className="document-header">
					<div className="document-title">
						<h1 className="document-title-baseline">{props.document.title?.trim()}</h1>
						{props.document.subtitle && (
							<p className="document-subtitle">{props.document.subtitle?.trim()}</p>
						)}
					</div>
					{props.document.date && props.document.date.startDate && props.document.date.dateFormat && (
						<div className="document-date">
							{dateConfig.renderComplexDate(props.document.date)}
						</div>
					)}
					<div className="document-tags">
						<ul>
							{[...(props.document.types || []), ...(props.document.collections || []), ...(props.document.subjects || []), ...(props.document.locations || [])]?.filter(Boolean)?.map((tagItem) => {
								const tag = referenceConfig.buildReference(tagItem?._ref) || {
									_type: "",
									name: "",
									locale: "",
								};
								return (
									<li key={tagItem._key}>
										<a className="link hover-text" href="#">
											{tag?._type === "location" ? `${tag?.name?.trim()}, ${COUNTRIES.find((country) => country?.value === tag?.locale)?.title}` : tag?.name?.trim()}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			),
			description: ({ value }) => value.doesInclude && value.doesInclude.length !== 0 && (
				<div className="document-description">
					{value.doesInclude.includes("projectDescription") && props.document.description && props.document.description.length !== 0 && (
						<PortableText source={props.document.description} />
					)}
					{props.document.collections && props.document.collections.length !== 0 && props.document.collections.map((collectionItem) => {
						const collection = referenceConfig.buildReference(collectionItem?._ref) || {
							description: "",
						};
						return collection?.description && collection?.description.length !== 0 && (<PortableText key={collectionItem._key} source={collection?.description} />);
					})}
				</div>
			),
			// documentReference: ({ value }) => value.reference && (
			// 	<div className="document-reference boxed-area"></div>
			// ),
			cta: ({ value }) => value.label && (
				<div className="cta boxed-area">
					<a href="#">
						{value.label}
					</a>
				</div>
			),
			spacer: ({ value }) => (<div className="spacer" style={{ "--line-count": value.lineCount, } as React.CSSProperties}></div>),
		},
		marks: {
			// strong (default)
			// em (default)
			// underline (default)
			// strike-through (default)
			sup: ({ children }) => (<sup>{children}</sup>),
			link: ({ children }) => {
				return (
					<a className="link hover-text" href="#">
						{children}
					</a>
				);
			},
		},
		block: {
			normal: ({ node, children }) => node && children && node.children && !(node.children.length === 1 && !node.children[0].text) && (
				<p>
					{children}
				</p>
			),
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

const Image = (props) => {
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

const Figure = (props) => props.source && props.source.asset && (
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
				<PortableText source={props.source.caption} />
			</figcaption>
		)}
	</figure>
);

export const PageBuilder = (props) => {
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
	return source?.filter((row) => row.isEnabled !== false)?.map((row, index) => {
		if (row.columns?.filter((column) => {
			switch (column._type) {
				case "column": return (!column.content || column.content?.length === 0) ? true : false;
				default: return true;
			};
		})?.length === row.columns?.length) {
			return null;
		};
		return (
			<Row key={row._key} index={index + 1} doesBreakout={row.doesBreakout}>
				{row.columns?.map((column, index) => {
					const ratio = Math.max(column.ratio, 1) || 1;
					const verticalAlignment = column.verticalAlignment;
					switch (column._type) {
						case "column": {
							if (column.content && column.content?.length !== 0) {
								return (
									<Column key={column._key} ratio={ratio} verticalAlignment={verticalAlignment} index={index + 1}>
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
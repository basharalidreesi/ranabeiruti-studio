import React from "react";
import { PortableText as SanityPortableText } from "@portabletext/react";
import { dateConfig, imageConfig, portableTextConfig, referenceConfig } from "../util";
import { COUNTRIES } from "../lib/countries";

export const PortableText = (props) => {
	const serializers = {
		types: {
			image: ({ value }) => value.isUsedAsPlaceholder
				? (<Figure source={{
					...props.document.image,
					captionPlacement: value.captionPlacement,
					captionVerticalAlignment: value.captionVerticalAlignment,
					imageRatio: value.imageRatio,
					captionRatio: value.captionRatio,
				}} />)
				: (<Figure source={value} />),
			embed: ({value}) => value.code && (
				<div className="embed-object" data-type="code" dangerouslySetInnerHTML={{ __html: value.code }} style={{ "--aspect-ratio": value.doesConstrainAspectRatio && value.aspectRatio } as React.CSSProperties} />
			),
			title: () => props.document.title && (
				<div className="document-header">
					<RecordTitle source={props.document} level={1} />
					<RecordDate source={props.document} />
					<RecordTags source={props.document} withLinks={true} />
				</div>
			),
			description: ({ value }) => value.doesInclude && value.doesInclude.length !== 0 && (
				<div className="document-description">
					{value.doesInclude.includes("projectDescription") && props.document.description && props.document.description.length !== 0 && (
						<PortableText source={props.document.description} />
					)}
					{value.doesInclude.includes("collectionDescriptions") && props.document.collections && props.document.collections.length !== 0 && props.document.collections.map((collectionItem) => {
						const collection = referenceConfig.buildReference(collectionItem?._ref) || {
							description: "",
						};
						return collection?.description && collection?.description.length !== 0 && (<PortableText key={collectionItem._key} source={collection?.description} />);
					})}
				</div>
			),
			documentReference: ({ value }) => {
				const reference = referenceConfig.buildReference(value.reference?._ref);
				return value.reference && value.reference._ref && reference && (
					/** @ts-ignore */
					<div className="document-reference boxed-area hoverable-area" data-type={reference._type}>
						<RecordTitle source={reference} withLink={true} level={2} />
						<RecordDate source={reference} />
						<RecordDescription source={reference} />
						<RecordBody source={reference} />
						<RecordImage source={reference} />
						<RecordTags source={reference} />
					</div>
				);
			},
			cta: ({ value }) => value.label && (
				<div className="cta boxed-area hoverable-area">
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
			h2: ({ children }) => (<h3 className="heading">{children}</h3>),
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
			{/* @ts-ignore */}
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
						"baseline": "baseline",
				}[props.source.captionVerticalAlignment] || null,
			}}>
				<PortableText source={props.source.caption} />
			</figcaption>
		)}
	</figure>
);

const RecordTitle = (props) => {
	const {
		source,
		level = 2,
		withLink,
	} = props;
	if (!source || !source._type || !source.title) { return null; };
	const recordType = source._type;
	const recordTitle = source.title?.trim();
	const recordSubtitle = ((recordType === "project" || recordType === "publication") && source.subtitle?.trim()) || (recordType === "press" && source.publisher?.trim());
	const separatorsByType = {
		project: ":&nbsp;",
		publication: ":&nbsp;",
		news: ":&nbsp;",
		press: " →&nbsp;",
	};
	const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
	const TitleInner = () => (<>
		<strong className="record-title-baseline">{recordTitle}{recordSubtitle && (<span className="record-title-separator" dangerouslySetInnerHTML={{ __html: separatorsByType[recordType] }}></span>)}</strong>{recordSubtitle && (<span className="record-subtitle">{recordSubtitle}</span>)}
	</>);
	return (
		<div className="record-title">
			<HeadingTag>
				{withLink
					? (
						<a href="#">
							<TitleInner />
						</a>
					)
					: (<TitleInner />)
				}
			</HeadingTag>
		</div>
	);
};

const RecordDate = (props) => {
	const {
		source,
	} = props;
	if (!source || !source.date) { return null; };
	if (source._type === "project" && (!source.date.startDate || !source.date.dateFormat)) { return null; };
	return (
		<div className="record-date">
			{
				source._type === "project" ? (dateConfig.renderComplexDate(source.date))
				: source._type === "publication" ? (source.date?.split("-")?.[0])
				: source._type === "news" ? (dateConfig.renderAsString(source.date))
				: source._type === "press" ? (dateConfig.renderAsString(source.date))
				: null
			}
		</div>
	);
};

const RecordDescription = (props) => {
	const {
		source,
	} = props;
	if (!source || !source.description || source.description.length === 0) { return null; };
	return (
		<div className="record-description ellipsis-multiline">
			<p>
				{portableTextConfig.renderAsPlainText(source.description)}
			</p>
		</div>
	);
};

const RecordBody = (props) => {
	const {
		source,
	} = props;
	if (!source || !source.body || source.body.length === 0) { return null; };
	return (
		<div className="record-body ellipsis-multiline">
			<p>
				{portableTextConfig.renderAsPlainText(source.body)}
			</p>
		</div>
	);
};

const RecordImage = (props) => {
	const {
		source,
	} = props;
	if (!source || !source.image || !source.image.asset) { return null; };
	return (
		<div className="record-image">
			<Image source={source.image} />
		</div>
	);
};

const RecordTags = (props) => {
	const {
		source,
		withLinks = false,
	} = props;
	const tagArray = [...(source.types || []), ...(source.collections || []), ...(source.subjects || []), ...(source.locations || [])]?.filter(Boolean);
	if (!source || !tagArray || tagArray.length === 0) { return null; };
	return (
		<div className="record-tags">
			<ul>
				{tagArray.filter((tagItem) => tagItem._ref)?.map((tagItem) => {
					const tag = referenceConfig.buildReference(tagItem._ref);
					const TagInner = () => (<>
						{/* @ts-ignore */}
						{tag?._type === "location" ? `${tag?.name?.trim()}, ${COUNTRIES.find((country) => country?.value === tag?.locale)?.title}` : tag?.name?.trim()}
					</>);
					return tag && (
						<li key={tagItem._key}>
							{withLinks
								? (
									<a className="link hover-text" href="#">
										<TagInner />
									</a>
								)
								: (<TagInner />)
							}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

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
				"baseline": "baseline",
			}[props.verticalAlignment] || null,
		}}>
			{props.children}
		</div>
	);
	return source?.filter((row) => row.isEnabled)?.map((row, index) => {
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
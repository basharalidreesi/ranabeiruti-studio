import React from "react";
import { FigureCss, GlobalCss, MainCss, PageBuilderCss, PortableTextBaseCss, PortableTextSpacingCss, ResetCss, SlugCss } from "./DocumentPreviewCss";
import { PageBuilder } from "./DocumentPreviewCmps";

export default function DocumentPreview(props) {
	const { data } = props;
	return (
		<main>
			<ResetCss />
			<GlobalCss />
			<MainCss />
			<SlugCss />
			<PageBuilderCss />
			<FigureCss />
			<PortableTextBaseCss />
			<PortableTextSpacingCss />
			<article className="project">
				<div className="project-body">
					<PageBuilder source={data.page?.body} document={data} />
				</div>
			</article>
		</main>
	);
};
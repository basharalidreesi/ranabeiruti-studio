import React from "react";
import { FigureCss, GlobalCss, MainCss, PageBuilderCss, PortableTextBaseCss, PortableTextSpacingCss, ResetCss, SlugCss } from "./DocumentPreviewCss";
import { PageBuilder, PortableText } from "./DocumentPreviewCmps";

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
			<article className="document">
				<div className="document-body">
					<PageBuilder source={data.page?.body} document={data} />
				</div>
				<div className="document-footer">
					{data.page?.doesIncludeCredits && data.credits && data.credits.length !== 0 && (
						<div className="document-credits">
							<PortableText source={data.credits} />
						</div>
					)}
				</div>
			</article>
		</main>
	);
};
import { DocumentPreviewWrapper, DocumentPreview } from "./components";

export const defaultDocumentNode = (S, { documentId, schemaType }) => {
	switch (schemaType) {
		case "listing": if (documentId !== "homepage") { return; };
		case "publication":
		case "project": return S.document().views([
			S.view.form().title("Edit"),
			S.view.component(DocumentPreviewWrapper).title("Preview").options({
				body: (data) => <DocumentPreview data={data} />,
			}),
		]);
		default: return S.document().views([
			S.view.form().title("Edit"),
		]);
	};
};
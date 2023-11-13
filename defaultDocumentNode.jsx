import { DocumentPreview, ProjectPreview } from "./components";

export const defaultDocumentNode = (S, {schemaType}) => {
	switch (schemaType) {
		case "project": return S.document().views([
			S.view.form().title("Edit"),
			S.view.component(DocumentPreview).title("Preview").options({
				basePath: "/projects",
				body: (data) => <ProjectPreview data={data} />,
			}),
		]);
		default: return S.document().views([
			S.view.form().title("Edit"),
		]);
	};
};
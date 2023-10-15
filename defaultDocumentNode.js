import { EditIcon, EyeOpenIcon } from "@sanity/icons";
import { Iframe } from "sanity-plugin-iframe-pane";
// import { ProjectPreview } from "./components";

function resolveUrl(doc) {
	const baseUrl = window.location.hostname === "localhost" ? "http://localhost:8080" : "";
	// return `${baseUrl}/preview/${doc._id?.replace("drafts.", "")}/`;
	return `${baseUrl}/preview/`;
};

export const defaultDocumentNode = (S, {schemaType}) => {
	switch (schemaType) {
		case "project": return S.document().views([
			S.view.form().title("Edit"),
			// S.view.component(Iframe).title("Preview").options({
			// 	url: (doc) => resolveUrl(doc),
			// 	showDisplayUrl: true,
			// 	defaultSize: "desktop",
			// 	reload: {
			// 		button: true,
			// 		revision: false,
			// 	},
			// 	loader: true,
			// 	// attributes: {},
			// }),
			// S.view.component(ProjectPreview).title("Preview").icon(EyeOpenIcon),
		]);
		default: return S.document().views([
			S.view.form().title("Edit").icon(EditIcon),
		]);
	};
};
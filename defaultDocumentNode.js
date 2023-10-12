import { EditIcon, EyeOpenIcon } from "@sanity/icons";
import { ProjectPreview } from "./components";

export const defaultDocumentNode = (S, {schemaType}) => {
	if (schemaType === "project") {
		return S.document().views([
			S.view.form().title("Edit").icon(EditIcon),
			S.view.component(ProjectPreview).title("Preview").icon(EyeOpenIcon),
		]);
	};
	return S.document().views([
		S.view.form().title("Edit").icon(EditIcon),
	]);
};
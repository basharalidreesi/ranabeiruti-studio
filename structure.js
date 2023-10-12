const hiddenTypes = new Set([
	"media.tag",
]);

export const dataDeskstructure = (S) => {
	return S.list()
		.title("Data")
		.items([
			...S.documentTypeListItems().filter((type) => !hiddenTypes.has(type.spec.id)),
		]);
};

export const projectsDeskStructure = (S) => {
	return S.documentTypeList("project").title("Projects");
};
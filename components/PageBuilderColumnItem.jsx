import { Box, Flex, TextInput } from "@sanity/ui";
import { useCallback } from "react";
import { PatchEvent, set, unset } from "sanity";
import { useDocumentPane } from "sanity/desk";

export default function PageBuilderColumnItem(props) {
	const {
		path,
		renderDefault,
		value,
	} = props;
	const { onChange } = useDocumentPane();
	const handleChange = useCallback((event) => {
		const newValue = Number.parseFloat(event?.currentTarget?.value);
		const changePath = [...path, "ratio"];
		if (!newValue) {
			onChange(PatchEvent.from([unset(changePath)]));
		};
		onChange(
			PatchEvent.from([
				set(newValue, changePath),
			]),
		);
	}, [value?.ratio, path, onChange]);
	return (<>
		<Flex paddingRight={2} align="center" style={{ gap: "0.75rem" }}>
			<Box flex={1}>{renderDefault(props)}</Box>
			<TextInput
				placeholder="Ratio"
				value={value?.ratio?.toString() || ""}
				onChange={handleChange}
				type="number"
				min={1}
				max={Number.MAX_SAFE_INTEGER}
				step={1}
				style={{
					width: "5.5rem",
				}}
			/>
		</Flex>
	</>);
};
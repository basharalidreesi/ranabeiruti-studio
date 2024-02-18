import { EyeClosedIcon, EyeOpenIcon } from "@sanity/icons";
import { Box, Button, Flex } from "@sanity/ui";
import { useCallback } from "react";
import { PatchEvent, set } from "sanity";
import { useDocumentPane } from "sanity/structure";
import React from "react";

export default function PageBuilderRowItem(props) {
	const {
		path,
		renderDefault,
		value,
	} = props;
	const { onChange } = useDocumentPane();
	const handleClick = useCallback(() => {
		const newValue = value.isEnabled ? false : true;
		const changePath = [...path, "isEnabled"];
		onChange(
			PatchEvent.from([
				set(newValue, changePath),
			]),
		);
	}, [value?.isEnabled, path, onChange]);
	return (<>
		<Flex paddingRight={2} align="center" style={{ gap: "0.75rem" }}>
			<Box flex={1}>{renderDefault(props)}</Box>
			<Button
				mode="bleed"
				icon={value.isEnabled ? EyeOpenIcon : EyeClosedIcon}
				onClick={handleClick}
				style={{
					width: "2.25rem",
				}}
			/>
		</Flex>
	</>);
};
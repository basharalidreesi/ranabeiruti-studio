import { set } from "sanity";
import { Button, Grid } from "@sanity/ui";
import { useCallback } from "react";

export default function StringSelect(props) {
	const {
		value,
		onChange,
		schemaType,
	} = props;
	const list = schemaType.options?.list;
	const handleClick = useCallback((event) => {
		const nextValue = event.currentTarget.value;
		onChange(set(nextValue));
	}, [onChange]);
	return (<>
		<Grid columns={list?.length} gap={2}>
			{list?.map((item) => (
				<Button
					key={item?.value}
					value={item?.value}
					mode={value === item?.value ? "default" : "ghost"}
					tone={value === item?.value ? "primary" : "default"}
					onClick={handleClick}
					text={item?.title}
					icon={item?.icon}
					fontSize={1}
				/>
			))}
		</Grid>
	</>);
};
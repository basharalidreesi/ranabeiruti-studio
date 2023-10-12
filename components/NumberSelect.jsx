import { Grid, Button } from "@sanity/ui";
import { set } from "sanity";
import { useMemo, useCallback } from "react";

export default function NumberSelect(props) {
	const { onChange, schemaType, value } = props;
	const { validation = [] } = schemaType;
	const range = useMemo(() => generateRange(validation), [validation]);
	const handleSelect = useCallback((event) => {
		const value = Number(event.currentTarget.value);
		onChange(set(value));
	}, [onChange]);
	return (
		<Grid columns={range.length} gap={1}>
			{range.map((index) => (
				<Button
					fontSize={1}
					key={index}
					mode={value >= index ? "default" : "ghost"}
					tone={value >= index ? "primary" : "default"}
					text={index.toString()}
					value={index}
					onClick={handleSelect}
				/>
			))}
		</Grid>
	);
};

function generateRange(validation) {
	const [min, max] = validation
		.reduce((acc, {_rules}) => {
			return [...acc, ..._rules];
		}, [])
		.filter((rule) => ["max", "min"].includes(rule.flag))
		.map((rule) => rule.constraint);
	let range = [];
	for (let i = min; i <= max; i++) {
		range.push(i);
	};
	return range;
};
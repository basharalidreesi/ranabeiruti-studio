import { Card } from "@sanity/ui";
import { useCallback, useEffect, useRef } from "react";

const maximumFileSize = 1.5*1024*1024;

export default function LimitedFileInput(props) {
	const inputWrapperRef = useRef(null);
	// const dropZone = useRef(null);
	const handleFileInput = useCallback((event) => {
		const file = event.target.files[0];
		if (file?.size > maximumFileSize) {
			event.target.value = "";
			console.error(`File exceeds the maximum upload size of ${maximumFileSize}.`);
			return;
		};
	});
	// const handleDragStart = useCallback((event) => {
	// 	console.log(event);
	// });
	// const handleDragOver = useCallback((event) => {
	// 	event.preventDefault();
	// });
	// const handleDrop = useCallback((event) => {
	// 	event.preventDefault();
	// 	const file = event.dataTransfer.files[0];
	// 	if (file?.size > maximumFileSize) {
	// 		console.error(`File exceeds the maximum upload size of ${maximumFileSize}.`);
	// 		return;
	// 	};
	// 	event.target.style.pointerEvents = "none";
	// });
	useEffect(() => {
		const input = inputWrapperRef?.current?.querySelector("input[type=\"file\"]");
		// const zone = dropZone?.current;
		input?.addEventListener("change", handleFileInput);
		// zone?.addEventListener("dragstart", handleDragStart);
		// zone?.addEventListener("dragover", handleDragOver);
		// zone?.addEventListener("drop", handleDrop);
		return () => {
			input?.removeEventListener("change", handleFileInput);
			// zone?.removeEventListener("dragstart", handleDragStart);
			// zone?.removeEventListener("dragover", handleDragOver);
			// zone?.removeEventListener("drop", handleDrop);
		};
	});
	return (<>
		<Card
			// tone={"positive"}
			ref={inputWrapperRef}
			style={{
				position: "relative",
			}}
		>
			{props.renderDefault({
				...props,
			})}
			{/* <div
				ref={dropZone}
				style={{
					position: "absolute",
					top: "0",
					left: "0",
					width: "100%",
					height: "100%",
				}}
			></div> */}
		</Card>
	</>);
};
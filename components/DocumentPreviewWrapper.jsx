import { Badge, Button, Card, Flex, Text } from "@sanity/ui";
import { useEffect, useMemo, useRef, useState } from "react";
import { LaunchIcon, MobileDeviceIcon, PauseIcon, SyncIcon } from "@sanity/icons";
import { createPortal } from "react-dom";

function useForceUpdate(){
	const [_, setValue] = useState(0);
	return () => setValue((prev) => prev + 1);
};

function createBlobUrlFromIframe(iframe) {
	const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
	const blob = new Blob([iframeDoc.documentElement.outerHTML], { type: "text/html;charset=utf-8" });
	return URL.createObjectURL(blob);
};

export default function DocumentPreviewWrapper(props) {
	const {
		document,
		documentId,
		options,
	} = props;
	const [contentRef, setContentRef] = useState(null);
	const [isMobileMode, setIsMobileMode] = useState(false);
	const [isUpdatePaused, setIsUpdatePaused] = useState(false);
	const mountNode = contentRef?.contentWindow?.document?.body;
	const documentState = useRef(document.displayed);
	const oldDocumentState = useMemo(() => {
		return mountNode && createPortal(options.body(documentState.current), mountNode);
	}, [isUpdatePaused, documentState.current]);
	const forceUpdate = useForceUpdate();
	const pauseUpdate = () => {
		setIsUpdatePaused((prev) => !prev);
		documentState.current = document.displayed;
	};
	useEffect(() => {
		forceUpdate();
		pauseUpdate();
	}, []);
	return (
		<Card tone="transparent" style={{ height: "100%" }}>
			<Flex
				style={{
					position: "relative",
					flexFlow: "column nowrap",
					alignItems: "center",
					justifyContent: "flex-start",
					height: "100%",
				}}
			>
				<Card
					borderBottom={1}
					style={{
						position: "sticky",
						top: "0",
						paddingInline: "0.5rem",
						paddingBlock: "0.5rem",
						width: "calc(100% - 1rem)",
						zIndex: "10",
					}}
				>
					<Flex
						space={2}
						style={{
							flexFlow: "row nowrap",
							alignItems: "center",
							gap: "0.5rem",
						}}
					>
						<Button
							padding={2}
							tone={isMobileMode ? "primary" : "default"}
							mode={isMobileMode ? "default" : "bleed"}
							icon={MobileDeviceIcon}
							onClick={() => setIsMobileMode((prev) => !prev)}
							style={{
								height: "1.6875rem",
								width: "1.6875rem",
							}}
						/>
						<Divider />
						<ShortText>
							{document.displayed.slug?.current
								? (`Slug: ${document.displayed.slug?.current}`)
								: (documentId === "homepage" ? "Slug: /" : "Slug not set")
							}
						</ShortText>
						<Divider />
						<ShortText style={{
							marginInlineEnd: "auto",
						}}>
							ID: {documentId}
						</ShortText>
						<Divider />
						<Button
							padding={2}
							tone={isUpdatePaused ? "primary" : "default"}
							mode={isUpdatePaused ? "default" : "bleed"}
							icon={PauseIcon}
							onClick={pauseUpdate}
							style={{
								height: "1.6875rem",
								width: "1.6875rem",
							}}
						/>
						<Button
							padding={2}
							mode="bleed"
							icon={SyncIcon}
							onClick={() => {
								forceUpdate();
								documentState.current = document.displayed;
							}}
							style={{
								height: "1.6875rem",
								width: "1.6875rem",
							}}
						/>
						<Button
							padding={2}
							tone="default"
							mode="bleed"
							icon={LaunchIcon}
							text="Open"
							disabled={document.displayed ? false : true}
							onClick={() => window.open(createBlobUrlFromIframe(contentRef))}
						/>
					</Flex>
				</Card>
				<iframe
					ref={setContentRef}
					style={{
						appearance: "none",
						flex: "1",
						width: "100%",
						height: "100%",
						maxWidth: isMobileMode ? "414px" : "100%",
						transition: "max-width 0.5s",
						boxShadow: "0 0 0 1px var(--card-border-color)",
						margin: "auto",
						border: "none",
						outline: "none",
					}}
				>
					{isUpdatePaused ? oldDocumentState : mountNode && createPortal(options.body(document.displayed), mountNode)}
				</iframe>
				<Badge
					tone={isUpdatePaused && (documentState.current !== document.displayed) ? "caution" : (document.displayed ? "positive" : "critical")}
					mode="outline"
					padding={2}
					size={1}
					style={{
						position: "absolute",
						bottom: "1rem",
						left: "1rem",
						borderRadius: "9999px",
					}}
				>
					<span
						style={{
							display: "inline-block",
							width: "0.75em",
							height: "0.75em",
							borderRadius: "100%",
							background: "currentColor",
							marginInlineEnd: "0.25rem",
						}}
					></span>
					Preview
				</Badge>
			</Flex>
		</Card>
	);
};

const Divider = () => (
	<div
		style={{
			height: "1.6875rem",
			width: "1px",
			background: "var(--card-shadow-outline-color)",
		}
	}></div>
);

const ShortText = (props) => (
	<Text
		muted={true}
		size={1}
		style={{
			minWidth: "0",
			...props.style
		}}
	>
		<span
			style={{
				display: "block",
				overflow: "hidden",
				textOverflow: "ellipsis",
				whiteSpace: "nowrap",
			}}
		>
			{props.children}
		</span>
	</Text>
);
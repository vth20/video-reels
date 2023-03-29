import React, { useState, useRef, useCallback } from "react";
import useHandleClick from "../../hooks/useHandleClick.js";

function VideoPlayer() {
	const [isPlaying, setIsPlaying] = useState(false);
	const [currentTime, setCurrentTime] = useState(0);
	const [isDragging, setIsDragging] = useState(false);
	const [elements, setElements] = useState([]);
	const videoRef = useRef(null);
	// const singleClick = useCallback((e) => togglePlay(e), []);
	// const doubleClick = useCallback((e) => handleSendHeart(e), []);
	const togglePlay = useCallback(
		(e) => {
			console.log(e);
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);
		},
		[isPlaying]
	);

	const handleSendHeart = useCallback((e) => {
		console.log(e);

		console.log("double");
		const x = e.clientX;
		const y = e.clientY;
		const newElement = (
			<div
				key={x+y}
				style={{ position: "absolute", top: y, left: x }}
			>
				<img alt="heart" style={{width: "20px", height: "20px"}} className="hearts" src="https://res.cloudinary.com/vth20/image/upload/v1677776545/game/sutahiqpveogclmod0f9.gif" />
			</div>
		);
		setElements([newElement]);
		 setTimeout(() => {
			setElements((elements) => elements.filter((element) => element !== newElement));
		}, 1500);
	}, []);
	const click = useHandleClick(togglePlay, handleSendHeart);

	function handleTimeUpdate() {
		setCurrentTime(videoRef.current.currentTime);
	}

	function handleProgressBarClick(event) {
		const progress =
			event.nativeEvent.offsetX / event.currentTarget.clientWidth;
		videoRef.current.currentTime = videoRef.current.duration * progress;
		setCurrentTime(videoRef.current.currentTime);
	}

	function handleProgressBarMouseDown(event) {
		const progress =
			event.nativeEvent.offsetX / event.currentTarget.clientWidth;
		videoRef.current.currentTime = videoRef.current.duration * progress;
		setCurrentTime(videoRef.current.currentTime);
		setIsDragging(true);
	}
	function handleProgressBarMouseMove(event) {
		if (isDragging) {
			const progress =
				event.nativeEvent.offsetX / event.currentTarget.clientWidth;
			videoRef.current.currentTime = videoRef.current.duration * progress;
			setCurrentTime(videoRef.current.currentTime);
		}
	}
	function handleProgressBarMouseUp(event) {
		setIsDragging(false);
	}
	// function formatTime(time) {
	//   const minutes = Math.floor(time / 60);
	//   const seconds = Math.floor(time % 60);
	//   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
	// }

	return (
		<div style={{ width: "500px" }}>
			<video
				ref={videoRef}
				src="https://res.cloudinary.com/vth20/video/upload/v1659969498/kiu4e0jt6tvynxvbhyka.mp4"
				onTimeUpdate={handleTimeUpdate}
				style={{ width: "500px" }}
				onClick={(e) => click(e)}
				className="video"
			// onDoubleClick={handleSendHeart}
			/>
			{/* <button onClick={togglePlay}>{isPlaying ? "Pause" : "Play"}</button> */}
			<div
				style={{
					position: "relative",
					height: "10px",
					backgroundColor: "#ccc",
					cursor: "pointer"
				}}
				onMouseDown={handleProgressBarMouseDown}
				onMouseMove={handleProgressBarMouseMove}
				onMouseUp={handleProgressBarMouseUp}
				onClick={handleProgressBarClick}
			>
				<div
					style={{
						position: "absolute",
						top: 0,
						left: 0,
						height: "100%",
						backgroundColor: "blue",
						width: `${(currentTime / videoRef.current?.duration) * 100}%`
					}}
				/>
			</div>
			{elements.map(item => {
				return item
			})}
		</div>
	);
}
export default VideoPlayer;

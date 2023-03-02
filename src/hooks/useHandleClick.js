import { useState, useEffect } from "react";

// bọc handleClick trong useCallback
const useHandleClick = (handleClick, handleDblClick) => {
	const [clickTimes, setClickTimes] = useState(0);
	const [event, setEvent] = useState(null);

	const handler = (event) => {
		setClickTimes((prev) => prev + 1);
		setEvent(event);
	};

	useEffect(() => {
		const timer = setTimeout(() => {
			if (clickTimes === 1) {
				handleClick(event);
			}

			setClickTimes(0);
		}, 250);

		if (clickTimes === 2) {
			handleDblClick(event);
		}

		return () => {
			clearTimeout(timer);
		};
	}, [clickTimes, event, handleClick, handleDblClick]);

	return handler;
};

export default useHandleClick;

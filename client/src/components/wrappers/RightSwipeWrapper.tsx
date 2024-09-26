// This wrapper component is designed to provide a right swipe functionality for its children components.
import {
	View,
	ViewStyle,
	PanResponder,
	GestureResponderEvent,
	Animated,
} from "react-native";
import React, { ReactNode } from "react";

interface RightSwipeWrapperProps {
	children: ReactNode;
	onRightSwipe: () => any;
	style?: ViewStyle;
	className?: string;
}

const RightSwipeWrapper: React.FC<
	RightSwipeWrapperProps & Animated.AnimatedProps<ViewStyle>
> = ({ children, onRightSwipe, style }) => {
	const translateX = new Animated.Value(0); // Animated value for swipe effect

	// Create a pan responder for swipe gestures

	const panResponder = React.useRef(
		PanResponder.create({
			onMoveShouldSetPanResponder: (
				evt: GestureResponderEvent,
				gestureState
			) => {
				return gestureState.dx > 30; // Detect right swipe
			},
			onPanResponderMove: (evt, gestureState) => {
				translateX.setValue(gestureState.dx); // Update the animated value during swipe
			},
			onPanResponderRelease: (evt, gestureState) => {
				if (gestureState.dx > 100) {
					// If swiped more than 100px, trigger delete
					Animated.timing(translateX, {
						toValue: 500,
						duration: 300,
						useNativeDriver: true,
					}).start(() => {
						onRightSwipe(); // Call the onRightSwipe function
					});
				} else {
					// Otherwise, snap back to original position
					Animated.spring(translateX, {
						toValue: 0,
						useNativeDriver: true,
					}).start();
				}
			},
		})
	).current;

	return (
		<Animated.View
			style={{ transform: [{ translateX }], ...style }} // Apply the animated translation
			{...panResponder.panHandlers} // Attach the pan responder handlers
			className={`w-full`}
		>
			{children}
		</Animated.View>
	);
};

export default RightSwipeWrapper;

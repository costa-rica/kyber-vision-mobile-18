import React, { useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";

export default function ButtonKvNoDefault({
  onPress,
  styleView,
  styleText,
  pressInColor = "gray",
  children,
}) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    styleView.backgroundColor
  );
  const handlePressIn = () => {
    setCurrentBackgroundColor(pressInColor); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor(styleView.backgroundColor); // Revert color when press is released
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();

    // Call the onPress function passed as a prop
    if (onPress) {
      onPress();
    }
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styleView}
      >
        <Text style={styleText}>{children}</Text>
      </Pressable>
    </Animated.View>
  );
}

// export default ButtonKv;

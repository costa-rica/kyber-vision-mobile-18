import React, { useRef, useState } from "react";
import { Animated, Pressable, Text } from "react-native";

export default function ButtonKvSmall({ onPress, style, children }) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  // Define default styles
  const defaultStyles = {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    color: "white",
    width: 35,
    borderRadius: 10,
  };
  // Merge provided style with default styles
  const mergedStyle = { ...defaultStyles, ...style };
  const [currentBackgroundColor, setCurrentBackgroundColor] = useState(
    mergedStyle.backgroundColor
  );
  const handlePressIn = () => {
    setCurrentBackgroundColor("gray"); // Change color on press
    Animated.spring(scaleValue, {
      toValue: 0.7,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    setCurrentBackgroundColor(mergedStyle.backgroundColor); // Revert color when press is released
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

  const styleView = {
    padding: mergedStyle.padding,
    margin: mergedStyle.margin,
    borderWidth: mergedStyle.borderWidth,
    alignItems: mergedStyle.alignItems,
    justifyContent: mergedStyle.justifyContent,
    backgroundColor: currentBackgroundColor,
    color: mergedStyle.color,
    opacity: mergedStyle.opacity,
    width: mergedStyle.width,
    height: mergedStyle.height,
    fontSize: mergedStyle.fontSize,
    borderRadius: mergedStyle.borderRadius,
    borderColor: mergedStyle.borderColor,
    borderStyle: mergedStyle.borderStyle,
    borderBottomWidth: mergedStyle.borderBottomWidth,
    borderBottomColor: mergedStyle.borderBottomColor,
    borderBottomStyle: mergedStyle.borderBottomStyle,
  };
  const styleText = {
    fontSize: mergedStyle.fontSize,
    color: mergedStyle.color,
    // textAlign: "center",
    fontFamily: "ApfelGrotezk",
    // backgroundColor: "green",
    // padding: mergedStyle.borderWidth * 2,
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

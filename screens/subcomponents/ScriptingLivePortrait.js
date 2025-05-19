import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateView from "./TemplateView";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // near top of file
import ButtonKvImage from "./buttons/ButtonKvImage";
import ButtonKv from "./buttons/ButtonKv";
import { useDispatch } from "react-redux";
import { loginUser } from "../../reducers/user";
import {
  GestureHandlerRootView,
  GestureDetector,
  // Gesture,
} from "react-native-gesture-handler";
export default function ScriptingLivePortrait(props) {
  return (
    <View style={styles.container}>
      <GestureHandlerRootView
        // onLayout={(event) => handleGestureHandlerRootViewLayout(event)}
        style={{}} //This is key to make sure the flex properties will trickle down to <Image>
      >
        <GestureDetector gesture={props.combinedGestures}>
          <View style={styles.containerSub}>
            <Text>ScriptingLivePortrait</Text>
          </View>
        </GestureDetector>
      </GestureHandlerRootView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
    width: "100%",
  },
  containerSub: {
    height: "100%",
    // backgroundColor: "yellow",
    width: "100%",
  },
});

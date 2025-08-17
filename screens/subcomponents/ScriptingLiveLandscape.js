import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import TemplateViewWithTopChildrenSmallLandscape from "./TemplateViewWithTopChildrenSmallLandscape";
export default function ScriptingLiveLandscape(props) {
  const stylesContainer = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width * (1 / 3),
  };

  const topChildren = (
    <View>
      <Text>Scripting - Live - Landscape</Text>
      <Text>{props.orientation}</Text>
    </View>
  );

  return (
    <TemplateViewWithTopChildrenSmallLandscape
      navigation={props.navigation}
      topChildren={topChildren}
      topHeight={50}
    >
      <View style={styles.container}>
        <View style={[stylesContainer, styles.containerLeft]}></View>
        <GestureHandlerRootView
          style={[stylesContainer, styles.containerMiddle]}
        >
          {/* <GestureHandlerRootView> */}
          <GestureDetector gesture={props.combinedGestures}>
            {/* <View style={stylesContainer}> */}
            <View style={styles.vwMain}>
              <Text>Scripting - Live - Landscape</Text>
              <Text>{props.orientation}</Text>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
        <View style={[stylesContainer, styles.containerRight]}></View>
      </View>
    </TemplateViewWithTopChildrenSmallLandscape>
  );
}
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  containerLeft: {
    backgroundColor: "blue",
  },
  containerMiddle: {
    backgroundColor: "yellow",
  },
  containerRight: {
    backgroundColor: "green",
  },
});

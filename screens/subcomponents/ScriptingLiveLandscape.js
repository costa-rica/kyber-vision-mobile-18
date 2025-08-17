import { StyleSheet, Text, View, Dimensions } from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import TemplateViewWithTopChildrenSmallLandscape from "./TemplateViewWithTopChildrenSmallLandscape";
import * as ScreenOrientation from "expo-screen-orientation";
import Lightning from "../../assets/images/lightning.svg";
import Volleyball from "../../assets/images/volleyball.svg";
import { useSelector } from "react-redux";

export default function ScriptingLiveLandscape(props) {
  const teamReducer = useSelector((state) => state.team);
  const stylesContainer = {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width * (1 / 3),
  };

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwTopChildrenLeft}>
        <Volleyball />
        <Text style={styles.txtTopChildren}>
          {teamReducer.teamsArray.find((tribe) => tribe.selected)?.teamName}
        </Text>
      </View>
      <Lightning />
      <Text style={styles.txtTopChildren}>Opponent</Text>
    </View>
  );

  const handleBackPress = async () => {
    console.log("---> [ScriptingLiveLandscape] in handleBackPress");
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    ); // Force back to portrait
    props.setOrientation("portrait");
    // props.navigation.goBack();
    console.log("<--- [ScriptingLiveLandscape] in handleBackPress");
  };

  return (
    <TemplateViewWithTopChildrenSmallLandscape
      navigation={props.navigation}
      topChildren={topChildren}
      topHeight={50}
      onBackPress={handleBackPress}
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
  // -----
  // Top Children
  // -----
  vwTopChildren: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    gap: 10,
  },
  vwTopChildrenLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  txtTopChildren: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
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

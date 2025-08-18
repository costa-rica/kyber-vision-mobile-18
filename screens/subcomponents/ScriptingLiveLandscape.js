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
import ButtonKvImage from "./buttons/ButtonKvImage";
import BtnService from "../../assets/images/buttons/btnService.svg";
import BtnReception from "../../assets/images/buttons/btnReception.svg";

export default function ScriptingLiveLandscape(props) {
  const teamReducer = useSelector((state) => state.team);
  const scriptReducer = useSelector((state) => state.script);

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

  // -----------------
  //  Styles
  // -----------------
  const stylesBtnTop = {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
  };

  const stylesBtnBottom = {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
  };
  return (
    <TemplateViewWithTopChildrenSmallLandscape
      navigation={props.navigation}
      topChildren={topChildren}
      topHeight={50}
      onBackPress={handleBackPress}
    >
      <View style={styles.container}>
        {/* <View style={[stylesContainer, styles.containerLeft]}> */}
        <View style={[styles.column]}>
          <View style={styles.vwContainerLeftTop}>
            <View style={[styles.vwContainerLeftTopLayer, { zIndex: 0 }]}>
              <View style={styles.vwGroupButtonsCircle} />
            </View>
            <View style={[styles.vwContainerLeftTopLayer, { zIndex: 1 }]}>
              <View style={styles.vwGroupButtonsCircleWrapper}>
                <View style={styles.vwGroupButtonsDiagonalLine} />
              </View>
            </View>

            <View
              style={[
                styles.vwContainerLeftTopLayer,
                { zIndex: 2, flexDirection: "row" },
              ]}
            >
              <View style={[styles.vwContainerLeftTopLayerLeft]}>
                <ButtonKvImage
                  onPress={() => {
                    console.log("pressed service");
                  }}
                  // style={styles.btnRallyGroupBottom}
                  // style={stylesBtnRallyGroupBottom}
                  style={{ padding: 0 }}
                >
                  <BtnService style={stylesBtnBottom} />
                </ButtonKvImage>
              </View>
              <View
                style={[styles.vwContainerLeftTopLayerRight]}
                // pointerEvents="box-none" // let touches pass through unless they hit a child
              >
                <ButtonKvImage
                  onPress={() => {
                    console.log("pressed reception");
                  }}
                  // style={styles.btnRallyGroupTop}
                  // style={stylesBtnRallyGroupTop}
                  style={{ padding: 0 }}
                >
                  <BtnReception style={stylesBtnTop} />
                </ButtonKvImage>
              </View>
            </View>
          </View>
          <View style={styles.vwContainerLeftBottom}>
            {/* <View style={styles.vwScriptDetails}> */}
            <Text style={{ color: "#806181" }}>
              {" "}
              {scriptReducer.sessionActionsArray.length} actions recorded
            </Text>
            <Text style={{ fontStyle: "italic", color: "#806181" }}>
              {" "}
              {
                scriptReducer.sessionActionsArray.filter(
                  (action) => action.favorite
                ).length
              }{" "}
              favorites
            </Text>
            {/* </View> */}
          </View>
        </View>
        {/* <GestureHandlerRootView
          style={[stylesContainer, styles.containerMiddle]}
        > */}
        <GestureHandlerRootView
          style={[styles.column, { backgroundColor: "yellow" }]}
        >
          {/* <GestureHandlerRootView> */}
          {/* <GestureDetector gesture={props.combinedGestures}>
           
            <View style={styles.vwMain}>
              <Text>Scripting - Live - Landscape</Text>
              <Text>{props.orientation}</Text>
            </View>
          </GestureDetector> */}
        </GestureHandlerRootView>
        {/* <View style={[stylesContainer, styles.containerRight]}></View> */}
        <View style={[styles.column, { backgroundColor: "green" }]}></View>
      </View>
    </TemplateViewWithTopChildrenSmallLandscape>
  );
}

const CIRCLE_SIZE = 100;
const DIAGONAL_LEN = Math.ceil(CIRCLE_SIZE * Math.SQRT2); // ~141
const LINE_THICKNESS = 8;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flex: 1,
    // backgroundColor: "red",
  },
  column: {
    flex: 1,
    // height: 100,
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

  // -----
  // LEFT
  // -----
  containerLeft: {
    // backgroundColor: "blue",
    flex: 1,
    // height: 300,
  },
  vwContainerLeftTop: {
    flex: 1,
    // height: "50%",
    // backgroundColor: "red",
    // borderWidth: 1,
    // borderColor: "gray",
    // borderStyle: "dashed",
    // position: "relative",
  },

  // LAYER
  vwContainerLeftTopLayer: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0, // fills parent
    alignItems: "center", // center the text horizontally
    justifyContent: "center", // center the text vertically
  },

  // BACKGROUND LAYER
  vwGroupButtonsCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#806181",
    opacity: 0.12,
  },

  // MIDGROUND LAYER
  vwGroupButtonsCircleWrapper: {
    width: 100,
    height: 100,
    borderRadius: 50,
    // backgroundColor: "#806181",
    // opacity: 0.12,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  vwGroupButtonsDiagonalLine: {
    width: DIAGONAL_LEN, // long enough to cross the circle’s corners
    height: LINE_THICKNESS, // line thickness
    borderRadius: LINE_THICKNESS / 2, // rounded ends (optional)
    backgroundColor: "#806181",
    opacity: 0.8,
    transform: [{ rotate: "-45deg" }], // top-right → bottom-left
  },

  // FOREGROUND LAYER

  // btnRallyGroupBottom: {
  //   paddingHorizontal: 0,
  //   // borderColor: "gray",
  //   // borderWidth: 1,
  //   // borderStyle: "dashed",
  //   paddingTop: 50,
  // },
  vwContainerLeftTopLayerLeft: {
    width: "50%",
    // backgroundColor: "red",
    // justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingTop: 50,
  },
  vwContainerLeftTopLayerRight: {
    width: "50%",
    // backgroundColor: "green",
    alignItems: "flex-start",
    paddingBottom: 50,
  },
  vwContainerLeftBottom: {
    // height: 100,
    // backgroundColor: "purple",
    paddingBottom: 20,
    paddingLeft: 40,
  },
  // -----
  // MIDDLE
  // -----
  containerMiddle: {
    backgroundColor: "yellow",
    flex: 1,
  },

  // -----
  // RIGHT
  // -----
  containerRight: {
    backgroundColor: "orange",
    flex: 1,
  },
});

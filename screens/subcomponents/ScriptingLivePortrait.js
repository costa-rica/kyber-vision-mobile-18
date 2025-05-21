import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  ScrollView,
} from "react-native";
import TemplateView from "./TemplateView";
import { useState } from "react";
import { FontAwesome } from "@expo/vector-icons"; // near top of file
import ButtonKvImage from "./buttons/ButtonKvImage";
import ButtonKv from "./buttons/ButtonKv";
import { loginUser } from "../../reducers/user";
import {
  GestureHandlerRootView,
  GestureDetector,
  // Gesture,
} from "react-native-gesture-handler";
import SvbVolleyballCourt from "../../assets/images/volleyballCourt.svg";
import BtnReception from "../../assets/images/buttons/btnReception.svg";
import BtnService from "../../assets/images/buttons/btnService.svg";
import BtnFavorite from "../../assets/images/buttons/btnFavorite.svg";
import BtnWin from "../../assets/images/buttons/btnWin.svg";
import BtnLose from "../../assets/images/buttons/btnLose.svg";
import { useSelector, useDispatch } from "react-redux";
import {
  updateScriptLivePortraitVwVolleyballCourtCoords,
  replaceScriptActionArray,
} from "../../reducers/script";

export default function ScriptingLivePortrait(props) {
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();

  const handleVwVolleyballCourtAndGestSuperLayout = (event) => {
    console.log("handleVwVolleyballCourtAndGestSuperLayout");
    console.log(event.nativeEvent.layout);
    const { width, height, x, y } = event.nativeEvent.layout;

    dispatch(
      updateScriptLivePortraitVwVolleyballCourtCoords({ x, y, width, height })
    );
  };

  // -----------------
  //  Styles
  // -----------------

  const stylesBtnTop = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    zIndex: 2,
  };
  const stylesBtnBottom = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
    zIndex: 2,
    // backgroundColor: "white",
  };
  const stylesBtnFavorite = {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
  };
  const stylesVwGroupButtonsDiagonalLine = {
    position: "absolute",
    width: Dimensions.get("window").width * 0.21, // roughly 0.15 * √2 for diagonal spacing
    height: 8,
    backgroundColor: "#806181",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -0.5 * Dimensions.get("window").width * 0.21 },
      { translateY: -5 },
      { rotate: "-45deg" },
    ],
    zIndex: 0,
  };
  const stylesVwGroupButtonsCircle = {
    borderRadius: (Dimensions.get("window").width * 0.2) / 2,
    backgroundColor: "gray",
    width: Dimensions.get("window").width * 0.2,
    height: Dimensions.get("window").width * 0.2,
    top: Dimensions.get("window").width * 0.05,
    left:
      (Dimensions.get("window").width * 0.4) / 2 -
      (Dimensions.get("window").width * 0.2) / 2,
    position: "absolute",
    backgroundColor: "#806181",
    opacity: 0.5,
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerTop}>
        <Text>ScriptingLivePortrait</Text>
        <Text>{props.orientation}</Text>
        <View style={styles.testActionsContainer}>
          <ScrollView>
            {scriptReducer.actionsArray.map((action, index) => (
              <View key={index}>
                <Text>
                  Id: {action.id}, Type: {action.type}, Subtype:{" "}
                  {action.subtype}, Quality: {action.quality}, PlayerId:{" "}
                  {action.playerId}
                </Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>

      <View
        style={styles.containerMiddle}
        onLayout={(event) => handleVwVolleyballCourtAndGestSuperLayout(event)}
      >
        <GestureHandlerRootView
          // onLayout={(event) => handleGestureHandlerRootViewLayout(event)}
          style={{}} //This is key to make sure the flex properties will trickle down to <Image>
        >
          <GestureDetector gesture={props.combinedGestures}>
            <View style={styles.containerMiddleSub}>
              <Text>ScriptingLivePortrait</Text>
              <Text>{props.orientation}</Text>
              <SvbVolleyballCourt />
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.vwRallyButtonsGroup}>
          <View style={styles.vwGroupButtons}>
            <View style={stylesVwGroupButtonsCircle} />
            <View style={stylesVwGroupButtonsDiagonalLine} />
            <ButtonKvImage
              onPress={() => {
                console.log("pressed service");
                dispatch(replaceScriptActionArray({ actionsArray: [] }));
              }}
              style={styles.btnRallyGroupBottom}
            >
              <BtnService style={stylesBtnBottom} />
            </ButtonKvImage>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed reception");
              }}
              style={styles.btnRallyGroupTop}
            >
              <BtnReception style={stylesBtnTop} />
            </ButtonKvImage>
          </View>
          <View style={styles.vwButtonFavorite}>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed favorite");
              }}
              style={{ margin: 0, padding: 0 }}
            >
              <BtnFavorite style={stylesBtnFavorite} />
            </ButtonKvImage>
          </View>
          <View style={styles.vwGroupButtons}>
            <View style={stylesVwGroupButtonsCircle} />
            <View style={stylesVwGroupButtonsDiagonalLine} />
            <ButtonKvImage
              onPress={() => {
                console.log("pressed win");
              }}
              style={styles.btnRallyGroupBottom}
            >
              <BtnWin style={stylesBtnBottom} />
            </ButtonKvImage>

            <ButtonKvImage
              onPress={() => {
                console.log("pressed lose");
              }}
              style={styles.btnRallyGroupTop}
            >
              <BtnLose style={stylesBtnTop} />
            </ButtonKvImage>
          </View>
        </View>
        <View style={styles.vwSendScriptGroup}>
          <View style={styles.vwScriptDetails}>
            <Text style={{ color: "#806181" }}>
              {" "}
              {scriptReducer.actionsArray.length} actions recorded
            </Text>
            <Text style={{ fontStyle: "italic", color: "#806181" }}>
              {" "}
              {
                scriptReducer.actionsArray.filter((action) => action.favorite)
                  .length
              }{" "}
              favorites
            </Text>
          </View>
          <View style={styles.vwSendScriptButton}>
            <ButtonKv
              onPress={() => {
                console.log("pressed send script");
              }}
              style={{
                backgroundColor: "#806181",
                width: "100%",
                // padding: 15,
              }}
            >
              Send script to PAVVB
            </ButtonKv>
          </View>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "green",
    width: "100%",
  },

  // ------------
  // TOP Container
  // ------------

  containerTop: {
    height: "20%",
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  testActionsContainer: {
    height: 80,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  // ------------
  // MIDDLE Container
  // ------------

  containerMiddle: {},
  containerMiddleSub: {
    // height: "100%",
    // width: "100%",
    backgroundColor: "#F0EAF9",
    alignItems: "center",
  },

  // ------------
  // BOTTOM Container
  // ------------

  containerBottom: {
    width: "100%",
  },
  vwRallyButtonsGroup: {
    flexDirection: "row",
  },
  vwGroupButtons: {
    position: "relative",
    flexDirection: "row",
    width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

  btnRallyGroupBottom: {
    paddingHorizontal: 0,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    paddingTop: 50,
  },
  vwGroupButtonsLine: {
    width: Dimensions.get("window").width * 0.4,
    height: 5,
    backgroundColor: "#806181",
    position: "absolute",
    top: Dimensions.get("window").width * 0.2 - 20,
    left: 0,
    // rotate
    transform: [{ rotate: "-45deg" }],
    zIndex: 0,
  },
  btnRallyGroupTop: {
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  btnReception: {
    width: 50,
    height: 50,
  },
  vwButtonFavorite: {
    borderRadius: (Dimensions.get("window").width * 0.2) / 2,
    backgroundColor: "white",
    marginTop: -35,
    paddingTop: 5,
    width: Dimensions.get("window").width * 0.2,
    alignItems: "center",

    // height: Dimensions.get("window").width * 0.15,
  },
  btnFavorite: {
    // marginTop: -50,
  },
  vwSendScriptGroup: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
});

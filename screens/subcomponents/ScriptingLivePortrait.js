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
            <View style={styles.containerSub}>
              <Text>ScriptingLivePortrait</Text>
              <Text>{props.orientation}</Text>
              <SvbVolleyballCourt />
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.vwRallyButtons}>
          <View style={styles.vwGroupButtons}>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed service");
                dispatch(replaceScriptActionArray({ actionsArray: [] }));
              }}
              style={styles.btnBottom}
            >
              <BtnService />
            </ButtonKvImage>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed reception");
              }}
              style={styles.btnTop}
            >
              <BtnReception />
            </ButtonKvImage>
          </View>
          <View style={styles.vwButtonFavorite}></View>
          <View style={styles.vwGroupButtons}>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed win");
              }}
              style={styles.btnBottom}
            >
              <BtnService />
            </ButtonKvImage>
            <ButtonKvImage
              onPress={() => {
                console.log("pressed reception");
              }}
              style={styles.btnTop}
            >
              <BtnReception />
            </ButtonKvImage>
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

  containerMiddle: {
    height: "30%",
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  // containerSub: {
  //   // height: "100%",
  //   // backgroundColor: "yellow",
  //   width: "100%",
  // },

  // ------------
  // BOTTOM Container
  // ------------

  containerBottom: {
    // flex: 1,
    // height: "10%",
    // backgroundColor: "yellow",
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwRallyButtons: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwGroupButtons: {
    flexDirection: "row",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  btnBottom: {
    // paddingTop: 50,
    paddingHorizontal: 0,
    // marginHorizontal: -15,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  btnTop: {
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  vwButtonFavorite: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "orange",
  },
});

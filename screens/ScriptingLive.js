import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ScriptingPortrait from "./subcomponents/ScriptingLivePortrait";
import ScriptingLandscape from "./subcomponents/ScriptingLiveLandscape";
import { Gesture } from "react-native-gesture-handler";
import { useState } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { replaceScriptActionArray } from "../reducers/script";

export default function ScriptingLive({ navigation }) {
  const [tapIsActive, setTapIsActive] = useState(true);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });
  const [circleSize, setCircleSize] = useState({ width: 50, height: 50 });
  const topChildren = (
    <View>
      <Text style={styles.txtTopChildren}>Live Scripting </Text>
    </View>
  );
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();

  // -------------
  // Orientation Stuff
  // -------------
  // orientation
  const [orientation, setOrientation] = useState("portrait");

  useEffect(() => {
    // console.log("- Position useEffect");
    ScreenOrientation.unlockAsync();
    checkOrientation();
    const subscriptionScreenOrientation =
      ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

    return () => {
      subscriptionScreenOrientation.remove();
      ScreenOrientation.lockAsync();
    };
  });

  const checkOrientation = async () => {
    // console.log("in checkOrientation");
    const orientationObject = await ScreenOrientation.getOrientationAsync();
    // console.log(`orientation is ${orientationObject}`);
    if (
      orientationObject.orientationInfo.orientation == 4 ||
      orientationObject.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
    } else {
      setOrientation("portrait");
    }
  };
  const handleOrientationChange = async (orientationObject) => {
    if (
      orientationObject.orientationInfo.orientation == 4 ||
      orientationObject.orientationInfo.orientation == 3
    ) {
      setOrientation("landscape");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
      );
    } else {
      setOrientation("portrait");
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      );
    }
  };

  // -------------
  // Gesture Stuff
  // -------------
  const gestureTapBegin = Gesture.Tap().onBegin((event) => {
    if (tapIsActive) {
      const timestamp = new Date().toISOString();
      const { x, y, absoluteX, absoluteY } = event;
      if (orientation == "portrait") {
        calculateCenterCircle(
          x,
          y + scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y
        );
      } else {
        calculateCenterCircle(x, y);
      }
      // calculateCenterCircle(absoluteX, absoluteY);
    }

    addNewActionToScriptReducersActionsArrayNoWheel();
  });

  const stylesCircle = {
    top: circlePosition.y,
    left: circlePosition.x,
    width: circleSize.width,
    height: circleSize.height,
    borderRadius: 25,
    backgroundColor: "orange",
    position: "absolute",
  };

  const combinedGestures = Gesture.Simultaneous(gestureTapBegin);

  const calculateCenterCircle = (x, y) => {
    const centerX = x - circleSize.width / 2;
    const centerY = y - circleSize.height / 2;

    console.log(
      `scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y: ${scriptReducer.scriptLivePortraitVwVolleyballCourtCoords.y}`
    );

    setCirclePosition({
      x: centerX,
      y: centerY,
      // y: centerY,
    });
  };

  // -----------------
  //  Add Action
  // -----------------
  const addNewActionToScriptReducersActionsArrayNoWheel = () => {
    // console.log(`triggered addNewActionToScriptReducersActionsArrayNoWheel -`);
    const newActionObj = {
      dateScripted: new Date().toISOString(), // Convert to ISO string
      timestamp: new Date().toISOString(),
      type: scriptReducer.typesArray[scriptReducer.typesArray.length - 1],
      subtype:
        scriptReducer.subtypesArray[scriptReducer.subtypesArray.length - 1],
      quality: scriptReducer.qualityArray[2],
      playerId: scriptReducer.scriptingForPlayerObject.id,
      setNumber: 0,
      scoreTeamAnalyzed: 0,
      scoreTeamOpponent: 0,
      rotation: scriptReducer.rotationArray[0],
      opponentServed: false,
    };

    // create new array with
    let newScriptReducerActionArray = [
      ...scriptReducer.actionsArray,
      newActionObj,
    ];

    // console.log(`newActionObj: ${JSON.stringify(newActionObj)}`);

    // sort
    newScriptReducerActionArray.sort((a, b) => a.timeStamp - b.timeStamp);
    dispatch(
      replaceScriptActionArray({ actionsArray: newScriptReducerActionArray })
    );

    // if (scriptReducerActionArray.length > 0) {
    //   setScriptReducerActionArray([...scriptReducerActionArray, newActionObj]);
    // } else {
    //   setScriptReducerActionArray([newActionObj]);
    // }

    //setPadVisible(false);
    //setTapIsActive(true);
    // setSwipePadServeIsActive(false);
    // setSwipePadReceptionIsActive(false);
    // console.log(
    //   "addNewActionToScriptReducersActionsArrayNoWheel: Working (end of function)"
    // );
  };

  return orientation == "portrait" ? (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      <ScriptingPortrait
        combinedGestures={combinedGestures}
        orientation={orientation}
      />
      <View style={stylesCircle} />
    </TemplateViewWithTopChildrenSmall>
  ) : (
    <View>
      <ScriptingLandscape
        combinedGestures={combinedGestures}
        orientation={orientation}
      />
      <View style={stylesCircle} />
    </View>
  );
}

const styles = StyleSheet.create({
  txtTopChildren: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
});

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
import {
  replaceScriptMatchActionsArray,
  updatePlayersArray,
  setScriptingForPlayerObject,
} from "../reducers/script";

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
  const [setScores, setSetScores] = useState({
    teamAnalyzed: 0,
    teamOpponent: 0,
  });
  const [matchSetsWon, setMatchSetsWon] = useState({
    teamAnalyzed: 0,
    teamOpponent: 0,
  });
  // Last Action
  const [lastActionQuality, setLastActionQuality] = useState("?");
  const [lastActionPosition, setLastActionPosition] = useState("?");
  const [lastActionPlayer, setLastActionPlayer] = useState(
    scriptReducer.playersArray.find((p) => p.selected)
  );
  const [lastActionType, setLastActionType] = useState("?");
  const [lastActionSubtype, setLastActionSubtype] = useState("?");
  // Dropdowns Visibility
  const [
    lastActionDropDownIsVisibleQuality,
    setLastActionDropDownIsVisibleQuality,
  ] = useState(false);
  const [
    lastActionDropDownIsVisiblePosition,
    setLastActionDropDownIsVisiblePosition,
  ] = useState(false);
  const [
    lastActionDropDownIsVisiblePlayer,
    setLastActionDropDownIsVisiblePlayer,
  ] = useState(false);
  const [lastActionDropDownIsVisibleType, setLastActionDropDownIsVisibleType] =
    useState(false);
  const [
    lastActionDropDownIsVisibleSubtype,
    setLastActionDropDownIsVisibleSubtype,
  ] = useState(false);
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

    setCirclePosition({
      x: centerX,
      y: centerY,
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
      favorite: false,
    };

    // create new array with
    // let newScriptReducerActionArray = [
    let newScriptReducerMatchActionsArray = [
      ...scriptReducer.matchActionsArray,
      newActionObj,
    ];

    // console.log(`newActionObj: ${JSON.stringify(newActionObj)}`);

    // sort
    newScriptReducerMatchActionsArray.sort((a, b) => a.timeStamp - b.timeStamp);
    dispatch(
      replaceScriptMatchActionsArray({
        matchActionsArray: newScriptReducerMatchActionsArray,
      })
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

  // -----------------
  //  Last Action - Modify
  // -----------------
  const handleLastActionPlayerPress = (player) => {
    console.log(`- selected player: ${player.firstName}`);
    // const handleSelectPlayer = () => {
    const tempArray = scriptReducer.playersArray.map((player) => {
      if (player.id === player.id) {
        // setDisplayWarning(false);
        return {
          ...player,
          selected: !player.selected,
        };
      }
      return { ...player, selected: false };
    });
    dispatch(updatePlayersArray(tempArray));
    dispatch(setScriptingForPlayerObject(player));
    console.log(`- selected player [2]: ${player.firstName}`);
    setLastActionPlayer(player);
  };

  // -----------------
  //  Set Circle
  // -----------------
  // Expects team: "analyzed" | "opponent"
  const handleSetCirclePress = (team, setIndex) => {
    if (team === "analyzed") {
      if (matchSetsWon.teamAnalyzed === setIndex) {
        setMatchSetsWon({
          teamAnalyzed: setIndex - 1,
          teamOpponent: matchSetsWon.teamOpponent,
        });
      } else if (matchSetsWon.teamAnalyzed + 1 === setIndex) {
        setMatchSetsWon({
          teamAnalyzed: setIndex,
          teamOpponent: matchSetsWon.teamOpponent,
        });
      }
    } else {
      if (matchSetsWon.teamOpponent === setIndex) {
        setMatchSetsWon({
          teamAnalyzed: matchSetsWon.teamAnalyzed,
          teamOpponent: setIndex - 1,
        });
      } else if (matchSetsWon.teamOpponent + 1 === setIndex) {
        setMatchSetsWon({
          teamAnalyzed: matchSetsWon.teamAnalyzed,
          teamOpponent: setIndex,
        });
      }
    }
  };

  const handleSetScorePress = (team, scoreAdjust) => {
    // scores can never go below 0
    if (team === "analyzed") {
      if (setScores.teamAnalyzed + scoreAdjust < 0) {
        return;
      }
      setSetScores({
        teamAnalyzed: setScores.teamAnalyzed + scoreAdjust,
        teamOpponent: setScores.teamOpponent,
      });
    } else {
      if (setScores.teamOpponent + scoreAdjust < 0) {
        return;
      }
      setSetScores({
        teamAnalyzed: setScores.teamAnalyzed,
        teamOpponent: setScores.teamOpponent + scoreAdjust,
      });
    }
  };

  return orientation == "portrait" ? (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
    >
      <ScriptingPortrait
        combinedGestures={combinedGestures}
        orientation={orientation}
        setScores={setScores}
        matchSetsWon={matchSetsWon}
        handleSetCirclePress={handleSetCirclePress}
        handleSetScorePress={handleSetScorePress}
        // ----------- Dropdowns Value -----------
        lastActionQuality={lastActionQuality}
        setLastActionQuality={setLastActionQuality}
        lastActionPosition={lastActionPosition}
        setLastActionPosition={setLastActionPosition}
        lastActionPlayer={lastActionPlayer}
        // setLastActionPlayer={setLastActionPlayer}
        handleLastActionPlayerPress={handleLastActionPlayerPress}
        lastActionType={lastActionType}
        setLastActionType={setLastActionType}
        lastActionSubtype={lastActionSubtype}
        setLastActionSubtype={setLastActionSubtype}
        // --------- Dropdowns Toggles -----------

        // Quality
        lastActionDropDownIsVisibleQuality={lastActionDropDownIsVisibleQuality}
        setLastActionDropDownIsVisibleQuality={
          setLastActionDropDownIsVisibleQuality
        }
        // Position
        lastActionDropDownIsVisiblePosition={
          lastActionDropDownIsVisiblePosition
        }
        setLastActionDropDownIsVisiblePosition={
          setLastActionDropDownIsVisiblePosition
        }
        // Player
        lastActionDropDownIsVisiblePlayer={lastActionDropDownIsVisiblePlayer}
        setLastActionDropDownIsVisiblePlayer={
          setLastActionDropDownIsVisiblePlayer
        }
        // Type
        lastActionDropDownIsVisibleType={lastActionDropDownIsVisibleType}
        setLastActionDropDownIsVisibleType={setLastActionDropDownIsVisibleType}
        // Subtype
        lastActionDropDownIsVisibleSubtype={lastActionDropDownIsVisibleSubtype}
        setLastActionDropDownIsVisibleSubtype={
          setLastActionDropDownIsVisibleSubtype
        }
      />
      {circlePosition.y > 0 && <View style={stylesCircle} />}
    </TemplateViewWithTopChildrenSmall>
  ) : (
    <View>
      <ScriptingLandscape
        combinedGestures={combinedGestures}
        orientation={orientation}
        setScores={setScores}
        matchSetsWon={matchSetsWon}
        handleSetCirclePress={handleSetCirclePress}
        handleSetScorePress={handleSetScorePress}
        lastActionQuality={lastActionQuality}
        setLastActionQuality={setLastActionQuality}
        lastActionPosition={lastActionPosition}
        setLastActionPosition={setLastActionPosition}
        lastActionPlayer={lastActionPlayer}
        setLastActionPlayer={setLastActionPlayer}
        lastActionType={lastActionType}
        setLastActionType={setLastActionType}
        lastActionSubtype={lastActionSubtype}
        setLastActionSubtype={setLastActionSubtype}
        lastActionDropDownIsVisible={lastActionDropDownIsVisible}
        setLastActionDropDownIsVisible={setLastActionDropDownIsVisible}
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

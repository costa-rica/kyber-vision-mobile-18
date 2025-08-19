import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
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
import SvbVolleyballCourt from "../../assets/images/volleyballCourt.svg";
import ButtonKvStd from "./buttons/ButtonKvStd";
import BtnWin from "../../assets/images/buttons/btnWin.svg";
import BtnLose from "../../assets/images/buttons/btnLose.svg";

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
  /// -- Style params for Button Groups
  // const CIRCLE_SIZE = 100;
  const CIRCLE_SIZE = Dimensions.get("window").width * 0.1;
  const DIAGONAL_LEN = Math.ceil(CIRCLE_SIZE * Math.SQRT2); // ~141
  const LINE_THICKNESS = 8;

  const stylesBtnTop = {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
  };

  const stylesBtnBottom = {
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
  };

  // -------- Styles RIGHT --------
  const stylesVwGroupButtons = {
    // position: "relative",
    // flexDirection: "row",
    // width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 5,
    // borderStyle: "dashed",
  };

  const stylesVwGroupButtonsCircle = {
    borderRadius: (Dimensions.get("window").width * 0.1) / 2,
    backgroundColor: "gray",
    width: Dimensions.get("window").width * 0.1,
    height: Dimensions.get("window").width * 0.1,
    // top: Dimensions.get("window").width * 0.05,
    // left:
    //   (Dimensions.get("window").width * 0.4) / 2 -
    //   (Dimensions.get("window").width * 0.2) / 2,
    // position: "absolute",
    backgroundColor: "#806181",
    opacity: 0.25,
  };
  // const stylesVwGroupButtonsDiagonalLine = {
  //   // position: "absolute",
  //   width: Dimensions.get("window").width * 0.21, // roughly 0.15 * √2 for diagonal spacing
  //   height: 8,
  //   backgroundColor: "#806181",
  //   // top: "50%",
  //   // left: "50%",
  //   transform: [
  //     { translateX: -0.5 * Dimensions.get("window").width * 0.21 },
  //     { translateY: -5 },
  //     { rotate: "-45deg" },
  //   ],
  //   // zIndex: 0,
  // };

  const stylesVwGroupButtonsDiagonalLine = {
    width: DIAGONAL_LEN, // long enough to cross the circle’s corners
    height: LINE_THICKNESS, // line thickness
    borderRadius: LINE_THICKNESS / 2, // rounded ends (optional)
    backgroundColor: "#806181",
    opacity: 0.8,
    transform: [{ rotate: "-45deg" }], // top-right → bottom-left
    // zIndex: 1,
  };
  const stylesBtnKvImageTopRight = {
    marginTop: -CIRCLE_SIZE / 2,
    marginLeft: CIRCLE_SIZE / 2,
  };
  const stylesBtnKvImageBottomLeft = {
    marginBottom: -CIRCLE_SIZE / 2,
    marginRight: CIRCLE_SIZE / 2,
  };
  return (
    <TemplateViewWithTopChildrenSmallLandscape
      navigation={props.navigation}
      topChildren={topChildren}
      topHeight={50}
      onBackPress={handleBackPress}
    >
      <View style={styles.container}>
        {/* 

LEFT 

*/}
        <View style={styles.containerLeft}>
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
        <GestureHandlerRootView style={[styles.column]}>
          {/* <GestureHandlerRootView> */}
          <GestureDetector gesture={props.combinedGestures}>
            {/* <View style={styles.vwMain}>
              <Text>Scripting - Live - Landscape</Text>
              <Text>{props.orientation}</Text>
            </View> */}
            <View style={styles.containerMiddle}>
              <View style={styles.containerMiddleTop}>
                <View style={styles.vwGroupScoreAndSets}>
                  <View style={styles.vwGroupSetSuper}>
                    <View style={styles.vwGroupSet}>
                      {Array.from({ length: 3 }).map((_, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            props.handleSetCirclePress("analyzed", index + 1)
                          }
                          style={[
                            styles.touchOpSetsCircle,
                            props.matchSetsWon.teamAnalyzed > index &&
                              styles.touchOpSetsCircleFilled,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                  <View style={styles.vwGroupScore}>
                    <View style={styles.vwRowButtonsAdjustScore}>
                      <ButtonKvStd
                        onPress={() => {
                          props.handleSetScorePress("analyzed", 1);
                        }}
                        style={styles.btnPlus}
                      >
                        +
                      </ButtonKvStd>
                      <ButtonKvStd
                        onPress={() => {
                          props.handleSetScorePress("opponent", 1);
                        }}
                        style={styles.btnPlus}
                      >
                        +
                      </ButtonKvStd>
                    </View>
                    <View style={styles.vwRowScore}>
                      <Text style={styles.txtRowScore}>
                        {props.setScores.teamAnalyzed}
                      </Text>
                      <Text style={styles.txtRowScore}>-</Text>
                      <Text style={styles.txtRowScore}>
                        {props.setScores.teamOpponent}
                      </Text>
                    </View>
                    <View style={styles.vwRowButtonsAdjustScore}>
                      <ButtonKvStd
                        onPress={() => {
                          props.handleSetScorePress("analyzed", -1);
                        }}
                        style={styles.btnPlus}
                      >
                        -
                      </ButtonKvStd>
                      <ButtonKvStd
                        onPress={() => {
                          props.handleSetScorePress("opponent", -1);
                        }}
                        style={styles.btnPlus}
                      >
                        -
                      </ButtonKvStd>
                    </View>
                  </View>
                  <View style={styles.vwGroupSetSuper}>
                    <View style={styles.vwGroupSet}>
                      {/* <Text>vwGroupSet</Text> */}
                      {/* <View style={styles.vwSetCircles}> */}
                      {Array.from({ length: 3 }).map((_, index) => (
                        <TouchableOpacity
                          key={index}
                          onPress={() =>
                            props.handleSetCirclePress("opponent", index + 1)
                          }
                          style={[
                            styles.touchOpSetsCircle,
                            props.matchSetsWon.teamOpponent > index &&
                              styles.touchOpSetsCircleFilled,
                          ]}
                        />
                      ))}
                    </View>
                  </View>
                </View>
              </View>
              <View style={styles.containerMiddleBottom}>
                <View style={styles.vwPlayer}>
                  <View style={styles.vwPlayerLeft}>
                    <Text style={styles.txtShirtNumber}>
                      {/* {props.lastActionPlayer.shirtNumber} */}
                      {scriptReducer.scriptingForPlayerObject?.shirtNumber}
                    </Text>
                  </View>
                  <View style={styles.vwPlayerRight}>
                    <Text style={styles.txtPlayerName}>
                      {scriptReducer.scriptingForPlayerObject?.firstName}
                    </Text>
                    <Text style={styles.txtPlayerName}>
                      {scriptReducer.scriptingForPlayerObject?.lastName}
                    </Text>
                  </View>
                </View>

                <SvbVolleyballCourt />
              </View>
            </View>
          </GestureDetector>
        </GestureHandlerRootView>
        {/* 
        
        RIGHT COLUMN: W / L buttons
        
        */}
        {/* <View style={[styles.column]}> */}
        <View style={styles.containerRight}>
          {/* <View style={styles.vwGroupButtons}> */}
          <View style={stylesVwGroupButtons}>
            <View style={stylesVwGroupButtonsCircle} />
            <View style={styles.vwLayerAndCentered}>
              <View style={stylesVwGroupButtonsDiagonalLine} />
            </View>
            <View style={[styles.vwLayerAndCentered, { flexDirection: "row" }]}>
              <View style={styles.vwButtonKvImageBottomAndLeft}>
                <ButtonKvImage
                  onPress={() => {
                    console.log("pressed lose");
                    props.handleSetScorePress("opponent", 1);
                  }}
                  // style={styles.btnRallyGroupTop}
                  style={stylesBtnKvImageBottomLeft}
                >
                  <BtnLose style={stylesBtnTop} />
                </ButtonKvImage>
              </View>
              <View style={styles.vwButtonKvImageTopAndRight}>
                <ButtonKvImage
                  onPress={() => {
                    console.log("pressed win");
                    props.handleSetScorePress("analyzed", 1);
                  }}
                  // style={styles.btnRallyGroupBottom}
                  // style={styles.btnKvImageTopRight}
                  style={stylesBtnKvImageTopRight}
                >
                  <BtnWin style={stylesBtnBottom} />
                </ButtonKvImage>
              </View>
            </View>
          </View>
        </View>
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
  vwLayerAndCentered: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  vwButtonKvImageTopAndRight: {
    width: "50%",
    // backgroundColor: "red",
  },
  vwButtonKvImageBottomAndLeft: {
    width: "50%",
    // backgroundColor: "green",
  },
  btnKvImageTopRight: {},
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
    // flex: 1,
    // height: 300,
    width: "30%",
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
    // backgroundColor: "yellow",
    flex: 1,
  },

  containerMiddleTop: {
    // flex: 1,
    // backgroundColor: "#F0EAF9",
    // alignItems: "center",
    // padding: 15,
    // gap: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
  },

  vwGroupScoreAndSets: {
    flexDirection: "row",
    // width: Dimensions.get("window").width,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    paddingVertical: 10,
  },
  vwGroupSet: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#806181",
    padding: 5,
    borderRadius: 15,
    gap: 5,
  },
  touchOpSetsCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "white",
    marginHorizontal: 1,
    backgroundColor: "white",
  },
  touchOpSetsCircleFilled: {
    backgroundColor: "#806181",
  },
  vwGroupScore: {
    // width: Dimensions.get("window").width * 0.4,
    justifyContent: "center",
    alignItems: "center",
    gap: 3,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwRowButtonsAdjustScore: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: "20%",
  },
  btnPlus: {
    padding: 0,
    margin: 0,
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#806181",
    color: "white",
    width: 35,
    borderRadius: 10,
    height: null,
    fontSize: null,
    opacity: 0.5,
  },
  vwRowScore: {
    backgroundColor: "#806181",
    borderRadius: 20,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    gap: "15%",
  },
  txtRowScore: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  // -----
  // MIDDLE BOTTOM
  // -----
  containerMiddleBottom: {
    flex: 1,
    backgroundColor: "#F0EAF9",
    alignItems: "center",
    // padding: 15,
    gap: 20,
    borderWidth: 1,
    borderColor: "gray",
    borderStyle: "dashed",
  },
  vwPlayer: {
    borderWidth: 1,
    borderColor: "#6E4C84",
    borderRadius: 30,
    backgroundColor: "white",
    flexDirection: "row",
    gap: 10,
    padding: 5,
    width: Dimensions.get("window").width * 0.3,
  },
  vwPlayerLeft: {
    justifyContent: "center",
    backgroundColor: "#806181",
    borderRadius: 30,
  },
  txtShirtNumber: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
    borderRadius: 7,
    height: 15,
    width: 20,
    textAlign: "center",
  },
  vwPlayerRight: {
    alignItems: "center",
    justifyContent: "center",
  },
  txtPlayerName: {
    textAlign: "center",
    color: "#6E4C84",
    fontSize: 11,
  },

  // -----
  // RIGHT
  // -----
  containerRight: {
    // backgroundColor: "orange",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  // vwGroupButtonsLine: {
  //   width: Dimensions.get("window").width * 0.4,
  //   height: 5,
  //   backgroundColor: "#806181",
  //   position: "absolute",
  //   top: Dimensions.get("window").width * 0.2 - 20,
  //   left: 0,
  //   // rotate
  //   transform: [{ rotate: "-45deg" }],
  //   zIndex: 0,
  // },
});

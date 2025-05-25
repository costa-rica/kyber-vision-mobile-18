import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ButtonKvStd from "./subcomponents/buttons/ButtonKvStd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateTribeArray } from "../reducers/user";
import {
  updateReviewReducerVideoObject,
  createReviewActionsArray,
  createReviewActionsArrayUniquePlayersNamesAndObjects,
} from "../reducers/review";

export default function ReviewSelectionScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [displayTribeList, setDisplayTribeList] = useState(false);
  const dispatch = useDispatch();
  const [videoArray, setVideoArray] = useState([]);

  const handleTribeSelect = (selectedId) => {
    const updatedArray = userReducer.tribeArray.map((tribe) => ({
      ...tribe,
      selected: tribe.id === selectedId,
    }));
    dispatch(updateTribeArray(updatedArray));
    setDisplayTribeList(false);
  };

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwCapsuleSuper}>
        <View
          style={displayTribeList ? styles.vwCapsuleExpanded : styles.vwCapsule}
        >
          <View style={[styles.vwLeftCapsule]}>
            {displayTribeList ? (
              // <View style={styles.vwDropdownList}>
              <View>
                {userReducer.tribeArray.map((tribe) => (
                  <TouchableOpacity
                    key={tribe.id}
                    onPress={() => handleTribeSelect(tribe.id)}
                    style={[styles.vwTeamRow]}
                  >
                    <Text
                      style={[
                        styles.txtDropdownTopChildTeamName,
                        tribe.selected && { fontWeight: "bold" },
                      ]}
                    >
                      {tribe.teamName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.txtTopChildSelectedTribeName}>
                {userReducer.tribeArray.find((tribe) => tribe.selected)
                  ?.teamName || "No tribe selected"}
              </Text>
            )}
          </View>
          <View style={styles.vwRightCapsule}>
            <TouchableOpacity
              onPress={() => setDisplayTribeList(!displayTribeList)}
              style={styles.btnSelectTribe}
            >
              <Image
                source={
                  displayTribeList
                    ? require("../assets/images/navigationAndSmall/btnBackArrow.png")
                    : require("../assets/images/navigationAndSmall/btnDownArrow.png")
                }
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  const fetchVideoArray = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/videos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userReducer.token}`,
      },
    });

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      console.log(`response ok`);
      const tempArray = resJson.videosArray.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      console.log(`Count of videos: ${tempArray.length}`);
      // console.log(`tempArray: ${JSON.stringify(tempArray[0], null, 2)}`);
      setVideoArray(tempArray);
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  const handleVideoSelect = (videoObject) => {
    dispatch(updateReviewReducerVideoObject(videoObject));
    fetchActionsForMatch(videoObject.matchId);
    navigation.navigate("ReviewVideo");
  };

  useEffect(() => {
    fetchVideoArray();
  }, []);

  // fetch Actions for Match
  const fetchActionsForMatch = async (matchId) => {
    console.log("in fetchActionsForMatch for matchId: ", matchId);
    try {
      console.log(`Fetching actions for match: ${matchId}`);
      console.log(
        `${process.env.EXPO_PUBLIC_API_URL}/matches/${matchId}/actions`
      );
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/matches/${matchId}/actions`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`,
          },
        }
      );
      if (response.status !== 200) {
        console.log(`There was a server error: ${response.status}`);
        return;
      }
      let resJson = null;
      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        resJson = await response.json();
      }
      console.log(`actionsArray.length: ${resJson.actionsArray.length}`);
      console.log(
        `playerNamesArray.length: ${resJson.playerNamesArray.length}`
      );
      console.log(
        `playerDbObjectsArray.length: ${resJson.playerDbObjectsArray.length}`
      );
      //   console.log(
      //     `actionsArray[0]: ${JSON.stringify(resJson.actionsArray[0])}`
      //   );
      let tempCleanActionsArray = [];
      for (const elem of resJson.actionsArray) {
        // console.log(elem.id);
        tempCleanActionsArray.push({
          actionsDbTableId: elem.id,
          reviewVideoActionsArrayIndex: elem.reviewVideoActionsArrayIndex,
          playerId: elem.playerId,
          timestamp: elem.timestampFromStartOfVideo,
          type: elem.type,
          subtype: elem.subtype,
          quality: elem.quality,
          isDisplayed: true,
          isFavorite: false,
          isPlaying: false,
        });
      }

      dispatch(createReviewActionsArray(tempCleanActionsArray));

      let tempPlayerDbObjectsArray = [];
      //   console.log(
      //     `playerDbObjectsArray: ${JSON.stringify(resJson.playerDbObjectsArray)}`
      //   );
      for (const elem of resJson.playerDbObjectsArray) {
        tempPlayerDbObjectsArray.push({
          ...elem,
          isDisplayed: true,
        });
      }
      dispatch(
        createReviewActionsArrayUniquePlayersNamesAndObjects({
          // playerNamesArray: resJson.playerNamesArray,
          playerDbObjectsArray: tempPlayerDbObjectsArray,
        })
      );
      console.log(" --- finished getting ACtions and other stuff ---");
    } catch (error) {
      console.error("Error fetching actions for match:", error);
    }
  };

  const renderVideoItem = ({ item: video }) => (
    <TouchableOpacity
      key={video.id}
      onPress={() => handleVideoSelect(video)}
      style={styles.btnVideo}
    >
      <View style={styles.vwVideoName}>
        <Text style={styles.txtVideoName}>{video.match.teamOneName} vs</Text>
        <Text style={styles.txtVideoName}>{video.match.teamTwoName}</Text>
      </View>
      <View style={styles.vwVideoDate}>
        <Text style={styles.txtVideoDate}>
          {new Date(video.match.matchDate).toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
          })}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      topHeight="20%"
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={styles.txtTitle}>Videos available for review</Text>
          <View style={styles.vwUnderLine} />
        </View>
        <View style={styles.containerMiddle}>
          <FlatList
            data={videoArray}
            renderItem={renderVideoItem}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.scrollViewVideos}
          />
          {/* <ScrollView style={styles.scrollViewVideos}>
            {videoArray.map((video) => (
              <TouchableOpacity
                key={video.id}
                onPress={() => handleVideoSelect(video)}
                style={styles.btnVideo}
              >
                <View style={styles.vwVideoName}>
                  <Text style={styles.txtVideoName}>
                    {video.match.teamOneName} vs
                  </Text>
                  <Text style={styles.txtVideoName}>
                    {video.match.teamTwoName}
                  </Text>
                </View>
                <View style={styles.vwVideoDate}>
                  <Text style={styles.txtVideoDate}>
                    {new Date(video.match.matchDate).toLocaleDateString(
                      "en-GB",
                      {
                        day: "2-digit",
                        month: "short",
                      }
                    )}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView> */}
        </View>
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
  },

  // ----- TOP Childeren -----
  vwTopChildren: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  txtTopChildSelectedTribeName: {
    color: "white",
    fontSize: 20,
  },
  vwCapsuleSuper: {
    position: "relative",
    width: Dimensions.get("window").width * 0.8,
    height: 50,
  },
  vwCapsule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
    backgroundColor: "#806181",
    borderRadius: 10,
    padding: 5,
  },
  vwCapsuleExpanded: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#806181",
    borderRadius: 10,
    padding: 5,
    width: Dimensions.get("window").width * 0.8,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  vwLeftCapsule: {
    width: "80%",
  },
  vwLeftCapsuleExpanded: {
    width: Dimensions.get("window").width * 0.8,
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "#C0A9C0",
  },
  txtDropdownTopChildTeamName: {
    color: "white",
    fontSize: 20,
  },
  vwDropdownList: {
    padding: 5,
    width: "100%",
    height: "100%",
  },
  vwRightCapsule: {
    height: "100%",
  },

  // ------- TOP ---------
  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "green",
  },
  txtTitle: {
    fontSize: 20,
    color: "#A3A3A3",
  },
  vwUnderLine: {
    width: "80%",
    height: 1,
    backgroundColor: "#A3A3A3",
  },

  // ------- MIDDLE ---------
  containerMiddle: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  scrollViewVideos: {
    gap: 10,
    paddingVertical: 10,
  },
  btnVideo: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-end",
    width: Dimensions.get("window").width * 0.8,
    paddingHorizontal: 25,
    height: 50,
    borderRadius: 25,
    borderColor: "#585858",
    borderWidth: 1,
    // justifyContent: "center",
  },
  vwVideoName: {
    justifyContent: "center",
    gap: 2,
    // borderWidth: 1,
    // borderColor: "#585858",
    // borderStyle: "dashed",
  },

  txtVideoName: {
    fontSize: 15,
  },
  vwVideoDate: {
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    // borderColor: "#585858",
    // borderStyle: "dashed",
  },
  txtVideoDate: {
    fontSize: 15,
  },
});

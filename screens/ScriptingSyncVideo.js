import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import {
  GestureHandlerRootView,
  GestureDetector,
} from "react-native-gesture-handler";
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ButtonKvNoDefault from "./subcomponents/buttons/ButtonKvNoDefault";
import Timeline from "./subcomponents/Timeline";

export default function ScriptingSyncVideo({ navigation }) {
  // const reviewReducer = useSelector((state) => state.review);
  const syncReducer = useSelector((state) => state.sync);
  const userReducer = useSelector((state) => state.user);

  const [scriptsArray, setScriptsArray] = useState([]);

  const fetchScriptsArray = async () => {
    console.log("--- > in fetchScriptsArray");
    console.log(
      "syncReducer.syncReducerSelectedVideoObject.session.id: ",
      syncReducer.syncReducerSelectedVideoObject.session.id
    );

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/sessions/${syncReducer.syncReducerSelectedVideoObject.session.id}/script-and-actions-for-syncing`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
      }
    );

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    // console.log("contentType: ", contentType);

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      console.log(`response ok`);
      const tempArray = resJson.formattedScriptsArray.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      console.log(`Count of scripts: ${tempArray.length}`);
      // console.log(`tempArray: ${JSON.stringify(tempArray, null, 2)}`);
      setScriptsArray(tempArray);
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchScriptsArray();
  }, []);

  // -------------
  // YouTube Stuff
  // -------------
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(playing);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    playingRef.current = playing;
  }, [playing]);

  useEffect(() => {
    const interval = setInterval(async () => {
      // console.log("playing: ", playingRef.current);
      if (playerRef.current && playingRef.current) {
        console.log("--> in interval");
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []); // <- note: no dependency on `playing`

  const handleStateChange = (state) => {
    if (state === "playing" && playerRef.current) {
      playerRef.current.getDuration().then((dur) => {
        setDuration(dur);
        console.log("duration: ", dur);
      });
    }
  };

  const togglePlaying = () => {
    setPlaying((prev) => !prev);
  };

  const rewind = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(Math.max(currentTime - 2, 0), true);
    }
  };

  const forward = async () => {
    if (playerRef.current) {
      const currentTime = await playerRef.current.getCurrentTime();
      playerRef.current.seekTo(currentTime + 5, true);
    }
  };

  // --------- YouTube / Video Related ---------

  const handleSelectedAction = (action) => {
    playerRef.current.seekTo(action.timestamp - 1, true);
  };

  // Filtering actions
  const filterActions = (parameterName, object) => {
    if (parameterName === "player") {
      dispatch(filterReviewReducerActionsArrayOnPlayer(object));
    }
  };
  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topHeight="20%"
      topChildren={<Text>ScriptingSyncVideo Screen</Text>}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text>{syncReducer.syncReducerSelectedVideoObject.id}</Text>
          <Text>
            {syncReducer.syncReducerSelectedVideoObject.youTubeVideoId}
          </Text>
        </View>
        <View style={styles.containerMiddle}>
          <View style={styles.videoWrapper}>
            <YoutubePlayer
              ref={playerRef}
              height={220}
              width={Dimensions.get("window").width}
              play={playing}
              videoId={
                syncReducer.syncReducerSelectedVideoObject.youTubeVideoId
              }
              onChangeState={handleStateChange}
              webViewProps={{
                allowsInlineMediaPlayback: true,
              }}
              initialPlayerParams={{
                controls: 0,
                modestbranding: true,
                rel: 0,
                showinfo: false,
              }}
            />
            <View style={styles.coverView} />
          </View>
          <View style={styles.vwButtonContainer}>
            <View style={styles.vwButtonRow}>
              <TouchableOpacity onPress={rewind} style={styles.skipButton}>
                <Text style={styles.playPauseButtonText}>-2s</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={togglePlaying}
                style={styles.playPauseButton}
              >
                <Text style={styles.playPauseButtonText}>
                  {playing ? "Pause" : "Play"}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={forward} style={styles.skipButton}>
                <Text style={styles.playPauseButtonText}>+5s</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: Dimensions.get("window").width,
              height: 15,
              zIndex: 2,
              marginVertical: 10,
            }}
          >
            <GestureHandlerRootView style={styles.gestureViewTimeline}>
              <Timeline
                timelineWidth={Dimensions.get("window").width}
                playerRef={playerRef}
                currentTime={currentTime}
                duration={duration}
                onSeek={(time) => setCurrentTime(time)}
              />
            </GestureHandlerRootView>
          </View>
        </View>
        <View style={styles.containerBottom}>
          <Text>Scripts</Text>
          <FlatList
            data={scriptsArray}
            renderItem={({ item }) => (
              <ButtonKvNoDefault
                onPress={() => handleSelectedScript(item)}
                styleView={styles.vwScriptRow}
              >
                <Text style={styles.scriptText}>
                  Script ID: {item.scriptId}
                </Text>
                <Text style={styles.scriptText}>
                  Action Count: {item.actionsArray.length}
                </Text>
              </ButtonKvNoDefault>
            )}
            keyExtractor={(item) => item.scriptId.toString()}
          />
        </View>
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderWidth: 4,
    borderColor: "gray",
    borderStyle: "dashed",
  },

  // ----- TOP Childeren -----

  // ----- MIDDLE -----
  containerMiddle: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "gray",
    width: Dimensions.get("window").width,
    // borderWidth: 4,
    // borderColor: "gray",
    // borderStyle: "dashed",
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    // height: 220,
  },
  coverView: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    opacity: 0.7,
    zIndex: 2,
  },
  vwButtonContainer: {
    marginTop: 20,
    alignItems: "center",
    // backgroundColor: "white",
  },
  vwButtonRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  playPauseButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  skipButton: {
    backgroundColor: "black",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  playPauseButtonText: {
    color: "white",
    fontSize: 16,
  },

  // -----
  // BOTTOM
  // -----
  containerBottom: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    width: Dimensions.get("window").width,
    // borderWidth: 4,
    // borderColor: "gray",
    // borderStyle: "dashed",
  },
  vwScriptRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
    backgroundColor: "green",
  },
});

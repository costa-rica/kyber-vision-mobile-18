import {
  View,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  Switch,
  ScrollView,
  Alert,
} from "react-native";

import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";

import { useDispatch, useSelector } from "react-redux";
import YoutubePlayer from "react-native-youtube-iframe";
import { useState, useEffect, useRef } from "react";

export default function ReviewVideo({ navigation, route }) {
  const dispatch = useDispatch();
  const reviewReducer = useSelector((state) => state.review);
  const userReducer = useSelector((state) => state.user);

  /// --- YouTube Stuff ---
  const [isGreen, setIsGreen] = useState(false);
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current && playing) {
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [playing]);

  const handleStateChange = (state) => {
    if (state === "playing" && playerRef.current) {
      playerRef.current.getDuration().then((dur) => {
        setDuration(dur);
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

  const handleSelectedAction = (action) => {
    playerRef.current.seekTo(action.timestamp, true);
  };

  return (
    <TemplateViewWithTopChildrenSmall navigation={navigation}>
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text>{reviewReducer.reviewReducerVideoObject.id}</Text>
          <Text>{reviewReducer.reviewReducerVideoObject.youTubeVideoId}</Text>
        </View>
        <View style={styles.containerMiddle}>
          <View style={styles.videoWrapper}>
            <YoutubePlayer
              ref={playerRef}
              height={220}
              width={Dimensions.get("window").width}
              play={playing}
              videoId={reviewReducer.reviewReducerVideoObject.youTubeVideoId}
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
            <View
              style={[
                styles.coverView,
                { backgroundColor: isGreen ? "green" : "transparent" },
              ]}
            />
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
        </View>
        <View style={styles.containerBottom}>
          <ScrollView>
            {reviewReducer.reviewReducerActionsArray.map((action, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleSelectedAction(action)}
                style={{
                  backgroundColor: "gray",
                  padding: 10,
                  marginVertical: 5,
                }}
              >
                <Text style={{ color: "white" }}>
                  id: {action.actionsDbTableId} - timestamp:{action.timestamp}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
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
    borderWidth: 4,
    borderColor: "gray",
    borderStyle: "dashed",
  },
  videoWrapper: {
    position: "relative",
    width: "100%",
    height: 220,
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

  // ----- BOTTOM -----
  containerBottom: {
    flex: 1,
    width: Dimensions.get("window").width,
    borderWidth: 4,
    borderColor: "gray",
    borderStyle: "dashed",
  },
});

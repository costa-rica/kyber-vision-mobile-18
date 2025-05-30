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
import { useState, useEffect, useRef } from "react";
import * as ScreenOrientation from "expo-screen-orientation";
import ReviewVideoPortrait from "./subcomponents/ReviewVideoPortrait";
import ReviewVideoLandscape from "./subcomponents/ReviewVideoLandscape";
import {
  filterReviewReducerActionsArrayOnPlayer,
  updateReviewReducerIsPlayingforActionsArrayV5,
} from "../reducers/review";

export default function ReviewVideo({ navigation, route }) {
  const dispatch = useDispatch();
  const reviewReducer = useSelector((state) => state.review);
  const userReducer = useSelector((state) => state.user);

  // -------------
  // Orientation Stuff
  // -------------
  // orientation
  const [orientation, setOrientation] = useState("portrait");

  // useEffect(() => {
  //   // console.log("- Position useEffect");
  //   ScreenOrientation.unlockAsync();
  //   checkOrientation();
  //   const subscriptionScreenOrientation =
  //     ScreenOrientation.addOrientationChangeListener(handleOrientationChange);

  //   return () => {
  //     subscriptionScreenOrientation.remove();
  //     ScreenOrientation.lockAsync();
  //   };
  // });

  // const checkOrientation = async () => {
  //   // console.log("in checkOrientation");
  //   const orientationObject = await ScreenOrientation.getOrientationAsync();
  //   // console.log(`orientation is ${orientationObject}`);
  //   if (
  //     orientationObject.orientationInfo.orientation == 4 ||
  //     orientationObject.orientationInfo.orientation == 3
  //   ) {
  //     setOrientation("landscape");
  //   } else {
  //     setOrientation("portrait");
  //   }
  // };
  // const handleOrientationChange = async (orientationObject) => {
  //   if (
  //     orientationObject.orientationInfo.orientation == 4 ||
  //     orientationObject.orientationInfo.orientation == 3
  //   ) {
  //     setOrientation("landscape");
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT
  //     );
  //   } else {
  //     setOrientation("portrait");
  //     await ScreenOrientation.lockAsync(
  //       ScreenOrientation.OrientationLock.PORTRAIT_UP
  //     );
  //   }
  // };
  const handleBackPress = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    ); // Force back to portrait
    setOrientation("portrait");
    navigation.goBack();
  };

  // for PRODUCTION -> forces to landscape
  useEffect(() => {
    const lockToLandscape = async () => {
      await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
      );
      setOrientation("landscape");
    };

    lockToLandscape(); // Force landscape mode when component mounts

    return () => {
      ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT_UP
      ); // Reset to portrait when leaving
    };
  }, []);

  // -------------
  // YouTube Stuff
  // -------------
  const playerRef = useRef();
  const [playing, setPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      if (playerRef.current && playing) {
        const time = await playerRef.current.getCurrentTime();
        setCurrentTime(time);

        dispatch(updateReviewReducerIsPlayingforActionsArrayV5(time));
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

  // --------- YouTube / Video Related ---------

  const handleSelectedAction = (action) => {
    playerRef.current.seekTo(action.timestamp, true);
  };

  // Filtering actions
  const filterActions = (parameterName, object) => {
    if (parameterName === "player") {
      dispatch(filterReviewReducerActionsArrayOnPlayer(object));
    }
  };

  // -------------
  // Request Montage Video
  // -------------
  const handlePressRequestMontageVideo = async () => {
    const seledtionsCount = reviewReducer.reviewReducerActionsArray.filter(
      (action) => action.isDisplayed
    ).length;
    if (seledtionsCount > 5) {
      Alert.alert(
        `You are about to request a montage of ${seledtionsCount} actions`, // Title
        "Are you sure you want to proceed?", // Description
        [
          {
            text: "No",
            onPress: () => console.log("❌ No Pressed"),
            style: "cancel", // iOS cancel style
          },
          {
            text: "Yes",
            onPress: () => requestMontageVideo(),
          },
        ],
        { cancelable: false } // Prevents dismissing by tapping outside on Android
      );
      // Alert.alert(
      //   "Video request sent", // Title
      //   "Check your email for the video.", // Description
      //   [
      //     { text: "OK", onPress: () => console.log("OK Pressed") }, // Button
      //   ]
      // );
    } else {
      requestMontageVideo();
    }
  };

  const requestMontageVideo = async () => {
    console.log(`in requestMontage video`);
    console.log(reviewReducer.reviewReducerVideoObject.id);

    const response = await fetch(
      // `${process.env.EXPO_PUBLIC_API_URL}/videos//montage-service/queue-a-job/${reviewReducer.reviewReducerVideoObject.id}`,
      `${process.env.EXPO_PUBLIC_API_URL}/videos/montage-service/queue-a-job`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify({
          matchId: 1,
          videoId: reviewReducer.reviewReducerVideoObject.id,
          actionsArray: reviewReducer.reviewReducerActionsArray.filter(
            (action) => action.isDisplayed
          ),
          token: userReducer.token,
        }),
      }
    );

    if (response.status !== 200) {
      // console.log(`There was a server error: ${response.status}`);
      alert(`There was a server error: ${response.status}`);
      return;
    } else {
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        const resJson = await response.json();
        // alert("Video request sent:check your email for video download");
        // alert(resJson.message);
        Alert.alert(
          "Video request sent", // Title
          "Check your email for the video.", // Description
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }, // Button
          ]
        );
      }
    }
  };

  return orientation == "portrait" ? (
    <TemplateViewWithTopChildrenSmall navigation={navigation}>
      <ReviewVideoPortrait
        // combinedGestures={combinedGestures}
        orientation={orientation}
        playerRef={playerRef}
        playing={playing}
        currentTime={currentTime}
        duration={duration}
        handleStateChange={handleStateChange}
        togglePlaying={togglePlaying}
        rewind={rewind}
        forward={forward}
        handleSelectedAction={handleSelectedAction}
        handleBackPress={handleBackPress}
      />
    </TemplateViewWithTopChildrenSmall>
  ) : (
    <ReviewVideoLandscape
      navigation={navigation}
      // combinedGestures={combinedGestures}
      orientation={orientation}
      playerRef={playerRef}
      playing={playing}
      currentTime={currentTime}
      duration={duration}
      handleStateChange={handleStateChange}
      togglePlaying={togglePlaying}
      rewind={rewind}
      forward={forward}
      handleSelectedAction={handleSelectedAction}
      handleBackPress={handleBackPress}
      filterActions={filterActions}
      handlePressRequestMontageVideo={handlePressRequestMontageVideo}
    />
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

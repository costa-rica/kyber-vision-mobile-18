import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
import ButtonKvNoDefault from "../buttons/ButtonKvNoDefault";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateSessionsArray } from "../../../reducers/script";

export default function ModalUploadVideo() {
  const userReducer = useSelector((state) => state.user);
  const reviewReducer = useSelector((state) => state.review);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  const [selectedSession, setSelectedSession] = useState(null);

  const handleSendVideo = async (video) => {
    const formData = new FormData();
    formData.append("video", {
      uri: video.uri,
      name: video.fileName || "video.mp4",
      type: "video/mp4",
    });
    formData.append("sessionId", selectedSession.id);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 120 sec timeout

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/videos/upload-youtube`,
        {
          method: "POST",
          body: formData,
          signal: controller.signal,
          headers: {
            Authorization: `Bearer ${userReducer.token}`,
          },
        }
      );
      clearTimeout(timeout);
      const data = await response.json();
      console.log("Upload response:", data);
      Alert.alert("Success", "Video sent successfully!");
    } catch (error) {
      clearTimeout(timeout);
      console.error("Upload error:", error);
      Alert.alert("Error", "Failed to send video.");
    }
  };

  return (
    <View style={styles.modalContent}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Link video to session
      </Text>
      <Text>{selectedSession?.id}</Text>
      <Text>{reviewReducer.selectedVideoObject?.fileName}</Text>

      <View style={styles.vwVideoHeader}>
        <Text style={styles.txtVideoItemDate}>Date</Text>
        <Text style={styles.txtVideoItemCity}>City</Text>
        <Text style={styles.txtVideoItemSessionId}>Session ID</Text>
      </View>
      <View style={styles.underline} />
      <FlatList
        data={scriptReducer.sessionsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ButtonKvNoDefault
            onPress={() => setSelectedSession(item)}
            styleView={styles.btnVideoItem}
          >
            <Text style={styles.txtVideoItemDate}>
              {item.sessionDateString}
            </Text>
            <Text style={styles.txtVideoItemCity}>{item.city}</Text>
            <Text style={styles.txtVideoItemSessionId}>{item.id}</Text>
          </ButtonKvNoDefault>
        )}
      />

      <View style={styles.vwButtons}>
        <ButtonKvStd
          onPress={() => {
            console.log("uploading ...");
            handleSendVideo(reviewReducer.selectedVideoObject);
          }}
        >
          Upload
        </ButtonKvStd>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  //   modalWrapper: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     // width: Dimensions.get("window").width * 0.95,
  //     height: Dimensions.get("window").height * 0.9,
  //   },
  modalContent: {
    // width: "80%",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.5,
    padding: 2,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  vwVideoHeader: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 10,
    width: Dimensions.get("window").width * 0.8,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    marginBottom: 5,
  },
  txtVideoItemDate: {
    width: Dimensions.get("window").width * 0.3,
    color: "black",
    fontSize: 11,
    // backgroundColor: "red",
  },
  txtVideoItemCity: {
    width: Dimensions.get("window").width * 0.3,
    color: "black",
    fontSize: 11,
    // textAlign: "center",
  },
  txtVideoItemSessionId: {
    width: Dimensions.get("window").width * 0.2,
    color: "black",
    fontSize: 11,
    textAlign: "center",
    // backgroundColor: "red",
  },
  btnVideoItem: {
    backgroundColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 5,
    // width: Dimensions.get("window").width * 0.95,
    width: "100%",
    borderColor: "#806181",
    borderWidth: 1,
  },
});

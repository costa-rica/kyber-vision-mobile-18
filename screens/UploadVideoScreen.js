import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Modal,
  Pressable,
  TouchableWithoutFeedback,
} from "react-native";
import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateTeamsArray } from "../reducers/user";
import * as ImagePicker from "expo-image-picker";
import ButtonKvNoDefault from "./subcomponents/buttons/ButtonKvNoDefault";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
import ModalUploadVideo from "./subcomponents/modals/ModalUploadVideo";

export default function UploadVideoScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const [displayTeamList, setDisplayTeamList] = useState(false);
  const dispatch = useDispatch();

  const handleTribeSelect = (selectedId) => {
    const updatedArray = userReducer.teamsArray.map((team) => ({
      ...team,
      selected: team.id === selectedId,
    }));
    dispatch(updateTeamsArray(updatedArray));
    setDisplayTeamList(false);
  };
  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwCapsuleSuper}>
        <View
          style={displayTeamList ? styles.vwCapsuleExpanded : styles.vwCapsule}
        >
          <View style={[styles.vwLeftCapsule]}>
            {displayTeamList ? (
              // <View style={styles.vwDropdownList}>
              <View>
                {userReducer.teamsArray.map((tribe) => (
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
                {userReducer.teamsArray.find((tribe) => tribe.selected)
                  ?.teamName || "No tribe selected"}
              </Text>
            )}
          </View>
          <View style={styles.vwRightCapsule}>
            <TouchableOpacity
              onPress={() => setDisplayTeamList(!displayTeamList)}
              style={styles.btnSelectTribe}
            >
              <Image
                source={
                  displayTeamList
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

  const [selectedVideosArray, setSelectedVideosArray] = useState([]);
  const [isVisibleModalUploadVideo, setIsVisibleModalUploadVideo] =
    useState(false);

  const handleSelectVideo = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert("Permission denied", "We need access to your media.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["videos"],
      allowsMultipleSelection: true,
      quality: 1,
    });

    if (!result.canceled) {
      const assets = result.assets || [];
      setSelectedVideosArray((prev) => [...prev, ...assets]);
      //   console.log(result.assets);
    }
  };

  return (
    <TemplateViewWithTopChildren
      navigation={navigation}
      topChildren={topChildren}
      screenName={"UploadVideoScreen"}
      isVisibleModal={isVisibleModalUploadVideo}
      setDisplayModal={setIsVisibleModalUploadVideo}
      modalComponent={<ModalUploadVideo />}
    >
      <View style={styles.container}>
        {/* -------- TOP ----- */}
        <View style={styles.containerTop}>
          <Text> Videos Uploaded </Text>
          <Text> {scriptReducer.sessionsArray.length} sessions </Text>
        </View>
        <View style={styles.containerBottom}>
          <ButtonKvNoDefaultTextOnly
            onPress={() => {
              console.log("Upload Video");
              handleSelectVideo();
            }}
            styleView={styles.btnSelectVideo}
            styleText={styles.txtSelectVideo}
          >
            Select Video(s)
          </ButtonKvNoDefaultTextOnly>
          <Text> Upload Video Bottom </Text>
          <View style={styles.vwVideoHeader}>
            <Text style={styles.txtVideoItemFilename}>Filename</Text>
            {/* <Text>Filename</Text> */}
            <Text style={styles.txtVideoItemShort}>Dur. (s)</Text>
            <Text style={styles.txtVideoItemShort}>Size (MB)</Text>
            <Text style={styles.txtVideoItemDimensions}>Dimensions</Text>
          </View>
          <View style={styles.underline} />
          <FlatList
            data={selectedVideosArray}
            keyExtractor={(item) => item.uri}
            renderItem={({ item }) => (
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("Select Video");
                  setIsVisibleModalUploadVideo(true);
                }}
                styleView={styles.btnVideoItem}
                styleText={styles.txtVideoItem}
              >
                {/* <View style={styles.vwVideoItem}> */}
                <Text style={styles.txtVideoItemFilename}>{item.fileName}</Text>
                <Text style={styles.txtVideoItemShort}>
                  {(item.duration / 1000).toFixed(0)}
                </Text>
                <Text style={styles.txtVideoItemShort}>
                  {(item.fileSize / 1000000)
                    .toFixed(0)
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </Text>
                <Text style={styles.txtVideoItemDimensions}>
                  {item.height} x {item.width}
                </Text>
                {/* </View> */}
              </ButtonKvNoDefault>
            )}
          />
        </View>
      </View>

      {/* {isVisibleModalUploadVideo && (
        <TouchableWithoutFeedback
          onPress={() => setIsVisibleModalUploadVideo(false)}
        >
          <View style={styles.modalOverlay}>
            <View onStartShouldSetResponder={() => true}>
              
              <ModalUploadVideo
                isVisibleModalUploadVideo={isVisibleModalUploadVideo}
                setIsVisibleModalUploadVideo={setIsVisibleModalUploadVideo}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      )} */}
    </TemplateViewWithTopChildren>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
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

  // ----- TOP -----
  containerTop: {
    // flex: 1,
    height: 100,
    alignItems: "center",
    // justifyContent: "center",
    borderWidth: 2, // Adjust thickness as needed
    borderColor: "gray", // Change color as desired
    borderStyle: "dashed",
  },

  btnSelectVideo: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#806181",
    fontSize: 24,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 35,
  },
  txtSelectVideo: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },

  // ----- BOTTOM -----

  containerBottom: {
    // height: 500,
    width: Dimensions.get("window").width,
    flex: 1,
    // height: 350,
    // backgroundColor: "gray",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
  },

  vwVideoHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 10,
    width: Dimensions.get("window").width * 0.9,
  },

  underline: {
    height: 1,
    backgroundColor: "#ccc",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    marginBottom: 5,
  },

  txtVideoItemFilename: {
    width: Dimensions.get("window").width * 0.3,
    color: "black",
    // fontWeight: "bold",
    fontSize: 11,
  },

  txtVideoItemShort: {
    width: Dimensions.get("window").width * 0.1,
    color: "black",
    // fontWeight: "bold",
    fontSize: 11,
  },

  txtVideoItemDimensions: {
    width: Dimensions.get("window").width * 0.2,
    color: "black",
    // fontWeight: "bold",
    fontSize: 11,
  },
  btnVideoItem: {
    backgroundColor: "#E8E8E8",
    // display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 5,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    borderColor: "#806181",
    borderWidth: 1,
  },
  vwVideoItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 5,
    backgroundColor: "#E8E8E8",
    borderRadius: 10,
    marginVertical: 5,
    width: Dimensions.get("window").width * 0.9,
    borderRadius: 10,
    borderColor: "#806181",
    borderWidth: 1,
  },

  // ------------
  // Modal
  // ------------

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalContainer: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
});

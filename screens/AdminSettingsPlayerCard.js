import * as FileSystem from "expo-file-system";
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
  Alert,
} from "react-native";
// import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import BtnVisibilityDown from "../assets/images/buttons/btnVisibilityDown.svg";
import BtnVisibilityUp from "../assets/images/buttons/btnVisibilityUp.svg";
import IconMagnifingGlass from "../assets/images/iconMagnifingGlass.svg";
import { updateTeamsArray } from "../reducers/team";
import AdminSettingsPlayerCardWaveThing from "../assets/images/AdminSettingsPlayerCardWaveThing.svg";

import ButtonKvNoDefault from "./subcomponents/buttons/ButtonKvNoDefault";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
// import ModalUploadVideo from "./subcomponents/modals/ModalUploadVideo";

export default function AdminSettingsPlayerCard({ navigation, route }) {
  const player = route.params.player;
  const userReducer = useSelector((state) => state.user);
  const uploadReducer = useSelector((state) => state.upload);
  const teamReducer = useSelector((state) => state.team);

  const [localImageUri, setLocalImageUri] = useState(null);

  const topChildren = (
    <Text>
      {teamReducer.teamsArray.filter((team) => team.selected)[0].teamName}{" "}
      Settings
    </Text>
  );

  const fetchPlayerProfilePicture = async () => {
    try {
      const localDir = `${FileSystem.documentDirectory}profile-pictures/`;
      await FileSystem.makeDirectoryAsync(localDir, { intermediates: true });
      const fileUri = `${localDir}${player.image}`;

      const downloadResumable = await FileSystem.downloadAsync(
        `${process.env.EXPO_PUBLIC_API_URL}/players/profile-picture/${player.image}`,
        fileUri,
        {
          headers: {
            Authorization: `Bearer ${userReducer.token}`,
          },
        }
      );

      if (downloadResumable.status === 200) {
        setLocalImageUri(fileUri);
      } else {
        console.log(
          "Failed to download image, status:",
          downloadResumable.status
        );
      }
    } catch (error) {
      console.log("Error downloading player profile picture:", error);
    }
  };

  useEffect(() => {
    const checkAndLoadImage = async () => {
      if (!player.image) return;
      const localDir = `${FileSystem.documentDirectory}profile-pictures/`;
      const fileUri = `${localDir}${player.image}`;
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (fileInfo.exists) {
        setLocalImageUri(fileUri);
      } else {
        await fetchPlayerProfilePicture();
      }
    };
    checkAndLoadImage();
  }, [player.image]);

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      screenName={"AdminSettingsPlayerCard"}
      // modalComponentAndSetterObject={whichModalToDisplay()}
      topHeight={"15%"}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.vwPlayerNameAndShirtNumber}>
            <View style={styles.vwPlayerLeft}>
              <Text style={styles.txtShirtNumber}>
                {/* {props.lastActionPlayer.shirtNumber} */}
                {player.shirtNumber}
              </Text>
            </View>
            <View style={styles.vwPlayerRight}>
              <Text style={styles.txtPlayerName}>{player.firstName}</Text>
              <Text style={styles.txtPlayerName}>
                {player.lastName.toUpperCase()}
              </Text>
            </View>
          </View>
          <View style={styles.vwPlayerImage}>
            <Image
              source={localImageUri ? { uri: localImageUri } : null}
              style={styles.imgPlayer}
            />
          </View>
        </View>
        <View
          style={styles.vwPlayerRoles}
          backgroundImage={AdminSettingsPlayerCardWaveThing}
        >
          <Text>Player Roles</Text>
        </View>
        {/* <Text>Player Card</Text>
        <Text>{player.firstName}</Text>
        <Text>{player.lastName}</Text>
        <Text>{player.shirtNumber}</Text> */}
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    // backgroundColor: "gray",
  },
  // ------------
  // Top
  // ------------
  containerTop: {
    // flex: 1,
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwPlayerTop: {
    flexDirection: "row",
  },
  vwPlayerNameAndShirtNumber: {
    // borderWidth: 1,
    // borderColor: "#6E4C84",
    // borderRadius: 30,
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
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  txtShirtNumber: {
    fontWeight: "bold",
    color: "white",
    fontSize: 22,
    // borderRadius: 7,
    // height: 15,
    // width: 20,
    textAlign: "center",
    fontFamily: "ApfelGrotezkBold",
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
  vwPlayerImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
  },
  imgPlayer: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
});

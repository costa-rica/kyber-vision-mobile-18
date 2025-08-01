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

import ButtonKvNoDefault from "./subcomponents/buttons/ButtonKvNoDefault";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
// import ModalUploadVideo from "./subcomponents/modals/ModalUploadVideo";

export default function AdminSettingsPlayerCard({ navigation, route }) {
  const player = route.params.player;
  const userReducer = useSelector((state) => state.user);
  const uploadReducer = useSelector((state) => state.upload);
  const teamReducer = useSelector((state) => state.team);

  const topChildren = (
    <Text>
      {teamReducer.teamsArray.filter((team) => team.selected)[0].teamName}{" "}
      Settings
    </Text>
  );

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      screenName={"AdminSettingsPlayerCard"}
      // modalComponentAndSetterObject={whichModalToDisplay()}
      topHeight={"15%"}
    >
      <View style={styles.container}>
        <Text>Player Card</Text>
        <Text>{player.firstName}</Text>
        <Text>{player.lastName}</Text>
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
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
});

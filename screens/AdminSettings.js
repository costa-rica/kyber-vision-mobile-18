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
import { updateTeamsArray } from "../reducers/user";
// import { updateReviewReducerSelectedVideoObject } from "../reducers/review";
import {
  updateUploadReducerSelectedVideoObject,
  updateUploadReducerLoading,
  updateUploadReducerDeleteVideoObject,
} from "../reducers/upload";
import * as ImagePicker from "expo-image-picker";
import ButtonKvNoDefault from "./subcomponents/buttons/ButtonKvNoDefault";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
import ModalUploadVideo from "./subcomponents/modals/ModalUploadVideo";
import ModalUploadVideoYesNo from "./subcomponents/modals/ModalUploadVideoYesNo";

export default function AdminSettings({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const uploadReducer = useSelector((state) => state.upload);
  const teamReducer = useSelector((state) => state.team);

  const topChildren = (
    <Text>
      {teamReducer.teamsArray.filter((team) => team.selected)[0].teamName}{" "}
      Settings
    </Text>
  );

  useEffect(() => {
    console.log(JSON.stringify(teamReducer.teamsArray));
  }, []);

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      screenName={"AdminSettings"}
      //   modalComponentAndSetterObject={whichModalToDisplay()}
      topHeight={"20%"}
    >
      <View style={styles.container}>
        {/* -------- 
            
            TOP 
            
            ----- */}

        <View style={styles.containerTop}>
          <View style={styles.vwContainerTopInner}>
            <View style={styles.vwTeamName}>
              <Text style={styles.txtTeamNameTitle}>Team Name</Text>
              <Text style={styles.txtTeamNameValue}>
                {
                  teamReducer.teamsArray.filter((team) => team.selected)[0]
                    .teamName
                }
              </Text>
            </View>
            <View style={styles.vwTeamDescription}>
              <Text style={styles.txtTeamDescriptionTitle}>Description</Text>
              <Text style={styles.txtTeamDescriptionValue}>
                {
                  teamReducer.teamsArray.filter((team) => team.selected)[0]
                    .description
                }
              </Text>
            </View>
            <View style={styles.vwTeamVisibility}>
              <Text style={styles.txtTeamVisibilityTitle}>Visibility</Text>
              <Text style={styles.txtTeamVisibilityValue}>
                {
                  teamReducer.teamsArray.filter((team) => team.selected)[0]
                    .visibility
                }
              </Text>
            </View>
          </View>
        </View>
        {/* -------- 
            
            BOTTOM 
            
            ----- */}
        <View style={styles.containerBottom}>
          <Text>Team Roster</Text>
        </View>
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  // ------------
  // Top
  // ------------
  containerTop: {
    flex: 1,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwContainerTopInner: {
    padding: 20,
    width: "100%",
  },
  vwTeamName: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  txtTeamNameTitle: {
    color: "gray",
    marginBottom: 5,
  },
  txtTeamNameValue: {
    fontSize: 16,
  },
  vwTeamDescription: {
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    marginBottom: 10,
  },
  txtTeamDescriptionTitle: {
    color: "gray",
    marginBottom: 5,
  },
  txtTeamDescriptionValue: {
    fontSize: 16,
  },
  // ------------
  // Bottom
  // ------------
  containerBottom: {
    flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
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

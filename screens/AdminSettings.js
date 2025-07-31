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

import { updateTeamsArray } from "../reducers/team";
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
  const [showVisibilityOptions, setShowVisibilityOptions] = useState(false);
  const dispatch = useDispatch();

  const topChildren = (
    <Text>
      {teamReducer.teamsArray.filter((team) => team.selected)[0].teamName}{" "}
      Settings
    </Text>
  );

  //   useEffect(() => {}, [teamReducer.teamsArray]);

  const updateTeamVisibility = async (visibility) => {
    // console.log(`---> update Team Visibility status: ${visibility}`);

    const bodyObj = {
      teamId: teamReducer.teamsArray.filter((team) => team.selected)[0].id,
      visibility: visibility,
    };
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/teams/update-visibility`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify(bodyObj),
      }
    );
    let resJson = null;
    const contentType = response.headers.get("Content-Type");
    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      const updatedTeams = teamReducer.teamsArray.map((team) =>
        team.selected ? { ...team, visibility } : team
      );
      dispatch(updateTeamsArray(updatedTeams));
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

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
              <TouchableOpacity
                style={[
                  styles.touchableOpacityVisibilityCapsule,
                  styles.vwDropdownOptionCapsule,
                ]}
                onPress={() => setShowVisibilityOptions(!showVisibilityOptions)}
              >
                <Text style={styles.txtVisibilityCapsule}>
                  {
                    teamReducer.teamsArray.filter((team) => team.selected)[0]
                      .visibility
                  }
                </Text>
                {showVisibilityOptions ? (
                  <BtnVisibilityUp />
                ) : (
                  <BtnVisibilityDown />
                )}
              </TouchableOpacity>
              {showVisibilityOptions && (
                <View style={styles.vwVisibilityDropdown}>
                  {[
                    { type: "Public", value: "Anyone can join" },
                    {
                      type: "On invitation",
                      value: "Only people with link can join",
                    },
                    { type: "Private", value: "No one can join" },
                  ]
                    .filter(
                      (option) =>
                        option.type !==
                        teamReducer.teamsArray.filter(
                          (team) => team.selected
                        )[0].visibility
                    )
                    .map((option) => (
                      <TouchableOpacity
                        key={option.type}
                        style={styles.touchableOpacityDropdownOption}
                        onPress={() => {
                          updateTeamVisibility(option.type); // Trigger your function
                          setShowVisibilityOptions(false); // Close dropdown
                        }}
                      >
                        {/* <View style={styles.vwDropdownOption}> */}
                        <View style={styles.vwDropdownOptionCapsule}>
                          <Text style={styles.txtDropdownOption}>
                            {option.type}
                          </Text>
                        </View>
                        <Text style={styles.txtDropdownOptionValue}>
                          {option.value}
                        </Text>
                        {/* </View> */}
                      </TouchableOpacity>
                    ))}
                </View>
              )}
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
    // flex: 1,
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
    // width: "100%",
    marginBottom: 10,
  },
  txtTeamDescriptionTitle: {
    color: "gray",
    marginBottom: 5,
  },
  txtTeamDescriptionValue: {
    fontSize: 16,
  },
  vwTeamVisibility: {
    // borderBottomColor: "gray",
    // borderBottomWidth: 1,
    width: "50%",
    marginBottom: 10,
  },
  touchableOpacityVisibilityCapsule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    marginTop: 5,
  },
  txtVisibilityCapsule: {
    fontSize: 14,
  },
  arrow: {
    marginLeft: 8,
  },
  vwVisibilityDropdown: {
    position: "absolute",
    top: 50, // adjust for your layout
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 8,
    width: Dimensions.get("window").width * 0.8,
    zIndex: 10,
    elevation: 5,
  },
  touchableOpacityDropdownOption: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  vwDropdownOptionCapsule: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    width: Dimensions.get("window").width * 0.3,
    paddingLeft: 5,
    paddingVertical: 3,
  },
  txtDropdownOption: {
    fontSize: 14,
  },
  txtDropdownOptionValue: {
    fontSize: 12,
    color: "gray",
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

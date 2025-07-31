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
  const [playersArray, setPlayersArray] = useState([]);

  const topChildren = (
    <Text>
      {teamReducer.teamsArray.filter((team) => team.selected)[0].teamName}{" "}
      Settings
    </Text>
  );

  useEffect(() => {
    fetchPlayers();
  }, []);

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

  const fetchPlayers = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/players/team/${
        teamReducer.teamsArray.find((tribe) => tribe.selected)?.id
      }`,
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

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      console.log(`response ok`);
      // const tempArray = resJson.players.map((item) => {
      //   return {
      //     ...item,
      //     selected: false,
      //   };
      // });
      // console.log(tempArray);
      // dispatch(updatePlayersArray(tempArray));
      setPlayersArray(resJson.players);
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
      topHeight={"15%"}
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
          <View style={styles.vwPlayersTableHeading}>
            <View style={styles.vwPlayersTableHeadingLeft}>
              <Text style={{ fontWeight: "bold", fontSize: 16 }}>
                Team Roster
              </Text>
              <Text> ({playersArray.length})</Text>
            </View>
            <View style={styles.vwPlayersTableHeadingRight}>
              <ButtonKvNoDefault
                onPress={() => {
                  console.log("Search");
                }}
                styleView={styles.btnSearch}
              >
                <IconMagnifingGlass />
              </ButtonKvNoDefault>
              <ButtonKvNoDefaultTextOnly
                onPress={() => {
                  console.log("Add");
                }}
                styleView={styles.btnAddPlayer}
                styleText={styles.txtBtnAddPlayer}
              >
                +
              </ButtonKvNoDefaultTextOnly>
            </View>
          </View>
          <View style={styles.vwPlayersTable}>
            <FlatList
              data={playersArray}
              keyExtractor={(item, index) =>
                item.id?.toString() || index.toString()
              }
              renderItem={({ item }) => (
                <View style={styles.vwPlayerRow}>
                  <View style={styles.vwPlayerShirtNumber}>
                    <Text style={styles.txtPlayerShirtNumber}>
                      {item?.shirtNumber}
                    </Text>
                  </View>
                  <View style={styles.vwPlayerName}>
                    <Text style={styles.txtPlayerName}>
                      {item.firstName} {item.lastName}
                    </Text>
                  </View>
                  <View style={styles.vwPlayerPosition}>
                    <Text style={styles.txtPlayerPosition}>
                      {item?.positionAbbreviation}
                    </Text>
                  </View>
                </View>
              )}
            />
          </View>
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
  vwPlayersTableHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  vwPlayersTableHeadingLeft: {
    flexDirection: "row",
    // gap: 5,
    alignItems: "center",
  },
  vwPlayersTableHeadingRight: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  btnSearch: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: "#E8E8E8",
    borderColor: "#806181",
    borderWidth: 1,
    // marginVertical: 3,
  },
  btnAddPlayer: {
    // width: Dimensions.get("window").width * 0.2,
    // height: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 40,
    borderRadius: 20,
    color: "white",
    backgroundColor: "#E8E8E8",
    borderColor: "#806181",
    borderWidth: 2,
  },
  txtBtnAddPlayer: {
    fontSize: 24,
    color: "#806181",
    // backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
    // height: 15,
    // margin: 0,
    // lineHeight: 1,
  },
  vwPlayersTable: {
    height: 200,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  // ---- Player Table styles ----
  vwPlayerRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    gap: 5,
  },
  vwPlayerShirtNumber: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  txtPlayerShirtNumber: {
    fontWeight: "bold",
    fontSize: 16,
  },
  vwPlayerName: {
    flex: 1,
    paddingLeft: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  txtPlayerName: {
    fontSize: 16,
  },
  vwPlayerPosition: {
    width: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
  },
  txtPlayerPosition: {
    fontSize: 14,
    color: "gray",
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

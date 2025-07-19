import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ButtonKvStd from "./subcomponents/buttons/ButtonKvStd";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModalAddPlayer from "./subcomponents/modals/ModalAddPlayer";

export default function CreateTeamScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [playersArray, setPlayersArray] = useState([
    { playerName: "Add Player", shirtNumber: 9999, position: "" },
  ]);
  const [teamInputs, setTeamInputs] = useState({
    teamName: "",
    teamDescription: "",
    teamImage: null,
  });
  const [isVisibleModalAddPlayer, setIsVisibleModalAddPlayer] = useState(false);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}> Create a Team</Text>
    </View>
  );

  const teamRosterTableRow = ({ item }) => {
    if (item.playerName === "Add Player") {
      return (
        <View style={styles.vwPlayerRow}>
          <ButtonKvNoDefaultTextOnly
            onPress={() => console.log("Add Player")}
            styleView={styles.btnAddPlayer}
            styleText={styles.btnAddPlayerText}
          >
            +
          </ButtonKvNoDefaultTextOnly>
        </View>
      );
    }
    return (
      <View style={styles.vwPlayerRow}>
        <Text style={styles.txtPlayerName}>{item.playerName}</Text>
      </View>
    );
  };

  const addPlayerToTeam = (playerObject) => {
    const tempArray = [...playersArray];
    tempArray.push(playerObject);
    setPlayersArray(tempArray);
    setIsVisibleModalAddPlayer(false);
  };

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      modalComponentAndSetterObject={{
        modalComponent: <ModalAddPlayer addPlayerToTeam={addPlayerToTeam} />,
        useState: isVisibleModalAddPlayer,
        useStateSetter: setIsVisibleModalAddPlayer,
      }}
      //   topHeight={"20%"}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.vwInputs}>
            <View style={styles.vwInputGroup}>
              <View style={styles.vwInputGroupLabelMultipleFonts}>
                <Text style={styles.txtInputGroupLabel}>Team name</Text>
                <Text style={styles.txtInputGroupLabelRequired}>*</Text>
              </View>
              <View style={styles.vwInputWrapper}>
                <TextInput
                  placeholder="Région M Aix-en-Provence"
                  placeholderTextColor="gray"
                  value={teamInputs.teamName}
                  onChangeText={(text) =>
                    setTeamInputs({ ...teamInputs, teamName: text })
                  }
                  style={styles.txtInput}
                />
              </View>
            </View>
            <View style={styles.vwInputGroup}>
              <View style={styles.vwInputGroupLabelMultipleFonts}>
                <Text style={styles.txtInputGroupLabel}>Team description</Text>
              </View>
              <View style={styles.vwInputWrapper}>
                <TextInput
                  placeholder="A team under the sun"
                  placeholderTextColor="gray"
                  value={teamInputs.teamDescription}
                  onChangeText={(text) =>
                    setTeamInputs({ ...teamInputs, teamDescription: text })
                  }
                  style={styles.txtInput}
                />
              </View>
            </View>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <Text style={styles.txtInputGroupLabel}>Team roster</Text>

          <View style={styles.vwRosterTable}>
            {playersArray.length > 1 ? (
              <FlatList
                data={playersArray}
                renderItem={teamRosterTableRow}
                // keyExtractor={(item) => item.id.toString()}
                keyExtractor={(item) => item.shirtNumber}
                style={styles.flatListTeamNames}
              />
            ) : (
              <Text>No players found</Text>
            )}

            {playersArray.length === 1 && (
              <View style={styles.vwNewPlayerWhenNoPlayers}>
                <ButtonKvNoDefaultTextOnly
                  onPress={() => setIsVisibleModalAddPlayer(true)}
                  styleView={styles.btnAddPlayer}
                  styleText={styles.btnAddPlayerText}
                >
                  +
                </ButtonKvNoDefaultTextOnly>
              </View>
            )}
          </View>

          {/* <View style={styles.vwInputGroup}> */}
          <ButtonKvStd
            onPress={() => console.log("Create Team")}
            style={styles.btnTribe}
          >
            Create Team
          </ButtonKvStd>
          {/* </View> */}
        </View>
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },

  // ------------
  // Top Children
  // ------------
  vwTopChildren: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  txtTopChildren: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  // ------------
  // Container Top
  // ------------
  containerTop: {
    // flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
  vwInputs: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  vwInputGroup: {
    width: "90%",
    alignItems: "flex-start",
    marginTop: 10,
  },
  vwInputGroupLabelMultipleFonts: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  txtInputGroupLabelRequired: {
    color: "red",
  },
  vwInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 30,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  //   faIcon: {
  //     marginRight: 8,
  //   },
  txtInput: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 10,
    color: "black",
    fontStyle: "italic",
  },
  txtInputGroupLabel: {
    fontSize: 14,
    color: "#5B5B5B",
    paddingLeft: 15,
  },
  vwIconButton: {
    padding: 5,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: "transparent",
  },

  // ------------
  // Container Bottom
  // ------------
  containerBottom: {
    flex: 1,
    alignItems: "center",
    // justifyContent: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },

  // ------------
  // Roster Table
  // ------------
  vwRosterTable: {
    width: "90%",
    height: "75%",
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 20,
    marginBottom: 20,
  },
  btnAddPlayer: {
    // padding: 10,
    height: 40,
    width: 40,
    borderRadius: 20,
    // backgroundColor: "#C0A9C0",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "gray",
  },
  btnAddPlayerText: {
    color: "gray",
    fontSize: 30,
  },
  vwNewPlayerWhenNoPlayers: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  vwPlayerRow: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#C0A9C0",
  },
});

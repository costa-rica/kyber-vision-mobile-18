import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  FlatList,
  Pressable,
} from "react-native";
import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import ButtonKvStd from "./subcomponents/buttons/ButtonKvStd";
import ButtonKvNoDefaultTextOnly from "./subcomponents/buttons/ButtonKvNoDefaultTextOnly";
import Tribe from "../assets/images/navigationAndSmall/Tribe.svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTeamsArray } from "../reducers/team";
import { updateContractTeamUserArray } from "../reducers/user";

export default function SelectTeamScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const teamReducer = useSelector((state) => state.team);
  const dispatch = useDispatch();

  const fetchTeams = async () => {
    // The id in the Tribe Array is the TEAM ID
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/contract-team-user`,
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

    if (response.ok && resJson.teamsArray && resJson.contractTeamUserArray) {
      console.log(`response ok`);
      console.log(JSON.stringify(resJson));
      const tempArray = resJson.teamsArray.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      // console.log(" --- here is tempArray (teamsArray) --");
      // console.log(tempArray);
      dispatch(updateTeamsArray(tempArray));
      dispatch(updateContractTeamUserArray(resJson.contractTeamUserArray));
      console.log(
        "-----> Both teams and user's team arrays updated successfully"
      );
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  const fetchTeamsOffline = () => {
    const teamReducerOffline = require("../offlineData/teamReducer.json");
    dispatch(updateTeamsArray(teamReducerOffline.teamsArray));
  };

  useEffect(() => {
    if (userReducer.token === "offline") {
      fetchTeamsOffline();
    } else {
      fetchTeams();
    }
  }, []);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}>
        {" "}
        Welcome {userReducer.user.username}
      </Text>
    </View>
  );

  const selectTeamRow = ({ item }) => {
    const isSelected = item.selected;

    return (
      <Pressable
        onPress={() => {
          const tempArray = teamReducer.teamsArray.map((team) => {
            if (team.id === item.id) {
              return {
                ...team,
                selected: true,
              };
            } else {
              return {
                ...team,
                selected: false,
              };
            }
          });
          dispatch(updateTeamsArray(tempArray));
          navigation.navigate("HomeScreen");
        }}
        style={[styles.vwTeamRow, isSelected && styles.vwTeamRowSelected]}
      >
        <Text style={styles.txtTeamName}>{item.teamName}</Text>
      </Pressable>
    );
  };

  return (
    <TemplateViewWithTopChildren
      navigation={navigation}
      topChildren={topChildren}
      screenName={"SelectTeamScreen"}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Tribe />

          {teamReducer.teamsArray?.length > 0 ? (
            <FlatList
              data={teamReducer.teamsArray}
              renderItem={selectTeamRow}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatListTeamNames}
            />
          ) : (
            <Text>No teams found</Text>
          )}
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.vwInputGroup}>
            <ButtonKvNoDefaultTextOnly
              onPress={() => navigation.navigate("CreateTeamScreen")}
              styleView={styles.btnTribe}
              styleText={styles.btnTribeText}
            >
              Create Team
            </ButtonKvNoDefaultTextOnly>
          </View>
          {/* <View style={styles.vwInputGroup}>
            <ButtonKvNoDefaultTextOnly
              active={
                teamReducer.teamsArray.filter((tribe) => tribe.selected)
                  .length > 0
              }
              onPress={() => {
                if (
                  teamReducer.teamsArray.filter((tribe) => tribe.selected)
                    .length > 0
                ) {
                  navigation.navigate("HomeScreen");
                } else {
                  alert("Please select a tribe");
                }
              }}
              styleView={styles.btnTribe}
              styleText={
                teamReducer.teamsArray.filter((tribe) => tribe.selected)
                  .length > 0
                  ? styles.btnTribeText
                  : styles.btnTribeTextInactive
              }
            >
              Select Tribe
            </ButtonKvNoDefaultTextOnly>
          </View> */}
        </View>
      </View>
    </TemplateViewWithTopChildren>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },
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
  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
  },
  vwInputGroup: {
    width: "90%",
    alignItems: "center",
    paddingTop: 30,
  },
  btnTribe: {
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    justifyContent: "center",
    fontSize: 24,
    color: "white",
    backgroundColor: "#C0A9C0",
    borderRadius: 35,
    alignItems: "center",
  },
  btnTribeText: {
    color: "white",
    fontSize: 24,
  },
  btnTribeTextInactive: {
    color: "#AB8EAB",
    fontSize: 24,
  },

  // ------------
  // FlatList
  // ------------

  flatListTeamNames: {
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "solid",
    borderRadius: 10,
    padding: 5,
  },

  vwTeamRow: {
    padding: 5,
    marginVertical: 5,
    backgroundColor: "#F0F0F0",
    borderRadius: 2.5,
    width: "100%",
    textAlign: "center",
    // height: 50,
  },

  vwTeamRowSelected: {
    backgroundColor: "#D3D3D3", // light gray
  },

  // ------------
  // Bottom
  // ------------
});

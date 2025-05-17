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
import ButtonKv from "./subcomponents/buttons/ButtonKv";
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
import Tribe from "../assets/images/navigationAndSmall/Tribe.svg";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import SwitchKv from "./subcomponents/SwitchKv";

export default function CreateTribeScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [teamsArray, setTeamsArray] = useState([]);
  const [isSuperUser, setIsSuperUser] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isCoach, setIsCoach] = useState(false);
  const [selectedTeamId, setSelectedTeamId] = useState(null);

  const fetchTeams = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userReducer.token}`,
      },
    });

    console.log("Received response:", response.status);

    let resJson = null;
    const contentType = response.headers.get("Content-Type");

    if (contentType?.includes("application/json")) {
      resJson = await response.json();
    }

    if (response.ok && resJson) {
      console.log(`response ok`);
      console.log(resJson);
      setTeamsArray(resJson);
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  const createTribeRequest = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/groups/create/${selectedTeamId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userReducer.token}`,
        },
        body: JSON.stringify({
          isSuperUser,
          isAdmin,
          isCoach,
        }),
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
      console.log(resJson);
      // setTeamsArray(resJson);
      alert("Tribe created successfully");
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}> Create a Tribe</Text>
    </View>
  );

  const createTeamRow = ({ item }) => {
    const isSelected = item.id === selectedTeamId;

    return (
      <Pressable
        onPress={() => {
          setSelectedTeamId(item.id);
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
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <FlatList
            data={teamsArray}
            renderItem={createTeamRow}
            keyExtractor={(item) => item.id.toString()}
            style={styles.flatListTeamNames}
          />
        </View>

        <View style={styles.containerBottom}>
          {/* <View style={styles.vwTest}>
            <Text> Team: {selectedTeamId}</Text>
            <Text> Super User: {isSuperUser ? "Yes" : "No"}</Text>
            <Text> Admin: {isAdmin ? "Yes" : "No"}</Text>
            <Text> Coach: {isCoach ? "Yes" : "No"}</Text>
          </View> */}

          <View style={styles.vwOptionsMiddleOption}>
            <View style={styles.vwCapsulePurple}>
              <Text style={styles.txtVwCapsulePurple}>Is Super User</Text>
            </View>
            <SwitchKv state={isSuperUser} setState={setIsSuperUser} />
          </View>

          <View style={styles.vwOptionsMiddleOption}>
            <View style={styles.vwCapsulePurple}>
              <Text style={styles.txtVwCapsulePurple}>Is Admin</Text>
            </View>
            <SwitchKv state={isAdmin} setState={setIsAdmin} />
          </View>

          <View style={styles.vwOptionsMiddleOption}>
            <View style={styles.vwCapsulePurple}>
              <Text style={styles.txtVwCapsulePurple}>Is Coach</Text>
            </View>
            <SwitchKv state={isCoach} setState={setIsCoach} />
          </View>

          <View style={styles.vwInputGroup}>
            <ButtonKv
              onPress={() => createTribeRequest()}
              style={styles.btnTribe}
            >
              Create Tribe
            </ButtonKv>
          </View>
        </View>
      </View>
    </TemplateViewWithTopChildren>
  );
}

const styles = StyleSheet.create({
  vwTest: {
    padding: 2,
    backgroundColor: "#F0F0F0",
    borderRadius: 10,
    width: "100%",
    textAlign: "center",
    // height: 50,
  },

  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
    width: "100%",
  },

  // ------------
  // Top Header
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
  // Top
  // ------------

  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
    maxHeight: "40%",
  },

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

  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  vwOptionsMiddleOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    // gap: 100,
    alignItems: "center",
    backgroundColor: "#F0F0F0",
  },
  vwCapsulePurple: {
    // backgroundColor: "#970F9A",
    borderRadius: 35,
    width: "50%",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  txtVwCapsulePurple: {
    // color: "white",
    fontSize: 20,
    // fontFamily: "ApfelGrotezk",
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
    color: "#AB8EAB",
    backgroundColor: "#C0A9C0",
    // borderColor
  },
});

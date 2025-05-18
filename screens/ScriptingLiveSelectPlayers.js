import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import ScriptingLivePortrait from "./subcomponents/ScriptingLivePortrait";
import { useSelector } from "react-redux";
import Tribe from "../assets/images/navigationAndSmall/Tribe.svg";
import { useState, useEffect } from "react";

export default function ScriptingLiveSelectPlayers({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [playersArray, setPlayersArray] = useState([]);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}>Scripting Live Select Players</Text>
      <Text style={styles.txtSelectedTribeName}>
        {userReducer.tribeArray.find((tribe) => tribe.selected)?.teamName}
      </Text>
    </View>
  );

  const fetchPlayers = async () => {
    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/players/team/${
        userReducer.tribeArray.find((tribe) => tribe.selected)?.id
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
      const tempArray = resJson.players.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      setPlayersArray(tempArray);
      // console.log(`playersArray`, playersArray);
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };
  useEffect(() => {
    fetchPlayers();
  }, []);

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      sizeOfLogo={0}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.vwPlayersTableHeading}>
            <View style={styles.vwTribeCrop}>
              <Tribe width={50} height={60} />
            </View>
            <Text>Players</Text>
          </View>
          <View style={styles.vwPlayersTable}>
            {playersArray.map((player) => (
              <View key={player.id} style={styles.vwPlayer}>
                <Text>
                  {player.shirtNumber}: {player.firstName} {player.lastName}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View style={styles.containerBottom}>
          <Text>Bottom</Text>
        </View>
      </View>
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerTop: {
    // flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    width: Dimensions.get("window").width,
    // margin: 10,
  },
  containerBottom: {
    // flex: 1,
    borderColor: "gray",
    borderWidth: 1,
    width: Dimensions.get("window").width,
    // margin: 10,
  },
  // ----- TOP Childeren -----
  vwTopChildren: {
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },
  txtTopChildren: {
    color: "white",
    fontSize: 20,
    borderBottomWidth: 1,
    borderColor: "white",
  },
  txtSelectedTribeName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  // ----- TOP -----
  vwPlayersTableHeading: {
    flexDirection: "row",
    alignItems: "flex-end",
    // justifyContent: "center",
    gap: 10,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
  vwTribeCrop: {
    height: 45,
  },
  // ------------
  // FlatList
  // ------------
});

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
import ButtonKvImage from "./subcomponents/buttons/ButtonKvImage";
import Tribe from "../assets/images/navigationAndSmall/Tribe.svg";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateTribeArray } from "../reducers/user";

export default function SelectTribeScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const fetchTribes = async () => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/groups`, {
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
      const tempArray = resJson.teamsArray.map((item) => {
        return {
          ...item,
          selected: false,
        };
      });
      console.log(tempArray);
      dispatch(updateTribeArray(tempArray));
    } else {
      const errorMessage =
        resJson?.error ||
        `There was a server error (and no resJson): ${response.status}`;
      alert(errorMessage);
    }
  };

  const fetchTribesOffline = () => {
    const tribesOffline = require("../offlineData/userReducer.json");
    dispatch(updateTribeArray(tribesOffline.tribeArray));
  };

  useEffect(() => {
    if (userReducer.token === "offline") {
      fetchTribesOffline();
    } else {
      fetchTribes();
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

  const createTribeRow = ({ item }) => {
    const isSelected = item.selected;

    return (
      <Pressable
        onPress={() => {
          const tempArray = userReducer.tribeArray.map((tribe) => {
            if (tribe.id === item.id) {
              return {
                ...tribe,
                selected: !tribe.selected,
              };
            } else {
              return {
                ...tribe,
                selected: false,
              };
            }
          });
          dispatch(updateTribeArray(tempArray));
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
          <Tribe />
          {userReducer.tribeArray?.length > 0 ? (
            <FlatList
              data={userReducer.tribeArray}
              renderItem={createTribeRow}
              keyExtractor={(item) => item.id.toString()}
              style={styles.flatListTeamNames}
            />
          ) : (
            <Text>No tribes found</Text>
          )}
        </View>
        <View style={styles.containerBottom}>
          <View style={styles.vwInputGroup}>
            <ButtonKvStd
              onPress={() => navigation.navigate("CreateTribeScreen")}
              style={styles.btnTribe}
            >
              Create Tribe
            </ButtonKvStd>
          </View>
          <View style={styles.vwInputGroup}>
            <ButtonKvStd
              onPress={() => {
                if (
                  userReducer.tribeArray.filter((tribe) => tribe.selected)
                    .length > 0
                ) {
                  navigation.navigate("HomeScreen");
                } else {
                  alert("Please select a tribe");
                }
              }}
              style={styles.btnTribe}
            >
              Select Tribe
            </ButtonKvStd>
          </View>
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
    color: "#AB8EAB",
    backgroundColor: "#C0A9C0",
    // borderColor
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

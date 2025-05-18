import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import ButtonKv from "./subcomponents/buttons/ButtonKv";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { updateTribeArray } from "../reducers/user";

export default function HomeScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [displayTribeList, setDisplayTribeList] = useState(false);
  const dispatch = useDispatch();

  const handleTribeSelect = (selectedId) => {
    const updatedArray = userReducer.tribeArray.map((tribe) => ({
      ...tribe,
      selected: tribe.id === selectedId,
    }));
    dispatch(updateTribeArray(updatedArray));
    setDisplayTribeList(false);
  };
  useEffect(() => {
    console.log(`userReducer.tribeArray`, userReducer.tribeArray);
  }, []);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwCapsuleSuper}>
        <View
          style={displayTribeList ? styles.vwCapsuleExpanded : styles.vwCapsule}
        >
          <View style={[styles.vwLeftCapsule]}>
            {displayTribeList ? (
              // <View style={styles.vwDropdownList}>
              <View>
                {userReducer.tribeArray.map((tribe) => (
                  <TouchableOpacity
                    key={tribe.id}
                    onPress={() => handleTribeSelect(tribe.id)}
                    style={[styles.vwTeamRow]}
                  >
                    <Text
                      style={[
                        styles.txtDropdownTopChildTeamName,
                        tribe.selected && { fontWeight: "bold" },
                      ]}
                    >
                      {tribe.teamName}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <Text style={styles.txtTopChildSelectedTribeName}>
                {userReducer.tribeArray.find((tribe) => tribe.selected)
                  ?.teamName || "No tribe selected"}
              </Text>
            )}
          </View>
          <View style={styles.vwRightCapsule}>
            <TouchableOpacity
              onPress={() => setDisplayTribeList(!displayTribeList)}
              style={styles.btnSelectTribe}
            >
              <Image
                source={
                  displayTribeList
                    ? require("../assets/images/navigationAndSmall/btnBackArrow.png")
                    : require("../assets/images/navigationAndSmall/btnDownArrow.png")
                }
                style={{ width: 40, height: 40 }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  return (
    <TemplateViewWithTopChildren
      navigation={navigation}
      topChildren={topChildren}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <View style={styles.vwInputGroup}>
            <ButtonKv
              onPress={() => navigation.navigate("ScriptingScreen")}
              style={styles.btnHomeNavigation}
            >
              Scripting
            </ButtonKv>
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
  // ----- TOP Childeren -----
  vwTopChildren: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  txtTopChildSelectedTribeName: {
    color: "white",
    fontSize: 20,
  },
  vwCapsuleSuper: {
    position: "relative",
    width: Dimensions.get("window").width * 0.8,
    height: 50,
  },
  vwCapsule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
    backgroundColor: "#806181",
    borderRadius: 10,
    padding: 5,
  },
  vwCapsuleExpanded: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#806181",
    borderRadius: 10,
    padding: 5,
    width: Dimensions.get("window").width * 0.8,
    position: "absolute",
    top: 0,
    zIndex: 1,
  },
  vwLeftCapsule: {
    width: "80%",
  },
  vwLeftCapsuleExpanded: {
    width: Dimensions.get("window").width * 0.8,
    height: "100%",
    position: "absolute",
    top: 0,
    zIndex: 1,
    backgroundColor: "#C0A9C0",
  },
  txtDropdownTopChildTeamName: {
    color: "white",
    fontSize: 20,
  },
  vwDropdownList: {
    padding: 5,
    width: "100%",
    height: "100%",
  },
  vwRightCapsule: {
    height: "100%",
  },

  // ----- TOP -----
  containerTop: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },

  // ----- Bottom -----
  containerBottom: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "gray",
    borderWidth: 1,
    borderStyle: "dashed",
  },
  vwInputGroup: {
    width: "90%",
    alignItems: "center",
    paddingTop: 30,
  },
  btnHomeNavigation: {
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    justifyContent: "center",
    fontSize: 24,
    color: "white",
    backgroundColor: "#806181",
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

  // vwTeamRow: {
  //   padding: 5,
  //   marginVertical: 5,
  //   backgroundColor: "#F0F0F0",
  //   borderRadius: 2.5,
  //   width: "100%",
  //   textAlign: "center",
  //   // height: 50,
  // },

  // ------------
  // Bottom
  // ------------
});

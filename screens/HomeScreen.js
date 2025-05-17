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

  // const topChildren = (
  //   <View style={styles.vwTopChildren}>
  //     <View style={styles.vwCapsule}>
  //       <View style={styles.vwLeftCapsule}>
  //         <Text style={{ color: "white", fontSize: 20 }}>
  //           {
  //             userReducer.tribeArray.filter((tribe) => tribe.selected)[0]
  //               .teamName
  //           }
  //         </Text>
  //       </View>
  //       <View style={styles.vwRightCapsule}>
  //         <TouchableOpacity
  //           title="select tribe"
  //           onPress={() => setDisplayTribeList(!displayTribeList)}
  //           style={styles.btnSelectTribe}
  //         >
  //           {displayTribeList ? (
  //             <Image
  //               source={require("../assets/images/navigationAndSmall/btnBackArrow.png")}
  //               style={{ width: 40, height: 40 }}
  //             />
  //           ) : (
  //             <Image
  //               source={require("../assets/images/navigationAndSmall/btnDownArrow.png")}
  //               style={{ width: 40, height: 40 }}
  //             />
  //           )}
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwCapsule}>
        <View style={styles.vwLeftCapsule}>
          {displayTribeList ? (
            <View style={styles.vwDropdownList}>
              {userReducer.tribeArray.map((tribe) => (
                <TouchableOpacity
                  key={tribe.id}
                  onPress={() => handleTribeSelect(tribe.id)}
                  style={[
                    styles.vwTeamRow,
                    tribe.selected && styles.vwTeamRowSelected,
                  ]}
                >
                  <Text style={{ textAlign: "center" }}>{tribe.teamName}</Text>
                </TouchableOpacity>
              ))}
              {/*
                        // <View style={styles.flatListTeamNames}>
            //   {userReducer.tribeArray.map((tribe) => (
            //     <TouchableOpacity
            //       key={tribe.id}
            //       onPress={() => handleTribeSelect(tribe.id)}
            //       style={[
            //         styles.vwTeamRow,
            //         tribe.selected && styles.vwTeamRowSelected,
            //       ]}
            //     >
            //       <Text style={{ textAlign: "center" }}>{tribe.teamName}</Text>
            //     </TouchableOpacity>
            //   ))}
            // </View>
            */}
            </View>
          ) : (
            <Text style={{ color: "white", fontSize: 20 }}>
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
              // onPress={() => navigation.navigate("CreateTribeScreen")}
              onPress={() => console.log("Scripting")}
              style={styles.btnTribe}
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

  vwCapsule: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
    backgroundColor: "#C0A9C0",
    borderRadius: 10,
    padding: 5,
  },
  vwLeftCapsule: {
    width: "80%",
  },
  vwDropdownList: {
    position: "absolute",
    // top: 55, // adjust depending on how far below the capsule you want it
    // left: 10,
    // right: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 999,
    padding: 5,
    width: "80%",
    height: 100,
    overflow: "hidden",
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
  btnTribe: {
    width: Dimensions.get("window").width * 0.6,
    height: 50,
    justifyContent: "center",
    fontSize: 24,
    color: "white",
    backgroundColor: "#C0A9C0",
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

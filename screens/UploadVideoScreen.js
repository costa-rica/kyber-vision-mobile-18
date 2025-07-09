import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import TemplateViewWithTopChildren from "./subcomponents/TemplateViewWithTopChildren";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { updateTeamsArray } from "../reducers/user";

export default function UploadVideoScreen({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const [displayTeamList, setDisplayTeamList] = useState(false);
  const dispatch = useDispatch();

  const handleTribeSelect = (selectedId) => {
    const updatedArray = userReducer.teamsArray.map((team) => ({
      ...team,
      selected: team.id === selectedId,
    }));
    dispatch(updateTeamsArray(updatedArray));
    setDisplayTeamList(false);
  };
  const topChildren = (
    <View style={styles.vwTopChildren}>
      <View style={styles.vwCapsuleSuper}>
        <View
          style={displayTeamList ? styles.vwCapsuleExpanded : styles.vwCapsule}
        >
          <View style={[styles.vwLeftCapsule]}>
            {displayTeamList ? (
              // <View style={styles.vwDropdownList}>
              <View>
                {userReducer.teamsArray.map((tribe) => (
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
                {userReducer.teamsArray.find((tribe) => tribe.selected)
                  ?.teamName || "No tribe selected"}
              </Text>
            )}
          </View>
          <View style={styles.vwRightCapsule}>
            <TouchableOpacity
              onPress={() => setDisplayTeamList(!displayTeamList)}
              style={styles.btnSelectTribe}
            >
              <Image
                source={
                  displayTeamList
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
      screenName={"UploadVideoScreen"}
    >
      <View style={styles.container}>
        {/* -------- TOP ----- */}
        <View style={styles.containerTop}>
          <Text> Upload Video </Text>
        </View>
        <View style={styles.containerBottom}>
          <Text> Upload Video Bottom </Text>
        </View>
      </View>
    </TemplateViewWithTopChildren>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFDFD",
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
    flex: 1,
  },
  vwEmailButtons: {
    width: "100%",
    // height: 170,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: "10%",
  },
  btnEmailRegister: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "#806181",
    fontSize: 24,
    height: 50,
    justifyContent: "center",
  },
  btnEmailLogin: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "white",
    color: "#585858",
    fontSize: 24,
    borderColor: "#585858",
    borderWidth: 2,
    borderStyle: "solid",
    padding: 5,
    height: 50,
    justifyContent: "center",
  },

  vwLineContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  vwLine: {
    width: "80%",
    borderColor: "#A3A3A3",
    borderWidth: 1,
    borderStyle: "solid",
  },
  vwOr: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  vwSocials: {
    width: Dimensions.get("window").width,
    alignItems: "center",
    // height: 100,
    // backgroundColor: "gray",
  },
  containerBottom: {
    // height: 500,
    width: Dimensions.get("window").width,
    // flex: 1,
    height: 150,
    // backgroundColor: "gray",
    // borderWidth: 2, // Adjust thickness as needed
    // borderColor: "gray", // Change color as desired
    // borderStyle: "dashed",
    alignItems: "center",
    justifyContent: "center",
    // paddingTop: 50,
  },
  btnContinueWithoutLogin: {
    width: Dimensions.get("window").width * 0.8,
    backgroundColor: "transparent",
    color: "#585858",

    justifyContent: "center",
  },
});

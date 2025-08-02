import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Alert,
  TextInput,
} from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
import ButtonKvNoDefaultTextOnly from "../buttons/ButtonKvNoDefaultTextOnly";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function ModalAdminSettingsPlayerCardLinkUser({ onPressYes }) {
  const teamReducer = useSelector((state) => state.team);
  const [userObject, setUserObject] = useState(null);
  const [filteredUsersArray, setFilteredUsersArray] = useState(
    teamReducer.squadMembersArray
  );

  const filterUsers = (searchTerm) => {
    const filteredUsers = teamReducer.squadMembersArray.filter((user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsersArray(filteredUsers);
  };
  // const filterUsers = () => {
  //   const filteredUsers = teamReducer.squadMembersArray.filter((user) => {
  //     return user.username
  //       .toLowerCase()
  //       .includes(userObject?.username.toLowerCase());
  //   });
  //   setFilteredUsersArray(filteredUsers);
  // };

  return (
    <View style={styles.modalContent}>
      <View style={styles.vwModalTitle}>
        <Text style={styles.txtModalTitle}>
          Link user to player{" "}
          <Text style={styles.txtModalTitleTeamName}>
            {teamReducer.teamsArray
              .filter((team) => team.selected)
              .map((team) => team.teamName)}{" "}
            (team id:
            {teamReducer.teamsArray
              .filter((team) => team.selected)
              .map((team) => team.id)}
            )
          </Text>{" "}
        </Text>
      </View>

      <View style={styles.vwInputAndButton}>
        <View style={styles.vwInputWithLabel}>
          <View style={styles.vwInputWithLabelForUnderline}>
            <Text style={styles.txtInputLabel}>username:</Text>
            <TextInput
              placeholder="volleyballer01"
              style={styles.txtInputSearchTerm}
              value={userObject?.username}
              onChangeText={(username) => {
                setUserObject({ ...userObject, username });
                filterUsers(username);
              }}
            />
            {/* <TextInput
              placeholder="volleyballer01"
              style={styles.txtInputEmail}
              value={userObject?.username}
              onChangeText={(username) => {
                setUserObject({ ...userObject, username });
                filterUsers();
              }}
            /> */}
          </View>
        </View>
        <ButtonKvNoDefaultTextOnly
          onPress={() => {
            // console.log("Yes ....");
            if (email) {
              onPressYes(email);
            } else {
              Alert.alert("Email is required");
            }
          }}
          styleView={styles.btnLinkUser}
          //   styleView={[
          //     styles.btnYes,
          //     playerName === teamReducer.selectedPlayerObject?.firstName &&
          //       styles.btnYesSelected,
          //   ]}
          styleText={styles.txtBtnLinkUser}
        >
          Link
        </ButtonKvNoDefaultTextOnly>
      </View>
      <View style={styles.vwUsersFlatListContainer}>
        <FlatList
          data={filteredUsersArray}
          renderItem={({ item }) => (
            <View style={styles.vwUserItem}>
              <Text style={styles.txtUserItem}>{item.username}</Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    // width: "80%",
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.6,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    // justifyContent: "center",
    padding: 10,
    backgroundColor: "#D9CDD9",
    zIndex: 4,
  },
  // Make the title inline
  vwModalTitle: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    alignItems: "center",
    flexShrink: 1,
  },
  txtModalTitle: {
    fontSize: 18,
    textAlign: "center",
  },
  txtModalTitleTeamName: {
    textDecorationLine: "underline",
    textDecorationColor: "black", // optional, defaults to text color
  },
  vwInputAndButton: {
    width: "100%",
    gap: 10,
    marginTop: 10,
    alignItems: "center",
  },
  vwInputWithLabel: {
    backgroundColor: "white",
    padding: 5,
    width: "100%",
  },

  vwInputWithLabelForUnderline: {
    borderBottomWidth: 1,
    borderBottomColor: "#806181",
    // marginBottom: 10,
  },
  txtInputLabel: {
    // fontSize: 16,
    // marginBottom: 5,
    color: "gray",
  },
  txtInputSearchTerm: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    backgroundColor: "white",
    padding: 5,
    // textDecorationLine: "underline",
  },
  btnLinkUser: {
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 20,
    color: "white",
    backgroundColor: "#E8E8E8",
    borderColor: "#806181",
    borderWidth: 2,
    padding: 5,
  },
  // btnYesSelected: {
  //   borderColor: "#FF6666",
  //   borderWidth: 4,
  // },
  txtBtnLinkUser: {
    fontSize: 24,
    color: "#806181",
    justifyContent: "center",
    alignItems: "center",
  },
  vwUsersFlatListContainer: {
    width: "100%",
    marginTop: 10,
    // alignItems: "center",
    backgroundColor: "gray",
    padding: 5,
    borderRadius: 10,
    height: 200,
  },
  // flatList: {
  //   width: "100%",
  //   height: "100%",
  // },
  vwUserItem: {
    width: "100%",
    padding: 5,
    // justifyContent: "center",
    // alignItems: "center",
    // backgroundColor: "white",
    // borderBottomWidth: 1,
    // borderBottomColor: "#806181",
  },
  txtUserItem: {
    fontSize: 16,
    color: "black",
  },
});

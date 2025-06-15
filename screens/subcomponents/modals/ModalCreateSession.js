import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
// import ButtonKvNoDefault from "../buttons/ButtonKvNoDefault";
// import { useDispatch } from "react-redux";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSessionId } from "../../../reducers/script";

export default function ModalSelectLeague({
  isVisibleModalSelectSession,
  setIsVisibleModalSelectSession,
  leaguesArray,
  navigation,
}) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();

  const handleSelectSession = (sessionId) => {
    dispatch(updateSessionId(sessionId));
    setIsVisibleModalSelectSession(false);
    navigation.navigate("ScriptingLiveSelectPlayers");
  };

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Enter session details:
        </Text>

        <FlatList
          data={leaguesArray}
          renderItem={({ item }) => (
            <View style={styles.vwSessionItem}>
              <TouchableOpacity
                style={styles.btnSelectSession}
                onPress={() => handleSelectSession(item.id)}
              >
                <View style={styles.vwItemDetails}>
                  <Text style={styles.txtSessionItemDate}>{item.id}</Text>
                  <Text style={styles.txtSessionItemCity}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.vwButtons}>
          <ButtonKvStd onPress={() => setIsVisibleModalSelectSession(false)}>
            Cancel
          </ButtonKvStd>
          <ButtonKvStd onPress={() => setIsVisibleModalSelectSession(false)}>
            Create
          </ButtonKvStd>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  vwSessionItem: {
    marginBottom: 10,
  },
  btnSelectSession: {
    width: "100%",
    height: 40,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#806181",
  },
  vwItemDetails: {
    flexDirection: "row",
    // justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingLeft: 10,
    gap: 5,
  },
  // vwSessionItemCity: {
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  // },
  txtSessionItemDate: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  txtSessionItemCity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  vwButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 20,
  },
});

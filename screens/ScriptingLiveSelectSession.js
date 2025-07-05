import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  TouchableOpacity,
  Modal,
} from "react-native";
import TemplateViewWithTopChildrenSmall from "./subcomponents/TemplateViewWithTopChildrenSmall";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import ButtonKvStd from "./subcomponents/buttons/ButtonKvStd";
import {
  setScriptingForPlayerObject,
  updatePlayersArray,
  updateSessionsArray,
} from "../reducers/script";
import ModalCreateSession from "./subcomponents/modals/ModalCreateSession";

function formatSessionDateToLocal(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthShort = date.toLocaleString("default", { month: "short" });
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${day} ${monthShort} ${hours}h${minutes}`;
}

export default function ScriptingLiveSelectSession({ navigation }) {
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();
  // const [displayWarning, setDisplayWarning] = useState(false);
  const [isVisibleModalCreateSession, setIsVisibleModalCreateSession] =
    useState(false);
  // const [sessionsArray, setSessionsArray] = useState([]);
  const [leaguesArray, setLeaguesArray] = useState([]);

  const topChildren = (
    <View style={styles.vwTopChildren}>
      <Text style={styles.txtTopChildren}>Scripting Live Select Session</Text>
      <Text style={styles.txtSelectedTribeName}>
        {userReducer.teamsArray.find((tribe) => tribe.selected)?.teamName}
      </Text>
    </View>
  );

  useEffect(() => {
    console.log("--- scriptReducer.sessionsArray ---");
    console.log(scriptReducer.sessionsArray);
  }, []);

  const fetchLeaguesArray = async () => {
    console.log(" -- fetchLeaguesArray ---");

    const response = await fetch(
      `${process.env.EXPO_PUBLIC_API_URL}/leagues/${
        userReducer.teamsArray.filter((team) => team.selected)[0].id
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
    console.log("--- here are the leagues ---");
    console.log(resJson);
    let tempArray = [];
    resJson.leaguesArray.forEach((league) => {
      tempArray.push({
        ...league,
        selected: false,
      });
    });
    setLeaguesArray(tempArray);
  };

  const handleSelectSession = (session) => {
    // dispatch(setScriptingForPlayerObject({ sessionId }));
    // navigation.navigate("ScriptingLive");
    console.log(" --- handleSelectSession ---");
    console.log(session);
    let tempArray = scriptReducer.sessionsArray.map((item) => {
      if (item.id === session.id) {
        return {
          ...item,
          selected: true,
        };
      }
      return { ...item, selected: false };
    });
    dispatch(updateSessionsArray(tempArray));
    navigation.navigate("ScriptingLiveSelectPlayers");
    // dispatch(setScriptingForPlayerObject(session));
  };

  return (
    <TemplateViewWithTopChildrenSmall
      navigation={navigation}
      topChildren={topChildren}
      sizeOfLogo={0}
    >
      <View style={styles.container}>
        <View style={styles.containerTop}>
          <Text style={{ fontSize: 18, marginBottom: 20 }}>
            Which session do you want to script for?
          </Text>
          <FlatList
            data={scriptReducer.sessionsArray}
            renderItem={({ item }) => (
              <View style={styles.vwSessionItem}>
                <TouchableOpacity
                  style={styles.btnSelectSession}
                  onPress={() => handleSelectSession(item)}
                >
                  <View style={styles.vwSessionItemDate}>
                    <Text style={styles.txtSessionItemDate}>
                      {/* {item.sessionDateString} */}
                      {formatSessionDateToLocal(item.sessionDate)}
                    </Text>
                  </View>
                  <View style={styles.vwSessionItemCity}>
                    <Text style={styles.txtSessionItemCity}>{item.city}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.vwButtons}>
            <ButtonKvStd
              style={{ width: "100%", backgroundColor: "#A3A3A3" }}
              onPress={() => {
                console.log("New Live Session");
                fetchLeaguesArray();
                setIsVisibleModalCreateSession(true);
              }}
            >
              New Live Session
            </ButtonKvStd>
          </View>
        </View>
      </View>
      {isVisibleModalCreateSession && (
        <Modal
          visible={isVisibleModalCreateSession}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsVisibleModalCreateSession(false)}
        >
          <View style={styles.modalOverlay}>
            <ModalCreateSession
              isVisibleModalCreateSession={isVisibleModalCreateSession}
              setIsVisibleModalCreateSession={setIsVisibleModalCreateSession}
              leaguesArray={leaguesArray}
              setLeaguesArray={setLeaguesArray}
              navigation={navigation}
            />
          </View>
        </Modal>
      )}
    </TemplateViewWithTopChildrenSmall>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    justifyContent: "center",
    gap: 10,
    paddingVertical: 10,
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
  containerTop: {
    flex: 1,
    // borderColor: "gray",
    // borderWidth: 1,
    // borderStyle: "dashed",
    width: Dimensions.get("window").width * 0.9,
    // margin: 10,
  },

  // ----- container -----

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
  vwSessionItemDate: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  vwSessionItemCity: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  txtSessionItemDate: {
    fontSize: 16,
    // fontWeight: "bold",
  },
  txtSessionItemCity: {
    fontSize: 16,
    fontWeight: "bold",
  },

  // ------------
  // Bottom
  // ------------
  containerBottom: {
    height: "15%",
    width: Dimensions.get("window").width * 0.9,
  },

  vwButtons: {
    width: "100%",
    gap: 10,
    marginBottom: 10,
  },

  // ------------
  // Modal
  // ------------

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
});

import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
// import ButtonKvNoDefaultTextOnly from "../buttons/ButtonKvNoDefaultTextOnly";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

import { updateSessionsArray } from "../../../reducers/script";

export default function ModalUploadVideo({
  isVisibleModalUploadVideo,
  setIsVisibleModalUploadVideo,
  //   leaguesArray,
  //   setLeaguesArray,
  //   fetchLeaguesArray,
}) {
  const userReducer = useSelector((state) => state.user);
  const scriptReducer = useSelector((state) => state.script);
  const dispatch = useDispatch();

  //   const handleSelectSession = (sessionId) => {
  //     let tempArray = [...leaguesArray];
  //     tempArray.forEach((league) => {
  //       if (league.id === sessionId) {
  //         league.selected = true;
  //       } else {
  //         league.selected = false;
  //       }
  //     });
  //     setLeaguesArray(tempArray);
  //   };

  //   // #GoodApiCall
  //   // --> This is good template for API calls
  //   const handleCreateSession = async () => {
  //     const leagueId = leaguesArray.find((league) => league.selected)?.id;
  //     const contractLeagueTeamId = leaguesArray.find(
  //       (league) => league.selected
  //     )?.contractLeagueTeamId;
  //     console.log("leagueId", leagueId);
  //     console.log("contractLeagueTeamId", contractLeagueTeamId);

  //     if (!leagueId) {
  //       // console.warn("No league selected.");
  //       alert("No league selected.");
  //       return;
  //     }

  //     //   const combinedDateTime = new Date(
  //     //     selectedDate.getFullYear(),
  //     //     selectedDate.getMonth(),
  //     //     selectedDate.getDate(),
  //     //     selectedTime.getHours(),
  //     //     selectedTime.getMinutes()
  //     //   );

  //     //   const sessionDate = combinedDateTime.toISOString();

  //     const bodyObj = {
  //       teamId: leagueId,
  //       contractLeagueTeamId,
  //       sessionDate,
  //     };

  //     try {
  //       const response = await fetch(
  //         `${process.env.EXPO_PUBLIC_API_URL}/sessions/create`,
  //         {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //             Authorization: `Bearer ${userReducer.token}`,
  //           },
  //           body: JSON.stringify(bodyObj),
  //         }
  //       );

  //       console.log("Received response:", response.status);
  //       const contentType = response.headers.get("Content-Type");

  //       if (contentType?.includes("application/json")) {
  //         const resJson = await response.json();
  //         console.log("--- Here is the NEW session ---");
  //         console.log(resJson);
  //         if (resJson.result) {
  //           alert("Session created successfully");
  //           let tempArray = [...scriptReducer.sessionsArray];
  //           tempArray.push(resJson.sessionNew);
  //           dispatch(updateSessionsArray(tempArray));
  //           setIsVisibleModalCreateSession(false);
  //         } else {
  //           alert(`Failed to create session: ${resJson.error}`);
  //         }
  //       } else {
  //         console.warn("Unexpected response type");
  //         alert("Unexpected response type");
  //       }
  //     } catch (error) {
  //       console.error("❌ Failed to create session:", error);
  //       alert(`Failed to create session: ${error}`);
  //     }
  //   };

  return (
    <View style={styles.modalWrapper}>
      <View style={styles.modalContent}>
        <Text style={{ fontSize: 18, marginBottom: 20 }}>
          Link video to session
        </Text>

        {scriptReducer.sessionsArray.map((session) => (
          <View style={styles.vwSessionItem} key={session.id}>
            <TouchableOpacity
              style={[
                styles.btnSelectSession,
                session.selected && styles.btnSelectSessionSelected,
              ]}
              onPress={() => console.log(session)}
            >
              <View style={styles.vwItemDetails}>
                <Text style={styles.txtSessionItemDate}>{session.id}</Text>
                <Text style={styles.txtSessionItemCity}>
                  {session.sessionDateString}
                </Text>
                <Text style={styles.txtSessionItemCity}>{session.city}</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* <FlatList
          data={leaguesArray}
          renderItem={({ item }) => (
            <View style={styles.vwSessionItem}>
              <TouchableOpacity
                style={[
                  styles.btnSelectSession,
                  item.selected && styles.btnSelectSessionSelected,
                ]}
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
        /> */}

        <View style={styles.vwButtons}>
          <ButtonKvStd onPress={() => setIsVisibleModalUploadVideo(false)}>
            Cancel
          </ButtonKvStd>
          {/* <ButtonKvStd onPress={() => handleCreateSession()}>
              Create
            </ButtonKvStd> */}
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
  btnSelectSessionSelected: {
    backgroundColor: "#806181",
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

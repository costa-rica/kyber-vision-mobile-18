import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import ButtonKvStd from "../buttons/ButtonKvStd";
import ButtonKvNoDefault from "../buttons/ButtonKvNoDefault";
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
    // <View style={styles.modalWrapper}>
    <View style={styles.modalContent}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Link video to session
      </Text>

      {/* {scriptReducer.sessionsArray.map((session) => (
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
        ))} */}

      <View style={styles.vwVideoHeader}>
        <Text style={styles.txtVideoItemDate}>Date</Text>
        <Text style={styles.txtVideoItemCity}>City</Text>
        <Text style={styles.txtVideoItemSessionId}>Session ID</Text>
      </View>
      <View style={styles.underline} />
      <FlatList
        data={scriptReducer.sessionsArray}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <ButtonKvNoDefault
            onPress={() => console.log(item)}
            styleView={styles.btnVideoItem}
          >
            <Text style={styles.txtVideoItemDate}>
              {item.sessionDateString}
            </Text>
            <Text style={styles.txtVideoItemCity}>{item.city}</Text>
            <Text style={styles.txtVideoItemSessionId}>{item.id}</Text>
          </ButtonKvNoDefault>
        )}
      />

      <View style={styles.vwButtons}>
        <ButtonKvStd onPress={() => setIsVisibleModalUploadVideo(false)}>
          Cancel
        </ButtonKvStd>
        {/* <ButtonKvStd onPress={() => handleCreateSession()}>
              Create
            </ButtonKvStd> */}
      </View>
    </View>
    // </View>
  );
}

const styles = StyleSheet.create({
  //   modalWrapper: {
  //     flex: 1,
  //     justifyContent: "center",
  //     alignItems: "center",
  //     // width: Dimensions.get("window").width * 0.95,
  //     height: Dimensions.get("window").height * 0.9,
  //   },
  modalContent: {
    // width: "80%",
    width: Dimensions.get("window").width * 0.95,
    height: Dimensions.get("window").height * 0.5,
    padding: 2,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
  vwVideoHeader: {
    flexDirection: "row",
    alignItems: "center",
    // justifyContent: "space-between",
    paddingHorizontal: 5,
    marginTop: 10,
    width: Dimensions.get("window").width * 0.8,
  },
  underline: {
    height: 1,
    backgroundColor: "#ccc",
    width: Dimensions.get("window").width * 0.9,
    alignSelf: "center",
    marginBottom: 5,
  },
  txtVideoItemDate: {
    width: Dimensions.get("window").width * 0.3,
    color: "black",
    fontSize: 11,
    // backgroundColor: "red",
  },
  txtVideoItemCity: {
    width: Dimensions.get("window").width * 0.3,
    color: "black",
    fontSize: 11,
    // textAlign: "center",
  },
  txtVideoItemSessionId: {
    width: Dimensions.get("window").width * 0.2,
    color: "black",
    fontSize: 11,
    textAlign: "center",
    // backgroundColor: "red",
  },
  btnVideoItem: {
    backgroundColor: "#E8E8E8",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginVertical: 5,
    // width: Dimensions.get("window").width * 0.95,
    width: "100%",
    borderColor: "#806181",
    borderWidth: 1,
  },
});

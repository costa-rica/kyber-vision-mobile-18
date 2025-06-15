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
import DateTimePicker from "@react-native-community/datetimepicker";
import { Platform } from "react-native";
import { useSelector } from "react-redux";

export default function ModalCreateSession({
  isVisibleModalCreateSession,
  setIsVisibleModalCreateSession,
  leaguesArray,
  setLeaguesArray,
}) {
  const userReducer = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChangeDate = (event, date) => {
    setShowDatePicker(false);
    if (date) {
      setSelectedDate(date);
    }
  };
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const onChangeTime = (event, time) => {
    setShowTimePicker(false);
    if (time) {
      setSelectedTime(time);
    }
  };
  const handleSelectSession = (sessionId) => {
    let tempArray = [...leaguesArray];
    tempArray.forEach((league) => {
      if (league.id === sessionId) {
        league.selected = true;
      } else {
        league.selected = false;
      }
    });
    setLeaguesArray(tempArray);
  };

  const handleCreateSession = async () => {
    const leagueId = leaguesArray.find((league) => league.selected)?.id;

    if (!leagueId) {
      // console.warn("No league selected.");
      alert("No league selected.");
      return;
    }

    const combinedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      selectedTime.getHours(),
      selectedTime.getMinutes()
    );

    const sessionDate = combinedDateTime.toISOString();

    const bodyObj = {
      teamId: leagueId,
      sessionDate,
    };

    try {
      const response = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/sessions/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userReducer.token}`,
          },
          body: JSON.stringify(bodyObj),
        }
      );

      console.log("Received response:", response.status);
      const contentType = response.headers.get("Content-Type");

      if (contentType?.includes("application/json")) {
        const resJson = await response.json();
        console.log("✅ Session created:", resJson);
      } else {
        console.warn("Unexpected response type");
      }
    } catch (error) {
      console.error("❌ Failed to create session:", error);
    }
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
        />

        <View style={{ marginBottom: 20, width: "100%" }}>
          <TouchableOpacity
            onPress={() => setShowDatePicker(true)}
            style={{
              borderColor: "#806181",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text>
              {selectedDate.toLocaleDateString("fr-FR", {
                weekday: "short",
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={selectedDate}
              mode="date"
              display={Platform.OS === "ios" ? "inline" : "default"}
              onChange={onChangeDate}
            />
          )}
        </View>
        <View style={{ marginBottom: 20, width: "100%" }}>
          <TouchableOpacity
            onPress={() => setShowTimePicker(true)}
            style={{
              borderColor: "#806181",
              borderWidth: 1,
              borderRadius: 5,
              padding: 10,
            }}
          >
            <Text>
              {selectedTime.toLocaleTimeString("fr-FR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </TouchableOpacity>

          {showTimePicker && (
            <DateTimePicker
              value={selectedTime}
              mode="time"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onChangeTime}
              is24Hour={true}
            />
          )}
        </View>
        <View style={styles.vwButtons}>
          <ButtonKvStd onPress={() => setIsVisibleModalCreateSession(false)}>
            Cancel
          </ButtonKvStd>
          <ButtonKvStd onPress={() => handleCreateSession()}>
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

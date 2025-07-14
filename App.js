import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SelectTeamScreen from "./screens/SelectTeamScreen";
import CreateTribeScreen from "./screens/CreateTribeScreen";
import HomeScreen from "./screens/HomeScreen";
import ScriptingLive from "./screens/ScriptingLive";
import ScriptingLiveSelectPlayers from "./screens/ScriptingLiveSelectPlayers";
import ReviewSelectionScreen from "./screens/ReviewSelection";
import ReviewVideo from "./screens/ReviewVideo";
import ScriptingLiveSelectSession from "./screens/ScriptingLiveSelectSession";
import UploadVideoScreen from "./screens/UploadVideoScreen";
import ScriptingSyncVideoSelection from "./screens/ScriptingSyncVideoSelection";
import ScriptingSyncVideo from "./screens/ScriptingSyncVideo";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import review from "./reducers/review";
import script from "./reducers/script";
import upload from "./reducers/upload";
import sync from "./reducers/sync";

const store = configureStore({
  reducer: { user, script, review, upload, sync },
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SelectTeamScreen" component={SelectTeamScreen} />
          <Stack.Screen
            name="CreateTribeScreen"
            component={CreateTribeScreen}
          />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ScriptingLive" component={ScriptingLive} />
          <Stack.Screen
            name="ScriptingLiveSelectPlayers"
            component={ScriptingLiveSelectPlayers}
          />
          <Stack.Screen
            name="ReviewSelectionScreen"
            component={ReviewSelectionScreen}
          />
          <Stack.Screen name="ReviewVideo" component={ReviewVideo} />
          <Stack.Screen
            name="ScriptingLiveSelectSession"
            component={ScriptingLiveSelectSession}
          />
          <Stack.Screen
            name="UploadVideoScreen"
            component={UploadVideoScreen}
          />
          <Stack.Screen
            name="ScriptingSyncVideoSelection"
            component={ScriptingSyncVideoSelection}
          />
          <Stack.Screen
            name="ScriptingSyncVideo"
            component={ScriptingSyncVideo}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

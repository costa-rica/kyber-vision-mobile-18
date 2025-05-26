import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import SelectTribeScreen from "./screens/SelectTribeScreen";
import CreateTribeScreen from "./screens/CreateTribeScreen";
import HomeScreen from "./screens/HomeScreen";
import ScriptingLive from "./screens/ScriptingLive";
import ScriptingLiveSelectPlayers from "./screens/ScriptingLiveSelectPlayers";
import ReviewSelectionScreen from "./screens/ReviewSelection";
import ReviewVideo from "./screens/ReviewVideo";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import user from "./reducers/user";
import review from "./reducers/review";
import script from "./reducers/script";

const store = configureStore({
  reducer: { user, script, review },
});

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen
            name="SelectTribeScreen"
            component={SelectTribeScreen}
          />
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

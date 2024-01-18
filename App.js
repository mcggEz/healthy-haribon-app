import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Onboarding from "./screens/onboarding";
import Signup from "./screens/signup";
import Signin from "./screens/signin";
import ForgotPassword from "./screens/forgot-password";
import Dashboard from "./screens/dashboard";
import Menu from "./screens/menu";
import DiaryMeList from "./screens/diary-me-list";
import DiaryMeNote from "./screens/diary-me-note";
import DiaryMeEdit from "./screens/diary-me-edit";

const Stack = createNativeStackNavigator();

// Define an array of your screens
const screens = [
  { name: "Onboarding", component: Onboarding },
  { name: "Signup", component: Signup },
  { name: "Signin", component: Signin },
  { name: "ForgotPassword", component: ForgotPassword },
  { name: "Dashboard", component: Dashboard },
  { name: "Menu", component: Menu },
  {
    name: "DiaryMeList",
    component: DiaryMeList,
  },
  {
    name: "DiaryMeNote",
    component: DiaryMeNote,
  },
  {
    name: "DiaryMeEdit",
    component: DiaryMeEdit,
  },
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Dashboard">
        {screens.map((screen) => (
          <Stack.Screen
            key={screen.name} // Ensure each screen has a unique key
            name={screen.name}
            component={screen.component}
            options={{
              headerShown: false,
            }}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

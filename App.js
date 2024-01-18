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
import Stories from "./screens/stories";
import Settings from "./screens/settings";
import BookContent from "./screens/stories-book-content";
import Profile from "./screens/profile";
import Haritalk from "./screens/haritalk";

import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

const Stack = createNativeStackNavigator();

const firebaseConfig = {
  apiKey: "AIzaSyDJYj9nk8UpFRqWyKX3wa0upxEdZfh5Ehg",
  authDomain: "healthy-haribon-mobile-app.firebaseapp.com",
  databaseURL: "https://healthy-haribon-mobile-app.firebaseio.com",
  projectId: "healthy-haribon-mobile-app",
  storageBucket: "healthy-haribon-mobile-app.appspot.com",
  // messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "1:1085852481451:android:38e34acd8a385b0f2504e",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

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
  {
    name: "Stories",
    component: Stories,
  },
  {
    name: "Settings",
    component: Settings,
  },
  {
    name: "BookContent",
    component: BookContent,
  },
  {
    name: "Profile",
    component: Profile,
  },
  {
    name: "Haritalk",
    component: Haritalk,
  },
];

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Onboarding">
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

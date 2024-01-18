import React from "react";
import { Text, View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { User, Settings, LogOut, ChevronRight } from "lucide-react-native";

const menuItems = [
  {
    title: "Profile",
    screen: "Profile",
    icon: (
      <User
        size={24}
        color="white"
        style={{
          marginRight: 15,
        }}
      />
    ),
  },
  {
    title: "Settings",
    screen: "Settings",
    icon: (
      <Settings
        size={24}
        color="white"
        style={{
          marginRight: 15,
        }}
      />
    ),
  },
  {
    title: "Logout",
    screen: "Signin",
    icon: (
      <LogOut
        size={24}
        color="white"
        style={{
          marginRight: 15,
        }}
      />
    ),
  },
];

export default function Menu() {
  const navigation = useNavigation();
  return (
    <View style={styles.menuContainer}>
      {menuItems.map((item, index) => (
        <View key={index} style={styles.menuItemWrapper}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              navigation.navigate(item.screen);
            }}
          >
            {item.icon}
            <Text style={styles.menuItemText}>{item.title}</Text>
          </TouchableOpacity>
          {index !== menuItems.length - 1 && <View style={styles.separator} />}
        </View>
      ))}
      {/* Add a back button absolute bottom right corner */}
      <TouchableOpacity
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        <Text style={{ color: "#fff", fontSize: 18 }}>Back</Text>
        <ChevronRight size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  menuContainer: {
    position: "relative",
    flex: 1,
    backgroundColor: "#137084", // New background color
    paddingTop: 80, // Adjust as needed for your layout
  },
  menuItemWrapper: {
    paddingHorizontal: 20, // Padding for the menu items wrapper
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 20, // Space above and below the text
  },
  menuItemText: {
    color: "#fff", // White color for text
    fontSize: 18, // Font size for menu items
    fontWeight: "bold", // Font weight for menu items
  },
  separator: {
    borderBottomColor: "#ffffff80", // White color with opacity for separator
    borderBottomWidth: 1, // Height of separator line
    marginVertical: 8, // Space above and below the separator
  },
});

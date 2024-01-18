import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Menu, Notebook, Book, MessageCircleIcon } from "lucide-react-native";

export default function Dashboard() {
  const navigation = useNavigation();

  const features = [
    {
      title: "DiaryMe",
      description:
        "Keep track of your daily activities and your healing process.",
      iconName: "journal",
      icon: <Notebook size={24} color="black" style={{ marginRight: 15 }} />,
      onPressed: () => {
        navigation.navigate("DiaryMeList");
      },
    },
    {
      title: "Stories",
      description: "Access e-books ranging from inspirational to life stories.",
      iconName: "book",
      icon: <Book size={24} color="black" style={{ marginRight: 15 }} />,
      onPressed: () => {
        navigation.navigate("Stories");
      },
    },
    {
      title: "HariTalk",
      description: "Consult with experts for personalized health advice.",
      iconName: "people",
      icon: (
        <MessageCircleIcon
          size={24}
          color="black"
          style={{ marginRight: 15 }}
        />
      ),
      onPressed: () => {
        navigation.navigate("HariTalk");
      },
    },
  ];

  function FeatureCard({ title, description, iconName, icon, onPressed }) {
    return (
      <TouchableOpacity
        onPress={() => {
          onPressed();
        }}
      >
        <View style={styles.card}>
          {
            // If icon is not null, show the icon
            icon && icon
          }
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardDescription}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Burger Menu Top Left Corner */}
      <TouchableOpacity
        style={styles.menuIcon}
        onPress={() => {
          navigation.navigate("Menu");
        }}
      >
        {/* <Text>Menu</Text> */}
        <Menu
          color="black"
          style={{
            margin: 15,
          }}
        />
      </TouchableOpacity>

      {/* User greeting and search bar */}
      <Text style={styles.greeting}>How are you?</Text>

      {/* Description */}
      <Text
        style={{
          fontSize: 16,
          marginHorizontal: 20,
          marginBottom: 20,
          textAlign: "center",
          color: "gray",
        }}
      >
        Welcome to Healthy Haribon, a community for people who are on the road
        to recovery.
      </Text>

      {/* Feature Cards */}
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          title={feature.title}
          description={feature.description}
          iconName={feature.iconName}
          icon={feature.icon}
          onPressed={feature.onPressed}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50, // Padding to avoid the notch
    backgroundColor: "#FFF",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 20,
    textAlign: "center",
  },
  searchBar: {
    height: 40,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#EFEFEF",
    borderRadius: 20,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: "center", // Center card items horizontally
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  cardDescription: {
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
});

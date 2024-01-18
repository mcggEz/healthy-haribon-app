import React, { useState, useEffect } from "react";
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
import BurgerMenu from "../components/menu-bar";

import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

export default function Dashboard() {
  const navigation = useNavigation();

  const auth = getAuth();
  const db = getFirestore();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (auth.currentUser) {
        const userDocRef = doc(db, "users", auth.currentUser.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          setUserData(userDocSnapshot.data());
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser, db]);

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
      title: "Haritalk",
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
        navigation.navigate("Haritalk");
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
      <BurgerMenu />

      {/* User greeting and search bar */}
      <Text style={styles.greeting}>
        How are you,{" "}
        {
          // If userData is not null, show the user's name
          userData && userData?.fullName?.split(" ")[0]
        }
        ?
      </Text>

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
    paddingTop: 20, // Padding to avoid the notch
    backgroundColor: "#FFF",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 100,
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

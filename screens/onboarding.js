import React from "react";
import { StyleSheet, Image, Text, View, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

function Page1() {
  return (
    <View>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/upnatcfv44-230%3A1310?alt=media&token=d95faf7b-9cdf-4ad3-a453-165b40031b90",
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.WelcomeToHealthyHari}>
        Welcome to Healthy Haribon
      </Text>
      <Text style={styles.TakeAStepTowardsBett}>
        Take a step towards better mental health. We are here to support you on
        your journey to emotional well-being.
      </Text>
    </View>
  );
}

function Page2() {
  return (
    <View>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/34j95h0q853-230%3A1319?alt=media&token=57279797-57a1-4b79-b6db-28d444ffe63b",
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.WelcomeToHealthyHari}>Track Your Heatlh</Text>
      <Text style={styles.TakeAStepTowardsBett}>
        Easily monitor your emotions daily. Understand your feelings, and take
        control of your mental well-being.
      </Text>
    </View>
  );
}

function Page3() {
  return (
    <View>
      <Image
        source={{
          uri: "https://firebasestorage.googleapis.com/v0/b/unify-v3-copy.appspot.com/o/a9mjbavf5iu-230%3A1334?alt=media&token=39b15b99-75ca-4f4f-8561-7d01d1d32170",
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.WelcomeToHealthyHari}>Access Valuable resources</Text>
      <Text style={styles.TakeAStepTowardsBett}>
        Explore a vast library of resources. Empower yourself with knowledge to
        foster positive health.
      </Text>
    </View>
  );
}

export default function Onboarding() {
  const navigation = useNavigation();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const totalPages = 3;

  const handleNext = () => {
    setCurrentPageIndex((prevIndex) => Math.min(prevIndex + 1, totalPages - 1)); // Ensure index doesn't exceed total pages
  };

  const handlePrevious = () => {
    setCurrentPageIndex((prevIndex) => Math.max(prevIndex - 1, 0)); // Ensure index doesn't go below 0
  };

  return (
    <View style={styles.Group371}>
      <View style={styles.content}>
        {currentPageIndex === 0 && <Page1 />}
        {currentPageIndex === 1 && <Page2 />}
        {currentPageIndex === 2 && <Page3 />}
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="Previous"
          onPress={handlePrevious}
          style={styles.button}
        />
        <Button
          title="Next"
          onPress={() => {
            if (currentPageIndex === 2) {
              navigation.navigate("Signin");
            } else {
              handleNext();
            }
          }}
          style={styles.button}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1, // Take up all available space
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  button: {
    flex: 1, // Make buttons stretch to fill available space
  },
  buttonContainer: {
    display: "flex",
    flexDirection: "row",
    padding: 20, // Adjust as needed
    gap: 10, // Adjust as needed
    justifyContent: "space-between", // Uncomment if needed
    width: "100%",
  },
  AndroidLarge1: {
    width: 400,
    height: 844,
    paddingTop: 67,
    paddingBottom: 90,
    borderRadius: 8,
    boxSizing: "border-box",
    backgroundColor: "rgba(245,250,254,1)",
  },
  Group371: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    height: "100%",
    boxSizing: "border-box",
  },
  WelcomeToHealthyHari: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(114,196,244,1)",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 24,
  },
  TakeAStepTowardsBett: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(127,127,127,1)",
    fontSize: 16,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
    marginBottom: 24,
    width: 300,
  },
  Frame3916: {
    width: 44,
    height: 12,
  },
  Group115: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    boxSizing: "border-box",
    marginLeft: 100,
    marginTop: 100,
  },
  Skip: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(135,135,135,0.88)",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "400",
    textAlign: "center",
  },
  Next: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: "rgba(114,196,244,0.88)",
    fontSize: 24,
    lineHeight: 24,
    fontWeight: "600",
    textAlign: "center",
  },
});

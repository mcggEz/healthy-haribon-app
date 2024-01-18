import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, deleteUser } from "firebase/auth";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";
import { ChevronLeft } from "lucide-react-native";

export default function Settings() {
  const navigation = useNavigation();
  const auth = getAuth();
  const currentUser = auth.currentUser;
  const db = getFirestore();

  const handleDeactivateAccount = () => {
    if (currentUser) {
      // Delete user data from Firestore
      const userDocRef = doc(db, "users", currentUser.uid);

      deleteDoc(userDocRef)
        .then(() => {
          // Now that user data is deleted from Firestore, proceed to delete the account
          deleteUser(currentUser)
            .then(() => {
              Alert.alert(
                "Account Deleted",
                "Your account has been successfully deleted."
              );
              navigation.navigate("Signup"); // Navigate to signup or login screen after account deletion
            })
            .catch((error) => {
              Alert.alert("Error", error.message);
            });
        })
        .catch((error) => {
          Alert.alert("Error", error.message);
        });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          marginTop: 20,
          position: "absolute",
          left: 20,
          top: 40,
        }}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={16} color="black" style={{ marginRight: 5 }} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Settings</Text>

      <TouchableOpacity style={styles.button} onPress={handleDeactivateAccount}>
        <Text style={styles.buttonText}>Deactivate Account</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ecf0f1",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    padding: 15,
    backgroundColor: "red",
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
});

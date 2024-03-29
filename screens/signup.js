import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

export default function Signup() {
  const navigation = useNavigation();
  const [isTermsAgreed, setIsTermsAgreed] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const auth = getAuth();
  const firestore = getFirestore();

  const handleSignup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // Store additional user data in Firestore
        const userRef = doc(firestore, "users", user.uid);
        setDoc(userRef, {
          fullName: fullName,
          email: email,
        })
          .then(() => {
            Alert.alert(
              "Account Created",
              "Your account has been created successfully!"
            );
            navigation.navigate("Signin");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Alert.alert("Error", errorMessage);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.appTitle}>Healthy Haribon</Text>

      <Text style={styles.title}>Sign Up</Text>
      <Text style={styles.subtitle}>Create a new account</Text>

      <TextInput
        style={styles.input}
        placeholder="Full Name"
        keyboardType="default"
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        onChangeText={setPassword}
      />

      <View style={styles.checkboxContainer}>
        <Switch
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isTermsAgreed ? "#3498db" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={setIsTermsAgreed}
          value={isTermsAgreed}
        />
        <Text style={styles.label}>I agree to terms and conditions</Text>
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: isTermsAgreed ? "#3498db" : "gray" },
        ]}
        disabled={!isTermsAgreed}
        onPress={handleSignup}
      >
        <Text style={styles.buttonText}>Create Account</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Signin");
        }}
      >
        <Text style={styles.loginText}>
          Already have an account?{" "}
          <Text style={styles.loginButton}>Sign In</Text>
        </Text>
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
    padding: 20,
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    width: "100%",
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    width: "100%",
    marginBottom: 20,
    color: "gray",
  },
  input: {
    width: "100%",
    height: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  loginText: {
    marginTop: 20,
  },
  loginButton: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function Signin() {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      {/* Replace with your image component */}

      <Text style={styles.appTitle}>Healthy Haribon</Text>

      <Text style={styles.title}>Welcome Back!</Text>
      <Text style={styles.subtitle}>Continue your Healthy journey</Text>

      <TextInput
        style={styles.input}
        placeholder="Email Address"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ForgotPassword");
        }}
      >
        <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("Dashboard");
        }}
      >
        <Text style={styles.buttonText}>Log in</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>or</Text>

      <TouchableOpacity style={[styles.button, styles.googleButton]}>
        <Text style={[styles.buttonText, { marginLeft: 10 }]}>
          Sign-in with Google
        </Text>
      </TouchableOpacity>

      <View style={styles.signUpTextContainer}>
        <Text>Don't have an account? </Text>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("Signup");
          }}
        >
          <Text style={styles.signUpButton}>Sign Up</Text>
        </TouchableOpacity>
      </View>
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
  logo: {
    width: "100%",
    height: 200, // Adjust according to your image aspect ratio
    marginBottom: 20,
    resizeMode: "contain",
  },
  appTitle: {
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    width: "100%",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 20,
    width: "100%",
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
  forgotPasswordText: {
    color: "#3498db",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "gray",
    marginBottom: 10,
  },
  googleButton: {
    backgroundColor: "#db4a39",
  },
  signUpTextContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  signUpButton: {
    color: "#3498db",
    fontWeight: "bold",
  },
});

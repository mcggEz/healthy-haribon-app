import { ChevronLeft } from "lucide-react-native";
import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const Haritalk = () => {
  const navigation = useNavigation();
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
          zIndex: 1,
        }}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={16} color="black" style={{ marginRight: 5 }} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <WebView
        source={{
          uri: "https://www.chatbase.co/chatbot-iframe/AMTPPuXPJQe08Q1m3qfms",
        }}
        style={styles.webview}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    marginTop: 110,
    flex: 1,
  },
});

export default Haritalk;

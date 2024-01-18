import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeft } from "lucide-react-native";

const BookContent = ({ route }) => {
  const navigation = useNavigation();
  const {
    bookContent,
    bookTitle,
    bookAuthor,
    bookPublishedDate,
    bookTotalPages,
  } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Back */}
      <TouchableOpacity
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 16,
          marginTop: 20,
        }}
        onPress={() => navigation.goBack()}
      >
        <ChevronLeft size={16} color="black" style={{ marginRight: 5 }} />
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
      <View style={styles.header}>
        <Text style={styles.title}>{bookTitle}</Text>
        <Text style={styles.author}>{bookAuthor}</Text>
        <Text style={styles.date}>{bookPublishedDate}</Text>
        <Text style={styles.pages}>{`${bookTotalPages} Pages`}</Text>
      </View>
      {/* Book Content */}
      <View style={styles.bookContentContainer}>
        <Text>{bookContent}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
  },
  author: {
    fontSize: 18,
    fontStyle: "italic",
    marginBottom: 8,
  },
  date: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  pages: {
    fontSize: 14,
    color: "#666",
  },
});

const markdownStyles = {
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
  heading1: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  heading2: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 16,
    marginBottom: 8,
  },
  heading3: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 14,
    marginBottom: 6,
  },
  heading4: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
    marginBottom: 4,
  },
  heading5: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 2,
  },
  heading6: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 8,
    marginBottom: 2,
  },
};

export default BookContent;

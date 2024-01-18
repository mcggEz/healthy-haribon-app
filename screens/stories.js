import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { db } from "../App";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { useNavigation } from "@react-navigation/native";
import { Menu } from "lucide-react-native";
import BurgerMenu from "../components/menu-bar";

const windowWidth = Dimensions.get("window").width; // Get the window width

const numColumns = 2; // Define the number of columns you want

const categoryFilterOptions = [
  "All",
  "Inspirational",
  "Self-love",
  "Life",
  "Fiction",
];

const Stories = () => {
  const navigation = useNavigation();

  const [books, setBooks] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, "books");
      const q =
        selectedCategory === "All"
          ? query(booksCollection)
          : query(
              booksCollection,
              where("bookCategory", "==", selectedCategory)
            );
      const booksSnapshot = await getDocs(q);
      const booksList = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id, // Assuming there's an id field in your documents
      }));

      setBooks(booksList);
    };

    fetchBooks();
  }, [selectedCategory]);

  return (
    <View style={styles.container}>
      {/* Burger Menu Top Left Corner */}
      <BurgerMenu />
      <Text
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 100,
        }}
      >
        What would you like to read today?
      </Text>
      {/* Description */}
      <Text
        style={{
          fontSize: 16,
          marginBottom: 40,
          color: "#666",
        }}
      >
        Choose a category to get started
      </Text>
      <View style={styles.filterContainer}>
        {categoryFilterOptions.map((category, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.filterButton,
              {
                backgroundColor:
                  selectedCategory === category ? "#007BFF" : "transparent",
              },
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text
              style={{ color: selectedCategory === category ? "#fff" : "#333" }}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("BookContent", {
                bookTitle: item.bookTitle,
                bookAuthor: item.bookAuthor,
                bookPublishedDate: item.bookPublishedDate,
                bookTotalPages: item.bookTotalPages,
                bookContent: item.bookContent,
              })
            }
          >
            <View style={styles.bookItem}>
              <Image
                source={{ uri: item.bookImage }}
                style={styles.bookImage}
                resizeMode="cover"
              />
              <View style={styles.textContainer}>
                <Text style={styles.title}>{item.bookTitle}</Text>
                <Text style={styles.author}>{item.bookAuthor}</Text>
                <Text style={styles.publishedDate}>
                  {item.bookPublishedDate}
                </Text>
                <Text
                  style={styles.pages}
                >{`Pages: ${item.bookTotalPages}`}</Text>
              </View>
            </View>
          </TouchableOpacity>
        )}
        numColumns={numColumns}
        contentContainerStyle={styles.booksList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20, // Padding to avoid the notch
    // Center
    alignItems: "center",
    justifyContent: "center",
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10,
    marginBottom: 10,
    paddingHorizontal: 20,
  },
  filterButton: {
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007BFF",
  },
  booksList: {
    flexGrow: 1,
  },
  bookItem: {
    width: 160,
    marginBottom: 10,
    borderRadius: 5,
    margin: 5,
  },
  bookImage: {
    width: "100%",
    height: 250,
    borderRadius: 5,
  },
  textContainer: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  author: {
    fontStyle: "italic",
  },
  publishedDate: {
    fontSize: 12,
    color: "#666",
  },
  pages: {
    fontSize: 12,
    color: "#666",
  },
});

export default Stories;

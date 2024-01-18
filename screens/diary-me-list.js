import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Button,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const DiaryMeList = () => {
  const navigation = useNavigation();

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    loadNotes();
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadNotes);

    return unsubscribe;
  }, [navigation]);

  const loadNotes = async () => {
    try {
      const notesData = await AsyncStorage.getItem("notes");
      if (notesData) {
        setNotes(JSON.parse(notesData));
      }
    } catch (error) {
      // Error retrieving data
      console.log(error);
    }
  };

  const handleAddNote = () => {
    navigation.navigate("DiaryMeEdit", { saveNote: handleSaveNote });
  };

  const handleSaveNote = async (note) => {
    const newNotes = [...notes, note];
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const handleSelectNote = (note) => {
    navigation.navigate("DiaryMeNote", {
      note,
      updateNote: handleUpdateNote,
      deleteNote: handleDeleteNote,
    });
  };

  const handleUpdateNote = async (updatedNote) => {
    const newNotes = notes.map((note) => {
      if (note.id === updatedNote.id) {
        return updatedNote;
      }
      return note;
    });
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  const handleDeleteNote = async (noteId) => {
    const newNotes = notes.filter((note) => note.id !== noteId);
    setNotes(newNotes);
    await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
  };

  return (
    <View style={styles.container}>
      {
        // If there are no notes, show a message instead
        !notes.length && (
          <Text style={{ textAlign: "center" }}>No notes yet.</Text>
        )
      }
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectNote(item)}>
            <Text style={styles.noteItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
          gap: 10,
        }}
      >
        <Button title="Add Note" onPress={handleAddNote} />
        {/* Back */}
        <Button
          title="Back"
          onPress={() => {
            navigation.navigate("Dashboard");
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add padding around the screen
    paddingTop: 50, // Add padding to avoid the notch
    backgroundColor: "#fff", // Set a background color
  },
  noteItem: {
    fontSize: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "gray",
  },
});

export default DiaryMeList;

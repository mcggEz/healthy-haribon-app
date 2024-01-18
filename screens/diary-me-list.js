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
      <FlatList
        data={notes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelectNote(item)}>
            <Text style={styles.noteItem}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
      <Button title="Add Note" onPress={handleAddNote} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add padding around the screen
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
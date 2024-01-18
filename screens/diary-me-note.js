import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiaryMeNote = ({ route, navigation }) => {
  const { note, updateNote, deleteNote } = route.params;
  const [noteText, setNoteText] = useState(note.text);

  // Generate a title from the first few words of the note
  const generateTitle = (text) => {
    const previewLength = 30; // Number of characters to show before adding ellipsis
    return text.length > previewLength
      ? text.substring(0, previewLength) + "..."
      : text;
  };

  const handleSave = async () => {
    const updatedNote = {
      ...note,
      text: noteText,
      title: generateTitle(noteText), // Update the title based on the new content
    };
    await updateNote(updatedNote);
    navigation.goBack();
  };

  const handleDelete = async () => {
    await deleteNote(note.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.noteTitle}>Note</Text>
      <TextInput
        style={styles.noteInput}
        multiline
        placeholder="Type your note here..."
        value={noteText}
        onChangeText={setNoteText}
      />
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} color="#4CAF50" />
        <Button title="Delete" onPress={handleDelete} color="#F44336" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff", // Set a light background color
  },
  noteTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333", // Dark text for better readability
    textAlign: "center", // Center the title
  },
  noteInput: {
    flex: 1,
    fontSize: 18,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 20,
    textAlignVertical: "top", // Start the text at the top of the TextInput
    backgroundColor: "#f9f9f9", // Light grey background for the input
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around", // Evenly space buttons
  },
});

export default DiaryMeNote;

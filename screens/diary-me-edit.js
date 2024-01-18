import React, { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Button,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiaryMeEdit = ({ route, navigation }) => {
  const { saveNote } = route.params;
  const [noteText, setNoteText] = useState("");

  // This function is called when the save button is pressed
  const handleSave = async () => {
    // Limit the title to the first few words of the noteText
    const previewLength = 30; // Set the limit of characters for the title
    let title = noteText.slice(0, previewLength);
    if (noteText.length > previewLength) {
      title += "..."; // Add ellipsis if text is longer than previewLength
    }

    const newNote = {
      id: Date.now().toString(),
      title: title.trim(), // Ensure the title doesn't end with whitespace
      text: noteText,
    };
    await saveNoteToStorage(newNote);
    navigation.goBack();
  };

  const saveNoteToStorage = async (newNote) => {
    try {
      const storedNotes = await AsyncStorage.getItem("notes");
      const notes = storedNotes ? JSON.parse(storedNotes) : [];
      const newNotes = [...notes, newNote];
      await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
    } catch (error) {
      // Error saving data
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TextInput
        style={styles.noteInput}
        multiline
        placeholder="Type your note here..."
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Save Note" onPress={handleSave} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20, // Add padding around the screen
    backgroundColor: "#fff", // Set a background color
  },
  noteInput: {
    flex: 1, // Take up all available space
    padding: 10, // Add padding inside the text input
    borderWidth: 1, // Set border width for the text input
    borderColor: "#ddd", // Set border color for the text input
    borderRadius: 5, // Round the corners slightly
    fontSize: 16, // Increase the font size
    textAlignVertical: "top", // Start the text at the top of the TextInput
  },
});

export default DiaryMeEdit;

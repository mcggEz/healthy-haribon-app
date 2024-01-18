import React, { useState } from "react";
import { View, TextInput, StyleSheet, Button } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DiaryMeNote = ({ route, navigation }) => {
  const { note, updateNote, deleteNote } = route.params;
  const [noteText, setNoteText] = useState(note.text);

  const handleSave = () => {
    const updatedNote = { ...note, text: noteText };
    updateNote(updatedNote);
    navigation.goBack();
  };

  const handleDelete = () => {
    deleteNote(note.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.noteInput}
        multiline
        value={noteText}
        onChangeText={setNoteText}
      />
      <Button title="Save" onPress={handleSave} />
      <Button title="Delete" onPress={handleDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  noteInput: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default DiaryMeNote;

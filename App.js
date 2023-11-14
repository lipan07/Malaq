import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

export default function App() {
  const [text, onChangeText] = React.useState('');
  const [number, onChangeNumber] = React.useState('');

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput placeholder="Type here..." style={styles.textInput} />
        <TextInput placeholder="Type here..." style={styles.textInput} />
        <TextInput placeholder="Type here..." style={styles.textInput} />
        <Button title="Submit" />
      </View >
      <View>
        <TextInput placeholder="Search here..." />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 50,
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'aqua',
    padding: 8,
    marginRight: 8,
    margin: 8,
    borderRadius: 6,
  }
}) 
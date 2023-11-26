import { React, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
  Pressable,
} from "react-native";
import GoalInput from './components/GoalInput';

export default function App() {
  return (
    <View style={styles.allContainer}>
      
      <GoalInput />

      <View style={styles.container}>
        <View style={styles.container}>
          <View style={styles.boxContainerOne}>
            <Text>Lipan</Text>
          </View>
          <View style={styles.boxContainerTwo}>
            <Text>Lipan 1</Text>
          </View>
          <View style={styles.boxContainerThree}>
            <Text>Lipan 2a</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  boxContainerOne: {
    backgroundColor: "darkorange",
    flex: 1,
    padding: 20,
    marginRight: 5,
  },
  boxContainerTwo: {
    backgroundColor: "green",
    flex: 1,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  boxContainerThree: {
    backgroundColor: "red",
    flex: 1,
    padding: 20,
    marginLeft: 5,
  },
  allContainer: {
    flexDirection: "column",
    flex: 1,
    marginTop: 50,
  }
});
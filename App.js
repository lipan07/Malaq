import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Alert, Pressable } from 'react-native';

export default function App() {
  const handlePress = () => {
    console.log('Do not click this button again!!');
    Alert.alert('Do not click this button again!!');
  };
  return (
    <View style={styles.allContainer}>
      <View style={styles.searchContainer}>
        <TextInput style={styles.input} placeholder="Type here.." />
        <Pressable style={styles.btn} title="Click here.." onPress={handlePress}>
          <Text>Click here..</Text>
        </Pressable>
      </View>

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
    backgroundColor: 'darkorange',
    flex: 1,
    padding: 20,
    marginRight: 5
  },
  boxContainerTwo: {
    backgroundColor: 'green',
    flex: 1,
    padding: 20,
    marginLeft: 5,
    marginRight: 5,
  },
  boxContainerThree: {
    backgroundColor: 'red',
    flex: 1,
    padding: 20,
    marginLeft: 5
  },
  allContainer: {
    flexDirection: 'column',
    flex: 1,
    marginTop: 50
  },
  searchContainer: {
    flexDirection: 'row',
    // flex: 1
  },
  container: {
    flexDirection: 'row',
    flex: 1
  },
  input: {
    borderWidth: 1,
    borderColor: 'red',
    height: 40,
    flex: 1,
    margin: 5,
    padding: 5
  },
  btn: {
    margin: 5,
    padding: 5,
    margin: 5,
  }
}) 
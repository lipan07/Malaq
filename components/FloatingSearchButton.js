// Updated FloatingSearchButton.js

import React, { useState } from 'react';
import { View, TouchableOpacity, TextInput, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have an icon library imported

const FloatingSearchButton = () => {
  const [showSearch, setShowSearch] = useState(false);

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <View style={styles.container}>
      {showSearch ? (
        <View style={styles.searchContainer}>
          {/* List of links */}
          {/* <View style={styles.links}>
            <Text>Link 1</Text>
            <Text>Link 2</Text>
          </View> */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Search..."
            // Other TextInput props as needed
            />
            <TouchableOpacity style={styles.goButton}>
              <Text style={styles.goText}>Go</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
      <TouchableOpacity style={styles.button} onPress={toggleSearch}>
        <Icon name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 250,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  searchContainer: {
    position: 'absolute',
    bottom: 80,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    elevation: 3,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 40,
    width: 200,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  goButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  goText: {
    color: '#fff',
  },
  links: {
    marginTop: 10,
  },
});

export default FloatingSearchButton;

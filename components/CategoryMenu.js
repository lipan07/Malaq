// CategoryMenu.js

import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Assuming you have an icon library imported

const CategoryMenu = () => {
  const categories = [
    { id: '1', name: 'Cars', icon: 'car' },
    { id: '2', name: 'Properties', icon: 'home' },
    { id: '3', name: 'Mobile', icon: 'phone-portrait' },
    { id: '4', name: 'Electronics', icon: 'tv' },
    { id: '5', name: 'Bikes', icon: 'tv' },
    { id: '6', name: 'Furniture', icon: 'tv' },
    { id: '7', name: 'Fashion', icon: 'tv' },
    { id: '8', name: 'Books', icon: 'tv' },
    // Add more categories with their respective icon names
  ];

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Icon name={item.icon} size={24} color="#007bff" />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 50,
  },
  categoryItem: {
    marginRight: 20,
    alignItems: 'center',
  },
  categoryName: {
    marginTop: 5,
    fontSize: 12,
  },
});

export default CategoryMenu;

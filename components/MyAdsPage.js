import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomNavBar from './BottomNavBar';

// Example product data (replace this with your actual product data)
const productData = [
  { id: '1', name: 'Product 1', imageUrl: 'https://images.unsplash.com/photo-1515248137880-45e105b710e0?q=80&w=2988&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
  { id: '2', name: 'Product 2', imageUrl: 'https://media.assettype.com/evoindia%2Fimport%2F2016%2F02%2FJaguar-XE-27022016-M.jpg' },
  { id: '3', name: 'Product 3', imageUrl: 'https://media.assettype.com/evoindia%2Fimport%2F2016%2F02%2FJaguar-XE-27022016-M.jpg' },
  { id: '4', name: 'Product 4', imageUrl: 'https://media.assettype.com/evoindia%2Fimport%2F2016%2F02%2FJaguar-XE-27022016-M.jpg' },
  { id: '5', name: 'Product 5', imageUrl: 'https://media.assettype.com/evoindia%2Fimport%2F2016%2F02%2FJaguar-XE-27022016-M.jpg' },
  // More product items...
];

const MyAdsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch or set your product data here
    setProducts(productData); // For example, setting product data from state
  }, []);

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderProductItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
      />
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  productList: {
    paddingHorizontal: 5,
    paddingBottom: 60, // Adjusted to accommodate BottomNavBar
  },
  productItem: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9', // Changed background color for clarity
  },
  productImage: {
    width: '100%', // Utilizing full width of the container
    height: 120,
    resizeMode: 'cover',
    marginBottom: 8,
    borderRadius: 5,
  },
  productName: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default MyAdsPage;

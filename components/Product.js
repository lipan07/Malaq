// Updated Product.js

import React from 'react';
import { View, Text, Image, StyleSheet, FlatList } from 'react-native';

const Product = ({ product }) => {
  return (
    <View style={styles.card}>
      <FlatList
        data={product.images}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} resizeMode="cover" />
        )}
      />
      <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">{product.name}</Text>
      <Text style={styles.details} numberOfLines={2} ellipsizeMode="tail">{product.details}</Text>
      <Text style={styles.price}>Price: ${product.price}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    margin: 10,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover', // Deprecated, replaced by resizeMode="cover" in Image component
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 5,
  },
  details: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 10,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'green',
  },
});

export default Product;

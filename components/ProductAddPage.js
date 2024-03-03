import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import BottomNavBar from './BottomNavBar';

const ProductAddPage = ({ navigation }) => {
  const [productName, setProductName] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const handleAddProduct = () => {
    // Logic to add the product to the database or perform actions
    // based on the filled product details
    console.log('Adding product:', {
      productName,
      productDescription,
      productPrice,
      productImage,
    });

    // Clear form fields after adding the product
    setProductName('');
    setProductDescription('');
    setProductPrice('');
    setProductImage('');
  };
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollContainer}>
        {/* Your form fields for adding a product */}
        <View style={styles.formContent}>
          <Text style={styles.header}>Add Product</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Product Name:</Text>
            <TextInput
              style={styles.input}
              value={productName}
              onChangeText={setProductName}
              placeholder="Enter product name"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description:</Text>
            <TextInput
              style={styles.input}
              value={productDescription}
              onChangeText={setProductDescription}
              placeholder="Enter product description"
              multiline={true}
              numberOfLines={4}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Price:</Text>
            <TextInput
              style={styles.input}
              value={productPrice}
              onChangeText={setProductPrice}
              placeholder="Enter product price"
              keyboardType="numeric"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image URL:</Text>
            <TextInput
              style={styles.input}
              value={productImage}
              onChangeText={setProductImage}
              placeholder="Enter image URL"
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Image URL:</Text>
            <TextInput
              style={styles.input}
              value={productImage}
              onChangeText={setProductImage}
              placeholder="Enter image URL"
            />
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation Bar */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flex: 1,
    marginBottom: 60, // Adjust based on bottom navigation bar height
  },
  formContent: {
    padding: 20,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom:50,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ProductAddPage;

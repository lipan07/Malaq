import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomNavBar from './BottomNavBar';
import { BASE_URL, TOKEN } from '@env';

const base_url = BASE_URL;
const token = TOKEN;

const MyAdsPage = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  const fetchProducts = async (page, reset = false) => {
    setIsLoading(true);

    const apiUrl = `${base_url}/my-post?page=${page}`;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonResponse = await response.json();

      if (reset) {
        // If resetting, replace the current product list with the first page data
        setProducts(jsonResponse.data);
      } else {
        // Otherwise, append new products to the existing list
        setProducts(prevProducts => [...prevProducts, ...jsonResponse.data]);
      }

      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to load products", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, []);

  const handleScrollEndReached = () => {
    if (!isLoading) {
      fetchProducts(currentPage + 1);  // Append new data to the list when scrolling down
    }
  };

  const handleScrollTopReached = () => {
    if (!isLoading && currentPage > 1) {
      fetchProducts(1, true);  // Reset the list and load the first page when scrolling to the top
      setCurrentPage(1);       // Reset the current page to 1
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity
      style={styles.productItem}
      onPress={() => navigation.navigate('ProductDetails', { productId: item.id })}
    >
      <Image source={{ uri: item.images[0] }} style={styles.productImage} />
      <Text style={styles.productName}>{item.post_details.title}</Text>
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
        onEndReached={handleScrollEndReached}
        onEndReachedThreshold={0.1}
        onScroll={({ nativeEvent }) => {
          if (nativeEvent.contentOffset.y === 0) {
            handleScrollTopReached();  // Refresh and load page 1 when scrolling to the top
          }
        }}
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
    paddingBottom: 60,
  },
  productItem: {
    flex: 1,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  productImage: {
    width: '100%',
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

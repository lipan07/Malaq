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

  const fetchProducts = async (page) => {
    setIsLoading(true);

    const apiUrl = `${base_url}/my-post?page=${page}`;
    console.log(apiUrl);
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
      setProducts(jsonResponse.data);
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
      fetchProducts(currentPage + 1);
    }
  };

  const handleScrollTopReached = () => {
    if (currentPage > 1 && !isLoading) {
      fetchProducts(currentPage - 1);
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
            handleScrollTopReached();
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

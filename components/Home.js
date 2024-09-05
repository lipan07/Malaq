import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Image, TextInput, FlatList, ActivityIndicator } from 'react-native';
import Swiper from 'react-native-swiper';
import CategoryMenu from './CategoryMenu';
import BottomNavBar from './BottomNavBar';
import Icon from 'react-native-vector-icons/Ionicons';
import { BASE_URL, TOKEN } from '@env';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true); // Track if more data is available
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('Kolkata');
  const [newAddress, setNewAddress] = useState('');
  const [addresses, setAddresses] = useState([
    { id: '1', name: 'Kolkata- Agarpara' },
    { id: '2', name: 'Kolkata- Sodepur' },
    { id: '3', name: 'Kolkata- Barrackpore' },
  ]);

  const fetchProducts = async (page, reset = false) => {
    setIsLoading(true);
    const apiUrl = `${BASE_URL}/my-post?page=${page}`;
    const requestOptions = {
      method: "GET",
      headers: { "Authorization": `Bearer ${TOKEN}` },
    };

    try {
      const response = await fetch(apiUrl, requestOptions);
      const jsonResponse = await response.json();
      if (reset) {
        setProducts(jsonResponse.data);
      } else {
        setProducts(prevProducts => [...prevProducts, ...jsonResponse.data]);
      }
      setCurrentPage(page);
      setHasMore(jsonResponse.data.length > 0); // Update hasMore based on response
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
    if (!isLoading && hasMore) {
      fetchProducts(currentPage + 1);
    }
  };

  const handleScrollTopReached = () => {
    if (!isLoading && currentPage > 1) {
      fetchProducts(1, true);
      setCurrentPage(1);
    }
  };

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.productItem} onPress={() => navigation.navigate('ProductDetails', { product: item })}>
      <View style={styles.imageContainer}>
        <Swiper style={styles.swiper} showsPagination autoplay autoplayTimeout={3}>
          {item.images.map((imageUri, index) => (
            <Image key={index} source={{ uri: imageUri }} style={styles.productImage} />
          ))}
        </Swiper>
      </View>
      <Text style={styles.productName}>{item.post_details.title}</Text>
      <Text style={styles.details} numberOfLines={2} ellipsizeMode="tail">{item.post_details.description}</Text>
      <Text style={styles.price}>Price: ${item.post_details.amount}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => setShowAddressModal(true)} style={styles.locationLink}>
          <Icon name="location" size={20} color="#007bff" />
          <Text style={styles.locationText}>Your location is {selectedAddress}</Text>
          <Icon name="chevron-down" size={20} color="#007bff" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.userIcon}>
          <Icon name="person-circle-outline" size={30} color="#007bff" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchBar}>
        <TextInput style={styles.searchInput} placeholder="Search..." />
        <TouchableOpacity style={styles.searchButton}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>

      <CategoryMenu />

      {isLoading && products.length === 0 && <ActivityIndicator size="large" color="#007bff" style={styles.loaderTop} />}

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
        ListFooterComponent={
          products.length > 0 ? (isLoading && hasMore ? <ActivityIndicator size="large" color="#007bff" style={styles.loaderBottom} /> : null) : <Text style={styles.noProductsText}>No products found</Text>
        }
      />

      <BottomNavBar navigation={navigation} />

      <Modal visible={showAddressModal} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Address</Text>
            <FlatList
              data={addresses}
              renderItem={({ item }) => (
                <View style={styles.addressItem}>
                  <TouchableOpacity style={styles.addressCard} onPress={() => {
                    setSelectedAddress(item.name);
                    setShowAddressModal(false);
                  }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
              horizontal={true}
              contentContainerStyle={styles.addressesContainer}
            />
            <View style={styles.newAddressInput}>
              <TextInput
                style={styles.newAddressTextInput}
                placeholder="Add New Address"
                onChangeText={setNewAddress}
                value={newAddress}
              />
              <TouchableOpacity style={styles.addButton} onPress={() => {
                if (newAddress.trim()) {
                  setAddresses([...addresses, { id: String(addresses.length + 1), name: newAddress }]);
                  setNewAddress('');
                }
              }}>
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => setShowAddressModal(false)}>
              <Text style={styles.closeButton}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF', padding: 10 },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 },
  locationLink: { flexDirection: 'row', alignItems: 'center' },
  locationText: { fontSize: 16, marginLeft: 5 },
  userIcon: { right: 25 },
  searchBar: { flexDirection: 'row', paddingHorizontal: 5, marginVertical: 5 },
  searchInput: { flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 },
  searchButton: { backgroundColor: '#007bff', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 5, marginLeft: 10 },
  buttonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  productList: { paddingHorizontal: 5, paddingBottom: 60 },
  productItem: { flex: 1, margin: 5, borderRadius: 5, borderWidth: 1, borderColor: '#CCCCCC', padding: 10, alignItems: 'center', backgroundColor: '#F9F9F9' },
  imageContainer: { height: 120, width: '100%', borderRadius: 5, overflow: 'hidden', marginBottom: 8 },
  swiper: { height: '100%' },
  productImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  productName: { fontWeight: 'bold', textAlign: 'center' },
  details: { fontSize: 16, marginTop: 5, marginBottom: 10 },
  price: { fontSize: 16, fontWeight: 'bold' },
  modalContainer: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 10, padding: 20, width: '90%' },
  modalTitle: { fontSize: 18, fontWeight: 'bold', marginBottom: 10 },
  addressItem: { marginRight: 10 },
  addressCard: { padding: 10, backgroundColor: '#f9f9f9', borderRadius: 5, flex: 1, marginRight: 10 },
  addressesContainer: { paddingBottom: 20 },
  newAddressInput: { flexDirection: 'row', marginTop: 10 },
  newAddressTextInput: { flex: 1, height: 40, borderColor: 'gray', borderWidth: 1, paddingHorizontal: 10, borderRadius: 5 },
  addButton: { backgroundColor: '#007bff', justifyContent: 'center', paddingHorizontal: 15, borderRadius: 5, marginLeft: 10 },
  addButtonText: { color: '#fff', fontSize: 16, textAlign: 'center' },
  closeButton: { marginTop: 20, fontSize: 16, color: '#007bff', textAlign: 'center' },
  loaderTop: { marginBottom: 10 },
  loaderBottom: { marginTop: 10 },
  noProductsText: { fontSize: 16, textAlign: 'center', marginTop: 20 },
});

export default Home;

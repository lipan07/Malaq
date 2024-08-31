import React, { useState, useRef, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, Text, TextInput, Button, FlatList, Dimensions, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from 'react-native';// Assuming Product.js is in the same directory
import Icon from 'react-native-vector-icons/Ionicons'
import Product from './Product'; // Assuming Product.js is in the same directory
import CategoryMenu from './CategoryMenu';
import BottomNavBar from './BottomNavBar';
import { BASE_URL, TOKEN } from '@env';
const base_url = BASE_URL;
const token = TOKEN;

const Home = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addresses, setAddresses] = useState([
    { id: '1', name: 'Kolkata- Agarpara' },
    { id: '2', name: 'Kolkata- Sodepur' },
    { id: '3', name: 'Kolkata- Barrackpore' },
    // Add more addresses as needed //
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const newAddressRef = useRef(null);
  const [newAddress, setNewAddress] = useState('');

  //Login start
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpField, setShowOtpField] = useState(false);
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);

  const handlePhoneNumberSubmit = async () => {
    try {
      // Make an API request to send OTP to the provided phone number
      const response = await fetch(`${base_url}/send-sms`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber
        }),
      });

      console.log(response);
      if (response.ok) {
        // OTP sent successfully
        setShowOtpField(true); // Show the OTP input field

        console.log('Success');
      } else {
        // Handle errors, maybe display an error message to the user
        console.error('Failed to send OTP');

        setShowOtpField(true); // Show the OTP input field
      }
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      // Make an API request to verify the OTP
      const response = await fetch(`${base_url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phoneNumber: phoneNumber,
          password: otp,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Assuming the token is returned in the response

        // Store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);

        // OTP verification successful, proceed with login
        console.log('OTP verification successful');
        // You can add logic here to handle successful login
        // For example, you can store the user's authentication token in AsyncStorage
      } else {
        // Handle OTP verification failure, maybe display an error message to the user
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };


  //Login end
  const handleLoginClick = () => {
    setShowLogin(true);
  };

  const closeModal = () => {
    setShowLogin(false);
    setShowAddressModal(false);
  };

  const handleLogin = () => {
    // Add your login logic here
    console.log('Login with:', email, password);
    // For example, you can authenticate the user here
    // For simplicity, I'm just closing the modal
    closeModal();
  };

  const handleLocationClick = () => {
    setShowAddressModal(true);
  };

  const handleAddressSelection = (address) => {
    setSelectedAddress(address.name);
    setShowAddressModal(false);
  };
  const handleDeleteAddress = (id) => {
    const updatedAddresses = addresses.filter((addr) => addr.id !== id);
    setAddresses(updatedAddresses);
  };
  const sortedAddresses = [...addresses].sort((a, b) => parseInt(b.id) - parseInt(a.id));
  const renderAddressItem = ({ item }) => (
    <View style={styles.addressItem}>
      <TouchableOpacity style={styles.addressCard} onPress={() => handleAddressSelection(item)}>
        <Text>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteAddress(item.id)} style={styles.deleteButton}>
        <Icon name="close-circle-outline" size={20} color="red" />
      </TouchableOpacity>
    </View>
  );

  const handleAddNewAddress = () => {
    if (newAddress.trim() !== '') {
      const newId = String(addresses.length + 1);
      const newAddr = { id: newId, name: newAddress };
      setAddresses([...addresses, newAddr]);
      setNewAddress('');
      if (newAddressRef.current) {
        newAddressRef.current.clear();
      }
    }
  };
  const handleSearch = () => {
    // Perform search functionality here
    // For example: execute search based on the entered text
  };

  useEffect(() => {
    // Replace this URL with your API endpoint
    const apiUrl = `${base_url}/posts`;
    // Fetch the data from the API
    const myHeaders = new Headers();
    myHeaders.append("Authorization", 'Bearer ' + token);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow"
    };

    fetch(apiUrl, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let formattedData = JSON.parse(result)
        setProductData(formattedData.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, []);
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <View style={styles.localtionIcon}>
          <TouchableOpacity onPress={handleLocationClick} style={styles.locationLink}>
            <Icon name="location" size={20} color="#007bff" />
            <Text style={styles.locationText}>Your location is {selectedAddress || 'Kolkata'}</Text>
            <Icon name="chevron-down" size={20} color="#007bff" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleLoginClick} style={styles.userIcon}>
            <Icon name="person-circle-outline" size={30} color="#007bff" />
          </TouchableOpacity>
        </View>
        {/* Other content of Home */}
        {/* ... */}
        {/* Modal for login */}
        <ScrollView>
        </ScrollView>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
          // Add onChangeText and other necessary props for search functionality
          />
          {/* Button */}
          <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          <CategoryMenu />
          {productData && productData.length > 0 ? (
            productData.map((product) => (
              <View key={product.id}>
                <Product product={product} />
              </View>
            ))
          ) : (
            <Text>No products found</Text>
          )}
        </ScrollView>
        <BottomNavBar />
        <Modal visible={showLogin} transparent={true} animationType="slide">
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.closeIcon}>
              <Icon name="close-circle" size={30} color="#007bff" />
            </TouchableOpacity>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{showOtpField ? 'Enter OTP' : 'Enter Phone Number'}</Text>
              {!showOtpField && (
                <TextInput
                  style={styles.input}
                  placeholder="Phone Number"
                  value={phoneNumber}
                  onChangeText={(text) => setPhoneNumber(text)}
                />
              )}
              {showOtpField && (
                <TextInput
                  style={styles.input}
                  placeholder="OTP"
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                />
              )}
              <TouchableOpacity style={styles.resendButton} onPress={handlePhoneNumberSubmit}>
                <Text style={styles.buttonText}>Resend OTP</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.submitButton} onPress={showOtpField ? handleOtpSubmit : handlePhoneNumberSubmit}>
                <Text style={styles.buttonText}>{!showOtpField ? 'Send OTP' : 'Login or Signup'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        {/* Modal for address selection */}
        <Modal visible={showAddressModal} transparent={true} animationType="slide">
          <View style={styles.addressModalContainer}>
            <View style={styles.addressModalContent}>
              <Text style={styles.addressModalTitle}>Select Address</Text>
              <FlatList
                data={sortedAddresses}
                renderItem={renderAddressItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                contentContainerStyle={styles.addressesContainer}
              />
              <View style={styles.newAddressInput}>
                <TextInput
                  ref={newAddressRef}
                  style={styles.newAddressTextInput}
                  placeholder="Add New Address"
                  onChangeText={(text) => setNewAddress(text)}
                  value={newAddress}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddNewAddress}>
                  <Text style={styles.addButtonText}>Add</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity onPress={closeModal}>
                <Text style={styles.closeButton}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
  );
};


const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  userIcon: {
    position: 'absolute',
    top: 40,
    right: 25,
    zIndex: 999,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    minWidth: 300,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  closeButton: {
    marginTop: 10,
    color: 'blue',
  },
  locationIcon: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  locationLink: {
    flexDirection: 'row',
    alignItems: 'center',
    top: 50,
    paddingBottom: 10,
    left: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  locationText: {
    fontSize: 14,
    color: '#007bff',
    marginLeft: 10,
    marginRight: 10,
  },
  addressModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  addressModalContent: {
    backgroundColor: '#fff',
    width: windowWidth - 40, // Adjusting width to be the screen width minus padding
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  addressModalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addressesContainer: {
    alignItems: 'flex-start',
    marginTop: 10,
    marginBottom: 20,
  },
  addressCard: {
    backgroundColor: '#eaeaea',
    borderRadius: 10,
    padding: 10,
    marginRight: 1,
  },
  newAddressInput: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  newAddressTextInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 8,
    marginRight: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  deleteButton: {
    marginLeft: 1,
    marginRight: 10,
  },
  topBar: {
    // Styles for your top navigation bar
    // For example: backgroundColor, height, padding, flexDirection
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 50,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
    // Adjust styles for the search bar container
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 20,
    paddingHorizontal: 10,
    marginRight: 10,
    // Other input styles
  },
  searchButton: {
    backgroundColor: 'blue', // Add your desired button styles
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
  resendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Home;


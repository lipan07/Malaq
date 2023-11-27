// ShoppingPage.js

import React, { useState, useRef } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Modal, Text, TextInput, Button, FlatList, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Product from './components/Product'; // Assuming Product.js is in the same directory
import FloatingSearchButton from './components/FloatingSearchButton';
import CategoryMenu from './components/CategoryMenu';
const productData = [
  {
    id: 1,
    name: 'Product 1',
    details: 'Product 1 details',
    price: 19.99,
    images: [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQyyXKb7vod4zTz0YL9wIR6S3mQkwk7H3E0w&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKRKBGE_6z4d4gkVJz7dN7ZaUI8rVTHjpEjpCtg0t-jobtnj5LwI1ajOuJIZlK1jDmhLM&usqp=CAU',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR33NA0o2O431_3DgCIItMmIGlrTqJHZNJEWiAZt8jXPHdQPiM2GC4NvCL_Ki3UKtcC-68&usqp=CAU',
    ],
  },
  {
    id: 2,
    name: 'Product 2',
    details: 'Product 2 details',
    price: 19.99,
    images: [
      'https://cdn.theluxurycloset.com/uploads/opt/products/750x750/luxury-women-gucci-used-handbags-p699377-009.jpg',
      'https://cdn-images.farfetch-contents.com/15/41/36/65/15413665_27241613_300.jpg',
      'https://www.retyche.com/cdn/shop/files/W34_RETYCHE_ECOMM_08.16.20236572_grande.jpg?v=1692369269',
    ],
  },
  {
    id: 3,
    name: 'Product 3',
    details: 'Product 3 details',
    price: 19.99,
    images: [
      'https://5.imimg.com/data5/SELLER/Default/2023/5/306160939/BW/BZ/WU/116672918/apple-macbook-air-500x500.PNG',
      'https://inventstore.in/wp-content/uploads/2023/05/macbook-pro-13-silver.png',
      'https://images.news18.com/ibnlive/uploads/2023/10/macbook-air-m1-2023-10-c3ced763eda4931bd195f9e7ff255169.jpg',
    ],
  },
  {
    id: 4,
    name: 'Product 4',
    details: 'Product 4 details- The Kyra Halo Solitaire Ring is a breathtaking and elegant piece of jewellery that is perfect for any occasion. This stunning ring features a single, sparkling diamond that is surrounded by a halo of smaller diamonds, all set in a sleek, gold setting. The timeless and classic design of the ring adds a touch of glamour and sophistication to any outfit. Whether for everyday wear or for special occasions, the Kyra Halo Solitaire Ring is a must-have addition to any jewellery collection.',
    price: 19.99,
    images: [
      'https://www.sparklejewels.in/wp-content/uploads/2022/01/R01628-02.jpg',
      'https://chandranipearls.in/cdn/shop/files/infinity-fore-life-18kt-gold-and-diamond-ring-chandrani-pearls-1.jpg?v=1695120968&width=1946',
      'https://i.ebayimg.com/images/g/D9UAAOSw3dJjeJkF/s-l1200.webp',
    ],
  },
  {
    id: 5,
    name: 'Product 5',
    details: 'Product 5 details',
    price: 19.99,
    images: [
      'https://i.ebayimg.com/images/g/D9UAAOSw3dJjeJkF/s-l1200.webp',
      'https://i.ebayimg.com/images/g/D9UAAOSw3dJjeJkF/s-l1200.webp',
      'https://i.ebayimg.com/images/g/D9UAAOSw3dJjeJkF/s-l1200.webp',
    ],
  },
  {
    id: 6,
    name: 'Product 6',
    details: 'Product 6 details',
    price: 19.99,
    images: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/lehenga-choli/c/4/v/free-sleeveless-new-designer-embroidred-sequins-heavy-work-original-imaggpyahr8hpvrr.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/lehenga-choli/p/p/g/free-sleeveless-new-designer-embroidred-sequins-heavy-work-original-imaggpya9whb9f9q.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/lehenga-choli/p/n/p/free-half-sleeve-dandiya-dress-flared-lehenga-trend-lehenga-original-imagh6qshzqjy24y.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/lehenga-choli/z/y/k/free-half-sleeve-dandiya-dress-flared-lehenga-trend-lehenga-original-imagh6qsyssarf3z.jpeg?q=70',
    ],
  },
  {
    id: 7,
    name: 'Product 7',
    details: 'Product 7 details',
    price: 19.99,
    images: [
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/u/m/b/-original-imagrdefbw6bhbjr.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/l/s/n/-original-imagrdeframtgucc.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/g/7/d/-original-imagrdef889hmmq9.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/mobile/0/i/n/-original-imagrdefzqhqqw5u.jpeg?q=70',
    ],
  },
  {
    id: 8,
    name: 'Product 8',
    details: 'Product 8 details',
    price: 19.99,
    images: [
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/c/y/a/xs-t592-pgwh-eyebogler-original-imagh3fzebaetetf.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/k/i/h/xs-t592-pgwh-eyebogler-original-imagh3fz9fvpzck9.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/832/832/xif0q/t-shirt/5/n/u/l-t592-blwh-eyebogler-original-imagh3fzg53hvttf.jpeg?q=70',
    ],
  },
  {
    id: 9,
    name: 'Product 9',
    details: 'Product 9 details',
    price: 19.99,
    images: [
      'https://rukminim2.flixcart.com/image/416/416/xif0q/motorcycle/q/z/n/-original-imagtbmaq6bgbkh5.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/motorcycle/u/f/z/-original-imagtbmavcgxp8bb.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/motorcycle/x/g/q/-original-imagtbma7xheharg.jpeg?q=70',
    ],
  },
  {
    id: 10,
    name: 'Product 10',
    details: 'Product 10 details',
    price: 19.88,
    images: [
      'https://rukminim2.flixcart.com/image/416/416/xif0q/chimney/s/h/o/-original-imagngfjzrpzseyg.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/chimney/2/t/c/-original-imagsrgzrbkwkgfc.jpeg?q=70',
      'https://rukminim2.flixcart.com/image/416/416/xif0q/chimney/2/4/4/-original-imagsrgzkjnefgwp.jpeg?q=70',
    ],
  },
  // Add more products here in the same format
];

const App = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [addresses, setAddresses] = useState([
    { id: '1', name: 'Kolkata- Agarpara' },
    { id: '2', name: 'Kolkata- Sodepur' },
    { id: '3', name: 'Kolkata- Barrackpore' },
    // Add more addresses as needed
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState('');
  const newAddressRef = useRef(null);
  const [newAddress, setNewAddress] = useState('');
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
  return (
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
      {/* Other content of ShoppingPage */}
      {/* ... */}
      {/* Modal for login */}
      <Modal visible={showLogin} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Login</Text>
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button title="Login" onPress={handleLogin} />
            <TouchableOpacity onPress={closeModal}>
              <Text style={styles.closeButton}>Close</Text>
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
      <CategoryMenu />
      <ScrollView>
        {productData.map((product) => (
          <Product key={product.id} product={product} />
        ))}
      </ScrollView>
      {/* Floating search button */}
      <FloatingSearchButton />
    </View>
  );
};
const windowWidth = Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // Additional styles as needed...
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
    left:10,
  },
  locationText: {
    fontSize: 12,
    color: '#007bff',
    marginLeft: 10,
    marginRight: 10,
  }, addressModalContainer: {
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
});
export default App;

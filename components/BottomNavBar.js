import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

const BottomNavBar = () => {
  const navigation = useNavigation(); // Access navigation object

  const handleNavigation = (val) => {
    // Navigate to ProductDetailsPage and pass the productId as a parameter
    navigation.navigate(val);
  };

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('Home')}>
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('ChatList')}>
        <Text>Chats</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('ProductAddPage')}>
        <Text>Sell</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('MyAdsPage')}>
        <Text>My Ads</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem} onPress={() => handleNavigation('AccountPage')}>
        <Text>Account</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    position: 'fixed', // Use 'fixed' to fix the position at the bottom
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 20,
  },
  navItem: {
    alignItems: 'center',
  },
});

export default BottomNavBar;

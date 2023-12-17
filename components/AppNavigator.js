import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ShoppingPage from './ShoppingPage'; // Import your ShoppingPage component
import ProductDetails from './ProductDetailsPage'; // Import your ProductDetails component
import ChatBox from './ChatBox';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="ShoppingPage">
      <Stack.Screen name="ShoppingPage" component={ShoppingPage} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

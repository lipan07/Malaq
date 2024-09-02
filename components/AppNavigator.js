import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './Home'; // Import your Home component
import ProductDetails from './ProductDetailsPage'; // Import your ProductDetails component
import ProductAddPage from './ProductAddPage'; // Import your ProductDetails component
import ChatBox from './ChatBox';
import ChatList from './ChatList';
import MyAdsPage from './MyAdsPage';
import AccountPage from './AccountPage';
import Profile from './Profile';
import Login from './Login';
import EditProfilePage from './EditProfilePage';
import MyNetwork from './MyNetwork';
import PackagePage from './PackagePage';
import Settings from './Settings';
import ImageViewer from './ImageViewer';
import CompanyDetailsPage from './CompanyDetailsPage';
import ProductForm from './ProductForm';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="ProductDetails" component={ProductDetails} />
      <Stack.Screen name="ImageViewer" component={ImageViewer} />
      <Stack.Screen name="ChatBox" component={ChatBox} />
      {/* <Stack.Screen name="ProductAddPage" component={ProductAddPage} /> */}
      <Stack.Screen name="ProductAddPage" component={ProductAddPage} />
      <Stack.Screen name="ProductFormPage" component={ProductForm} />
      <Stack.Screen name="ChatList" component={ChatList} />
      <Stack.Screen name="MyAdsPage" component={MyAdsPage} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
      <Stack.Screen name="AccountPage" component={AccountPage} />
      <Stack.Screen name="MyNetwork" component={MyNetwork} />
      <Stack.Screen name="PackagePage" component={PackagePage} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="CompanyDetailsPage" component={CompanyDetailsPage} />
    </Stack.Navigator>
  );
};

export default AppNavigator;

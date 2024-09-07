import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import ParentCategoryPanel from './ParentCategoryPanel';
import SubCategoryPanel from './SubCategoryPanel';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';
import { BASE_URL, TOKEN } from '@env';

const base_url = BASE_URL;
const token = TOKEN;

const ProductAddPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const navigation = useNavigation();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = `${base_url}/category`;
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(apiUrl, requestOptions);
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  // Handle parent category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category.children.length > 0) {
      setSubcategories(category.children);
    } else {
      // Navigate based on the guard_name of the category
      switch (category?.guard_name) {
        case 'cars':
          navigation.navigate('AddCarForm', { category });
          break; // Ensure to break the case to avoid fall-through
        default:
          // Optionally handle other cases or provide feedback
          console.log('No valid guard_name found for the selected category');
          break;
      }
    }
  };

  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory) => {
    console.log(subcategory.guard_name);
    switch (subcategory?.guard_name) {
      case 'houses_apartments':
        navigation.navigate('AddHousesApartments', { category: selectedCategory, subcategory });
        break; // Ensure to break the case to avoid fall-through
      case 'land_plots':
        navigation.navigate('AddLandPlots', { category: selectedCategory, subcategory });
        break; // Ensure to break the case to avoid fall-through
      case 'mens_fashion':
        navigation.navigate('ProductForm', { category: selectedCategory, subcategory });
        break; // Handle multiple cases in the same way
      case 'womens_fashion':
        navigation.navigate('ProductForm', { category: selectedCategory, subcategory });
        break; // Handle multiple cases in the same way
      default:
        // Optionally handle other cases or provide feedback
        console.log('No valid guard_name found for the selected subcategory');
        break;
    }
  };

  return (
    <View style={styles.container}>
      {/* Category Panels */}
      <View style={styles.categoryContainer}>
        {/* Parent Category Panel */}
        <ParentCategoryPanel categories={categories} onSelectCategory={handleCategorySelect} />

        {/* Subcategory Panel (shown when a parent category is selected) */}
        {selectedCategory && selectedCategory.children.length > 0 && (
          <SubCategoryPanel subcategories={subcategories} onSelectSubcategory={handleSubcategorySelect} />
        )}
      </View>

      {/* BottomNavBar remains fixed at the bottom */}
      <BottomNavBar navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column', // Stack the category container and BottomNavBar vertically
  },
  categoryContainer: {
    flex: 1, // Take up all available space above the BottomNavBar
    flexDirection: 'row', // Parent and subcategories are displayed side by side
  },
});

export default ProductAddPage;

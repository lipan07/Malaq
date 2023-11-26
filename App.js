// ShoppingPage.js

import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
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
  // Add more products here in the same format
];

const App = () => {
  return (
    <View style={{ flex: 1 }}>
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
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    // Additional styles as needed...
  },
});
export default App;

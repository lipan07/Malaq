import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomNavBar from './BottomNavBar';
const ProductDetails = ({ route }) => {
    // Access the productId passed from the Product component
    const { productId } = route.params;
    // Assuming you have a function to fetch product details based on productId
    // Replace this with your actual data-fetching logic
    const getProductDetails = (id) => {
        // Here, fetch details of the product using the productId
        // Return the details or mock data for demonstration
        return {
            id: id,
            name: 'Product Name',
            description: 'Product Description',
            price: 99.99,
            phoneNumber: 8961181854,
            location: {
                latitude: 37.774929,
                longitude: -122.419418
            },
            images: [
                'https://5.imimg.com/data5/SELLER/Default/2023/5/306160939/BW/BZ/WU/116672918/apple-macbook-air-500x500.PNG',
                'https://inventstore.in/wp-content/uploads/2023/05/macbook-pro-13-silver.png',
                'https://images.news18.com/ibnlive/uploads/2023/10/macbook-air-m1-2023-10-c3ced763eda4931bd195f9e7ff255169.jpg',
            ],
            // Add more details as needed
        };
    };

    // Fetch the product details based on the productId
    const product = getProductDetails(productId);
    const navigation = useNavigation();

    const handleImagePress = (imageIndex) => {
        navigation.navigate('ImageViewer', { images: product.images, selectedImageIndex: imageIndex });
    };

    const handleCallPress = () => {
        // Handle call functionality...
    };

    const handleChatPress = () => {
        // Handle chat functionality...
    };

    const handleCompanyNamePress = () => {
        // Navigate to the CompanyDetailsPage when company name is clicked
        navigation.navigate('CompanyDetailsPage', 'Malaq');
    };
    return (
        <View style={styles.container}>
            <ScrollView>
                {/* Horizontal scrollable images */}
                <ScrollView horizontal style={styles.imageContainer}>
                    {product.images.map((image, index) => (
                        <TouchableOpacity key={index} onPress={() => handleImagePress(index)}>
                            <Image source={{ uri: image }} style={styles.image} />
                        </TouchableOpacity>
                    ))}
                </ScrollView>

                {/* Product details */}
                <View style={styles.detailsContainer}>
                    <Text style={styles.companyName} onPress={handleCompanyNamePress}>
                        Company Name
                    </Text>
                    <Text style={styles.name}>{product.name}</Text>
                    <Text style={styles.description}>{product.description}</Text>
                    <Text style={styles.price}>Price: ${product.price}</Text>
                </View>

                {/* Product location map */}
                <View style={styles.mapContainer}>
                    {/* <MapView
                        initialRegion={{
                            latitude: 37.78825,
                            longitude: -122.4324,
                            latitudeDelta: 0.0922,
                            longitudeDelta: 0.0421,
                        }}
                    /> */}
                </View>
            </ScrollView>

            {/* Chat and Call buttons */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.chatButton} onPress={handleChatPress}>
                    <Text style={styles.buttonText}>Chat</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.callButton} onPress={handleCallPress}>
                    <Text style={styles.buttonText}>Call</Text>
                </TouchableOpacity>
            </View>
            {/* Bottom navigation bar */}
            <BottomNavBar />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        // Additional styles as needed...
    },
    imageContainer: {
        height: 300,
    },
    image: {
        width: 300,
        height: 400,
        resizeMode: 'cover',
    },
    detailsContainer: {
        padding: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    companyName: {
        fontSize: 18,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        marginBottom: 10,
    },
    description: {
        fontSize: 16,
        marginBottom: 10,
    },
    price: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'green',
    },
    mapContainer: {
        height: 300,
        margin: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        overflow: 'hidden',
    },
    map: {
        flex: 1,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    chatButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    callButton: {
        backgroundColor: '#28a745',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ProductDetails;

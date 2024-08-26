import React, { useState } from 'react';
import { View, Modal, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ImageViewer = ({ route, navigation }) => {
    const { images, selectedImageIndex } = route.params;
    const [currentIndex, setCurrentIndex] = useState(selectedImageIndex);

    const handleClose = () => {
        navigation.goBack(); // Navigate back to the previous screen
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    };
    return (
        <View style={styles.container}>
            <Modal animationType="slide" transparent={true} visible={true}>
                <View style={styles.modalContainer}>
                    <Image
                        source={{ uri: images[currentIndex] }}
                        style={{ ...styles.image }}
                        resizeMode="contain"
                    />
                    {/* Close button */}
                    <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
                        <Text style={styles.closeButtonText}>Close</Text>
                    </TouchableOpacity>

                    {/* Next and Previous Icons */}
                    <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                        <View style={styles.transparentCircle}>
                            {/* <Ionicons name="ios-arrow-forward" size={30} color="white" /> */}
                            <Ionicons name="arrow-forward" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.previousButton} onPress={handlePrevious}>
                        <View style={styles.transparentCircle}>
                            {/* <Ionicons name="ios-arrow-back" size={30} color="white" /> */}
                            <Ionicons name="arrow-forward" size={30} color="white" />
                        </View>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20, // Add padding for the modal
    },
    modalContainer: {
        backgroundColor: 'black',
        borderRadius: 10,
        overflow: 'hidden', // Hide overflow content
    },
    image: {
        width: '100%',
        height: '100%',
    },
    closeButton: {
        position: 'absolute',
        bottom: 20,
        left: 30,
        right: 30,
        paddingVertical: 10,
        borderRadius: 25,
        backgroundColor: 'rgba(128, 128, 128, 0.7)', // Adjust the transparency here (0.5 is 50% opaque)
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeButtonText: {
        color: 'white', // Style the button text
        textAlign: 'center',
    },
    nextButton: {
        position: 'absolute',
        top: '50%',
        right: 20,
        zIndex: 1,
    },
    previousButton: {
        position: 'absolute',
        top: '50%',
        left: 20,
        zIndex: 1,
    },
    transparentCircle: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'rgba(128, 128, 128, 0.7)', // Adjust the transparency here (0.5 is 50% opaque)
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ImageViewer;

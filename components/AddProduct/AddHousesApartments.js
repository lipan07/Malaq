import React, { useState } from 'react';
import { View, Text, TextInput, Button, TouchableOpacity, Alert, ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AddHousesApartments = ({ route }) => {
  const { category, subcategory } = route.params;

  const [formData, setFormData] = useState({
    type: '',
    bedroom: '',
    bathroom: '',
    furnishing: '',
    constructionStatus: '',
    listedBy: '',
    carParking: '',
    facing: '',
    superBuiltupArea: '',
    carpetArea: '',
    maintenance: '',
    totalFloors: '',
    floorNo: '',
    projectName: '',
    adTitle: '',
    description: '',
    amount: '',
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await fetch('/api/houses-apartments', {
        method: 'POST',
        body: formDataToSend,
      });

      if (response.ok) {
        Alert.alert('Success', 'House/Apartment details submitted successfully!');
      } else {
        console.error('Error submitting form:', response.statusText);
        Alert.alert('Error', 'There was an issue submitting the form.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Type Selection */}
        <Text style={styles.label}>Type *</Text>
        <Picker
          selectedValue={formData.type}
          onValueChange={(value) => handleChange('type', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Type" value="" />
          <Picker.Item label="Apartments" value="apartments" />
          <Picker.Item label="Builder Floors" value="builder-floors" />
          <Picker.Item label="Farm Houses" value="farm-houses" />
          <Picker.Item label="Houses & Villas" value="houses-villas" />
        </Picker>

        {/* Bedroom Selection */}
        <Text style={styles.label}>Bedroom *</Text>
        <View style={styles.optionContainer}>
          {['1', '2', '3', '4', '4+'].map((bedroom) => (
            <TouchableOpacity
              key={bedroom}
              style={[styles.optionButton, formData.bedroom === bedroom && styles.selectedOption]}
              onPress={() => handleChange('bedroom', bedroom)}
            >
              <Text style={formData.bedroom === bedroom ? styles.selectedText : styles.optionText}>{bedroom}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bathroom Selection */}
        <Text style={styles.label}>Bathroom *</Text>
        <View style={styles.optionContainer}>
          {['1', '2', '3', '4', '4+'].map((bathroom) => (
            <TouchableOpacity
              key={bathroom}
              style={[styles.optionButton, formData.bathroom === bathroom && styles.selectedOption]}
              onPress={() => handleChange('bathroom', bathroom)}
            >
              <Text style={formData.bathroom === bathroom ? styles.selectedText : styles.optionText}>{bathroom}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Furnishing Selection */}
        <Text style={styles.label}>Furnishing *</Text>
        <Picker
          selectedValue={formData.furnishing}
          onValueChange={(value) => handleChange('furnishing', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Furnishing" value="" />
          <Picker.Item label="Furnished" value="furnished" />
          <Picker.Item label="Semi-Furnished" value="semi-furnished" />
          <Picker.Item label="Unfurnished" value="unfurnished" />
        </Picker>

        {/* Construction Status Selection */}
        <Text style={styles.label}>Construction Status *</Text>
        <Picker
          selectedValue={formData.constructionStatus}
          onValueChange={(value) => handleChange('constructionStatus', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Construction Status" value="" />
          <Picker.Item label="New Launch" value="new-launch" />
          <Picker.Item label="Ready to Move" value="ready-to-move" />
          <Picker.Item label="Under Construction" value="under-construction" />
        </Picker>

        {/* Listed By Selection */}
        <Text style={styles.label}>Listed By *</Text>
        <Picker
          selectedValue={formData.listedBy}
          onValueChange={(value) => handleChange('listedBy', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Listed By" value="" />
          <Picker.Item label="Builder" value="builder" />
          <Picker.Item label="Owner" value="owner" />
          <Picker.Item label="Dealer" value="dealer" />
        </Picker>

        {/* Car Parking Selection */}
        <Text style={styles.label}>Car Parking *</Text>
        <View style={styles.optionContainer}>
          {['0', '1', '2', '3', '3+'].map((parking) => (
            <TouchableOpacity
              key={parking}
              style={[styles.optionButton, formData.carParking === parking && styles.selectedOption]}
              onPress={() => handleChange('carParking', parking)}
            >
              <Text style={formData.carParking === parking ? styles.selectedText : styles.optionText}>{parking}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Facing Selection */}
        <Text style={styles.label}>Facing *</Text>
        <Picker
          selectedValue={formData.facing}
          onValueChange={(value) => handleChange('facing', value)}
          style={styles.picker}
        >
          <Picker.Item label="Select Facing" value="" />
          <Picker.Item label="East" value="east" />
          <Picker.Item label="North" value="north" />
          <Picker.Item label="North-East" value="northeast" />
          <Picker.Item label="North-West" value="northwest" />
          <Picker.Item label="South" value="south" />
          <Picker.Item label="South-East" value="southeast" />
          <Picker.Item label="South-West" value="southwest" />
          <Picker.Item label="West" value="west" />
        </Picker>

        {/* Super Builtup Area */}
        <Text style={styles.label}>Super Builtup Area (ft²)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Super Builtup Area"
          keyboardType="numeric"
          value={formData.superBuiltupArea}
          onChangeText={(value) => handleChange('superBuiltupArea', value)}
        />

        {/* Carpet Area */}
        <Text style={styles.label}>Carpet Area (ft²) *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Carpet Area"
          keyboardType="numeric"
          value={formData.carpetArea}
          onChangeText={(value) => handleChange('carpetArea', value)}
        />

        {/* Maintenance */}
        <Text style={styles.label}>Maintenance (Monthly)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Maintenance"
          keyboardType="numeric"
          value={formData.maintenance}
          onChangeText={(value) => handleChange('maintenance', value)}
        />

        {/* Total Floors */}
        <Text style={styles.label}>Total Floors</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Total Floors"
          keyboardType="numeric"
          value={formData.totalFloors}
          onChangeText={(value) => handleChange('totalFloors', value)}
        />

        {/* Floor No */}
        <Text style={styles.label}>Floor No</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Floor No"
          keyboardType="numeric"
          value={formData.floorNo}
          onChangeText={(value) => handleChange('floorNo', value)}
        />

        {/* Project Name */}
        <Text style={styles.label}>Project Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Project Name"
          value={formData.projectName}
          onChangeText={(value) => handleChange('projectName', value)}
        />

        {/* Ad Title */}
        <Text style={styles.label}>Ad Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Ad Title"
          value={formData.adTitle}
          onChangeText={(value) => handleChange('adTitle', value)}
        />

        {/* Description */}
        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, { height: 100 }]}
          placeholder="Enter Description"
          value={formData.description}
          multiline
          onChangeText={(value) => handleChange('description', value)}
        />

        {/* Amount */}
        <Text style={styles.label}>Amount *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
          value={formData.amount}
          onChangeText={(value) => handleChange('amount', value)}
        />

        {/* Submit Button */}
        <View style={styles.buttonContainer}>
          <Button title="Submit" onPress={handleSubmit} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  optionButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginRight: 10,
    marginBottom: 10,
  },
  selectedOption: {
    backgroundColor: '#E0F7FA', // light blue
    borderColor: '#007BFF', // blue for the border
  },
  optionText: {
    color: '#333',
  },
  selectedText: {
    color: '#007BFF',
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});

export default AddHousesApartments;

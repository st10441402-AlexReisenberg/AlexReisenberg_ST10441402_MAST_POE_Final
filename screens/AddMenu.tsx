import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';

const courses = ['Starters', 'Mains', 'Desserts'];

type AddMenuScreenProps = NativeStackScreenProps<RootStackParamList, 'AddMenu'>;

export default function AddMenuScreen({ navigation }: AddMenuScreenProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState(courses[0]);
  const [price, setPrice] = useState('');

  const handleSubmit = () => {
    if (!dishName || !description || !price) {
      Alert.alert("Missing Fields", "Please complete all fields before submitting.");
      return;
    }

    const priceValue = parseFloat(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert("Invalid Price", "Please enter a valid positive price.");
      return;
    }

    const newItem = { dishName, description, course, price: priceValue };
    navigation.navigate('Home', { newItem });

    // Reset fields after submission
    setDishName('');
    setDescription('');
    setCourse(courses[0]);
    setPrice('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Dish Name:</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setDishName} 
        value={dishName} 
        placeholder="Enter dish name" 
      />

      <Text style={styles.label}>Description:</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setDescription} 
        value={description} 
        placeholder="Enter description" 
      />

      <Text style={styles.label}>Course:</Text>
      <Picker 
        selectedValue={course} 
        onValueChange={setCourse} 
        style={styles.picker}>
        {courses.map((course) => (
          <Picker.Item key={course} label={course} value={course} />
        ))}
      </Picker>

      <Text style={styles.label}>Price:</Text>
      <TextInput 
        style={styles.input} 
        onChangeText={setPrice} 
        value={price} 
        placeholder="Enter price" 
        keyboardType="numeric" 
      />

      <Button title="Add Dish" onPress={handleSubmit} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#000',  // Black background for contrast
  },
  label: {
    fontSize: 18,
    color: '#FFF',  // White text for labels
    marginVertical: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#FFF',  // White border for visibility
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    color: '#FFF',  // White text on black background
    backgroundColor: '#333',  // Dark background for inputs
  },
  picker: {
    height: 50,
    width: '100%',
    color: '#FFF',  // White text for picker items
    backgroundColor: '#333',  // Dark background for picker
    marginBottom: 10,
    borderRadius: 5,
  },
});

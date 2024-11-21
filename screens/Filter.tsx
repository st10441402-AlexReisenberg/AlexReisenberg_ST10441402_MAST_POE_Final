import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types';
import { Picker } from '@react-native-picker/picker';  // Correct import for Picker

type FilterProps = NativeStackScreenProps<RootStackParamList, 'Filter'>;

export default function FilterScreen({ route, navigation }: FilterProps) {
  const [selectedCourse, setSelectedCourse] = useState<string>(''); // State for selected course filter

  const courses = ['Starter', 'Mains', 'Dessert']; // Add your courses here

  const handleApplyFilter = () => {
    // Pass the selected filter back to the Home screen
    route.params?.setFilterText(selectedCourse); // Send the selected filter to the Home screen
    navigation.goBack(); // Go back to the Home screen
  };

  const handleClearFilter = () => {
    setSelectedCourse(''); // Clear the selected filter
    route.params?.setFilterText(''); // Reset filter on home screen
    navigation.goBack(); // Go back to the Home screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Filter Menu by Course</Text>

      <Picker
        selectedValue={selectedCourse}
        onValueChange={(itemValue) => setSelectedCourse(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All Courses" value="" />
        {courses.map((course, index) => (
          <Picker.Item key={index} label={course} value={course} />
        ))}
      </Picker>

      <Button title="Apply Filter" onPress={handleApplyFilter} color="#00BFFF" />
      <Button title="Clear Filter" onPress={handleClearFilter} color="#E74C3C" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
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

import React, { useState, useEffect } from 'react';
import { View, Text, Button, Image, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MenuItem, RootStackParamList } from '../types';

type HomeProps = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({ navigation, route }: HomeProps) {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<MenuItem[]>([]);
  const [filterText, setFilterText] = useState<string>(''); // State for filter

  useEffect(() => {
    // Ensure the menuItems are updated when a new item is added
    const newItem = route.params?.newItem as MenuItem | undefined;
    if (newItem) {
      setMenuItems((prevItems) => [...prevItems, newItem]);
    }
  }, [route.params?.newItem]);

  useEffect(() => {
    // Update the filterText when it's passed from the Filter screen
    const filterFromParams = route.params?.filterText;
    if (filterFromParams !== undefined) {
      setFilterText(filterFromParams);
    }
  }, [route.params?.filterText]);

  useEffect(() => {
    // Apply filter whenever filterText or menuItems change
    if (filterText) {
      const filtered = menuItems.filter((item) =>
        item.course.toLowerCase().includes(filterText.toLowerCase()) || filterText === ''
      );
      setFilteredItems(filtered);
    } else {
      setFilteredItems(menuItems);
    }
  }, [filterText, menuItems]);

  const removeItem = (index: number) => {
    setMenuItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to</Text>
      <Image style={styles.imageSize} source={require('../assets/logo_3.png')} />

      <View style={styles.buttonContainer}>
        <Button
          title="Add Menu"
          onPress={() => navigation.navigate('AddMenu')}
          color="#00BFFF"
        />
        <Button
          title="Filter Menu"
          onPress={() => navigation.navigate('Filter', { filterText, setFilterText })}
          color="#00BFFF"
        />
      </View>

      <Text style={styles.totalItems}>Total Items: {filteredItems.length}</Text>
      <FlatList
        data={filteredItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.menuItem}>
            <View style={styles.itemInfo}>
              <Text style={styles.dishName}>{item.dishName} - {item.course}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.price}>R{item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(index)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
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
  imageSize: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  totalItems: {
    fontSize: 18,
    marginBottom: 10,
    color: '#FFFFFF',
  },
  menuItem: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingVertical: 10,
    width: '100%',
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    borderRadius: 5,
    marginBottom: 5,
    elevation: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemInfo: {
    flex: 1,
  },
  dishName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980B9',
  },
  description: {
    fontSize: 14,
    color: '#7F8C8D',
  },
  price: {
    fontSize: 16,
    color: '#E74C3C',
    fontWeight: 'bold',
  },
  removeButton: {
    backgroundColor: '#E74C3C',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  removeButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

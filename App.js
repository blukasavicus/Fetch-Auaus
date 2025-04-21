import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function App() {
  const [dogImage, setDogImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('favorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch (error) {
      console.log('nenhum auau foi encontrado aqui :(', error);
    }
  };

  const fetchDog = async () => {
    try {
      setLoading(true);
      const response = await axios.get('https://dog.ceo/api/breeds/image/random');
      setDogImage(response.data.message);
    } catch (error) {
      console.log("auau não encontrado :(", error);
      Alert.alert('auau não encontrado :(');
    } finally {
      setLoading(false);
    }
  };

  const saveToFavorites = async () => {
    if (!dogImage) return;
    
    try {
      if (favorites.includes(dogImage)) {
        Alert.alert('já favoritou este auau!');
        return;
      }
      
      const newFavorites = [...favorites, dogImage];
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      Alert.alert('auau salvo!૮ >ﻌ< ა');
    } catch (error) {
      console.log('erro ao salvar auau :(', error);
      Alert.alert('erro ao salvar auau :(');
    }
  };

  const removeFavorite = async (url) => {
    try {
      const newFavorites = favorites.filter(item => item !== url);
      await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
      setFavorites(newFavorites);
      Alert.alert('auau removido!૮ >ﻌ< ა');
    } catch (error) {
      console.log('erro ao remover auau', error);
    }
  };

  useEffect(() => {
    loadFavorites();
    fetchDog();
  }, []);

  return (
    <View style={styles.container}>
      {showFavorites ? (
        <>
          <Text style={styles.title}>auaus favoritos! ૮ - ﻌ • ა ({favorites.length})</Text>
          
          {favorites.length === 0 ? (
            <Text style={styles.emptyText}>ninguém latindo aqui!🐾</Text>
          ) : (
            <View style={styles.favoritesContainer}>
              {favorites.map((item, index) => (
                <View key={index} style={styles.favoriteItem}>
                  <Image source={{ uri: item }} style={styles.favoriteImage} />
                  <TouchableOpacity 
                    style={styles.removeButton}
                    onPress={() => removeFavorite(item)}>
                    <Text style={styles.buttonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <Text>carregando auau... ⋆˙⟡</Text>
          ) : (
            <Image source={{ uri: dogImage }} style={styles.image} />
          )}
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.button} onPress={fetchDog}>
              <Text style={styles.buttonText}>mais auaus! ⋆˚🐾˖°</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.favButton} onPress={saveToFavorites}>
              <Text style={styles.buttonText}>⭐</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <TouchableOpacity 
        style={styles.toggleButton}
        onPress={() => setShowFavorites(!showFavorites)}>
        <Text style={styles.buttonText}>
          {showFavorites ? 'me mostre mais auaus! •ﻌ•' : 'meus auaus favoritos ₊˚⊹ 𐂯'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: 300,
    height: 300,
    borderRadius: 15,
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8dcfec',
    padding: 15,
    borderRadius: 10,
    elevation: 5,
    width: 170,
  },
  favButton: {
    backgroundColor: '#ffee8c',
    padding: 16,
    borderRadius: 10,
    elevation: 5,
    width: 60,
    alignItems: 'center',
  },
  toggleButton: {
    backgroundColor: 'pink',
    padding: 15,
    borderRadius: 10,
    width: 250,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'gray',
  },
  favoritesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  favoriteItem: {
    alignItems: 'center',
    marginBottom: 10,
  },
  favoriteImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  removeButton: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
    width: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    marginTop: 20,
  },
});
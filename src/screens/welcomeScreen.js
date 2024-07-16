import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, SafeAreaView, ScrollView, StatusBar, TouchableOpacity, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const WelcomeScreen = () => {
  const navigation = useNavigation();
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCharacters, setFilteredCharacters] = useState([]);

  useEffect(() => {
    fetchCharacters();
  }, []);


  const fetchCharacters = async () => {
    try {
      const response = await axios.get('https://thronesapi.com/api/v2/Characters');
      setCharacters(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching characters:', error);
      setLoading(false);
    }
  };

  const handleSettingPress = () => {
    navigation.navigate('profile');
  };

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();
    const filtered = characters.filter(
      (character) =>
        character.fullName.toLowerCase().includes(query) ||
        character.title.toLowerCase().includes(query)
    );
    setFilteredCharacters(filtered);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setFilteredCharacters([]);
  };

  const handleCharacterPress = (character) => {
    navigation.navigate('characterDetails', { character });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
      <View style={styles.titleBar}>
        <TouchableOpacity style={styles.settingIcon} onPress={handleSettingPress}>
          <Icon name="settings" size={30} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.title}>Game of Thrones Characters</Text>
      </View>
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
          onSubmitEditing={handleSearch}
          placeholderTextColor="#FFFFFF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity style={styles.close} onPress={clearSearch}>
            <Icon name="x" size={20} color="#fff" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.searchIcon} onPress={handleSearch}>
          <Icon name="search" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {loading ? (
          <ActivityIndicator size="large" color="#FFFFFF" />
        ) : (
          <View style={styles.container}>
            <ScrollView style={styles.characterList}>
              {(filteredCharacters.length > 0 ? filteredCharacters : characters).map((character) => (
                <TouchableOpacity key={character.id} onPress={() => handleCharacterPress(character)}>
                  <View style={styles.characterContainer}>
                    <Image
                      source={{ uri: character.imageUrl }}
                      style={styles.characterImage}
                      resizeMode="cover"
                    />
                    <View style={styles.characterInfo}>
                      <Text style={styles.characterName}>{character.fullName}</Text>
                      <Text style={styles.characterTitle}>{character.title}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  },
  scrollView: {
    flexGrow: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 20 : StatusBar.currentHeight,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  settingIcon: {
    position: 'absolute',
    right: 16,
    top: Platform.OS === 'ios' ? StatusBar.currentHeight + 20 : StatusBar.currentHeight,
    marginTop: 20,
  },
  batteryText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 20,
  },
  characterList: {
    width: '100%',
  },
  characterContainer: {
    backgroundColor: '#3D3D3D',
    borderRadius: 12,
    marginBottom: 20,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 15,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    color: '#FFFFFF',
    fontSize: 18,
    marginBottom: 5,
  },
  characterTitle: {
    color: '#9E9E9E',
    fontSize: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#000000',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#3D3D3D',
    color: '#FFFFFF',
    borderRadius: 50,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 20,
    paddingLeft: 20,
    fontSize: 16,
  },
  close: {
    position: 'absolute',
    top: 12,
    right: 64,
  },
  searchIcon: {
    marginLeft: 10,
    marginBottom: 20,
  },
});

export default WelcomeScreen;

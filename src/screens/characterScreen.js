import React from 'react';
import { View, Text, Image, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const CharacterScreen = ({ route }) => {
  const navigation = useNavigation();
  const { character } = route.params;

  return (
    <SafeAreaView style={styles.safeArea}>
    <StatusBar hidden={false} translucent={true} backgroundColor="transparent" />
    <View style={styles.titleBar}>
    <TouchableOpacity style={styles.settingIcon} onPress={() => navigation.goBack()}>
          <Icon name="arrow-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
    <Text style={styles.header}>Character Details</Text>
    </View>
    <View style={styles.container}>
      <Text style={styles.name}>{character.fullName}</Text>
      <Image source={{ uri: character.imageUrl }} style={styles.image} />
    </View>
    <View style={styles.table}>
    <View style={styles.tableContainer}>
    <View style={styles.tableRow}>
          <Text style={styles.label}>Full Name:</Text>
          <Text style={styles.data}>{character.fullName}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.label}>First Name:</Text>
          <Text style={styles.data}>{character.firstName}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.label}>Last Name:</Text>
          <Text style={styles.data}>{character.lastName}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.label}>Title:</Text>
          <Text style={styles.data}>{character.title}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.label}>Family:</Text>
          <Text style={styles.data}>{character.family}</Text>
        </View>
      </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#2A2A2A',
  },
  container: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    paddingTop: 20,
    alignItems: 'center',
  },
  titleBar: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight + 20 : StatusBar.currentHeight,
    backgroundColor: '#000000',
    zIndex: 1,
  },
  header: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginStart: 10,
    marginBottom: 20,
  },
  table: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    padding: 20,
  },
  tableContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#3D3D3D',
    paddingBottom: 5,
  },
  label: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  data: {
    color: '#FFFFFF',
    fontSize: 18,
    flex: 1,
    textAlign: 'right',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  title: {
    color: '#9E9E9E',
    fontSize: 18,
  },
});

export default CharacterScreen;
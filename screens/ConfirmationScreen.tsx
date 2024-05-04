import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  ConfirmationScreen: undefined;
  LoginScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ConfirmationScreen' | 'LoginScreen'
>;

const ConfirmationScreen: React.FC = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState<string>('email@example.com'); 

  useEffect(() => {
    // Fetch the email from the backend
    const fetchEmail = async () => {                        
      try {
        const response = await fetch('http://api.givegetgo.xyz/v1/user/me');
        const json = await response.json();
        setEmail(json.email); 
      } catch (error) {
        // console.error(error); // uncomment this if using api
      }
    };

    fetchEmail();
  }, []);

  const handleHome = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
          <View style={styles.backActionPlaceholder} />
          <Text style={styles.header}>GiveGetGo</Text>
          <View style={styles.backActionPlaceholder} />
      </View>
      <MaterialCommunityIcons name="check-circle" size={100} color="black" style={styles.emailIcon} />
      <Text style={styles.confirmedText}>Confirmed</Text>
      <Text style={styles.emailText}>{email} has been confirmed</Text>
      <TouchableOpacity style={styles.button} onPress={handleHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    backgroundColor: '#fff',
  },
  headerContainer: {
      flexDirection: 'row', // Aligns items in a row
      alignItems: 'center', // Centers items vertically
      justifyContent: 'space-between', // Distributes items evenly horizontally
      paddingLeft: 10, 
      paddingRight: 10, 
      position: 'absolute', // So that while setting card to the vertical middle, it still stays at the same place
      top: 50, 
      left: 0,
      right: 2,
      zIndex: 1, // Ensure the headerContainer is above the card
    },
  header: {
      fontSize: 22, // Increase the font size
      fontWeight: '600', // Make the font weight bold
      fontFamily: 'Montserrat_700Bold_Italic',
      textAlign: 'center', // Center the text
      color: '#444444', // Dark gray color
  },
  emailIcon: {
    marginBottom: 10,
  },
  backActionPlaceholder: {
      width: 48, // This should match the width of the Appbar.BackAction for balance
      height: 52,
  },
  confirmedText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  emailText: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: -20,
    marginBottom: 0,
    padding: 20,
  },
  button: {
    width: '20%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: 'black',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 13,
    color: '#fff',
    fontWeight: '500',
  },
});

export default ConfirmationScreen;

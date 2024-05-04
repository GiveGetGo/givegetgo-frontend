import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { Appbar } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useFonts, Montserrat_700Bold_Italic } from '@expo-google-fonts/montserrat';
import requestMFASetup from './SignUpScreen'

type RootStackParamList = {
  MfaScreen: undefined;
  MainScreen: undefined;
};

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'MfaScreen' | 'MainScreen'
>;

const MfaScreen: React.FC = () => {

  const [fontsLoaded] = useFonts({ Montserrat_700Bold_Italic });

  const use_navigation = useNavigation(); //for Appbar.BackAction

  const navigation = useNavigation<ScreenNavigationProp>();
  const [code, setCode] = useState('');

  const successAlert = () => {
    // Alert.alert("Success", "MFA confirmation succeeded!");
    navigation.navigate('MainScreen');
  };

  const failureAlert = () => {
      Alert.alert("Error", "MFA confirmation failed!");
      setCode('');
  };

  const handleCodeComplete = (code: string) => {
    console.log('Code entered:', code);
    verifyMFACode(code) // make POST mfa api call here
  };
  const handleCodeChange = (text: string) => {
    if (text.length <= 6) {
      setCode(text);
      if (text.length === 6) {
        handleCodeComplete(text); 
      }
    }
  };

  const handleResendCode = () => {
    requestMFASetup
  };

  async function verifyMFACode(code: string) {
    try {
        successAlert() //comment this if using api call
        const response = await fetch('http://api.givegetgo.xyz/v1/mfa', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ verification_code: code }),
        });

        if (response.ok) {
            const result = await response.json();
            if (result.code === 20000) {
                // successAlert();  //uncomment this if using api call
            } else {
                // failureAlert();  //uncomment this if using api call
            }
        } else {
            // failureAlert();  //uncomment this if using api call
        }
    } catch (error) {
        // failureAlert();  //uncomment this if using api call
    }
}

return (
  <SafeAreaView style={styles.container}>
    <View style={styles.headerContainer}>
        <Appbar.BackAction style={styles.backAction} onPress={() => use_navigation.goBack()} />
        <Text style={styles.header}>GiveGetGo</Text>
        <View style={styles.backActionPlaceholder} />
    </View>
    <MaterialCommunityIcons name="alert-octagon-outline" size={100} color="#000" />
    <Text style={styles.title}>Check Your MFA code</Text>
    <Text style={styles.subtitle1}>
      We have sent a set of code to your authenticator to confirm your validity.
    </Text>
    <Text style={styles.subtitle2}>
      Please enter the 6-digit code below.
    </Text>
    <TextInput
      style={styles.codeInput}
      placeholder="_ _ _ _ _ _"
      value={code}
      onChangeText={handleCodeChange}
      keyboardType="number-pad"
      maxLength={7}
      returnKeyType="done"
    />
    <TouchableOpacity style={styles.button} onPress={handleResendCode}>
      <Text style={styles.buttonText}>Resend Code</Text>
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
    right: 0,
    zIndex: 1, // Ensure the headerContainer is above the card
  },
  header: {
    fontSize: 22, // Increase the font size
    fontWeight: '600', // Make the font weight bold
    fontFamily: 'Montserrat_700Bold_Italic',
    textAlign: 'center', // Center the text
    color: '#444444', // Dark gray color
  },
  backActionPlaceholder: {
    width: 48, // This should match the width of the Appbar.BackAction for balance
    height: 48,
  },
  backAction: {
    marginLeft: 0 //This means the relative margin, comparing to the container (?)
  },
  emailIcon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  subtitle1: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: -10,
    // marginBottom: 24,
    padding: 20,
  },
  subtitle2: {
    fontSize: 16,
    color: 'grey',
    textAlign: 'center',
    marginTop: -40,
    marginBottom: 24,
    padding: 20,
  },
  codeInput: {
    width: '100%',
    padding: 0,
    fontSize: 25,
    borderBottomColor: 'grey',
    textAlign: 'center',
    marginTop: -30,
    marginBottom: 5,
  },
  button: {
    width: '30%',
    padding: 12,
    borderRadius: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginBottom: 24,
  },
  buttonText: {
    fontSize: 13,
    color: 'black',
    fontWeight: '500',
  },
});

export default MfaScreen;

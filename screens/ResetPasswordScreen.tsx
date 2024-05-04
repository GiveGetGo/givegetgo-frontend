import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

// Define the types for your navigation stack
type RootStackParamList = {
  ResetPasswordScreen: undefined;
  LoginScreen: undefined;
};

// Define the type for the navigation prop
type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ResetPasswordScreen' | 'LoginScreen'
>;

const ResetPasswordScreen: React.FC = () => {
  const navigation = useNavigation<ScreenNavigationProp>();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const successAlert = () => {
    Alert.alert("Success", "Password set successfully!");
    navigation.navigate('LoginScreen');
  };

  const failureAlert = () => {
      Alert.alert("Error", "Password does not meet the criteria!");
      setPassword('');
  };

  useEffect(() => {
    // Fetch the email from the backend
    const fetchEmail = async () => {                        
      try {
        const response = await fetch('http://api.givegetgo.xyz/v1/user/me');
        const json = await response.json();
        setEmail(json.email); // Adjust this depending on the structure of your JSON
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmail();
  }, []);

  const handleFinishReset = async () => {
    try {
        successAlert(); //comment this if using api call
        const response = await fetch('http://api.givegetgo.xyz/v1/user/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,  
                newpassword: password
            })
        });

        if (response.ok) {
            const result = await response.json();
            if (result.code === 20000) {
                // successAlert();  //uncomment this if using api call
            } else {
                // failureAlert();  //uncomment this if using api call
            }
        } else {
            // failureAlert();   //uncomment this if using api call
        }
    } catch (error) {
        // failureAlert();   //uncomment this if using api call
    }
};

  return (
    <View style={styles.container}>
      <Text style={styles.titleText1}>Let's</Text>
      <Text style={styles.titleText2}>Reset</Text>
      <Text style={styles.subtitleText1}>Please enter the new password below </Text>
      <Text style={styles.subtitleText2}>Make sure it is correctly formatted!</Text> 

      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={setPassword}
        value={password}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleFinishReset}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  titleText1: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginTop: -80,
  },
  titleText2: {
    fontSize: 40,
    fontWeight: 'bold',
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    // marginTop: 20,
  },
  subtitleText1: {
    fontSize: 16,
    color: 'grey', // Use a color that provides enough contrast
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginBottom: 5,
    marginTop: 20,
  },
  subtitleText2: {
    fontSize: 16,
    color: 'grey', // Use a color that provides enough contrast
    alignSelf: 'flex-start',
    marginLeft: '10%', // Adjust the margin to align with the text inputs
    marginBottom: 20,
    marginTop: 0,
  },
  input: {
    height: 40,
    width: '80%', // Match the width to your design
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    marginBottom: 20,
  },
  button: {
    // backgroundColor: '#d3d3d3', // Use a neutral color for the button
    backgroundColor: 'black',
    width: '75%', // Match the width to your design
    padding: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 15,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 18,
    color: "#FAFAFA",
    fontWeight: '500',
  },
  signUpContainer: {
    position: 'absolute',
    bottom: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ResetPasswordScreen;

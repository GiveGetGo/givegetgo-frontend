import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './store';
import LoginScreen from './screens/LoginScreen';
import MfaScreen from './screens/MfaScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';
import SignUpScreen from './screens/SignUpScreen'; 
import CheckEmailScreen from './screens/CheckEmailScreen';
import ResetCheckEmailScreen from './screens/ResetCheckEmailScreen';  
import ConfirmationScreen from './screens/ConfirmationScreen'; 
import MainScreen from './screens/MainScreen'; 
import GiveOutContactScreen from './screens/GiveOutContactScreen'; 
import ResetPasswordScreen from './screens/ResetPasswordScreen'; 

export type RootStackParamList = {
  LoginScreen: undefined;
  nfaScreen: undefined;
  ForgotPasswordScreen: undefined;
  SignUpScreen: undefined;
  CheckEmailScreen: undefined;
  ResetCheckEmailScreen: undefined;
  ConfirmationScreen: undefined;
  MainScreen: undefined;
  GiveOutContactScreen: undefined;
  SettingsScreen: undefined;
  ResetPasswordScreen: undefined;
};

const MainStack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <Provider store={store}> 
      <NavigationContainer>
        <MainStack.Navigator initialRouteName="LoginScreen">
          <MainStack.Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login', headerShown: false }} />
          <MainStack.Screen name="MfaScreen" component={MfaScreen} options={{ title: 'MFA', headerShown: false }} />
          <MainStack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ title: 'Forgot Password', headerShown: false }} />
          <MainStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ title: 'Sign Up', headerShown: false }} />
          <MainStack.Screen name="CheckEmailScreen" component={CheckEmailScreen} options={{ title: 'Check Email', headerShown: false }} />
          <MainStack.Screen name="ResetCheckEmailScreen" component={ResetCheckEmailScreen} options={{ title: 'Reset Check Email', headerShown: false }} />
          <MainStack.Screen name="ConfirmationScreen" component={ConfirmationScreen} options={{ title: 'Confirm', headerShown: false }} />
          <MainStack.Screen name="MainScreen" component={MainScreen} options={{ title: 'Main', headerShown: false }} />
          <MainStack.Screen name="GiveOutContactScreen" component={GiveOutContactScreen} options={{ title: 'Give Out Contact', headerShown: false }} />
          <MainStack.Screen name="ResetPasswordScreen" component={ResetPasswordScreen} options={{ title: 'Reset Password', headerShown: false }} />
          {/* You can add more screens to the navigator as needed */}
        </MainStack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;


// Comments in return function will lead to error: "text should be in..."
// View/SafeAreaView is needed when there are more than one components
// tips:　Navigation 放stack's name not component
// for going back to previous page:   const navigation = useNavigation(); <Appbar.BackAction onPress={() => navigation.goBack()} />; (check SeeRequestScreen)
// justifyContent: 'center', // Center contents vertically // alignItems: 'center', // Center contents horizontally
// following up, those positioned "absolute" will not be counted in when using justifyContent or alignItems

// Api Spec (have to test on server/localhost):
// LoginScreen: 'user/login' (DONE) (Now uncommented), need to navigate to "mfaScreen" to call "post mfa" if no session 
// SignUpScreen: 'user/register' works, need "get mfa" (maybe need a new page or modal to demo qrcode),"request email" and lead to checkEmailScreen to call "email-verification " and 'user/me', then "confirmationScreen" that needs "get user/me" 
// ForgotPasswordScreen: '/user/forgot-password' needs to test, and further pages (see below)
// CheckEmailScreen, ResetCheckEmailScreen
// RestPasswordScreen
// MfaScreen
// ConfirmationScreen
// Notifications
// SettingsScreen
// 剩下就是bid, match, profile相關的, 還需要get history, put/get rate 等api

// Main tasks:
// first make sure all api connections are made (api on or off version commented), then run docker and test api
// login api 照做 其他用default資料(catch deefault, 即使api fetch成功) (mention in documentation)
// NotificationStackProfileScreen needs api stuff 
// login邏輯 (loginScreen->"mfaScreen"->"mfaConfirmScreen") ("" are pages not existed yet) (maybe confirmation screens could just be modals)
// forgetPassword 邏輯 (forgetScreen->checkEmailScreen->confirmationScreen (remove this)->"ResetScreen"-> "ResetConfirmedScreen") 
// PostDetailsScreen proly should link to NotificationStackProfileScreen? (which is in another stack) (see which way works easier) (now ProfileScreen has redux)
// filterPost not sorting due to separating fiels to two (AKA might have problem when there's no post in the db)
// Comfirm match logic in notification
// figure out what this is: Network error: [SyntaxError: JSON Parse error: Unexpected character: L]
// hook expo-font (might need) ()so far imported but not really used

// if have time: 
// some phones does not show proper sizes
// from profile (and some others), make each post's detailed page
// ProfileScreen bio, reply needs word limit
// animation among notification pages? (react-native-reanimated transition; ask claude) (or simply use modal; https://reactnative.dev/docs/modal)
// font?
// Separate MainScreen's four cards so that CSS will be easier to build
// screens裡的圖片改到assests裡
// delete nonnecessary images and files
// hook expo-font (might need) ()so far imported but not really used
// color: #FAFAFA + #789EC9
// add some emojis in post and notifications (looks boring rn)
// profile pic in backend (userID should have "profilePic")
// add notifications on email, password constraints when signing up
// post delete edit (at PostScreen below, add "see previous post")
// notification add read boolean (currently no api)
// messageing, make friend systems

// CSS status:
// ProfileScreen: (DONE) container, headContainer, header could be replicated to other pages with backspace; card settings
// SeeRequestScreen: (DONE) card in the MIDDLE; avatar; "Take" button
// RequestSucceedScreen: (DONE) header with no backspace (parameters in the 4 sets would exactly match the header w bs); mind each "padding", "marginBottom", "marginTop" values
// GiveOutContactScreen:  (DONE)
// PostScreen:  (DONE)
// SettingsScreen: (DONE)
// Notifications: (DONE)
// RatingScreen: (DONE)
// RatingSucceedScreen: (DONE)
// PostDetailsScreen: (DONE)
// PostRequestInfoScreen: (DONE)
// PostRequestSucceedScreen: (DONE)
// PostSubmittedScreen: (DONE)
// Home, Notification 一擠一鬆，改一個 (DONE)
// Home: (DONE)
// AvatarPickerScreen: (DONE) 
// LoginScreen: (DONE) 
// ForgotPasswordScreen: (DONE)  
// SignUpScreen: (DONE) 
// CheckEmailScreen: (format)           
// ConfirmationScreen: (remove pic by icon; gpt then format)
// expo on computer 
// notification add read boolean (currently no api) //http://https://api.givegetgo.xyz/ //routes.go //see terminal or inspect/net //now:user,mfa,verification, post




// when working on css, make sure that in all cases the expected layout works. might have to use a doc

// good card settigns in profileScreen; should unite each component's setting in the end

//profile: (remember that two profileScreens should have different sources) 









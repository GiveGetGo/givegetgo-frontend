# Frontend Setup Guide
Welcome to the frontend setup guide for GiveGetGo. We use React Native for development, allowing you to run the application on both iOS and Android devices seamlessly. Here's how you can get started:
## Prerequisites
Ensure you have the following tools installed before you begin:
- Node.js and npm: Node.js is essential for running the backend server, and npm is used to manage the packages. If you haven't installed Node.js, download it from the Node.js website.
- Expo: Expo is a framework that enables developers to build and test React Native apps quickly. For iOS devices, download "Expo" from the Apple App Store. For Android devices, download "Expo Go" from the Google Play Store.

## Launching the App
To start the application, follow these steps:
1. Clone the Repo
Please use the "development" branch
`git clone https://github.com/GiveGetGo/givegetgo-mobile.git`
2. Run the following command. It will start the Expo CLI server and open a new tab in your default web browser displaying a QR code.
    ```
    npm start
    ```
3. Running on your Mobile Device:
 - Scan the QR Code displayed in your browser with the Expo (Go) app.
 - After scanning, the app should start building and eventually launch on your device.
4. Running on the Web:
Press the "w" key in your terminal to launch the app on the web. This will open the app in your default browser, providing a web-based experience of the application.

## Demonstration and Setup Notes
This is a social app that requires multiple users to interact for optimal functionality. However, due to budget constraints, the team shut down the server after the final presentation. The [backend code](https://github.com/GiveGetGo/givegetgo-backend.git) is still available to run locally. To make the frontend repository ideal for demonstration, the team set up default datasets instead of API fetch calls for the best demo experience. The API call code is still available in the codebase, and you can modify it to use your server and data instead of the current default settings.


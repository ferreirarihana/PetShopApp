import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { onAuthStateChanged } from 'firebase/auth';
import * as Notifications from 'expo-notifications';
import { auth } from './firebaseConfig';


import TelaLogin from './TelaLogin';
import TelaRegistro from './TelaRegistro';
import TelaHome from './TelaHome';
import TelaNotificacao from './TelaNotificacao';
import TelaUser from './TelaUser';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


function MainTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={TelaHome} />
      <Tab.Screen name="Notificações" component={TelaNotificacao} />
      <Tab.Screen name="Perfil" component={TelaUser} />
    </Tab.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Monitora se o utilizador está logado ou não no Firebase
    const unsubscribe = onAuthStateChanged(auth, (usuarioAtual) => {
      setUser(usuarioAtual);
    });
    return unsubscribe;
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
         
          <Stack.Screen name="Main" component={MainTabs} />
        ) : (
          
          <>
            <Stack.Screen name="Login" component={TelaLogin} />
            <Stack.Screen name="Registro" component={TelaRegistro} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function TelaHome() {
  
  useEffect(() => {
    
    async function requestPermissions() {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Aviso', 'Permissão para notificações não foi concedida!');
      }
    }
    requestPermissions();
  }, []);

  
  const enviarNotificacao = async (servico) => {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "PetShop App 🐾",
        body: `Você confirmou: ${servico}! Entraremos em contato em breve.`,
        data: { data: new Date().toLocaleTimeString() },
      },
      trigger: null,
    });

    Alert.alert('Sucesso', `Solicitação de "${servico}" enviada!`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo ao PetShop!</Text>

      <View style={styles.buttonContainer}>
        <Button title="Agende seu banho" onPress={() => enviarNotificacao('Agende seu banho')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Agende sua tosa" onPress={() => enviarNotificacao('Agende sua tosa')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Agende sua consulta" onPress={() => enviarNotificacao('Agende sua consulta')} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Compre nossos produtos" color="#28a745" onPress={() => enviarNotificacao('Compre nossos produtos')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 25, textAlign: 'center' },
  buttonContainer: { marginBottom: 12 },
});
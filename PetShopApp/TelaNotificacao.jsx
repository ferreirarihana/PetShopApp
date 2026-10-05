import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import * as Notifications from 'expo-notifications';

export default function TelaNotificacao() {
  const [notificacoes, setNotificacoes] = useState([]);

  useEffect(() => {
    
    const subscription = Notifications.addNotificationReceivedListener(notification => {
      const novaNotificacao = {
        id: notification.request.identifier,
        titulo: notification.request.content.title,
        corpo: notification.request.content.body,
        horario: new Date().toLocaleTimeString(),
      };

      setNotificacoes(prev => [novaNotificacao, ...prev]);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Histórico de Notificações</Text>
      
      {notificacoes.length === 0 ? (
        <Text style={styles.emptyText}>Nenhuma notificação recebida ainda.</Text>
      ) : (
        <FlatList
          data={notificacoes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <Text style={styles.cardTitle}>{item.titulo}</Text>
              <Text style={styles.cardBody}>{item.corpo}</Text>
              <Text style={styles.cardTime}>{item.horario}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, paddingTop: 50 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  emptyText: { textAlign: 'center', color: '#666', marginTop: 30 },
  card: { backgroundColor: '#f0f0f0', padding: 15, borderRadius: 8, marginBottom: 10 },
  cardTitle: { fontWeight: 'bold', fontSize: 16 },
  cardBody: { color: '#333', marginTop: 4 },
  cardTime: { fontSize: 11, color: '#888', marginTop: 6, textAlign: 'right' },
});
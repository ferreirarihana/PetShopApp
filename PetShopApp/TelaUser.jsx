import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';

export default function TelaUser() {
  const user = auth.currentUser;

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>
      <Text style={styles.text}>E-mail: {user?.email}</Text>
      <View style={{ marginTop: 20 }}>
        <Button title="Sair (Logout)" color="red" onPress={handleLogout} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 15 },
  text: { fontSize: 16, marginBottom: 10 },
});
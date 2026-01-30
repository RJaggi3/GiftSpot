import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, Alert, Pressable, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { api } from '@/lib/api';
import { useRouter } from 'expo-router';

interface RegisterProps {
  setLoggedInUser: (user: string) => void;
}

const Register: React.FC<RegisterProps> = ({ setLoggedInUser }) => {
  const router = useRouter();
  const [formData, setFormData] = useState<{ username: string; password: string }>({
    username: '',
    password: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const { username, password } = formData;

  const onChange = (field: keyof typeof formData) => (value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const onSubmit = async () => {
    try {
      if (!username || !password) {
        Alert.alert('Missing info', 'Please enter username and password.');
        return;
      }

      setSubmitting(true);
      const res = await api.post('/api/auth/register', {
        username,
        password,
      });

      if (res.data?.token) {
        await AsyncStorage.setItem('token', String(res.data.token));
      }

      Alert.alert('Success', 'Registered successfully');
      setLoggedInUser(username);
      router.replace('/(tabs)');
    } catch (err: any) {
      const msg =
        err?.response?.data?.msg ??
        err?.response?.data?.message ??
        err?.message ??
        'Failed to register';
      console.error(err?.response?.data ?? err);
      Alert.alert('Error', String(msg));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View>
      <Text style={styles.title}>Register</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={onChange('username')}
        autoCapitalize="none"
        autoCorrect={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={onChange('password')}
        secureTextEntry
      />
      <Pressable
        onPress={onSubmit}
        disabled={submitting}
        style={({ pressed }) => [
          styles.button,
          (pressed || submitting) && styles.buttonPressed,
        ]}>
        {submitting ? (
          <ActivityIndicator color="#FFFFFF" />
        ) : (
          <Text style={styles.buttonText}>Create account</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#3A1F00',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(58, 31, 0, 0.18)',
    backgroundColor: 'rgba(255, 229, 196, 0.35)',
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    borderRadius: 12,
    color: '#3A1F00',
  },
  button: {
    marginTop: 4,
    backgroundColor: '#FF8A3D',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.85,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 15,
  },
});

export default Register;
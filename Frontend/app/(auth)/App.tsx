import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, Pressable } from 'react-native';
import Login from './Login';
import Register from './Register';

const App: React.FC = () => {
  const [loggedInUser, setLoggedInUser] = useState<string | null>(null);
  const [isLogin, setIsLogin] = useState<boolean>(true);

  if (loggedInUser) {
    return (
      <SafeAreaView style={styles.screen}>
        <View style={styles.center}>
          <Text style={styles.welcomeTitle}>Welcome!</Text>
          <Text style={styles.welcomeSubtitle}>{loggedInUser}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.brand}>GiftSpot</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <View style={styles.segmented}>
          <Pressable
            onPress={() => setIsLogin(true)}
            style={[styles.segmentButton, isLogin && styles.segmentButtonActive]}>
            <Text style={[styles.segmentText, isLogin && styles.segmentTextActive]}>Login</Text>
          </Pressable>
          <Pressable
            onPress={() => setIsLogin(false)}
            style={[styles.segmentButton, !isLogin && styles.segmentButtonActive]}>
            <Text style={[styles.segmentText, !isLogin && styles.segmentTextActive]}>Register</Text>
          </Pressable>
        </View>

        <View style={styles.card}>
          {isLogin ? (
            <Login setLoggedInUser={setLoggedInUser} />
          ) : (
            <Register setLoggedInUser={setLoggedInUser} />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#FFE5C4', // light orange
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 28,
  },
  brand: {
    fontSize: 34,
    fontWeight: '800',
    letterSpacing: 0.3,
    color: '#3A1F00',
  },
  subtitle: {
    marginTop: 6,
    fontSize: 15,
    color: 'rgba(58, 31, 0, 0.7)',
  },
  segmented: {
    marginTop: 18,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.55)',
    borderRadius: 14,
    padding: 4,
  },
  segmentButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  segmentText: {
    fontSize: 14,
    fontWeight: '700',
    color: 'rgba(58, 31, 0, 0.65)',
  },
  segmentTextActive: {
    color: '#3A1F00',
  },
  card: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 3,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#3A1F00',
  },
  welcomeSubtitle: {
    marginTop: 6,
    fontSize: 16,
    color: 'rgba(58, 31, 0, 0.75)',
  },
});

export default App;
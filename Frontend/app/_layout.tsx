import { Stack, Tabs } from "expo-router";
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function RootLayout() {
  return (
  <Tabs 
    screenOptions={{animation:"fade"}}
  >
    <Tabs.Screen 
      name="home"
      options={{
        title: "Home",
        tabBarIcon: () => <Ionicons name="home" />
      }}  
    />

    <Tabs.Screen 
      name="calendar"
      options={{
        title: "Calendar",
        tabBarIcon: () => <Ionicons name="calendar-outline" />
      }}  
    />

    <Tabs.Screen 
      name="saved"
      options={{
        title: "Saved",
        tabBarIcon: () => <Ionicons name="bookmark-outline" />
      }}  
    />

    <Tabs.Screen 
      name="settings"
      options={{
        title: "Settings",
        tabBarIcon: () => <Ionicons name="settings-outline" />
      }}  
    />
  </Tabs>
  );
}

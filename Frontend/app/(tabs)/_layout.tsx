import { Tabs } from "expo-router";
import { Ionicons } from '@react-native-vector-icons/ionicons';

export default function RootLayout() {
  return (
  <Tabs 
    screenOptions={{animation:"fade"}}
  >
    <Tabs.Screen 
      name="index"
      options={{
        title: "Home",
        tabBarIcon: ({focused}) => <Ionicons name={focused ? "home": 'home-outline'} />
      }}  
    />

    <Tabs.Screen 
      name="calendar"
      options={{
        title: "Calendar",
        tabBarIcon: ({focused}) => <Ionicons name={focused ? "calendar": 'calendar-outline'}/>
      }}  
    />

    <Tabs.Screen 
      name="saved"
      options={{
        title: "Saved",
        tabBarIcon: ({focused}) => <Ionicons name={focused ? "bookmark": 'bookmark-outline'}/>
      }}  
    />

    <Tabs.Screen 
      name="profile"
      options={{
        title: "Profile",
        tabBarIcon: ({focused}) => <Ionicons name={focused ? "person": 'person-outline'} />
      }}  
    />
  </Tabs>
  );
}

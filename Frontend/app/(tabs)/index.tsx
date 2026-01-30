import { ScrollView, Text, View } from "react-native";
import UpcomingBirthdays from "../home/upcomingBirthdays"
export default function Home() {
  return (
    <ScrollView>
      <Text>Home</Text>
      <View>
        <UpcomingBirthdays/>
      </View>
      
    </ScrollView>
  );
}

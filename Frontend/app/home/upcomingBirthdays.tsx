import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import styles from './home.styles';

interface Person {
    name: string
    birthday: Date
}

const data = [
    { name: "Dustin", birthday: new Date(1971, 4, 30) }, 
    { name: "Steve", birthday: new Date(1992, 3, 24) }, 
    { name: "Eleven", birthday: new Date(1971, 1, 19) }, 
    { name: "Mike", birthday: new Date(1971, 11, 23) }, 
    { name: "Will", birthday: new Date(1971, 9, 3) }, 
    { name: "Lucas", birthday: new Date(1971, 9, 13) }, 
    { name: "Max", birthday: new Date(1971, 3, 16) }, 
    { name: "Nancy", birthday: new Date(1971, 0, 13) }, 
    { name: "Jonathan", birthday: new Date(1971, 1, 6) }, 
    { name: "Robin", birthday: new Date(1971, 6, 8) }, 
    {name: "Hopper", birthday: new Date(1956, 3, 10) }, 
    { name: "Joyce", birthday: new Date(1971, 9, 29) },
]


export default function UpcomingBirthdays() {
    const [peopleData, setPeople] = useState<Person[]>([])  
    useEffect(() => {
        setPeople(data)
    },[]);
    
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Upcoming Birthdays</Text>
        <FlatList horizontal={true}
        data={peopleData}
        renderItem={({item})=> 
        <View style={styles.card}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.date}>{item.birthday.toLocaleDateString("en-AU")}</Text>
        </View>}
        keyExtractor={item => item.name}
        contentContainerStyle={styles.listContent}
        >
          
        </FlatList>
      </View>
      
    );
}

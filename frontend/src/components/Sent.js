import React from 'react';
import {View,Text,StyleSheet} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
const randomTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours() +1;
    const minutes = date.getMinutes();
    const hoursString = hours < 10 ? '0' + hours : hours.toString();
    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    const timeString = `${hoursString}:${minutesString}`;
    return timeString;
  }
const Sent = ({message,time}) => {
    return(
        <View style={styles.container}>
            <LinearGradient
                 colors={["#13bcaf","#1ccfc1", "#1ccfc1"]}
                style={styles.gradient}
            >
                <Text style={styles.text}>{message}</Text>
            </LinearGradient>
            <Text style={styles.duration}>{randomTime(time)}</Text>
        </View>
    )
}
export default Sent;

const styles = StyleSheet.create({
    container:{
        marginVertical:10,
        alignSelf:'flex-end'
    },
    duration:{
        color:'#b6b6b6',
        fontSize:11,
        marginTop:5,
        fontFamily:'Montserrat_600SemiBold',
        alignSelf:'flex-end'
    },
    gradient:{
        maxWidth:220,
        alignItems:'center',
        justifyContent:'center',
        paddingHorizontal:20,
        paddingVertical:10,
        borderTopLeftRadius:25,
        borderTopRightRadius:25,
        borderBottomLeftRadius:25,
    },
    text:{
        color:'#fff',
        fontFamily:'Montserrat_700Bold'
    }
})
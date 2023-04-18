import React from 'react';
import {View,Text,StyleSheet,Image} from 'react-native';
const randomTime = (time) => {
    const date = new Date(time);
    const hours = date.getHours() +1;
    const minutes = date.getMinutes();
    const hoursString = hours < 10 ? '0' + hours : hours.toString();
    const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
    const timeString = `${hoursString}:${minutesString}`;
    return timeString;
  }

const Received = ({image, message,time}) => {
    return(
        <View style={styles.container}>
          <Image source={{uri:image}} style={styles.img}/>
          <View>
               <Text style={styles.message}>{message}</Text>
               <Text style={styles.duration}>{randomTime(time)}</Text>
          </View>
        </View>
    )
}
export default Received;
const styles = StyleSheet.create({
    duration:{
        color:'#b6b6b6',
        fontSize:11,
        marginHorizontal:15,
        marginTop:5,
        fontFamily:'Montserrat_600SemiBold',
    },
    container:{
        flexDirection:'row',
        marginVertical:10,
        width:250
    },
    img:{
        width:40,
        height:40,
        borderRadius:20
    },
    message:{
        fontSize:13,
        marginHorizontal:15,
        fontFamily:'Montserrat_700Bold'
    }
})
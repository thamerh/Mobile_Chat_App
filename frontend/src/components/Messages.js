import React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Image} from 'react-native';
import { Badge } from 'react-native-elements';
const randomTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours() +1;
  const minutes = date.getMinutes();
  const hoursString = hours < 10 ? '0' + hours : hours.toString();
  const minutesString = minutes < 10 ? '0' + minutes : minutes.toString();
  const timeString = `${hoursString}:${minutesString}`;
  return timeString;
}


const Messages = ({ username, uri, count, onPress,lastMessages,time,onLongPress }) => {
    return(
      <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.container}
    >
      <Image source={{ uri: uri }} style={styles.image} />
      {count>0?<Badge value={count} status='error' containerStyle={{ position: 'absolute', top: -3, left: 50 }} />:null}
      <View style={styles.content}>
        <Text style={styles.username}>{username}</Text>
        <Text style={count > 0 ? styles.textWithCount : styles.textWithoutCount}>{lastMessages}</Text>
      </View>
      <Text style={styles.duration}>{randomTime(time)}</Text>
    </TouchableOpacity>
    )
}
export default Messages;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    marginTop: 30,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  gradientStyle: {
    height: 20,
    width: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  count: {
    color: '#fff',
    fontFamily: 'Montserrat_700Bold',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  text: {
    color: '#b6b6b6',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 11,
    textAlign: 'center',
  },
  textWithCount: {
    // styles when count > 0
    color: '#b6b6b6',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 11,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center' // center the text
  },
  textWithoutCount: {
    // styles when count <= 0
    color: 'gray',
    fontFamily: 'Montserrat_600SemiBold',
    fontSize: 11,
    justifyContent: 'center',
    fontWeight: 'bold',
    textAlign: 'center' // center the text
  },
  duration: {
    color: '#000119',
    fontSize: 12,
    marginLeft: 0,
    fontFamily: 'Montserrat_600SemiBold',
  },
  username: {
    textAlign: 'center',
    color: '#000119',
    fontFamily: 'Montserrat_700Bold',
  },
});
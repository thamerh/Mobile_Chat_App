import React,{useState,useEffect,useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import Discussion from '../screens/Discussion';
import Profile from '../screens/Profile';
import Chat from '../screens/Chat';
import Icon from '@expo/vector-icons/Ionicons';
import Icon2 from '@expo/vector-icons/Entypo';
import { Badge } from 'react-native-elements';
import client from "../../config/config";
import io from "socket.io-client";
import ENDPOINT from "../../config/ENDPOINT";
import * as Notifications from 'expo-notifications';
import { ChatContext } from "../context/chatContext";

var socket;

const Tab = createBottomTabNavigator();

// Permissions user login in application for send notification
// async function registerForPushNotificationsAsync() {
//   let { status } = await Notifications.requestPermissionsAsync();
//   if (status !== 'granted') {
//     // Handle the case where the user does not grant permission
//     return;
//   }
//   let token = (await Notifications.getExpoPushTokenAsync()).data;
//   console.log(token);
//   // Send the token to your server for storage
// }

const BottomTabNavigator = () => {
    const [notification, setNotification] = useState(0);
    const { userId } = useContext(ChatContext);


    // useEffect(() => {
    //   registerForPushNotificationsAsync();
    // }, []);
    async function sendPushNotification(message) {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: 'New Message Sent Notification',
          body: message,
          data: { data: 'goes here' },
        },
        trigger: null, // Send the notification immediately

        // trigger: { date }, // you can Send the notification at the specified date and time 
      });
    }

    const userNotification =(userId)=>{
        client
          .get(`/api/notification/${userId}`)
          .then((response) => {
            setNotification(response.data)
            console.log("response",response.data)
          })
          .catch((error) => {
            console.error(error);
          });
       }
       useEffect(()=>{
        userNotification(userId)
       },[userId])
       useEffect(() => {
        
        socket = io(ENDPOINT);
        socket.on("connection", () => {
          setSocketConnected(true);
        });
        const messageListener = () => {
            userNotification(userId);
            // sendPushNotification();
        };
        socket.on('newMessage', (message) => {
          sendPushNotification(message.messages)
          // console.log("----------------------------------------------------",message.messages)
          
        });
        socket.on('newMessage', messageListener);
        socket.on('updateMessage', messageListener);
        //cleanUp function
        return () => {
          socket.disconnect();
        };
      }, [userId]);
    return (
        <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#13bcaf',
          tabBarInactiveTintColor: '#000119',
          tabBarStyle: [
            {
              display: 'flex',
            },
            null,
          ],
        }}
      >
            <Tab.Screen
                name='Home'
                component={Home}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color,size})=>(
                        <Icon name='ios-compass' color={color} size={30}/>
                    )
                }}
            />
            <Tab.Screen
                name='Chat'
                component={Chat}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color,size})=>(
                    <>
                       <Icon2 name='chat' color={color} size={30}/>
                        {notification>0?<Badge value={notification} status='error' containerStyle={{ position: 'absolute', top: -3, right: 30 }} />:null}
                    </>
                    )
                }}
            />
            <Tab.Screen
                name='Profile'
                component={Profile}
                options={{
                    tabBarLabel:'',
                    tabBarIcon:({color,size})=>(
                        <Icon name='ios-person' color={color} size={30}/>
                    )
                }}
            />
        </Tab.Navigator>
    );
};

const Stack = createStackNavigator();
const screenOptionStyle = {
    headerShown: false
};

const ChatStackNavigator = () => {
    return(
        <Stack.Navigator screenOptions={screenOptionStyle}>
            <Stack.Screen name='ChatTab' component={BottomTabNavigator} />
            <Stack.Screen name='Discussion' component={Discussion} />
        </Stack.Navigator>
    );
};

export default ChatStackNavigator;

import React, { useState, useEffect, useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import Icon from "@expo/vector-icons/AntDesign";
import LastWatch from "../components/LastWatch";
import Received from "../components/Received";
import Sent from "../components/Sent";
import client from "../../config/config";
import Input from "../components/Input";
import { useIsFocused } from "@react-navigation/native";
import io from "socket.io-client";
import ENDPOINT from "../../config/ENDPOINT";

var socket;
const Discussion = ({ route, navigation }) => {
  const { chatRoomId, itemName, itemPic, userId, updatedAt, receivedId } =route.params;
  const [socketConnected, setSocketConnected] = useState(false);
  const [inputMessage, setMessage] = useState("");
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();

  const scrollViewRef = useRef();

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  }, []);
  const putNotification =(chatRoomId,userId)=>{
    client
      .put(`/api/message/${chatRoomId}/${userId}`)
      .then(() => {
        console.log("notification updated--------------------------------------------------")
      })
      .catch((error) => {
        console.error(error);
      });
   }
  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.on('newMessage', (message) => {
      console.log(message)
      setData(prevData => [...prevData, message]);
      // using prevData instead of data to make sure we get the latest state
      putNotification(chatRoomId,userId)
    });

    //cleanUp function
    return () => {
      socket.disconnect();
    };
  }, [chatRoomId,userId]);
  
  useEffect(() => {
    if (isFocused) {
      getMessageData(chatRoomId);
      // Do something when this screen is focused
      //console.log('This screen is focused.');
    }
  }, [isFocused]);
  const dateObj = new Date(updatedAt);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeek = daysOfWeek[dateObj.getDay()];
  //   console.log(dayOfWeek); // Output: "Friday"
  const getMessageData = (chatRoomId) => {
    client
      .get(`/api/chatRoom/${chatRoomId}`)
      .then((response) => {
        setData(response.data);
        console.log("my messages here", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getMessageData(chatRoomId);
  }, []);
  const createmessage = (messages, senderId, receiverId, chatRoomId) => {
    console.log("messages", messages);
    console.log("senderId", senderId);
    console.log("receiverId", receiverId);
    console.log("chatRoomId", chatRoomId);

    client
      .post(`/api/message`, {
        messages,
        senderId,
        receiverId,
        chatRoomId,
      })
      .then((response) => {
        setMessage("");
        // getMessageData(chatRoomId);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
 
  // Sort messages by createdAt time (order message by time)
  const sortedData = data.sort(
    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
  );
  return (
    <LinearGradient
      colors={["#13bcaf", "#1ccfc1", "#1ccfc1"]}
      style={styles.container}
    >
      <View style={styles.main}>
        <View style={styles.headerContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="left" color="#000119" size={24} />
          </TouchableOpacity>
          <Text style={styles.username}>{itemName}</Text>
          <Image source={{ uri: itemPic }} style={styles.avatar} />
        </View>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
          onLayout={() => scrollViewRef.current.scrollToEnd({ animated: true })}
        >
          <LastWatch checkedOn={dayOfWeek} />
          {sortedData.map((item, index) => (
            <View key={index}>
              {item.receiver === userId ? (
                <Received
                  image={itemPic}
                  message={item.messages}
                  time={item.createdAt}
                />
              ) : (
                <Sent message={item.messages} time={item.createdAt} />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
      <Input
        inputMessage={inputMessage}
        setMessage={(inputMessage) => setMessage(inputMessage)}
        onSendPress={() =>
          createmessage(inputMessage, userId, receivedId, chatRoomId)
        }
      />
    </LinearGradient>
  );
};
export default Discussion;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
  main: {
    backgroundColor: "#FFF",
    height: "88%",
    paddingHorizontal: 20,
    paddingBottom: 5,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
    paddingTop: 40,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  username: {
    color: "#000119",
    fontFamily: "Montserrat_700Bold",
    fontSize: 20,
    flex: 1,
    textAlign: "center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
});

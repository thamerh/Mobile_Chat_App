import React, { useState, useEffect, useRef,useContext  } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Animated,
  TouchableOpacity,
  TextInput,
  LogBox,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { ScrollView } from "react-native-gesture-handler";
import Profiles from "../components/Profiles";
import Messages from "../components/Messages";
import client from "../../config/config";
import { useIsFocused } from "@react-navigation/native";
import io from "socket.io-client";
import ENDPOINT from "../../config/ENDPOINT";
// import { AuthContext } from "../context/AuthContext"
import { ChatContext } from "../context/chatContext";

var socket;
const Chat = (props) => {
  const { userId,accountType,userData, setUserData } = useContext(ChatContext);
  // const [userData, setUserData] = useState([]);
  const [chatRoom, setchatRoom] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchBarOpen, setSearchBarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchBarWidth, setSearchBarWidth] = useState(new Animated.Value(0));
  const pan = useRef(new Animated.ValueXY()).current;
  const list = useRef(new Animated.ValueXY()).current;
  LogBox.ignoreAllLogs(); // Disable all log notifications

  ////

  const handleLongPress = (chatId, username) => {
    Alert.alert(
      "Delete Chat Room",
      `Are you sure you want to delete ${username}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => {
            // handle the delete action here
            console.log(`Deleting ${chatId}`);
            deleteChatRoom(chatId);
          },
          style: "destructive",
        },
      ]
    );
  };

  ////
  //user id just for testing static but general getting by login (user info)
//    const userId = "81becdd2-e618-4282-8be1-ff7823964c79";
//    const accountType = "moniteur";
// //  const userId = "dc1c1d66-8bee-449b-ac12-b370156d73fb";
// //   const accountType = "condidat";
 

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.on("connection", () => {
      setSocketConnected(true);
    });
    socket.on('newMessage', (message) => {
      getUserChat(userId)
    });

    //cleanUp function
    return () => {
      socket.disconnect();
    };
  }, [userId]);
  const getUserChat = (userId) => {
    if (accountType == "moniteur") {
      client
        .get(`/api/condidatMoniteur/${userId}`)
        .then((response) => {
          setUserData(response.data);
          console.log("condidat",response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      client
        .get(`/api/moniteurByCondidat/${userId}`)
        .then((response) => {
          setUserData([response.data]);
          console.log("Moniteur",response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
   const putNotification =(chatRoomId,userId)=>{
    client
      .put(`/api/message/${chatRoomId}/${userId}`)
      .then(() => {
        console.log("notification updated")
      })
      .catch((error) => {
        console.error(error);
      });
   }
  const getChatRoom = (userId,accountType, userData) => {
    client
      .get(`/api/chat/${accountType}/${userId}`)
      .then((response) => {
        makeData(response.data, userData);
        // console.log("chat room user", response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const makeData = (chatRoomData, userData) => {
    let data = [];
  
      if(accountType == "moniteur"){
        for (let i = 0; i < chatRoomData.length; i++) {
        let filteredData = userData.filter(
          (item) => item.candidatId === chatRoomData[i].candidatId
        );
        // console.log("filteredData",filteredData[0].name)
        let myObj = {
          roomId: chatRoomData[i].roomId,
          candidatId: chatRoomData[i].candidatId,
          updatedAt: chatRoomData[i].updatedAt,
          lastMessages: chatRoomData[i].lastMessages,
          name: filteredData[0].name,
          pic: filteredData[0].pic,
          updatedAt: chatRoomData[i].updatedAt,
          receivedId:
            userId === chatRoomData[i].candidatId
              ? chatRoomData[i].moniteurId
              : chatRoomData[i].candidatId,
           count :chatRoomData[i].count,
        };
        data.push(myObj);
        console.log("data data data",data)
      }
        setchatRoom(data);
      }else{
        if(chatRoomData.length>0 && userData){
          let myObj = {
            roomId: chatRoomData[0].roomId,
            candidatId: chatRoomData[0].candidatId,
            updatedAt: chatRoomData[0].updatedAt,
            lastMessages: chatRoomData[0].lastMessages,
            name: userData[0].name,
            pic: userData[0].pic,
            updatedAt: chatRoomData[0].updatedAt,
            receivedId:
              userId === chatRoomData[0].candidatId
                ? chatRoomData[0].moniteurId
                : chatRoomData[0].candidatId,
            count:chatRoomData[0].count,
          };
          // console.log("objet ",myObj)
          data.push(myObj);
          setchatRoom(data);
        }
        
      }
      
    
    //  console.log("created",data)
    
    return data;
  };
  const deleteChatRoom = (chatRoomId) => {
    if (accountType == "moniteur") {
      client
      .delete(`/api/chat/${chatRoomId}`)
      .then(() => {
        getChatRoom(userId,accountType, userData);
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      client
      .delete(`/api/chat/${chatRoomId}`)
      .then(() => {
        setchatRoom([])
      })
      .catch((error) => {
        console.error(error);
      });
    }
    
  };
  useEffect(() => {
    if (userData.length > 0) {
      getChatRoom(userId,accountType, userData);
    }
  }, [userData]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      getChatRoom(userId,accountType, userData);

      // Do something when this screen is focused
      //console.log('This screen is focused.');
    }
  }, [isFocused]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const serchedData = userData.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(function () {
    const getData = async () => {
      getUserChat(userId);
      setLoading(false);
    };

    getData();

    Animated.timing(pan, {
      toValue: { x: -400, y: 0 },
      delay: 1000,
      useNativeDriver: false,
    }).start();

    Animated.timing(list, {
      toValue: { x: 0, y: -300 },
      delay: 2000,
      useNativeDriver: false,
    }).start();
  }, []);

  // console.log(data.login);
  const toggleSearchBar = () => {
    setSearchBarOpen(!searchBarOpen);
    const widthValue = searchBarOpen ? 0 : 200;
    Animated.timing(searchBarWidth, {
      toValue: widthValue,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const createNewchat = (id) => {
    if(accountType == "moniteur"){
      client
      .post("/api/chat", {
        candidatId: id,
        moniteurId: userId,
      })
      .then((response) => {
        const data = makeData([response.data], userData);
        props.navigation.navigate("Discussion", {
          chatRoomId: data[0].roomId,
          itemName: data[0].name,
          itemPic: data[0].pic,
          userId: userId,
          updatedAt: data[0].updatedAt,
          receivedId: data[0].receivedId,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }else{
      client
      .post("/api/chat", {
        candidatId: userId,
        moniteurId: id,
      })
      .then((response) => {
        const data = makeData([response.data], userData);
        props.navigation.navigate("Discussion", {
          chatRoomId: data[0].roomId,
          itemName: data[0].name,
          itemPic: data[0].pic,
          userId: userId,
          updatedAt: data[0].updatedAt,
          receivedId: data[0].receivedId,
        });
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };
  // Sort messages by updateAt time (order message by time)
  const sortedData = chatRoom.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );
  return (
    <LinearGradient
      colors={["#13bcaf", "#1ccfc1", "#1ccfc1"]}
      style={styles.gradient}
    >
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontFamily: "Montserrat_800ExtraBold",
              color: "#FFF",
              flex: 1,
              fontSize: searchBarOpen ? 17 : 24,
            }}
          >
            {accountType == "moniteur" ? "Condidat" : "Moniteur"}
          </Text>
          <TouchableOpacity onPress={toggleSearchBar}>
            <MaterialIcons name="person-search" color="#fff" size={30} />
          </TouchableOpacity>
          {searchBarOpen ? (
            <Animated.View
              style={[styles.searchBar, { width: searchBarWidth }]}
            >
              <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#ddd"
                value={searchQuery}
                onChangeText={handleSearch}
              />
            </Animated.View>
          ) : null}
        </View>
      </View>
      <ScrollView
        horizontal
        style={styles.proContainer}
        showsHorizontalScrollIndicator={false}
        contentOffset={{ x: 0, y: 0 }}
      >
        {loading ? (
          <ActivityIndicator size="small" color="#13bcaf" />
        ) : (
          <Animated.View style={[pan.getLayout(), styles.card]}>
            {accountType == "moniteur"?serchedData.map((item) => (
              <Profiles
                key={item.candidatId}
                username={item.name}
                uri={item.pic}
                onPress={() => createNewchat(item.candidatId)}
              />
            )):userData.map((item) => (
              <Profiles
                key={item.MoniteurId}
                username={item.name}
                uri={item.pic}
                onPress={() => createNewchat(item.MoniteurId)}
              />
            ))
            }
          </Animated.View>
        )}
      </ScrollView>
      <View style={styles.ops}>
        <View style={styles.col}></View>
        <ScrollView>
          {loading ? (
            <ActivityIndicator size="large" color="#13bcaf" />
          ) : (
            <Animated.View style={[list.getLayout(), styles.list]}>
              {accountType == "moniteur"? sortedData.map((item, index) => (
                <Messages
                  key={item.roomId}
                  username={item.name}
                  uri={item.pic}
                  lastMessages={item.lastMessages}
                  count={item.count}
                  time={item.updatedAt}
                  onPress={async () => {
                    try {
                      await putNotification(item.roomId, userId);
                      props.navigation.navigate("Discussion", {
                        chatRoomId: item.roomId,
                        itemName: item.name,
                        itemPic: item.pic,
                        userId: userId,
                        updatedAt: item.updatedAt,
                        receivedId: item.receivedId,
                      });
                    } catch (error) {
                      console.error(error);
                    }
                  }}
                  onLongPress={() => handleLongPress(item.roomId, item.name)}
                />
              )) :(
                chatRoom.length>0 ?chatRoom.map((item, index) => (
                  <Messages
                    key={item.roomId}
                    username={item.name}
                    uri={item.pic}
                    lastMessages={item.lastMessages}
                    count={item.count}
                    time={item.updatedAt}
                    onPress={async () => {
                      try {
                        await putNotification(item.roomId, userId);
                        props.navigation.navigate("Discussion", {
                          chatRoomId: item.roomId,
                          itemName: item.name,
                          itemPic: item.pic,
                          userId: userId,
                          updatedAt: item.updatedAt,
                          receivedId: item.receivedId,
                        });
                      } catch (error) {
                        console.error(error);
                      }
                    }}
                    onLongPress={() => handleLongPress(item.roomId, item.name,userId) }
                  />
                )):null
              )}
            </Animated.View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
};
export default Chat;

const styles = StyleSheet.create({
  list: {
    marginTop: 300,
  },
  card: {
    marginLeft: 400,
    width: 30,
    flexDirection: "row",
  },
  gradient: {
    height: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  // header: {
  //   fontFamily: "Montserrat_800ExtraBold",
  //   color: "#FFF",
  //   flex: 1,
  //   fontSize: searchBarOpen ? 10 : 24
  // },
  proContainer: {
    marginRight: -20,
    alignSelf: "center",
  },
  ops: {
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    height: "73%",
    backgroundColor: "#FFF",
    marginHorizontal: -20,
  },
  col: {
    flexDirection: "row",
    marginTop: 25,
    marginHorizontal: 20,
    alignItems: "center",
  },
  day: {
    fontFamily: "Montserrat_800ExtraBold",
    color: "#000119",
    flex: 1,
    fontSize: 20,
  },
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: "#fff",
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    padding: 5,
    color: "#666",
  },
});

import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectStateUser } from "../features/slices/userSlice";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { firestore_db } from "../../firebase";

const ChatScreen = ({ navigation, route }) => {
  const receiver_id = route.params["receiver_id"];
  const receiver_name = route.params["receiver_name"];
  const userSelector = useSelector(selectStateUser);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const scrollViewRef = useRef();

  const handleSend = async () => {
    if (message.length !== 0) {
      const timeStamp = serverTimestamp();
      const id = `${Date.now()}`;
      const _doc = {
        _id: id,
        timeStamp: timeStamp,
        receiver_id: receiver_id,
        sender_id: userSelector.profile.uid,
        data: message,
      };
      setMessage("");
      await addDoc(collection(firestore_db, "messages"), _doc)
        .then(() => {
          console.log("message sent successfully");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const getChats = async () => {};

  useLayoutEffect(() => {
    const msgQuery = query(
      collection(firestore_db, "messages"),
      orderBy("timeStamp", "asc"),
      where("sender_id", "in", [receiver_id, userSelector.profile.uid]),
      where("receiver_id", "in", [receiver_id, userSelector.profile.uid])
    );
    const unsubscribe = onSnapshot(msgQuery, (querySnap) => {
      const upMsg = querySnap.docs.map((doc) => doc.data());
      console.log(upMsg);
      setChat(upMsg);
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        height: "100%",
        backgroundColor: "black",
        flex: 1,
      }}
    >
      <View
        style={{
          backgroundColor: "#202020",
          padding: 8,
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          borderBottomColor: "grey",
          borderBottomWidth: 2,
        }}
      >
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="leftcircleo" size={32} color="#d24dff" />
        </TouchableOpacity>
        <Text style={{ color: "white", fontSize: 30 }}>{receiver_name}</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1, gap: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={90}
      >
        <ScrollView
          style={{
            backgroundColor: "#202020",
            padding: 5,
          }}
          ref={scrollViewRef}
          onContentSizeChange={() =>
            scrollViewRef.current.scrollToEnd({ animated: true })
          }
        >
          {chat &&
            chat.map((item, id) => {
              if (item.sender_id === userSelector.profile.uid) {
                return (
                  <View
                    style={{
                      backgroundColor: "#d24dff",
                      padding: 8,
                      alignSelf: "flex-end",
                      borderRadius: 15,
                      marginVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "white" }}>
                      {item.data}
                    </Text>
                  </View>
                );
              } else {
                return (
                  <View
                    style={{
                      backgroundColor: "#101010",
                      padding: 8,
                      alignSelf: "flex-start",
                      borderRadius: 15,
                      marginVertical: 2,
                    }}
                  >
                    <Text style={{ fontSize: 17, color: "white" }}>
                      {item.data}
                    </Text>
                  </View>
                );
              }
            })}
        </ScrollView>
        <View
          style={{
            backgroundColor: "#353535",
            padding: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            paddingRight: 20,
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#202020",
              color: "white",
              fontSize: 17,
              padding: 8,
              borderRadius: 15,
              width: "85%",
            }}
            placeholder="Type Here..."
            placeholderTextColor={"#808080"}
            value={message}
            onChangeText={(text) => setMessage(text)}
          />
          <TouchableOpacity
            onPress={handleSend}
            style={{
              backgroundColor: "#202020",
              padding: 8,
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FontAwesome name="send" size={26} color="#d24dff" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

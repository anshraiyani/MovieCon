import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFriends,
  addToSentFriendRequests,
  removeFromFriendRequests,
  selectStateUser,
} from "../features/slices/userSlice";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore_db } from "../../firebase";
import { useFonts } from "expo-font";

const FriendRequests = () => {
  const userSelector = useSelector(selectStateUser);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const getUser = async (id) => {
    const docRef = doc(firestore_db, "user", id);
    try {
      const docSnapshot = await getDoc(docRef);
      if (docSnapshot.exists()) {
        return docSnapshot.data();
      }
    } catch (error) {
      console.error("Error fetching document data:", error);
    }
  };

  const getFriendRequests = async () => {
    setLoading(true);
    const requestArray = [...userSelector.friendRequests];
    const requestListData = await Promise.all(
      requestArray.map(async (id) => {
        const userData = await getUser(id);
        return { id, ...userData };
      })
    );

    setRequestList(requestListData);
    setLoading(false);
  };

  useEffect(() => {
    getFriendRequests();
  }, [userSelector.friendRequests]);

  const [fontsLoaded] = useFonts({
    HeroLg: require("../assets/fonts/Hero-Light.ttf"),
    HeroRg: require("../assets/fonts/Hero-Regular.ttf"),
    HeroBd: require("../assets/fonts/Hero-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  const handleFriends = (id) => {
    console.log("already friends");
  };

  const handleRequestSent = (id) => {
    console.log("request already sent");
  };

  const handleAcceptRequest = async (id) => {
    try {
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      const userDocRefOther = doc(firestore_db, "user", id);
      await updateDoc(userDocRefOther, {
        friends: arrayUnion(userSelector.profile.uid),
        sentFriendRequests: arrayRemove(userSelector.profile.uid),
      });
      await updateDoc(userDocRef, {
        friends: arrayUnion(id),
        friendRequests: arrayRemove(id),
      });
      dispatch(addToFriends(id));
      dispatch(removeFromFriendRequests(id));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const handleSendRequest = async (id) => {
    try {
      const userDocRefOther = doc(firestore_db, "user", id);
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      await updateDoc(userDocRefOther, {
        friendRequests: arrayUnion(userSelector.profile.uid),
      });
      await updateDoc(userDocRef, {
        sentFriendRequests: arrayUnion(id),
      });
      dispatch(addToSentFriendRequests(id));
    } catch (error) {
      console.error("Error adding send request:", error);
      throw error;
    }
  };

  return (
    <SafeAreaView
      style={{
        marginTop: StatusBar.currentHeight,
        height: "100%",
        backgroundColor: "black",
        padding: 8,
      }}
    >
      <View>
        <Text style={{ color: "white", fontFamily: "HeroBd", fontSize: 35 }}>
          FriendRequests
        </Text>
      </View>
      <ScrollView>
        {requestList &&
          requestList.map((el) => (
            <View
              style={{
                backgroundColor: "#202020",
                padding: 10,
                borderRadius: 15,
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View>
                <Text
                  style={{ color: "white", fontFamily: "HeroBd", fontSize: 20 }}
                >
                  {el.displayName}
                </Text>
                <Text
                  style={{ color: "white", fontFamily: "HeroBd", fontSize: 17 }}
                >
                  {el.email}
                </Text>
              </View>
              <TouchableOpacity
                style={
                  userSelector.friends.includes(el.uid)
                    ? styles.friends
                    : userSelector.sentFriendRequests.includes(el.uid)
                    ? styles.requestSent
                    : userSelector.friendRequests.includes(el.uid)
                    ? styles.acceptRequest
                    : styles.sendRequest
                }
                onPress={() =>
                  userSelector.friends.includes(el.uid)
                    ? handleFriends(el.uid)
                    : userSelector.sentFriendRequests.includes(el.uid)
                    ? handleRequestSent(el.uid)
                    : userSelector.friendRequests.includes(el.uid)
                    ? handleAcceptRequest(el.uid)
                    : handleSendRequest(el.uid)
                }
              >
                <Text
                  style={{ color: "black", fontFamily: "HeroBd", fontSize: 15 }}
                >
                  {userSelector.friends.includes(el.uid)
                    ? "Friends"
                    : userSelector.sentFriendRequests.includes(el.uid)
                    ? "Request Sent"
                    : userSelector.friendRequests.includes(el.uid)
                    ? "Accept request"
                    : "Send Request"}
                </Text>
              </TouchableOpacity>
            </View>
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FriendRequests;

const styles = StyleSheet.create({
  friends: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 10,
  },
  requestSent: {
    backgroundColor: "yellow",
    padding: 5,
    borderRadius: 10,
  },
  acceptRequest: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
  },
  sendRequest: {
    backgroundColor: "#d24dff",
    padding: 5,
    borderRadius: 10,
  },
});
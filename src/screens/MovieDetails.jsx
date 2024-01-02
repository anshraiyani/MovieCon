import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import moment from "moment";
import SimilarMovies from "../components/SimilarMovies";
import Cast from "../components/Cast";
import { AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import { firestore_db } from "../../firebase";
import {
  arrayRemove,
  arrayUnion,
  doc,
  updateDoc,
} from "firebase/firestore";
import {
  addToFavorites,
  addToWatchlist,
  removeFromFavorites,
  removeFromWatchlist,
  selectStateUser,
} from "../features/slices/userSlice";

SplashScreen.preventAutoHideAsync();

const MovieDetails = ({ navigation, route }) => {
  const movieId = route.params["id"];
  const [data, setData] = useState(null);
  const userSelector = useSelector(selectStateUser);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchlist, setIsWatchlist] = useState(false);
  const dispatch = useDispatch();

  const contiansFavorite = async () => {
    if (userSelector.favorites.includes(movieId)) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  };

  const containsWatchlist = async () => {
    if (userSelector.watchlist.includes(movieId)) {
      setIsWatchlist(true);
    } else {
      setIsWatchlist(false);
    }
  };

  useEffect(() => {
    containsWatchlist();
    contiansFavorite();
  }, [isFavorite, isWatchlist]);

  const getMovie = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const movieData = await response.json();
      setData(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(movieId);
  }, [movieId]);

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

  const handleAddToFavorite = async () => {
    try {
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      await updateDoc(userDocRef, {
        favorites: arrayUnion(movieId),
      });
      setIsFavorite(true);
      dispatch(addToFavorites(movieId));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const handleRemoveFromFavorite = async () => {
    try {
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      await updateDoc(userDocRef, {
        favorites: arrayRemove(movieId),
      });
      setIsFavorite(false);
      dispatch(removeFromFavorites(movieId));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const handleAddToWatchlist = async () => {
    try {
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      await updateDoc(userDocRef, {
        watchlist: arrayUnion(movieId),
      });
      setIsWatchlist(true);
      dispatch(addToWatchlist(movieId));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  const handleRemoveFromWatchlist = async () => {
    try {
      const userDocRef = doc(firestore_db, "user", userSelector.profile.uid);
      await updateDoc(userDocRef, {
        watchlist: arrayRemove(movieId),
      });
      setIsWatchlist(false);
      dispatch(removeFromWatchlist(movieId));
    } catch (error) {
      console.error("Error adding favorite:", error);
      throw error;
    }
  };

  return (
    data && (
      <SafeAreaView
        style={{
          height: "100%",
          marginTop: StatusBar.currentHeight,
          backgroundColor: "black",
        }}
      >
        <ScrollView style={{ flex: 1 }}>
          <View style={{ height: 370 }}>
            <ImageBackground
              style={{ width: "100%", height: 221, resizeMode: "contain" }}
              source={{
                uri: `https://image.tmdb.org/t/p/original${data.backdrop_path}`,
              }}
            >
              <View
                style={{
                  height: "100%",
                  width: "100%",
                  backgroundColor: "rgba(0,0,0,0.4)",
                }}
              ></View>
            </ImageBackground>
            <View
              style={{
                position: "absolute",
                top: 160,
                left: 10,
                flexDirection: "row",
              }}
            >
              <View
                style={{
                  height: 200,
                  width: 130,
                  borderColor: "#808080",
                  borderWidth: 0.2,
                }}
              >
                <Image
                  style={{ height: "100%", width: "100%" }}
                  source={{
                    uri: `https://image.tmdb.org/t/p/original${data.poster_path}`,
                  }}
                />
              </View>
              <View style={{ width: "100%" }}>
                <Text
                  style={{
                    marginTop: 70,
                    marginLeft: 10,
                    fontFamily: "HeroRg",
                    fontSize: 25,
                    width: "45%",
                    color: "white",
                  }}
                >
                  {data.title}
                </Text>
                <Text
                  style={{
                    marginLeft: 10,
                    fontSize: 17,
                    fontFamily: "HeroRg",
                    color: "#909090",
                  }}
                >
                  {moment(data.release_date).format("Do MMMM YYYY")}
                </Text>
              </View>
            </View>
          </View>
          <View style={{ padding: 10, gap: 10 }}>
            <View style={{ gap: 10 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "HeroBd",
                }}
              >
                Genres
              </Text>
              <View style={{ flexDirection: "row", gap: 15, flexWrap: "wrap" }}>
                {data.genres.map((genre) => {
                  return (
                    <View
                      key={genre.id}
                      style={{
                        borderWidth: 1,
                        padding: 10,
                        borderRadius: 20,
                        borderColor: "#808080",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          color: "white",
                          fontFamily: "HeroRg",
                        }}
                      >
                        {genre.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "HeroBd",
                }}
              >
                Rating: {data.vote_average.toFixed(2)}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "HeroBd",
                }}
              >
                Overview
              </Text>
              <Text
                style={{
                  fontFamily: "HeroRg",
                  fontSize: 17,
                  color: "#909090",
                }}
              >
                {data.overview}
              </Text>
            </View>
            <View style={{ gap: 7 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "HeroBd",
                }}
              >
                Cast
              </Text>
              <Cast id={movieId} navigation={navigation} />
            </View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                gap: 5,
              }}
            >
              <TouchableOpacity
                style={
                  isFavorite ? styles.removeFavorites : styles.favoriteMovie
                }
                onPress={
                  !isFavorite ? handleAddToFavorite : handleRemoveFromFavorite
                }
              >
                <Text
                  style={
                    isFavorite
                      ? styles.removeFavoritesText
                      : styles.favoriteMovieText
                  }
                >
                  {isFavorite ? "Remove from " : "Add to "}
                </Text>
                <AntDesign
                  name="hearto"
                  size={20}
                  color={isFavorite ? "black" : "red"}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={
                  isWatchlist ? styles.removeWatchlist : styles.watchlistMovie
                }
                onPress={
                  !isWatchlist
                    ? handleAddToWatchlist
                    : handleRemoveFromWatchlist
                }
              >
                <Text
                  style={
                    isWatchlist
                      ? styles.removeWatchlistText
                      : styles.watchlistmMovieText
                  }
                >
                  {isWatchlist ? "Remove from " : "Add to "}
                </Text>
                <AntDesign
                  name="clockcircleo"
                  size={20}
                  color={isWatchlist ? "black" : "yellow"}
                />
              </TouchableOpacity>
            </View>
            <View style={{ marginBottom: 40, gap: 7 }}>
              <Text
                style={{
                  fontSize: 20,
                  color: "white",
                  fontFamily: "HeroBd",
                }}
              >
                Similar
              </Text>
              <SimilarMovies id={movieId} navigation={navigation} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  );
};

export default MovieDetails;

const styles = StyleSheet.create({
  favoriteMovie: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    gap: 5,
    flexWrap: "wrap",
  },
  favoriteMovieText: {
    color: "white",
    fontSize: 15,
    fontFamily: "HeroRg",
  },
  removeFavorites: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "red",
    backgroundColor: "red",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    gap: 5,
    flexWrap: "wrap",
  },
  removeFavoritesText: {
    color: "black",
    fontSize: 15,
    fontFamily: "HeroBd",
  },
  watchlistMovie: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "yellow",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    gap: 5,
    flexWrap: "wrap",
  },
  watchlistmMovieText: {
    color: "white",
    fontSize: 15,
    fontFamily: "HeroRg",
  },
  removeWatchlist: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: "yellow",
    backgroundColor: "yellow",
    borderWidth: 1,
    padding: 5,
    borderRadius: 10,
    gap: 5,
    flexWrap: "wrap",
  },
  removeWatchlistText: {
    color: "black",
    fontSize: 15,
    fontFamily: "HeroBd",
  },
});

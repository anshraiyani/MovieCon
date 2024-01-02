import { Text, View, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import moment from "moment";
import { Feather } from "@expo/vector-icons";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync();

const MovieCard = ({ id, navigation }) => {
  const [movie, setMovie] = useState(null);

  const getColor = () => {
    if (movie.vote_average >= 7) {
      return "green";
    }
    if (movie.vote_average < 7 && movie.vote_average >= 5) {
      return "yellow";
    }
    if (movie.vote_average < 5 && movie.vote_average >= 3) {
      return "orange";
    } else {
      return "red";
    }
  };

  const getMovie = async (id) => {
    try {
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=fc6b0f8734f6d710fed11de93fc496cc`;
      const response = await fetch(url);
      const movieData = await response.json();
      setMovie(movieData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getMovie(id);
  }, [id]);

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

  return (
    <View>
      {movie && (
        <TouchableOpacity
          style={{
            flex: 1,
            width: "100%",
            height: 160,
            backgroundColor: "#202020",
            flexDirection: "row",
            elevation: 6,
            shadowColor: "#171717",
            padding: 10,
            borderRadius: 10,
            marginVertical: 8,
          }}
          onPress={() => navigation.navigate("MovieDetails", { id: id })}
        >
          <View style={{ height: "100%", width: "28%" }}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
              }}
              style={{ height: "100%", width: "100%" }}
            />
          </View>
          <View
            style={{
              width: "72%",
              paddingHorizontal: 10,
              justifyContent: "space-between",
            }}
          >
            <View>
              <Text
                style={{ fontFamily: "HeroRg", color: "white", fontSize: 16 }}
              >
                {movie.title}
              </Text>
              <Text style={{ fontFamily: "HeroLg", color: "white" }}>
                {moment(movie.release_date).format("Do MMM YYYY")}
              </Text>
              <View
                style={{
                  marginTop: 5,
                  flexDirection: "row",
                  flexWrap: "wrap",
                  gap: 5,
                }}
              >
                {movie.genres.slice(0, 3).map((genre) => {
                  return (
                    <View
                      key={genre.id}
                      style={{
                        borderWidth: 0.5,
                        padding: 5,
                        borderRadius: 20,
                        borderColor: "#707070",
                      }}
                    >
                      <Text
                        style={{
                          color: "#707070",
                          fontFamily: "HeroRg",
                          fontSize: 12,
                        }}
                      >
                        {genre.name}
                      </Text>
                    </View>
                  );
                })}
              </View>
            </View>
            <View
              style={{
                flexDirection: "row",
                marginTop: 5,
                gap: 5,
                alignItems: "center",
              }}
            >
              <Feather name="thumbs-up" size={20} color={getColor()} />
              <Text
                style={{ fontFamily: "HeroRg", color: "white", fontSize: 18 }}
              >
                {movie.vote_average.toFixed(2)}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MovieCard;

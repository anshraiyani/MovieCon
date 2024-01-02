import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    profile: {
      uid: "",
      displayName: "",
      email: "",
      photoUrl: "",
    },
    favorites: [],
    watchlist: [],
    friends: [], //friends of user
    friendRequests: [], // friend requests sent by other users
    sentFriendRequests: [], //friend request sent to other users
  },
  reducers: {
    loadProfile: (state, action) => {
      state.profile.displayName = action.payload.displayName;
      state.profile.email = action.payload.email;
      state.profile.uid = action.payload.uid;
      state.profile.photoUrl = action.payload.photoUrl;
    },
    addToFavorites: (state, action) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorites: (state, action) => {
      const temp = [...state.favorites];
      state.favorites = temp.filter((el) => el != action.payload);
    },
    updateFavorites: (state, action) => {
      state.favorites = [...action.payload];
    },
    addToWatchlist: (state, action) => {
      state.watchlist.push(action.payload);
    },
    removeFromWatchlist: (state, action) => {
      const temp = [...state.watchlist];
      state.watchlist = temp.filter((el) => el != action.payload);
    },
    updateWatchlist: (state, action) => {
      state.watchlist = [...action.payload];
    },
    addToFriends: (state, action) => {
      state.friends.push(action.payload);
    },
    removeFromFriends: (state, action) => {
      const temp = [...state.friends];
      state.friends = temp.filter((el) => el != action.payload);
    },
    updateFriends: (state, action) => {
      state.friends = [...action.payload];
    },
    addToFriendRequests: (state, action) => {
      state.friendRequests.push(action.payload);
    },
    removeFromFriendRequests: (state, action) => {
      const temp = [...state.friendRequests];
      state.friendRequests = temp.filter((el) => el != action.payload);
    },
    updateFriendRequests: (state, action) => {
      state.friendRequests = [...action.payload];
    },
    addToSentFriendRequests: (state, action) => {
      state.sentFriendRequests.push(action.payload);
    },
    removeFromSentFriendRequests: (state, action) => {
      const temp = [...state.sentFriendRequests];
      state.sentFriendRequests = temp.filter((el) => el != action.payload);
    },
    updateSentFriendRequests: (state, action) => {
      state.sentFriendRequests = [...action.payload];
    },
    clearStates: (state, action) => {
      state.profile.displayName = "";
      state.profile.email = "";
      state.profile.uid = "";
      state.profile.photoUrl = "";
      state.favorites = [];
      state.watchlist = [];
      state.friends = [];
      state.friendRequests = [];
      state.sentFriendRequests = [];
    },
  },
});

export const {
  loadProfile,
  addToFavorites,
  removeFromFavorites,
  updateFavorites,
  addToFriendRequests,
  removeFromFriendRequests,
  updateFriendRequests,
  addToFriends,
  removeFromFriends,
  updateFriends,
  addToSentFriendRequests,
  updateSentFriendRequests,
  removeFromSentFriendRequests,
  addToWatchlist,
  removeFromWatchlist,
  updateWatchlist,
  clearStates,
} = userSlice.actions;

export const selectStateUser = (state) => state.user;

export default userSlice.reducer;

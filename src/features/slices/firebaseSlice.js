import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { app, firestore_db } from "../../../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

export const firebaseSignin = createAsyncThunk(
  "signin",
  async ({ email, password }) => {
    try {
      const response = await signInWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const user = response.user;
      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoUrl,
      };
    } catch (error) {
      throw error;
    }
  }
);

export const firebaseSignUp = createAsyncThunk(
  "signup",
  async ({ email, password, username }) => {
    try {
      const userDetails = await createUserWithEmailAndPassword(
        getAuth(app),
        email,
        password
      );
      const user = userDetails.user;
      await updateProfile(user, {
        displayName: username,
      });

      //initialize empty arrays
      const usersCollection = collection(firestore_db, "user");
      const userDocRef = doc(usersCollection, user.uid);
      await setDoc(userDocRef, {
        favorites: [],
        watchlist: [],
        friends: [],
        friendRequests: [],
        sentFriendRequests: [],
        displayName: user.displayName,
        email: user.email,
        uid: user.uid,
        photoUrl: user.photoURL || "",
      });

      return {
        uid: user.uid,
        displayName: user.displayName,
        email: user.email,
        photoUrl: user.photoUrl,
      };
    } catch (error) {
      throw error;
    }
  }
);

const firebaseSlice = createSlice({
  name: "firebase",
  initialState: {
    isLoading: false,
    user: null,
    isError: false,
    error: null,
  },
  reducers: {
    clearStates: (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isError = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // builder cases for signin
    builder.addCase(firebaseSignin.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(firebaseSignin.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(firebaseSignin.rejected, (state, action) => {
      state.error = action.error.code;
      state.isError = true;
      state.isLoading = false;
      console.log(state.error);
    });
    // builder cases for signup
    builder.addCase(firebaseSignUp.pending, (state, action) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(firebaseSignUp.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.user = action.payload;
      console.log(state.user);
    });
    builder.addCase(firebaseSignUp.rejected, (state, action) => {
      state.error = action.error.code;
      state.isError = true;
      state.isLoading = false;
      console.log(state.error);
    });
  },
});

export const { clearStates } = firebaseSlice.actions;
export const selectStateFirebase = (state) => state.firebase;

export default firebaseSlice.reducer;

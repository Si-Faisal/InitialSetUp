import { useEffect, useState } from "react";
import {createSlice, PayloadAction, createAsyncThunk, Dispatch} from "@reduxjs/toolkit";
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../../firebase/firebase.config";
import { AnyAction } from '@reduxjs/toolkit'
import useAxiosPublic from "../Axios/AxiosPublic/useAxiosPublic";
const auth = getAuth(app);

interface User {
  email: string;
  phoneNumber: string;
  photoURL: string;
  uid: string;
  // auth: any; // Add the auth property with its appropriate type
}



const initialState = {
  user: null as User | null,
  loading: false,
  error: null as string | null,
};

const googleProvider = new GoogleAuthProvider();
const axiosPublic = useAxiosPublic();




// update PRofile  start TODO

export const UserUpdateProfile = (name: string, photo: string) => (dispatch: any) => {
  if (name && photo) {
    updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
      .then(() => {
        dispatch(listenToAuthChanges());
      })
      .catch((error) => {
        console.error(error);
        // Dispatch an action or set an error state here if required
      });
  } else {
    // Handle the scenario where name or photo is null/undefined
    console.log("Name or photo is invalid.");
  }
};


// update PRofile end TODO

export const UserLogOut =() =>(dispatch: Dispatch<AnyAction>)=>{
   signOut(auth).then(() => {
    dispatch(setLoggedOutUser());
  }).catch((error) => {
    console.error(error);
    // Dispatch an action or set an error state here if required
  });

}



// google logIn start


export const UserGoogleLogin =createAsyncThunk<User, undefined, { rejectValue: string }>(
  "fireBaseAuth/GoogleLogin",
  async (_, { rejectWithValue }) => {
    try {
      const response = await signInWithPopup(auth, googleProvider);
     
      const user = response.user;
      const NewUser : User = {
        email: user.email,
        phoneNumber: user.phoneNumber || '',
        photoURL: user.photoURL || '',
        uid: user.uid,
      };
     
      return NewUser;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
)
// google login End

// FireBase Auth Changed Monitoring start.........


export const listenToAuthChanges = () => async (dispatch : any) => {
    onAuthStateChanged(auth, async(user) => {
     
    
      if (user) {


        const NewUser : User = {
           email: user.email || '',
           phoneNumber: user.phoneNumber || '',
           photoURL: user.photoURL || '',
           uid: user.uid,
      }
       dispatch(setLoggedInUser(NewUser));

       try {
        const res =await axiosPublic.post('/routes/jwt', { email: user.email} )
        
        if (res.data.token) {
                localStorage.setItem('access-token', res.data.token);
            }

            
      } catch (error) {
        if(error){
          localStorage.removeItem('access-token');
        }
        console.log(error);
      }
      
       } else if(!user) {
        dispatch(setLoggedOutUser());
      }
    });
  };
  

  // FireBase Auth Changed Monitoring end.........


  
//  FireBase Login User Authentication Start.....


  const loginUser = createAsyncThunk<User, { email: string, password: string }, { rejectValue: string }>(
  "fireBaseAuth/loginUser",
  async ({ email, password }, { rejectWithValue }) => {
    
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error(error.message);
      return rejectWithValue(error.message);
    }
  }
);

//  FireBase Login User Authentication End.....

//  FireBase SinUp User Authentication Start.....



const SignUpUser = createAsyncThunk<void, {email : string,password : string}, {rejectValue: string}>(
    "fireBaseAuth/SignUpUser",
    async({email, password}, {dispatch, rejectWithValue })=>{
      try {
        const createUser = await createUserWithEmailAndPassword(auth, email, password);
        // const user = createUser.user;
        dispatch(listenToAuthChanges());
        return ;

        } catch (error) {
            
            return rejectWithValue(error.message); 
        }
    }
)

//  FireBase SignUp User Authentication End.....



const firebaseAuthSlice = createSlice({
    name:"fireBaseAuth",
    initialState,
    reducers:{
        setLoggedInUser(state, action) {
            state.user = action.payload;
            state.loading = false;
            state.error = null;
          },
          setLoggedOutUser(state) {
            state.user = null;
            state.loading = false;
            state.error = null;
            localStorage.removeItem('access-token');
          },
          setGoogleLogin(state,action){
           state.user = action.payload
          },
          setProfilUpdate(state,action){
            state.error = action.payload
          }
    },
    extraReducers: (builder) => {
        builder
          .addCase(loginUser.pending, (state) => {
            state.loading = true;
          })
          .addCase(loginUser.fulfilled, (state, action) => {
           
           
            state.loading = false;
            // state.user = action.payload;
            state.error = null;
          })
          .addCase(loginUser.rejected, (state, action) => {
            state.user= null;
            state.loading = false;
            state.error = action.payload; 
        })
        .addCase(SignUpUser.pending, (state) => {
            state.loading = true;
        })
        .addCase(SignUpUser.fulfilled, (state, action) => {
          
            state.loading = false;
            state.error = null;
        })
        .addCase(SignUpUser.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload; 
        })
        .addCase(UserGoogleLogin.pending, (state) => {
          state.loading = true; 
        })
        .addCase(UserGoogleLogin.fulfilled, (state, action) => {
          state.loading = false; 
          state.user = action.payload;
        })
        .addCase(UserGoogleLogin.rejected, (state, action) => {
          state.loading = false; 
          state.error = action.payload  as unknown as string;
        });
    },
})

export const firebaseAuthReducer = firebaseAuthSlice.reducer;
export const {setLoggedInUser,setGoogleLogin,setLoggedOutUser, setProfilUpdate} = firebaseAuthSlice.actions;

export default firebaseAuthSlice;

// Export the async action creator to dispatch the login action
export { loginUser , SignUpUser }


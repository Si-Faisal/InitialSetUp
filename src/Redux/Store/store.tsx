import {configureStore , combineReducers} from "@reduxjs/toolkit";
import {firebaseAuthReducer} from "../Slice/FirebaseAuthSlice"


const rootReducer = combineReducers({
  fireBaseAuth: firebaseAuthReducer,
  // other reducers if present
});

export type RootState = ReturnType<typeof rootReducer>;


const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;

export default store;









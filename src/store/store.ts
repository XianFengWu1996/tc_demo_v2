import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import cartSlicer from './slicer/cartSlicer';
import checkoutSlicer from './slicer/checkoutSlicer';
import menuSlicer from './slicer/menuSlicer';
import storeSlicer from './slicer/storeSlicer';

const persistConfig = {
  key: 'tc_root',
  storage,
  whitelist: ['cart'],
};

const reducer = combineReducers({
  menu: menuSlicer,
  cart: cartSlicer,
  store: storeSlicer,
  checkout: checkoutSlicer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

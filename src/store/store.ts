import { configureStore } from '@reduxjs/toolkit';
import cartSlicer from './slicer/cartSlicer';
import menuSlicer from './slicer/menuSlicer';
// ...

export const store = configureStore({
  reducer: {
    menu: menuSlicer,
    cart: cartSlicer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

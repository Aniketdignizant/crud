// src/store.js
import { configureStore } from "@reduxjs/toolkit"
import itemsReducer from "./item/itemsSlice.js"

export const store = configureStore({
  reducer: {
    items: itemsReducer,
  },
})

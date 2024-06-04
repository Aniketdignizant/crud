import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"

const initialState = {
  items: [],
  status: "idle",
  error: null,
}

const BASE_URL = "http://localhost:3000"

export const fetchItems = createAsyncThunk("items/fetchItems", async () => {
  const response = await fetch(`${BASE_URL}/items`)
  return response.json()
})

export const addItem = createAsyncThunk("items/addItem", async (newItem) => {
  const response = await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newItem),
  })
  console.log("responce", response)

  return response.json()
})

export const updateItem = createAsyncThunk(
  "items/updateItem",
  async (updatedItem) => {
    console.log("updatedItem.id", updatedItem.id)

    const response = await fetch(`${BASE_URL}/items/${updatedItem.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedItem),
    })
    return response.json()
  }
)

export const deleteItem = createAsyncThunk("items/deleteItem", async (id) => {
  await fetch(`${BASE_URL}/items/${id}`, { method: "DELETE" })
  return id
})

const itemsSlice = createSlice({
  name: "items",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.items = action.payload
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message
      })
      .addCase(addItem.fulfilled, (state, action) => {
        state.items.push(action.payload)
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          (item) => item.id === action.payload.id
        )
        state.items[index] = action.payload
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item.id !== action.payload)
      })
  },
})

export default itemsSlice.reducer

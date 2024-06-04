import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import {
  fetchItems,
  addItem,
  updateItem,
  deleteItem,
} from "../../redux/item/itemsSlice.js"

const ItemsList = () => {
  const dispatch = useDispatch()
  const items = useSelector((state) => state.items.items)
  console.log("items", items)
  const itemStatus = useSelector((state) => state.items.status)
  console.log("itemStatus", itemStatus)
  const error = useSelector((state) => state.items.error)

  const [newItem, setNewItem] = useState("")
  const [editItem, setEditItem] = useState(null)

  useEffect(() => {
    if (itemStatus === "idle") {
      dispatch(fetchItems())
    }
  }, [itemStatus, dispatch])

  const handleAddItem = () => {
    dispatch(addItem({ name: newItem }))
    setNewItem("")
    console.log("newItem", newItem)
  }

  const handleUpdateItem = (item) => {
    dispatch(updateItem(item))
    setEditItem(null)
  }

  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id))
  }

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "5px",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Items List</h2>
      {itemStatus === "loading" && (
        <p style={{ textAlign: "center" }}>Loading...</p>
      )}
      {itemStatus === "failed" && (
        <p style={{ color: "red", textAlign: "center" }}>{error}</p>
      )}
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {items.map((item) => (
          <li
            key={item.id}
            style={{
              marginBottom: "10px",
              backgroundColor: "#fff",
              padding: "10px",
              borderRadius: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {editItem?.id === item.id ? (
              <input
                type="text"
                value={editItem.name}
                onChange={(e) =>
                  setEditItem({ ...editItem, name: e.target.value })
                }
                style={{ flex: "1", marginRight: "10px", padding: "5px" }}
              />
            ) : (
              <span>{item.name}</span>
            )}
            {editItem?.id === item.id ? (
              <button
                onClick={() => handleUpdateItem(editItem)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#007bff",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => setEditItem(item)}
                style={{
                  padding: "5px 10px",
                  backgroundColor: "#28a745",
                  color: "#fff",
                  border: "none",
                  borderRadius: "3px",
                }}
              >
                Edit
              </button>
            )}
            <button
              onClick={() => handleDeleteItem(item.id)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "3px",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <div style={{ display: "flex", alignItems: "center" }}>
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          style={{ flex: "1", marginRight: "10px", padding: "5px" }}
          placeholder="Enter item name"
        />
        <button
          onClick={handleAddItem}
          style={{
            padding: "5px 10px",
            backgroundColor: "#17a2b8",
            color: "#fff",
            border: "none",
            borderRadius: "3px",
          }}
        >
          Add Item
        </button>
      </div>
    </div>
  )
}

export default ItemsList

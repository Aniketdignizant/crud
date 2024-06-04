import React, { useState, useEffect } from "react"
import {
  getItems,
  createItem,
  updateItem,
  deleteItem,
} from "../../lifcycleApis"
import "../../App.css"

const ItemList = () => {
  const [items, setItems] = useState([])
  const [newItemTitle, setNewItemTitle] = useState("")
  const [editItemTitle, setEditItemTitle] = useState("")
  const [editItemId, setEditItemId] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems()
        setItems(data)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchItems()
  }, [])

  const handleAddItem = async () => {
    if (newItemTitle.trim() === "") {
      setError("Item title cannot be empty.")
      return
    }

    try {
      const newItem = await createItem({ title: newItemTitle })
      setItems([...items, newItem])
      setNewItemTitle("")
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleEditItem = (item) => {
    setEditItemId(item.id)
    setEditItemTitle(item.title)
  }

  const handleUpdateItem = async () => {
    if (editItemTitle.trim() === "") {
      setError("Item title cannot be empty.")
      return
    }

    try {
      const updatedItem = await updateItem(editItemId, { title: editItemTitle })
      setItems(items.map((i) => (i.id === editItemId ? updatedItem : i)))
      setEditItemId(null)
      setEditItemTitle("")
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id)
      setItems(items.filter((i) => i.id !== id))
      setError(null)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="container">
      {error && <div className="error">{error}</div>}

      <ul className="item-list">
        {items.length > 0 ? (
          items.map((item) => (
            <li key={item.id} className="item">
              <span className="item-title">{item.title}</span>
              <button
                className="edit-button"
                onClick={() => handleEditItem(item)}
              >
                Edit
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteItem(item.id)}
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <li className="no-items">No items found.</li>
        )}
      </ul>

      <div className="input-group">
        <input
          type="text"
          placeholder="New item title"
          value={newItemTitle}
          onChange={(e) => setNewItemTitle(e.target.value)}
          className="input"
        />
        <button className="add-button" onClick={handleAddItem}>
          Add Item
        </button>
      </div>

      {editItemId !== null && (
        <div className="input-group">
          <input
            type="text"
            placeholder="Edit item title"
            value={editItemTitle}
            onChange={(e) => setEditItemTitle(e.target.value)}
            className="input"
          />
          <button className="update-button" onClick={handleUpdateItem}>
            Update Item
          </button>
        </div>
      )}
    </div>
  )
}

export default ItemList

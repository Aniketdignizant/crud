import React, {
  useState,
  useEffect,
  useMemo,
  useReducer,
  useCallback,
  useRef,
} from "react"
import "../../App.css"

// reducer initial state
const initialState = {
  items: [],
}

// reducer
const reducer = (state, action) => {
  console.log("state,action>>>>>>>>", state, action)
  switch (action.type) {
    case "ADD_ITEM":
      return { ...state, items: [...state.items, action.payload] }
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      }
    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.id !== action.payload),
      }
    default:
      return state
  }
}

const Hooks = () => {
  // useState
  const [state, dispatch] = useReducer(reducer, initialState)
  const [name, setName] = useState("")
  const [editingId, setEditingId] = useState(null)
  const inputRef = useRef()

  // useEffect
  useEffect(() => {
    inputRef.current.focus()
  }, [])

  // useCallback
  const addItem = useCallback(() => {
    if (name.trim() !== "") {
      if (editingId) {
        console.log("editingId/name=>>>", editingId, name)

        dispatch({
          type: "UPDATE_ITEM",
          payload: { id: editingId, name },
        })
        setEditingId(null)
      } else {
        dispatch({
          type: "ADD_ITEM",
          payload: { id: Date.now(), name },
        })
      }
      setName("")
    }
  }, [name, editingId])

  const editItem = useCallback((item) => {
    console.log("item", item)
    setName(item.name)
    setEditingId(item.id)
    inputRef.current.focus()
  }, [])

  const deleteItem = useCallback((id) => {
    console.log("deleted/id", id)
    dispatch({
      type: "DELETE_ITEM",
      payload: id,
    })
  }, [])

  // useMemo
  const itemList = useMemo(() => {
    return state.items.map((item) => (
      <div className="item" key={item.id}>
        <span>{item.name}</span>
        <div className="buttons">
          <button className="edit" onClick={() => editItem(item)}>
            Edit
          </button>
          <button className="delete" onClick={() => deleteItem(item.id)}>
            Delete
          </button>
        </div>
      </div>
    ))
  }, [state.items, editItem, deleteItem])
  console.log("itemList", itemList)

  return (
    <div className="app">
      <h1>CRUD Demo With Hooks</h1>
      <div className="input-group">
        <input
          ref={inputRef}
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button className="add" onClick={addItem}>
          {editingId ? "Update" : "Add"}
        </button>
      </div>
      <div className="item-list">{itemList}</div>
    </div>
  )
}

export default Hooks

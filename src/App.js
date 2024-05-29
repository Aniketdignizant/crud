// App.js
import React from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Home from "./components/hooks/home"
import Hooks from "./components/hooks/hooks"
import Auth from "./components/hooks/auth"
import FetchApi from "./components/hooks/fetchApi"
import ItemsList from "./components/hooks/ItemsList"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/hooks" element={<Hooks />} />
        <Route exact path="/auth" element={<Auth />} />
        <Route exact path="/fetchApi" element={<FetchApi />} />
        <Route exact path="/itemsList" element={<ItemsList />} />
      </Routes>
    </Router>
  )
}

export default App

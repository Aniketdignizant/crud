import React from "react"
import { Link } from "react-router-dom"
import "../../App.css"

const Home = () => {
  return (
    <>
      <nav className="navbar">
        <ul className="navbar-list">
          <li className="navbar-item">
            <Link to="/" className="navbar-link">
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/fetchApi" className="navbar-link">
              Fetch API
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/itemsList" className="navbar-link">
              Items List
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/hooks" className="navbar-link">
              Hooks
            </Link>
          </li>
        </ul>
      </nav>
      <div className="welcome-message">welcome to react examples</div>
    </>
  )
}

export default Home

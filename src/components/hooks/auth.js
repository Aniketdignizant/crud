import React, { useState } from "react"
import "../../App.css"

import useCustomFormValidation from "./coustomHooks.js"
import {
  loginValidationSchema,
  registerValidationSchema,
} from "../../schema/schema.js"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true)

  const loginInitialValues = { email: "", password: "" }
  const registerInitialValues = { name: "", email: "", password: "" }

  const {
    handleSubmit: handleLoginSubmit,
    handleChange: handleLoginChange,
    isSubmitting: isLoginSubmitting,
    errors: loginErrors,
  } = useCustomFormValidation(
    loginInitialValues,
    loginValidationSchema,
    async (values, { setSubmitting, resetForm }) => {
      console.log("Login Data:", values)

      setTimeout(() => {
        resetForm()
        setSubmitting(false)
      }, 1000)
    }
  )

  const {
    handleSubmit: handleRegisterSubmit,
    handleChange: handleRegisterChange,
    isSubmitting: isRegisterSubmitting,
    errors: registerErrors,
  } = useCustomFormValidation(
    registerInitialValues,
    registerValidationSchema,
    async (values, { setSubmitting, resetForm }) => {
      console.log("Register Data:", values)

      setTimeout(() => {
        resetForm()
        setSubmitting(false)
      }, 1000)
    }
  )

  return (
    <div className="form-container">
      <h1>Welcome to Hooks</h1>
      <div className="switch-button-container">
        <button
          onClick={() => setIsLogin(true)}
          className={isLogin ? "active" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsLogin(false)}
          className={!isLogin ? "active" : ""}
        >
          Register
        </button>
      </div>
      {isLogin ? (
        <form onSubmit={handleLoginSubmit}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleLoginChange}
              className={loginErrors.email ? "error" : ""}
            />
            {loginErrors.email && (
              <div className="error-message">{loginErrors.email}</div>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleLoginChange}
              className={loginErrors.password ? "error" : ""}
            />
            {loginErrors.password && (
              <div className="error-message">{loginErrors.password}</div>
            )}
          </div>
          <button type="submit" disabled={isLoginSubmitting}>
            Login
          </button>
        </form>
      ) : (
        <form onSubmit={handleRegisterSubmit}>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="name"
              onChange={handleRegisterChange}
              className={registerErrors.name ? "error" : ""}
            />
            {registerErrors.name && (
              <div className="error-message">{registerErrors.name}</div>
            )}
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="email"
              onChange={handleRegisterChange}
              className={registerErrors.email ? "error" : ""}
            />
            {registerErrors.email && (
              <div className="error-message">{registerErrors.email}</div>
            )}
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              name="password"
              onChange={handleRegisterChange}
              className={registerErrors.password ? "error" : ""}
            />
            {registerErrors.password && (
              <div className="error-message">{registerErrors.password}</div>
            )}
          </div>
          <button type="submit" disabled={isRegisterSubmitting}>
            Register
          </button>
        </form>
      )}
    </div>
  )
}

export default Auth

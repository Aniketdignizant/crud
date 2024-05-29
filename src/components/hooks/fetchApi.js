import React, { useState } from "react"

import "../../App.css"
import useFetch from "./fetchCoustomHook"

const FetchApi = () => {
  const [url, setUrl] = useState("")
  const [method, setMethod] = useState("GET")
  const [bodyData, setBodyData] = useState("")

  const options = {
    method,
    headers:
      method === "POST" || method === "PUT"
        ? {
            "Content-Type": "application/json",
          }
        : {},
    body:
      (method === "POST" || method === "PUT") && bodyData
        ? JSON.stringify(JSON.parse(bodyData))
        : null,
  }

  const { data, loading, error } = useFetch(url, options)
  console.log("data=>>>", data)
  console.log("loading=>>>", loading)
  console.log("error=>>>", error)

  const handleSubmit = (e) => {
    e.preventDefault()

    setUrl(url)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          URL:
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </label>
        <label>
          Method:
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </label>
        {(method === "POST" || method === "PUT") && (
          <label>
            Body Data (JSON):
            <textarea
              value={bodyData}
              onChange={(e) => setBodyData(e.target.value)}
            />
          </label>
        )}
        <button type="submit">Fetch</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  )
}

export default FetchApi

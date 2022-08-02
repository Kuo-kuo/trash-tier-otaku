import React, { useState, useEffect } from 'react'

function App() {

  const [data, setData] = useState([{}])

  useEffect(() => {
    fetch("/hello_world").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])

  return (
    <div>
      {(typeof data.message === 'undefined') ? (
        <p> Backend broke </p>
      ) : (
        <p> {data.message} </p>
      )
      }
    </div>
  )
}

export default App
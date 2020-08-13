import React, { useState, useEffect } from "react"
import axios from "axios"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const ListeningNow = () => {
  const [song, setSong] = useState(null)

  useEffect(() => {
    axios
      .get(`https://api.spotify.com/v1/me/top/tracks`, {
        headers: {
          Authorization: `Bearer ${process.env.CLIENT_SECRET}`,
        },
      })
      .then(res => {
        setSong(res.data)
        console.log("Set Data")
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  return (
    <>
      <h3>Recent Listens</h3>
      <div></div>
    </>
  )
}

export default ListeningNow

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const ListeningNow = () => {
  const data = useStaticQuery(graphql`
    query RecentTracks {
      allSpotifyRecentTrack(limit: 10) {
        edges {
          node {
            track {
              artistString
              name
              image {
                localFile {
                  childImageSharp {
                    fluid(maxWidth: 400) {
                      originalImg
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `)

  console.log(data)

  return (
    <>
      <h3>Recent Listens</h3>
      {data.allSpotifyRecentTrack.edges.map(track => (
        <p>{track.node.track.name}</p>
      ))}
    </>
  )
}

export default ListeningNow

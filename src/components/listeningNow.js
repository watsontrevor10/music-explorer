import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

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

  return (
    <>
      <h3>Recent Listens</h3>
      <div>
        {data.allSpotifyRecentTrack.edges.map((track, i) => (
          <div key={i}>
            <Img
              fluid={track.node.track.image.localFile.childImageSharp.fluid}
            />
            <p>{track.node.track.name}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default ListeningNow

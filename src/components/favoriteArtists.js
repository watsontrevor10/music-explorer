import React from "react"
import { graphql, useStaticQuery } from "gatsby"

const FavoriteArtists = () => {
  const data = useStaticQuery(graphql`
    query FaveArtists {
      allSpotifyTopArtist(
        filter: { time_range: { eq: "medium_term" } }
        sort: { fields: order, order: ASC }
      ) {
        edges {
          node {
            name
            time_range
            popularity
            followers {
              total
            }
            order
            image {
              localFile {
                childImageSharp {
                  fluid(maxWidth: 400) {
                    originalName
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
      <h1>Favorite Artists</h1>
      <h2>In the Last 6 Months</h2>
      <hr />
      <div
        style={{
          display: "flex",
          flexGrow: "4",
          flexWrap: "column wrap",
          justifyContent: "space-between"
        }}
      >
        {data.allSpotifyTopArtist.edges.map(artist => (
          <div style={{ backgroundColor: "#282828", width: "250px" }}>
            <h2>{artist.node.name}</h2>
            <p>{artist.node.popularity}</p>
          </div>
        ))}
      </div>
    </>
  )
}

export default FavoriteArtists
